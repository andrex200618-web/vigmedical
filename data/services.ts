export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  items: string[];
  categoryTitle: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: ServiceDetail[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "salud-ocupacional",
    title: "Salud Ocupacional & Vigilancia",
    description: "Servicios especializados para la prevención de riesgos y vigilancia médica continua en el entorno de trabajo.",
    icon: "HeartPulse",
    details: [
      {
        id: "medico-ocupacional-planta",
        title: "Médico Ocupacional de Planta",
        description: "Servicio de permanencia o asesoría periódica de un médico ocupacional certificado para supervisar y gestionar la salud de sus colaboradores directamente.",
        icon: "Stethoscope",
        image: "/api/media/medical-training",
        categoryTitle: "Salud Ocupacional & Vigilancia",
        items: [
          "Gestión de historias clínicas ocupacionales y línea base de salud",
          "Control y seguimiento de descansos médicos, reincorporación laboral y lactancia",
          "Elaboración e implementación del Plan y Programa Anual de Salud Ocupacional",
          "Atención de urgencias médicas ocupacionales y primeros auxilios in-house"
        ]
      },
      {
        id: "salud-ocupacional-ds005",
        title: "Salud Ocupacional (D.S.005-2012 TR)",
        description: "Vigilancia de la salud y cumplimiento del reglamento de la Ley N° 29783, asegurando la prevención de accidentes y enfermedades profesionales.",
        icon: "Activity",
        image: "/api/media/sst-training",
        categoryTitle: "Salud Ocupacional & Vigilancia",
        items: [
          "Diseño e implementación de protocolos de exámenes médicos ocupacionales (EMO)",
          "Vigilancia epidemiológica de la salud de los trabajadores mediante indicadores",
          "Seguimiento y control de colaboradores con patologías crónicas o preexistentes",
          "Asesoramiento técnico continuo al Comité de Seguridad y Salud en el Trabajo"
        ]
      }
    ]
  },
  {
    id: "monitoreo-higiene",
    title: "Monitoreo, Higiene & Ergonomía",
    description: "Medición y control de factores ambientales, posturas y condiciones físicas para asegurar un entorno de trabajo saludable y conforme a la ley.",
    icon: "ShieldAlert",
    details: [
      {
        id: "monitoreo-higiene-ds055",
        title: "Monitoreo de Higiene (D.S.055-2010 EM)",
        description: "Evaluaciones ambientales de agentes físicos, químicos y biológicos específicos del sector minero y metalúrgico, cumpliendo con la legislación vigente.",
        icon: "Gauge",
        image: "/api/media/team",
        categoryTitle: "Monitoreo, Higiene & Ergonomía",
        items: [
          "Dosimetría de ruido ocupacional y sonometría en áreas críticas",
          "Medición y control de polvos respirables, inhalables e hidrocarburos",
          "Muestreo cualitativo y cuantitativo de gases tóxicos y ventilación minera",
          "Informes técnicos oficiales listos para auditorías de OSINERGMIN y SUNAFIL"
        ]
      },
      {
        id: "ergonomia-rm375",
        title: "Ergonomía (RM 375-2008 TR)",
        description: "Evaluaciones ergonómicas detalladas para adecuar los puestos de trabajo y prevenir lesiones musculoesqueléticas en sus colaboradores.",
        icon: "Layout",
        image: "/api/media/about",
        categoryTitle: "Monitoreo, Higiene & Ergonomía",
        items: [
          "Evaluación ergonómica de puestos de trabajo (métodos REBA, RULA, OWAS, NIOSH)",
          "Identificación y control de movimientos repetitivos y manipulación manual de cargas",
          "Asesoría en diseño ergonómico de oficinas, mobiliario y estaciones industriales",
          "Capacitación en higiene postural y programas activos de pausas laborales"
        ]
      }
    ]
  },
  {
    id: "seguridad-auditoria",
    title: "Auditoría & Seguridad",
    description: "Evaluación objetiva del Sistema de Gestión y asesoramiento en el uso correcto de implementos de seguridad industrial.",
    icon: "ClipboardCheck",
    details: [
      {
        id: "auditoria-seguridad-sso",
        title: "Auditoria de Seguridad y Salud Ocupacional",
        description: "Evaluación independiente para verificar el grado de implementación, eficacia y cumplimiento legal de su Sistema de Gestión de SST.",
        icon: "ClipboardCheck",
        image: "/api/media/sst-training",
        categoryTitle: "Auditoría & Seguridad",
        items: [
          "Auditorías periódicas de cumplimiento legal bajo la Ley N° 29783 y su reglamento",
          "Revisión y validación de la matriz IPERC, mapa de riesgos y planes de emergencia",
          "Evaluación de actas, elecciones y correcto funcionamiento del Comité de SST",
          "Emisión de informe final detallado con planes de acción correctivos y preventivos"
        ]
      },
      {
        id: "equipos-proteccion-personal",
        title: "Equipos de Protección Personal (EPP)",
        description: "Determinación, dotación y control de calidad de los implementos de protección individual adecuados para las actividades laborales cotidianas.",
        icon: "Shield",
        image: "/api/media/team",
        categoryTitle: "Auditoría & Seguridad",
        items: [
          "Desarrollo de matrices de dotación de EPP según nivel de riesgo por puesto",
          "Capacitaciones obligatorias en el uso, conservación, limpieza y recambio de EPP",
          "Inspección de campo del estado de conservación y uso real de los equipos",
          "Homologación de especificaciones técnicas para adquisición de EPP certificados"
        ]
      }
    ]
  },
  {
    id: "atencion-domicilio",
    title: "Atención Médica a Domicilio",
    description: "Servicio médico profesional en la comodidad de tu hogar o centro de trabajo, con atención oportuna y personalizada.",
    icon: "Home",
    details: [
      {
        id: "consulta-medica-domicilio",
        title: "Consulta Médica a Domicilio",
        description: "Atención médica general y especializada en el domicilio del paciente, con diagnóstico, tratamiento y seguimiento personalizado sin necesidad de desplazarse.",
        icon: "Stethoscope",
        image: "/api/media/medical-training",
        categoryTitle: "Atención Médica a Domicilio",
        items: [
          "Evaluación clínica completa por médico certificado en el domicilio",
          "Prescripción de medicamentos y emisión de recetas médicas válidas",
          "Toma de muestras de laboratorio y pruebas diagnósticas en casa",
          "Seguimiento y monitoreo de pacientes con enfermedades crónicas",
          "Atención de urgencias y emergencias médicas a domicilio"
        ]
      },
      {
        id: "enfermeria-cuidados-casa",
        title: "Enfermería y Cuidados en Casa",
        description: "Servicio de enfermería profesional para pacientes que requieren cuidados continuos, administración de medicamentos o rehabilitación en su propio hogar.",
        icon: "HeartHandshake",
        image: "/api/media/about",
        categoryTitle: "Atención Médica a Domicilio",
        items: [
          "Administración de medicamentos intravenosos, inyectables y orales",
          "Curación y cuidado de heridas, úlceras y post-operatorio",
          "Control de signos vitales y registro de evolución clínica",
          "Colocación y mantenimiento de sondas y catéteres",
          "Acompañamiento y apoyo a pacientes adultos mayores o con discapacidad"
        ]
      }
    ]
  }
];
