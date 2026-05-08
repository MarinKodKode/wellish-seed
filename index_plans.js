const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const plans = require("./data/plans");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const COLLECTION = "plans";
const BATCH_SIZE = 400;

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size));
  return chunks;
}

function buildDocument(plan) {
  const now = admin.firestore.Timestamp.now();
  return { ...plan, isGlobal: true, createdAt: now, updatedAt: now };
}

function validatePlan(plan) {
  const required = ["id", "name", "goal", "durationWeeks", "activitiesPerWeek", "elements"];
  const missing = required.filter(f => plan[f] === undefined || plan[f] === null);
  if (missing.length > 0) throw new Error(`Plan "${plan.name}" tiene campos faltantes: ${missing.join(", ")}`);
  if (!plan.elements.length) throw new Error(`Plan "${plan.name}" no tiene elementos`);
}

async function clearCollection() {
  console.log(`Limpiando coleccion "${COLLECTION}"...`);
  const snapshot = await db.collection(COLLECTION).get();
  if (snapshot.empty) { console.log("   Coleccion vacia.\n"); return; }
  const chunks = chunkArray(snapshot.docs, BATCH_SIZE);
  for (const chunk of chunks) {
    const batch = db.batch();
    chunk.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }
  console.log(`   ${snapshot.docs.length} documentos eliminados.\n`);
}

async function seedPlans() {
  const chunks = chunkArray(plans, BATCH_SIZE);
  let written = 0;
  for (let i = 0; i < chunks.length; i++) {
    const batch = db.batch();
    chunks[i].forEach(plan => {
      const docRef = db.collection(COLLECTION).doc(plan.id);
      batch.set(docRef, buildDocument(plan));
    });
    await batch.commit();
    written += chunks[i].length;
    console.log(`   Batch ${i + 1}/${chunks.length} — ${written}/${plans.length} planes escritos`);
  }
}

async function main() {
  console.log("\n Wellish — Plans Seed Script");
  console.log("   Coleccion destino:", COLLECTION);
  console.log("   Entorno:", serviceAccount.project_id);

  try {
    console.log(`\n Validando ${plans.length} planes...`);
    plans.forEach(validatePlan);
    console.log("✅ Todos los planes pasaron la validacion.\n");

    const snapshot = await db.collection(COLLECTION).limit(1).get();
    if (!snapshot.empty) {
      console.log("Ya existen datos. Ejecutando reset limpio...\n");
      await clearCollection();
    }

    console.log("Poblando planes...");
    await seedPlans();

    console.log("\n─────────────────────────────────────────");
    console.log("       SEED PLANES COMPLETADO");
    console.log("─────────────────────────────────────────");
    plans.forEach(p => {
      const types = {};
      p.elements.forEach(e => { const t = e.activity.activityTypeKey; types[t] = (types[t] || 0) + 1; });
      console.log(`✅ ${p.name.padEnd(35)} ${p.elements.length} elementos`);
    });
    console.log("─────────────────────────────────────────");
    console.log(`📦 Total: ${plans.length} planes | ${plans.reduce((acc, p) => acc + p.elements.length, 0)} elementos`);
    console.log("─────────────────────────────────────────\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error durante el seed:", error.message);
    process.exit(1);
  }
}

main();