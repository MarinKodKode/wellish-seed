function gymElement(id, day, activityId, activityName, sets, durationMinutes, calories, category, primaryMuscles, secondaryMuscles, tags) {
  return {
    id, day, completed: false,
    activity: {
      type: "gym",
      data: {
        id: activityId, name: activityName,
        activityType: "gym", activityTypeKey: "gym",
        source: "global", isGlobal: true, shareable: false, isPremiumRoutine: false,
        category, difficulty: "Intermedio",
        primaryMuscles, secondaryMuscles,
        estimatedDurationMinutes: durationMinutes,
        estimatedCalories: calories, tags, sets,
      }
    }
  };
}

function runningElement(id, day, activityId, activityName, runningType, distanceKm, durationMinutes, pace, intensity, terrain, calories) {
  return {
    id, day, completed: false,
    activity: {
      type: "running",
      data: {
        id: activityId, name: activityName,
        activityType: "running", activityTypeKey: "running",
        source: "global", isGlobal: true, shareable: false,
        runningType, targetDistanceKm: distanceKm,
        targetDurationMinutes: durationMinutes,
        targetPaceMinPerKm: pace, intensity, terrain,
        estimatedCalories: calories,
        tags: [runningType.toLowerCase(), "running"],
      }
    }
  };
}

function walkingElement(id, day, activityId, activityName, distanceKm, durationMinutes, steps, intensity, terrain, calories) {
  return {
    id, day, completed: false,
    activity: {
      type: "walking",
      data: {
        id: activityId, name: activityName,
        activityType: "walking", activityTypeKey: "walking",
        source: "global", isGlobal: true, shareable: false,
        targetDistanceKm: distanceKm, targetDurationMinutes: durationMinutes,
        targetSteps: steps, intensity, terrain,
        estimatedCalories: calories,
        tags: ["caminata", intensity.toLowerCase()],
      }
    }
  };
}

function restElement(id, day, activityId, activityName, restType, durationMinutes, suggestedActivities) {
  return {
    id, day, completed: false,
    activity: {
      type: "rest",
      data: {
        id: activityId, name: activityName,
        activityType: "rest", activityTypeKey: "rest",
        source: "global", isGlobal: true, shareable: false,
        restType, suggestedDurationMinutes: durationMinutes || null,
        suggestedActivities: suggestedActivities || null,
        tags: ["descanso", "recuperacion"],
      }
    }
  };
}

const S = {
  pressBanca: { id: "S-PB", exerciseId: "8B747E73-EF22-4B53-8FBA-279B217C9D9F", exerciseName: "Press de banca con barra", restBetweenSeriesSeconds: 90, series: [{ id: "s1", repetitions: 12, idealWeightKg: 50, restSeconds: 90 }, { id: "s2", repetitions: 10, idealWeightKg: 60, restSeconds: 90 }, { id: "s3", repetitions: 8, idealWeightKg: 70, restSeconds: 120 }, { id: "s4", repetitions: 8, idealWeightKg: 70, restSeconds: 120 }] },
  inclinado: { id: "S-INC", exerciseId: "D36BAB99-813F-4791-BB1C-10B3D76EAC68", exerciseName: "Press de pecho inclinado con mancuernas", restBetweenSeriesSeconds: 75, series: [{ id: "s1", repetitions: 12, idealWeightKg: 22, restSeconds: 75 }, { id: "s2", repetitions: 10, idealWeightKg: 24, restSeconds: 75 }, { id: "s3", repetitions: 10, idealWeightKg: 24, restSeconds: 75 }] },
  aperturas: { id: "S-AP", exerciseId: "82CCB4F1-726C-434E-B7B2-D8EB70078CC4", exerciseName: "Aperturas con mancuernas", restBetweenSeriesSeconds: 60, series: [{ id: "s1", repetitions: 15, idealWeightKg: 16, restSeconds: 60 }, { id: "s2", repetitions: 15, idealWeightKg: 16, restSeconds: 60 }, { id: "s3", repetitions: 12, idealWeightKg: 18, restSeconds: 60 }] },
  dominadas: { id: "S-DOM", exerciseId: "57317796-CBD1-45F8-AE25-51F8B45E904A", exerciseName: "Dominadas", restBetweenSeriesSeconds: 120, series: [{ id: "s1", repetitions: 8, restSeconds: 120 }, { id: "s2", repetitions: 7, restSeconds: 120 }, { id: "s3", repetitions: 6, restSeconds: 120 }, { id: "s4", repetitions: 6, restSeconds: 120 }] },
  jalon: { id: "S-JAL", exerciseId: "A22BA6F8-3604-4D42-B6DC-D55C51F5F899", exerciseName: "Jalon al pecho en polea", restBetweenSeriesSeconds: 75, series: [{ id: "s1", repetitions: 12, idealWeightKg: 55, restSeconds: 75 }, { id: "s2", repetitions: 12, idealWeightKg: 60, restSeconds: 75 }, { id: "s3", repetitions: 10, idealWeightKg: 65, restSeconds: 75 }] },
  remoMancuerna: { id: "S-RM", exerciseId: "74D1B915-447D-434E-91C1-D49E77575FEE", exerciseName: "Remo con mancuerna a una mano", restBetweenSeriesSeconds: 60, series: [{ id: "s1", repetitions: 12, idealWeightKg: 25, restSeconds: 60 }, { id: "s2", repetitions: 12, idealWeightKg: 28, restSeconds: 60 }, { id: "s3", repetitions: 10, idealWeightKg: 30, restSeconds: 60 }] },
  pesoMuerto: { id: "S-PM", exerciseId: "A8705AB5-E7A0-4590-B566-315A6ECD32EC", exerciseName: "Peso muerto", restBetweenSeriesSeconds: 180, series: [{ id: "s1", repetitions: 5, idealWeightKg: 100, restSeconds: 180 }, { id: "s2", repetitions: 5, idealWeightKg: 110, restSeconds: 180 }, { id: "s3", repetitions: 3, idealWeightKg: 120, restSeconds: 240 }] },
  sentadilla: { id: "S-SQ", exerciseId: "15CA1729-4AD8-4050-B1E8-295C9E4D7C9F", exerciseName: "Sentadilla con barra", restBetweenSeriesSeconds: 180, series: [{ id: "s1", repetitions: 10, idealWeightKg: 60, restSeconds: 180 }, { id: "s2", repetitions: 8, idealWeightKg: 70, restSeconds: 180 }, { id: "s3", repetitions: 8, idealWeightKg: 75, restSeconds: 180 }, { id: "s4", repetitions: 6, idealWeightKg: 80, restSeconds: 180 }] },
  zancadas: { id: "S-ZAN", exerciseId: "509DD495-43E7-4559-B270-48A5AB562AE9", exerciseName: "Zancadas con mancuernas", restBetweenSeriesSeconds: 75, series: [{ id: "s1", repetitions: 12, idealWeightKg: 18, restSeconds: 75 }, { id: "s2", repetitions: 12, idealWeightKg: 20, restSeconds: 75 }, { id: "s3", repetitions: 10, idealWeightKg: 22, restSeconds: 75 }] },
  hipThrust: { id: "S-HT", exerciseId: "E2A6F407-2970-4DB6-980A-550D1FB829D0", exerciseName: "Hip Thrust con barra", restBetweenSeriesSeconds: 90, series: [{ id: "s1", repetitions: 12, idealWeightKg: 60, restSeconds: 90 }, { id: "s2", repetitions: 12, idealWeightKg: 70, restSeconds: 90 }, { id: "s3", repetitions: 10, idealWeightKg: 80, restSeconds: 90 }, { id: "s4", repetitions: 10, idealWeightKg: 80, restSeconds: 90 }] },
  pressMilitar: { id: "S-PM2", exerciseId: "8F600F4E-9A6A-44EA-BC20-F1EF13FA294E", exerciseName: "Press de hombros con mancuernas", restBetweenSeriesSeconds: 90, series: [{ id: "s1", repetitions: 12, idealWeightKg: 16, restSeconds: 90 }, { id: "s2", repetitions: 10, idealWeightKg: 18, restSeconds: 90 }, { id: "s3", repetitions: 10, idealWeightKg: 20, restSeconds: 90 }, { id: "s4", repetitions: 8, idealWeightKg: 22, restSeconds: 90 }] },
  elevaciones: { id: "S-EL", exerciseId: "878335A1-E380-4004-B2EF-DA0ACDBB91DE", exerciseName: "Elevaciones laterales", restBetweenSeriesSeconds: 60, series: [{ id: "s1", repetitions: 15, idealWeightKg: 10, restSeconds: 60 }, { id: "s2", repetitions: 15, idealWeightKg: 10, restSeconds: 60 }, { id: "s3", repetitions: 12, idealWeightKg: 12, restSeconds: 60 }] },
  plancha: { id: "S-PL", exerciseId: "0752DA29-DD16-41B1-A20F-D9A8A48E5149", exerciseName: "Plancha abdominal", restBetweenSeriesSeconds: 60, series: [{ id: "s1", repetitions: 1, restSeconds: 60, notes: "45 segundos" }, { id: "s2", repetitions: 1, restSeconds: 60, notes: "45 segundos" }, { id: "s3", repetitions: 1, restSeconds: 60, notes: "60 segundos" }] },
  goblet: { id: "S-GOB", exerciseId: "E53B4ABE-3616-4695-92D1-F19457177609", exerciseName: "Sentadilla goblet con kettlebell", restBetweenSeriesSeconds: 90, series: [{ id: "s1", repetitions: 15, idealWeightKg: 16, restSeconds: 90 }, { id: "s2", repetitions: 15, idealWeightKg: 16, restSeconds: 90 }, { id: "s3", repetitions: 12, idealWeightKg: 20, restSeconds: 90 }] }
};

const plans = [
  {
    id: "PLAN-001-HIPERTROFIA-PPL",
    name: "Hipertrofia - Push Pull Legs",
    description: "Plan de 8 semanas basado en la metodologia Push/Pull/Legs para maxima hipertrofia. 4 dias de entrenamiento por semana con progresion lineal de cargas.",
    goal: "hypertrophy", category: "gym", durationWeeks: 8, activitiesPerWeek: 4,
    tags: ["hipertrofia", "gym", "PPL", "intermedio"], isGlobal: true, shareable: false, isPremiumPlan: false,
    notes: "Aumenta el peso 2.5-5kg cuando puedas completar todas las series con el numero de repeticiones indicado.",
    elements: [
      gymElement("EL-001-D1", 1, "ACT-GYM-0001-PECHO-HIPERTROFIA", "Empuje de pecho - Hipertrofia", [S.pressBanca, S.inclinado, S.aperturas], 55, 320, "Hipertrofia", ["Pectorales"], ["Triceps", "Deltoides anteriores"], ["pecho"]),
      gymElement("EL-001-D2", 2, "ACT-GYM-0002-ESPALDA-ANCHO", "Espalda - Ancho y dominadas", [S.dominadas, S.jalon, S.remoMancuerna], 55, 300, "Hipertrofia", ["Dorsales"], ["Biceps", "Trapecios"], ["espalda"]),
      gymElement("EL-001-D3", 3, "ACT-GYM-0004-PIERNAS-CUADRICEPS", "Piernas - Cuadriceps y gluteos", [S.sentadilla, S.zancadas], 65, 420, "Hipertrofia", ["Cuadriceps", "Gluteos mayor"], ["Femorales"], ["piernas"]),
      restElement("EL-001-D4", 4, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      gymElement("EL-001-D5", 5, "ACT-GYM-0006-HOMBROS-COMPLETO", "Hombros - Deltoides completo", [S.pressMilitar, S.elevaciones], 50, 270, "Hipertrofia", ["Deltoides anteriores", "Deltoides laterales"], ["Trapecios"], ["hombros"]),
      gymElement("EL-001-D6", 6, "ACT-GYM-0005-PIERNAS-POSTERIOR", "Piernas - Cadena posterior y gluteos", [S.hipThrust], 60, 380, "Hipertrofia", ["Femorales", "Gluteos mayor"], ["Gluteos medio"], ["piernas", "gluteos"]),
      restElement("EL-001-D7", 7, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 20, ["Circulos de cadera", "Rotaciones de hombro", "Movilidad de tobillo"]),
      gymElement("EL-001-D8", 8, "ACT-GYM-0001-PECHO-HIPERTROFIA", "Empuje de pecho - Hipertrofia", [S.pressBanca, S.inclinado, S.aperturas], 55, 320, "Hipertrofia", ["Pectorales"], ["Triceps", "Deltoides anteriores"], ["pecho"]),
      gymElement("EL-001-D9", 9, "ACT-GYM-0002-ESPALDA-ANCHO", "Espalda - Ancho y dominadas", [S.dominadas, S.jalon, S.remoMancuerna], 55, 300, "Hipertrofia", ["Dorsales"], ["Biceps", "Trapecios"], ["espalda"]),
      gymElement("EL-001-D10", 10, "ACT-GYM-0004-PIERNAS-CUADRICEPS", "Piernas - Cuadriceps y gluteos", [S.sentadilla, S.zancadas], 65, 420, "Hipertrofia", ["Cuadriceps", "Gluteos mayor"], ["Femorales"], ["piernas"]),
      restElement("EL-001-D11", 11, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      gymElement("EL-001-D12", 12, "ACT-GYM-0006-HOMBROS-COMPLETO", "Hombros - Deltoides completo", [S.pressMilitar, S.elevaciones], 50, 270, "Hipertrofia", ["Deltoides anteriores", "Deltoides laterales"], ["Trapecios"], ["hombros"]),
      gymElement("EL-001-D13", 13, "ACT-GYM-0005-PIERNAS-POSTERIOR", "Piernas - Cadena posterior y gluteos", [S.hipThrust], 60, 380, "Hipertrofia", ["Femorales", "Gluteos mayor"], ["Gluteos medio"], ["gluteos"]),
      restElement("EL-001-D14", 14, "ACT-RST-0004-STRETCHING", "Stretching estatico - Cadena posterior", "Estiramientos", 25, ["Estiramiento de femoral 60 seg", "Postura del palomo 90 seg"])
    ]
  },
  {
    id: "PLAN-002-FUERZA-FULLBODY",
    name: "Fuerza - Full Body 3 dias",
    description: "Plan de 6 semanas enfocado en los patrones de movimiento fundamentales para desarrollar fuerza real. 3 sesiones de full body por semana.",
    goal: "strength", category: "gym", durationWeeks: 6, activitiesPerWeek: 3,
    tags: ["fuerza", "gym", "full body", "compuestos"], isGlobal: true, shareable: false, isPremiumPlan: false,
    notes: "Descansa minimo 48 horas entre sesiones. Aumenta el peso cuando completes todas las series con buena tecnica.",
    elements: [
      gymElement("EL-002-D1", 1, "ACT-GYM-0009-FULLBODY-PRINCIPIANTE", "Full Body - Principiante", [S.goblet, S.pressBanca, S.jalon, S.plancha], 50, 280, "Fuerza", ["Cuadriceps", "Pectorales", "Dorsales"], ["Gluteos mayor", "Triceps", "Biceps"], ["full body"]),
      restElement("EL-002-D2", 2, "ACT-RST-0002-DESCANSO-ACTIVO", "Descanso activo - Caminata suave", "Descanso activo", 25, ["Caminata suave 20-25 minutos"]),
      gymElement("EL-002-D3", 3, "ACT-GYM-0009-FULLBODY-PRINCIPIANTE", "Full Body - Principiante", [S.goblet, S.pressBanca, S.jalon, S.plancha], 50, 280, "Fuerza", ["Cuadriceps", "Pectorales", "Dorsales"], ["Gluteos mayor", "Triceps", "Biceps"], ["full body"]),
      restElement("EL-002-D4", 4, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 20, ["Circulos de cadera", "Rotaciones de hombro"]),
      gymElement("EL-002-D5", 5, "ACT-GYM-0009-FULLBODY-PRINCIPIANTE", "Full Body - Principiante", [S.goblet, S.pressBanca, S.jalon, S.plancha], 50, 280, "Fuerza", ["Cuadriceps", "Pectorales", "Dorsales"], ["Gluteos mayor", "Triceps", "Biceps"], ["full body"]),
      restElement("EL-002-D6", 6, "ACT-RST-0004-STRETCHING", "Stretching estatico - Cadena posterior", "Estiramientos", 25, ["Estiramiento de femoral", "Postura del palomo"]),
      restElement("EL-002-D7", 7, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      gymElement("EL-002-D8", 8, "ACT-GYM-0010-FULLBODY-FUERZA", "Full Body - Fuerza avanzado", [S.sentadilla, S.pressBanca, S.pesoMuerto], 80, 500, "Fuerza", ["Cuadriceps", "Pectorales", "Femorales"], ["Dorsales", "Triceps", "Lumbar"], ["powerlifting"]),
      restElement("EL-002-D9", 9, "ACT-RST-0002-DESCANSO-ACTIVO", "Descanso activo - Caminata suave", "Descanso activo", 25, ["Caminata suave"]),
      gymElement("EL-002-D10", 10, "ACT-GYM-0010-FULLBODY-FUERZA", "Full Body - Fuerza avanzado", [S.sentadilla, S.pressBanca, S.pesoMuerto], 80, 500, "Fuerza", ["Cuadriceps", "Pectorales", "Femorales"], ["Dorsales", "Triceps", "Lumbar"], ["powerlifting"]),
      restElement("EL-002-D11", 11, "ACT-RST-0005-FOAM-ROLLING", "Foam rolling - Tren inferior", "Foam rolling", 20, ["Rodillo en cuadriceps", "Rodillo en femorales"]),
      gymElement("EL-002-D12", 12, "ACT-GYM-0010-FULLBODY-FUERZA", "Full Body - Fuerza avanzado", [S.sentadilla, S.pressBanca, S.pesoMuerto], 80, 500, "Fuerza", ["Cuadriceps", "Pectorales", "Femorales"], ["Dorsales", "Triceps", "Lumbar"], ["powerlifting"]),
      restElement("EL-002-D13", 13, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 20, ["Circulos de cadera"]),
      restElement("EL-002-D14", 14, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null)
    ]
  },
  {
    id: "PLAN-003-RUN-5K",
    name: "Correr tu primer 5K",
    description: "Plan de 6 semanas para principiantes que quieren completar su primer 5K. Progresion gradual hasta carrera continua de 5 kilometros.",
    goal: "run_5k", category: "running", durationWeeks: 6, activitiesPerWeek: 3,
    tags: ["5K", "running", "principiante", "cardio"], isGlobal: true, shareable: false, isPremiumPlan: false,
    notes: "No te saltes los dias de descanso. Si sientes dolor real, descansa un dia mas.",
    elements: [
      runningElement("EL-003-D1", 1, "ACT-RUN-0001-BASE-AEROBICA", "Carrera continua - Base aerobica", "Continuo", 3.0, 25, "7:30", "Baja", "Carretera", 200),
      restElement("EL-003-D2", 2, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      runningElement("EL-003-D3", 3, "ACT-RUN-0005-RECUPERACION", "Rodaje de recuperacion", "Recuperacion", 2.5, 20, "8:00", "Baja", "Carretera", 160),
      restElement("EL-003-D4", 4, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 15, ["Circulos de tobillo", "Estiramiento de femoral"]),
      runningElement("EL-003-D5", 5, "ACT-RUN-0001-BASE-AEROBICA", "Carrera continua - Base aerobica", "Continuo", 4.0, 30, "7:30", "Baja", "Carretera", 280),
      restElement("EL-003-D6", 6, "ACT-RST-0004-STRETCHING", "Stretching estatico - Cadena posterior", "Estiramientos", 20, ["Estiramiento de gemelos", "Flexores de cadera"]),
      restElement("EL-003-D7", 7, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      runningElement("EL-003-D8", 8, "ACT-RUN-0001-BASE-AEROBICA", "Carrera continua - Base aerobica", "Continuo", 4.0, 30, "7:00", "Baja", "Carretera", 290),
      restElement("EL-003-D9", 9, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      runningElement("EL-003-D10", 10, "ACT-RUN-0006-PROGRESIVA", "Carrera progresiva", "Tempo", 4.0, 32, "7:00", "Moderada", "Carretera", 310),
      restElement("EL-003-D11", 11, "ACT-RST-0005-FOAM-ROLLING", "Foam rolling - Tren inferior", "Foam rolling", 15, ["Rodillo en gemelos", "Rodillo en cuadriceps"]),
      runningElement("EL-003-D12", 12, "ACT-RUN-0004-CARRERA-LARGA", "Carrera larga - Resistencia", "Carrera larga", 5.0, 38, "7:00", "Baja", "Carretera", 380),
      restElement("EL-003-D13", 13, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 15, ["Circulos de cadera"]),
      restElement("EL-003-D14", 14, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null)
    ]
  },
  {
    id: "PLAN-004-FAT-LOSS",
    name: "Perdida de grasa - Gym y Cardio",
    description: "Plan de 8 semanas combinando fuerza y cardio para maximizar la perdida de grasa preservando masa muscular. 5 dias activos por semana.",
    goal: "fat_loss", category: "gym", durationWeeks: 8, activitiesPerWeek: 5,
    tags: ["perdida de grasa", "gym", "cardio", "definicion"], isGlobal: true, shareable: false, isPremiumPlan: false,
    notes: "El deficit calorico en la dieta es responsable del 80% de la perdida de grasa. El entrenamiento preserva el musculo.",
    elements: [
      gymElement("EL-004-D1", 1, "ACT-GYM-0001-PECHO-HIPERTROFIA", "Empuje de pecho - Hipertrofia", [S.pressBanca, S.inclinado, S.aperturas], 55, 320, "Hipertrofia", ["Pectorales"], ["Triceps", "Deltoides anteriores"], ["pecho"]),
      runningElement("EL-004-D2", 2, "ACT-RUN-0001-BASE-AEROBICA", "Carrera continua - Base aerobica", "Continuo", 5.0, 35, "6:45", "Baja", "Carretera", 320),
      gymElement("EL-004-D3", 3, "ACT-GYM-0002-ESPALDA-ANCHO", "Espalda - Ancho y dominadas", [S.dominadas, S.jalon, S.remoMancuerna], 55, 300, "Hipertrofia", ["Dorsales"], ["Biceps", "Trapecios"], ["espalda"]),
      runningElement("EL-004-D4", 4, "ACT-RUN-0005-RECUPERACION", "Rodaje de recuperacion", "Recuperacion", 4.0, 30, "7:30", "Baja", "Carretera", 240),
      gymElement("EL-004-D5", 5, "ACT-GYM-0004-PIERNAS-CUADRICEPS", "Piernas - Cuadriceps y gluteos", [S.sentadilla, S.zancadas], 65, 420, "Hipertrofia", ["Cuadriceps", "Gluteos mayor"], ["Femorales"], ["piernas"]),
      restElement("EL-004-D6", 6, "ACT-RST-0005-FOAM-ROLLING", "Foam rolling - Tren inferior", "Foam rolling", 20, ["Rodillo en cuadriceps", "Rodillo en femorales"]),
      restElement("EL-004-D7", 7, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      gymElement("EL-004-D8", 8, "ACT-GYM-0006-HOMBROS-COMPLETO", "Hombros - Deltoides completo", [S.pressMilitar, S.elevaciones], 50, 270, "Hipertrofia", ["Deltoides anteriores", "Deltoides laterales"], ["Trapecios"], ["hombros"]),
      runningElement("EL-004-D9", 9, "ACT-RUN-0002-TEMPO", "Carrera tempo - Umbral anaerobico", "Tempo", 6.0, 35, "5:30", "Alta", "Carretera", 420),
      gymElement("EL-004-D10", 10, "ACT-GYM-0005-PIERNAS-POSTERIOR", "Piernas - Cadena posterior y gluteos", [S.hipThrust], 60, 380, "Hipertrofia", ["Femorales", "Gluteos mayor"], ["Gluteos medio"], ["gluteos"]),
      runningElement("EL-004-D11", 11, "ACT-RUN-0001-BASE-AEROBICA", "Carrera continua - Base aerobica", "Continuo", 5.0, 35, "6:45", "Baja", "Carretera", 320),
      gymElement("EL-004-D12", 12, "ACT-GYM-0008-CORE-COMPLETO", "Core - Abdomen completo", [S.plancha], 30, 150, "Fuerza", ["Abdomen superior", "Oblicuos"], ["Lumbar"], ["core"]),
      restElement("EL-004-D13", 13, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 20, ["Circulos de cadera"]),
      restElement("EL-004-D14", 14, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null)
    ]
  },
  {
    id: "PLAN-005-WELLNESS",
    name: "Bienestar general - Principiante activo",
    description: "Plan de 4 semanas para personas que quieren comenzar a moverse de forma consistente. Caminata, gym suave y recuperacion activa.",
    goal: "wellness", category: "walking", durationWeeks: 4, activitiesPerWeek: 4,
    tags: ["bienestar", "principiante", "habito", "walking"], isGlobal: true, shareable: false, isPremiumPlan: false,
    notes: "La consistencia es mas importante que la intensidad.",
    elements: [
      walkingElement("EL-005-D1", 1, "ACT-WLK-0001-ACTIVACION", "Caminata de activacion matutina", 3.0, 30, 4000, "Baja", "Urbano", 150),
      gymElement("EL-005-D2", 2, "ACT-GYM-0009-FULLBODY-PRINCIPIANTE", "Full Body - Principiante", [S.goblet, S.pressBanca, S.jalon, S.plancha], 50, 280, "Fuerza", ["Cuadriceps", "Pectorales", "Dorsales"], ["Gluteos mayor", "Triceps"], ["full body"]),
      restElement("EL-005-D3", 3, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 20, ["Circulos de cadera", "Rotaciones de hombro"]),
      walkingElement("EL-005-D4", 4, "ACT-WLK-0002-PASO-RAPIDO", "Caminata de paso rapido", 5.0, 45, 6500, "Moderada", "Urbano", 250),
      gymElement("EL-005-D5", 5, "ACT-GYM-0009-FULLBODY-PRINCIPIANTE", "Full Body - Principiante", [S.goblet, S.pressBanca, S.jalon, S.plancha], 50, 280, "Fuerza", ["Cuadriceps", "Pectorales", "Dorsales"], ["Gluteos mayor", "Triceps"], ["full body"]),
      restElement("EL-005-D6", 6, "ACT-RST-0006-RESPIRACION", "Respiracion y meditacion", "Descanso completo", 15, ["Respiracion 4-7-8", "Meditacion 5 minutos"]),
      restElement("EL-005-D7", 7, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      walkingElement("EL-005-D8", 8, "ACT-WLK-0002-PASO-RAPIDO", "Caminata de paso rapido", 5.0, 45, 6500, "Moderada", "Urbano", 250),
      gymElement("EL-005-D9", 9, "ACT-GYM-0009-FULLBODY-PRINCIPIANTE", "Full Body - Principiante", [S.goblet, S.pressBanca, S.jalon, S.plancha], 50, 280, "Fuerza", ["Cuadriceps", "Pectorales", "Dorsales"], ["Gluteos mayor", "Triceps"], ["full body"]),
      restElement("EL-005-D10", 10, "ACT-RST-0004-STRETCHING", "Stretching estatico - Cadena posterior", "Estiramientos", 25, ["Estiramiento de femoral", "Lumbar"]),
      walkingElement("EL-005-D11", 11, "ACT-WLK-0003-SENDERISMO", "Senderismo de media montana", 8.0, 90, 10000, "Moderada", "Sendero", 550),
      gymElement("EL-005-D12", 12, "ACT-GYM-0009-FULLBODY-PRINCIPIANTE", "Full Body - Principiante", [S.goblet, S.pressBanca, S.jalon, S.plancha], 50, 280, "Fuerza", ["Cuadriceps", "Pectorales", "Dorsales"], ["Gluteos mayor", "Triceps"], ["full body"]),
      restElement("EL-005-D13", 13, "ACT-RST-0002-DESCANSO-ACTIVO", "Descanso activo - Caminata suave", "Descanso activo", 25, ["Caminata suave"]),
      restElement("EL-005-D14", 14, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null)
    ]
  },
  {
    id: "PLAN-006-RUN-10K",
    name: "Correr 10K - Resistencia",
    description: "Plan de 8 semanas para runners con base que quieren completar un 10K en menos de 55 minutos.",
    goal: "run_10k", category: "running", durationWeeks: 8, activitiesPerWeek: 4,
    tags: ["10K", "running", "resistencia", "intermedio"], isGlobal: true, shareable: false, isPremiumPlan: false,
    notes: "La clave del 10K es construir base aerobica solida antes de agregar velocidad.",
    elements: [
      runningElement("EL-006-D1", 1, "ACT-RUN-0001-BASE-AEROBICA", "Carrera continua - Base aerobica", "Continuo", 6.0, 42, "6:45", "Baja", "Carretera", 420),
      restElement("EL-006-D2", 2, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      runningElement("EL-006-D3", 3, "ACT-RUN-0002-TEMPO", "Carrera tempo - Umbral anaerobico", "Tempo", 6.0, 38, "5:30", "Alta", "Carretera", 460),
      restElement("EL-006-D4", 4, "ACT-RST-0005-FOAM-ROLLING", "Foam rolling - Tren inferior", "Foam rolling", 15, ["Rodillo en gemelos", "Rodillo en cuadriceps"]),
      runningElement("EL-006-D5", 5, "ACT-RUN-0005-RECUPERACION", "Rodaje de recuperacion", "Recuperacion", 4.0, 32, "7:30", "Baja", "Carretera", 260),
      runningElement("EL-006-D6", 6, "ACT-RUN-0004-CARRERA-LARGA", "Carrera larga - Resistencia", "Carrera larga", 10.0, 70, "6:45", "Baja", "Carretera", 720),
      restElement("EL-006-D7", 7, "ACT-RST-0003-MOVILIDAD", "Sesion de movilidad articular", "Movilidad", 20, ["Circulos de tobillo", "Movilidad de cadera"]),
      runningElement("EL-006-D8", 8, "ACT-RUN-0001-BASE-AEROBICA", "Carrera continua - Base aerobica", "Continuo", 7.0, 47, "6:30", "Baja", "Carretera", 480),
      restElement("EL-006-D9", 9, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null),
      runningElement("EL-006-D10", 10, "ACT-RUN-0003-INTERVALOS-400", "Intervalos 400m - Velocidad", "Intervalos", 6.0, 50, "4:00", "Alta", "Pista", 520),
      restElement("EL-006-D11", 11, "ACT-RST-0004-STRETCHING", "Stretching estatico - Cadena posterior", "Estiramientos", 20, ["Estiramiento de gemelos", "Flexores de cadera"]),
      runningElement("EL-006-D12", 12, "ACT-RUN-0006-PROGRESIVA", "Carrera progresiva", "Tempo", 8.0, 52, "5:45", "Moderada", "Carretera", 560),
      runningElement("EL-006-D13", 13, "ACT-RUN-0004-CARRERA-LARGA", "Carrera larga - Resistencia", "Carrera larga", 12.0, 82, "6:45", "Baja", "Carretera", 860),
      restElement("EL-006-D14", 14, "ACT-RST-0001-DESCANSO-COMPLETO", "Dia de descanso total", "Descanso completo", null, null)
    ]
  }
];

module.exports = plans;