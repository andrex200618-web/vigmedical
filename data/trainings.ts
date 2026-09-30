export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  modality: "Presencial" | "Virtual" | "Híbrido";
  targetAudience: string;
  syllabus: string[];
  image: string;
}

export const trainingsData: TrainingCourse[] = [
  {
    id: "seguridad-salud-trabajo",
    title: "SEGURIDAD Y SALUD",
    description: "La capacitación en nuevos alcances legales en Seguridad y Salud en el Trabajo (SST) es una formación orientada a actualizar a empleadores, comités de SST y trabajadores sobre las últimas modificaciones legislativas en materia de prevención de riesgos laborales.",
    duration: "4 horas",
    category: "Cumplimiento Legal SST",
    modality: "Híbrido",
    targetAudience: "Empleadores, miembros del Comité de SST, supervisores y trabajadores en general.",
    syllabus: [
      "Marco legal vigente de la Ley N° 29783 y sus últimas modificaciones",
      "Responsabilidades y obligaciones legales del empleador",
      "Identificación de Peligros, Evaluación de Riesgos y Medidas de Control (IPERC)",
      "Planificación y organización de la seguridad preventiva en el trabajo"
    ],
    image: "/api/media/sst-training"
  },
  {
    id: "vigilancia-medico-ocupacional",
    title: "VIGILANCIA MEDICO OCUPACIONAL",
    description: "La capacitación en vigilancia médico ocupacional es un proceso formativo dirigido a trabajadores, supervisores y personal de salud para comprender los alcances de la vigilancia de la salud en el trabajo, el control de factores de riesgo y el seguimiento de la salud ocupacional.",
    duration: "4 horas",
    category: "Salud Ocupacional",
    modality: "Virtual",
    targetAudience: "Supervisores de SST, personal de Recursos Humanos, personal de salud y trabajadores.",
    syllabus: [
      "Marco conceptual de la vigilancia de la salud colectiva e individual",
      "Protocolo y tipos de evaluaciones médicas ocupacionales (EMO)",
      "Gestión de descansos médicos, aptitudes laborales y reincorporación",
      "Prevención de enfermedades profesionales asociadas al puesto de trabajo"
    ],
    image: "/api/media/medical-training"
  }
];
