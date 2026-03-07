const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const gymExercises = require("./data/gym");
const runningExercises = require("./data/running");
const cyclingExercises = require("./data/cycling");
const swimmingExercises = require("./data/swimming");
const walkingExercises = require("./data/walking");
const restExercises = require("./data/rest");

// ─── INIT ────────────────────────────────────────────────────────────────────

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const COLLECTION = "exercises";
const BATCH_SIZE = 400; // Firestore max es 500, usamos 400 por seguridad

const allExercises = [
  ...gymExercises,
  ...runningExercises,
  ...cyclingExercises,
  ...swimmingExercises,
  ...walkingExercises,
  ...restExercises,
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function buildDocument(exercise) {
  const now = admin.firestore.Timestamp.now();
  return {
    ...exercise,
    createdAt: now,
    updatedAt: now,
  };
}

function logSummary(results) {
  console.log("\n─────────────────────────────────────────");
  console.log("          SEED COMPLETADO");
  console.log("─────────────────────────────────────────");
  console.log(`✅ Gym:      ${results.gym} ejercicios`);
  console.log(`✅ Running:  ${results.running} ejercicios`);
  console.log(`✅ Cycling:  ${results.cycling} ejercicios`);
  console.log(`✅ Swimming: ${results.swimming} ejercicios`);
  console.log(`✅ Walking:  ${results.walking} ejercicios`);
  console.log(`✅ Rest:     ${results.rest} ejercicios`);
  console.log("─────────────────────────────────────────");
  console.log(`📦 Total:    ${Object.values(results).reduce((a, b) => a + b, 0)} ejercicios`);
  console.log("─────────────────────────────────────────\n");
}

// ─── VALIDATION ──────────────────────────────────────────────────────────────

function validateExercise(exercise) {
  const required = ["id", "name", "activityType", "category", "difficulty", "source", "isGlobal"];
  const missing = required.filter((field) => exercise[field] === undefined || exercise[field] === null);
  if (missing.length > 0) {
    throw new Error(`Ejercicio "${exercise.name || "sin nombre"}" tiene campos faltantes: ${missing.join(", ")}`);
  }

  const validDifficulty = ["Principiante", "Intermedio", "Avanzado"];
  if (!validDifficulty.includes(exercise.difficulty)) {
    throw new Error(`Ejercicio "${exercise.name}" tiene difficulty inválido: "${exercise.difficulty}"`);
  }

  const validCategory = ["Fuerza", "Hipertrofia", "HIIT", "Pliométrico", "Cardio", "Movilidad", "Calistenia", "Recuperación"];
  if (!validCategory.includes(exercise.category)) {
    throw new Error(`Ejercicio "${exercise.name}" tiene category inválida: "${exercise.category}"`);
  }
}

function validateAll(exercises) {
  console.log(`\n🔍 Validando ${exercises.length} ejercicios...`);
  exercises.forEach(validateExercise);
  console.log("✅ Todos los ejercicios pasaron la validación.\n");
}

// ─── SEED ────────────────────────────────────────────────────────────────────

async function checkExistingData() {
  const snapshot = await db.collection(COLLECTION).limit(1).get();
  return !snapshot.empty;
}

async function clearCollection() {
  console.log(`🗑️  Limpiando colección existente "${COLLECTION}"...`);
  const snapshot = await db.collection(COLLECTION).get();
  if (snapshot.empty) {
    console.log("   Colección vacía, nada que limpiar.\n");
    return;
  }

  const chunks = chunkArray(snapshot.docs, BATCH_SIZE);
  for (const chunk of chunks) {
    const batch = db.batch();
    chunk.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
  console.log(`   ${snapshot.docs.length} documentos eliminados.\n`);
}

async function seedExercises(exercises) {
  const chunks = chunkArray(exercises, BATCH_SIZE);
  let totalWritten = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const batch = db.batch();

    chunk.forEach((exercise) => {
      const docRef = db.collection(COLLECTION).doc(exercise.id);
      batch.set(docRef, buildDocument(exercise));
    });

    await batch.commit();
    totalWritten += chunk.length;
    console.log(`   Batch ${i + 1}/${chunks.length} — ${totalWritten}/${exercises.length} ejercicios escritos`);
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🌱 Wellish — Firebase Seed Script");
  console.log("   Colección destino:", COLLECTION);
  console.log("   Entorno:", serviceAccount.project_id);

  try {
    // 1. Validar todos los ejercicios antes de tocar Firestore
    validateAll(allExercises);

    // 2. Verificar si ya hay datos y confirmar sobreescritura
    const hasData = await checkExistingData();
    if (hasData) {
      console.log("⚠️  Ya existen datos en la colección.");
      console.log("   Ejecutando reset limpio antes de poblar...\n");
      await clearCollection();
    }

    // 3. Poblar por tipo para logging claro
    const results = {};

    console.log("📥 Poblando Gym...");
    await seedExercises(gymExercises);
    results.gym = gymExercises.length;

    console.log("\n📥 Poblando Running...");
    await seedExercises(runningExercises);
    results.running = runningExercises.length;

    console.log("\n📥 Poblando Cycling...");
    await seedExercises(cyclingExercises);
    results.cycling = cyclingExercises.length;

    console.log("\n📥 Poblando Swimming...");
    await seedExercises(swimmingExercises);
    results.swimming = swimmingExercises.length;

    console.log("\n📥 Poblando Walking...");
    await seedExercises(walkingExercises);
    results.walking = walkingExercises.length;

    console.log("\n📥 Poblando Rest...");
    await seedExercises(restExercises);
    results.rest = restExercises.length;

    // 4. Resumen final
    logSummary(results);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error durante el seed:");
    console.error("  ", error.message);
    process.exit(1);
  }
}

main();
