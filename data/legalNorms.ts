export interface LegalNorm {
  id: string;
  code: string;
  title: string;
  type: string;
  enlace?: string;
}

export const legalNormsData: LegalNorm[] = [
  {
    id: "norm-1",
    type: "Decreto Supremo",
    code: "N ° 015-2005-SA",
    title: "Reglamento sobre valores límites permisibles para agentes químicos en el ambiente de trabajo",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/2053393-3"
  },
  {
    id: "norm-2",
    type: "Decreto Supremo",
    code: "N° 039-93-PCM",
    title: "Reglamento de Prevención y Control de Cáncer Profesional y su modificatoria",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/2053393-3"
  },
  {
    id: "norm-3",
    type: "Decreto Supremo",
    code: "Nº 014-2019-MIMP",
    title: "Reglamento de la Ley de Prevención y Sanción del Hostigamiento Sexual (Ley N° 27942)",
    enlace: "https://www.gob.pe/institucion/mimp/normas-legales/285411-014-2019-mimp"
  },
  {
    id: "norm-4",
    type: "Decreto Supremo",
    code: "N° 003-98-SA",
    title: "Normas técnicas del seguro complementario de trabajo de riesgo",
    enlace: "https://www.essalud.gob.pe/normativa_prestaciones_economicas/pdf/DS-003-98-SA.pdf"
  },
  {
    id: "norm-5",
    type: "Decreto Supremo",
    code: "N° 005-2012-TR",
    title: "Reglamento de la Ley de SST",
    enlace: "https://www.gob.pe/institucion/presidencia/normas-legales/462577-005-2012-tr"
  },
  {
    id: "norm-6",
    type: "Decreto Supremo",
    code: "N° 009-2004-TR",
    title: "Reglamento de la Ley N° 28048",
    enlace: "https://www.gob.pe/institucion/mimp/informes-publicaciones/5472558-ley-28048"
  },
  {
    id: "norm-7",
    type: "Decreto Supremo",
    code: "N° 014-2013-TR",
    title: "Reglamento del registro de auditores del SGSST",
    enlace: "https://www.gob.pe/institucion/regionlalibertad/informes-publicaciones/481856-reglamento-de-registro-de-auditores-autorizados"
  },
  {
    id: "norm-8",
    type: "Ley",
    code: "N° 30287",
    title: "Ley de prevención y control de la tuberculosis en el Perú",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/296991-30287"
  },
  {
    id: "norm-9",
    type: "Ley",
    code: "N° 28048",
    title: "Ley que protege a la mujer gestante que realiza actividades de riesgo para su gestación",
    enlace: "https://www.gob.pe/institucion/mimp/informes-publicaciones/5472558-ley-28048"
  },
  {
    id: "norm-10",
    type: "Ley",
    code: "N° 28551",
    title: "Ley que establece la obligación de elaborar planes de contingencia",
    enlace: "https://www.mef.gob.pe/contenidos/servicios_web/conectamef_quechua/pdf/normas_legales_2012/NL20140312.pdf"
  },
  {
    id: "norm-11",
    type: "Ley",
    code: "N° 29783",
    title: "Ley de Seguridad y Salud en el Trabajo",
    enlace: "https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/462576-29783"
  },
  {
    id: "norm-12",
    type: "Ley",
    code: "N° 29973",
    title: "Ley general de la persona con discapacidad",
    enlace: "https://www.gob.pe/institucion/conadis/informes-publicaciones/223512-ley-general-de-la-persona-con-discapacidad-y-su-reglamento"
  },
  {
    id: "norm-13",
    type: "Ley",
    code: "N° 30102",
    title: "Ley que dispone medidas preventivas por la exposición prolongada a la radiación solar",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/197041-30102"
  },
  {
    id: "norm-14",
    type: "NTP",
    code: "350.043-1:2011",
    title: "Extintores portátiles. Selección, distribución, inspección, mantenimiento, recarga y prueba hidrostática",
    enlace: "https://www.regionpiura.gob.pe/documentos/dependencias/phpmZ0ZJJ.pdf"
  },
  {
    id: "norm-15",
    type: "NTP",
    code: "833.034:2001",
    title: "Extintores portátiles. Verificación",
    enlace: "https://preventoronline.com/imagesbd/down/anex6288.pdf"
  },
  {
    id: "norm-16",
    type: "Resolución Ministerial",
    code: "N° 021-2016/MINSA",
    title: "Perfil de competencias del médico ocupacional",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/192789-021-2016-minsa"
  },
  {
    id: "norm-17",
    type: "Resolución Ministerial",
    code: "N° 376-2008-TR",
    title: "Medidas Nacionales frente al VIH y SIDA en el lugar de trabajo",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/248145-376-2008-minsa"
  },
  {
    id: "norm-18",
    type: "Resolución Ministerial",
    code: "N° 050-2013-TR",
    title: "Formatos referenciales de registros de SST",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/288031-050-2013-tr"
  },
  {
    id: "norm-19",
    type: "Resolución Ministerial",
    code: "N° 095-2017-PCM",
    title: "Aprueban ejecución de simulacros y simulaciones en 2018",
    enlace: "https://www.gob.pe/institucion/pcm/normas-legales/3372-095-2017-pcm"
  },
  {
    id: "norm-20",
    type: "Resolución Ministerial",
    code: "N° 312-2011-MINSA",
    title: "Protocolos de exámenes médicos ocupacionales",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/243792"
  },
  {
    id: "norm-21",
    type: "Resolución Ministerial",
    code: "N° 374-2008-TR",
    title: "Listado de agentes que afectan a las trabajadoras gestantes",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/248148-374-2008-minsa"
  },
  {
    id: "norm-22",
    type: "Resolución Ministerial",
    code: "N° 375-2008-TR",
    title: "Norma básica de ergonomía",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/394457-375-2008-tr"
  },
  {
    id: "norm-23",
    type: "Decreto Supremo",
    code: "N° 002-2020-TR",
    title: "Aprueban medidas para la promoción de la formalización laboral y la protección de los derechos fundamentales laborales en el sector agrario",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/394799-002-2020-tr"
  },
  {
    id: "norm-24",
    type: "Decreto Supremo",
    code: "N° 003-2020-TR",
    title: "Aprueban el uso obligatorio de la casilla electrónica para efectos de notificación de los procedimientos administrativos y actuaciones de la SUNAFIL",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/395565-003-2020-tr"
  },
  {
    id: "norm-25",
    type: "Decreto Supremo",
    code: "Nº 009-2020-TR",
    title: "Decreto Supremo que aprueba las normas reglamentarias del Decreto de Urgencia",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/436783-009-2020-tr"
  },
  {
    id: "norm-26",
    type: "Decreto Supremo",
    code: "Nº 008-2020-TR (modifica el Decreto Supremo 019-2006-TR)",
    title: "Decreto Supremo que modifica el Reglamento de la Ley General de Inspección del Trabajo, aprobado por Decreto Supremo Nº 019-2006-TR",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/436782-008-2020-tr"
  },
  {
    id: "norm-27",
    type: "Decreto Supremo",
    code: "Nº 007-2020-SA (deroga Decreto Supremo Nº 033-2015-SA)",
    title: "Reglamento de la Ley de salud mental",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/455147-007-2020-sa"
  },
  {
    id: "norm-28",
    type: "Resolución Ministerial",
    code: "Nº 115-2020-PCM",
    title: "Suspenden la ejecución de simulacros y simulaciones aprobados mediante R.M. N° 023-2019-PCM, en tanto se encuentre vigente la declaratoria de estado de emergencia nacional por las graves circunstancias que afectan la vida de la nación a consecuencia del brote del covid-19",
    enlace: "https://www.gob.pe/institucion/pcm/normas-legales/608559-115-2020-pcm"
  },
  {
    id: "norm-29",
    type: "Resolución de Superintendencia",
    code: "Nº 103-2020-SUNAFIL (deroga R.S. 089-2020-SUNAFIL, que reemplazó R.S. 074-2020-SUNAFIL)",
    title: "Resolución que aprueba la versión 2 del Protocolo N° 005-2020-SUNAFIL/INII, denominado \"Protocolo sobre el ejercicio de la inspección del trabajo, dentro del marco de la declaratoria de emergencia sanitaria y nacional por las graves circunstancias que afectan las actividades laborales y económicas a consecuencia del coronavirus (covid-19) en el territorio nacional\".",
    enlace: "https://www.gob.pe/institucion/sunafil/normas-legales/1197541-103-2020-sunafil"
  },
  {
    id: "norm-30",
    type: "Resolución Ministerial",
    code: "Nº 115-2020-MIMP",
    title: "Aprueban \"formatos referenciales para queja o denuncia por hostigamiento sexual en el sector público y privado\" y su respectivo instructivo",
    enlace: "https://www.gob.pe/institucion/mimp/normas-legales/846051-115-2020-mimp"
  },
  {
    id: "norm-31",
    type: "Guía",
    code: "GP 123:2020",
    title: "Lineamientos para la gestión de auditorías remotas",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/1875077-1"
  },
  {
    id: "norm-32",
    type: "Ley",
    code: "Nº 31051",
    title: "Ley que amplía las medidas de protección laboral para mujeres gestantes y madres lactantes en casos de emergencia nacional sanitaria (17/09/2020)",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/1891489-2"
  },
  {
    id: "norm-33",
    type: "Resolución de Superintendencia",
    code: "N° 186-2020-SUNAFIL",
    title: "\"Directiva N° 002-2020-SUNAFIL/INII, denominada \"\"Ejercicio de las actuaciones inspectivas de investigación en accidentes de trabajo e incidentes peligrosos\"\"",
    enlace: "https://www.gob.pe/institucion/sunafil/normas-legales/1293794-186-2020-sunafil"
  },
  {
    id: "norm-34",
    type: "Decreto de Urgencia",
    code: "Nº 127-2020",
    title: "Decreto de urgencia que establece el otorgamiento de subsidios para la recuperación del empleo formal en el sector privado y establece otras disposiciones",
    enlace: "https://www.gob.pe/institucion/presidencia/normas-legales/1372891-n-127-2020"
  },
  {
    id: "norm-35",
    type: "Decreto Supremo",
    code: "001-2021-TR",
    title: "Modifica el Reglamento de la Ley N° 29783",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/1604628-001-2021-tr"
  },
  {
    id: "norm-36",
    type: "Ley",
    code: "N° 31123",
    title: "Ley que declara necesidad e interés nacional priorizar como política de Estado el fortalecimiento y desarrollo de los servicios de promoción, prevención, tratamiento y recuperación de la Salud Mental",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/1926768-2"
  },
  {
    id: "norm-37",
    type: "Ley",
    code: "N° 31182",
    title: "Ley que protege la salud e integridad física de las personas del contenido de plomo en pinturas y otros materiales de revestimiento",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/1949247-2"
  },
  {
    id: "norm-38",
    type: "Ley",
    code: "Nº 31246",
    title: "Ley que modifica la Ley 29783, Ley de seguridad y salud en el trabajo, para garantizar el derecho de los trabajadores a la seguridad y la salud en el trabajo ante riesgo epidemiológico y sanitario",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/1966676-1"
  },
  {
    id: "norm-39",
    type: "Decreto Supremo",
    code: "N° 014-2021-TR",
    title: "Decreto Supremo que modifica el Reglamento de la Ley General de Inspección del Trabajo, aprobado por Decreto Supremo N° 019-2006-TR",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/2004405-014-2021-tr"
  },
  {
    id: "norm-40",
    type: "Decreto Supremo",
    code: "Nº 018-2021-TR",
    title: "Decreto Supremo que aprueba la Política Nacional de Seguridad y Salud en el Trabajo al 2030",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/2040029-018-2021-tr"
  },
  {
    id: "norm-41",
    type: "Decreto Supremo",
    code: "N° 021-2021-MIMP",
    title: "Decreto Supremo que modifica el Reglamento de la Ley N° 27942, Ley de Prevención y Sanción del Hostigamiento Sexual",
    enlace: "https://www.gob.pe/institucion/mimp/normas-legales/2038976-021-2021-mimp"
  },
  {
    id: "norm-42",
    type: "Decreto Supremo",
    code: "N° 023-2021-MIMP",
    title: "Decreto Supremo que aprueba el Reglamento de la Ley N° 29896, Ley que establece la implementación de lactarios en las instituciones del sector público y del sector privado promoviendo la lactancia materna",
    enlace: "https://www.gob.pe/institucion/mimp/normas-legales/2040611-023-2021-mimp"
  },
  {
    id: "norm-43",
    type: "Resolución Ministerial",
    code: "N° 239-2021-TR",
    title: "Modifican la Directiva General N° 001-2015-MTPE/3/17 \"Lineamientos para la implementación y prestación de servicios de empleo con perspectiva de discapacidad\", aprobada por R.M. N° 105-2015-TR",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/2513766-239-2021-tr"
  },
  {
    id: "norm-44",
    type: "Resolución Ministerial",
    code: "N° 245-2021-TR",
    title: "Aprueban el documento denominado \"Procedimiento para la elección de los/las representantes de los/las trabajadores/as ante el Comité de Seguridad y Salud en el Trabajo; el Subcomité de Seguridad y Salud en el Trabajo, de ser el caso; o, del/de la Supervisor/a de Seguridad y Salud en el Trabajo\"",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/2539636-245-2021-tr"
  },
  {
    id: "norm-45",
    type: "Resolución Ministerial",
    code: "Nº 013-2022-PCM",
    title: "Aprueban la ejecución de simulacros y simulaciones para los años 2022 al 2024",
    enlace: "https://www.gob.pe/institucion/pcm/normas-legales/2710221-013-2022-pcm"
  },
  {
    id: "norm-46",
    type: "Resolución Legislativa",
    code: "Nº 31415",
    title: "Resolución Legislativa que aprueba el convenio sobre la eliminación de la violencia y el acoso en el mundo del trabajo",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/2038849-4"
  },
  {
    id: "norm-47",
    type: "Decreto Supremo",
    code: "Nº 016-2022-RE",
    title: "Decreto Supremo que ratifica el Convenio sobre la Eliminación de la Violencia y el Acoso en el Mundo del Trabajo",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/3560408-016-2022-re"
  },
  {
    id: "norm-48",
    type: "Resolución de Presidencia Ejecutiva",
    code: "N° 068-2022/ATU-PE",
    title: "Reglamento que regula la prestación del servicio público de transporte especial en las modalidades de turístico, de trabajadores y de estudiantes en Lima y Callao",
    enlace: "https://www.gob.pe/institucion/atu/normas-legales/2904855-068-2022-atu-pe"
  },
  {
    id: "norm-49",
    type: "Resolución Directoral",
    code: "N° 003-2022-INACAL/DN",
    title: "Aprueban Normas Técnicas Peruanas referentes a la industria de la pintura y el color, envase metálico, salud y seguridad ocupacional, cilindros para gas, lubricantes y otros",
    enlace: "https://www.gob.pe/institucion/inacal/normas-legales/2923560-003-2022-inacal-dn"
  },
  {
    id: "norm-50",
    type: "Decreto Supremo",
    code: "N° 006-2022-TR",
    title: "Decreto Supremo que modifica el artículo 1 del Decreto Supremo N° 012-2014-TR y el artículo 112 del Reglamento de la Ley N° 29783, Ley de Seguridad y Salud en el Trabajo, aprobado por Decreto Supremo N° 005-2012-TR",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/3005450-006-2022-tr"
  },
  {
    id: "norm-51",
    type: "Resolución Jefatural",
    code: "Nº D000058-2022-INDECI-JEF INDECI",
    title: "Aprueban la Directiva N° D0000002-2022-INDECI-SEC GRAL denominada \"Organización, Ejecución y Evaluación de Simulacros Nacionales Multipeligro para los Años 2022 -2024\"",
    enlace: "https://www.gob.pe/institucion/indeci/normas-legales/2960485-058-2022-indeci"
  },
  {
    id: "norm-52",
    type: "Resolución de Superintendencia",
    code: "Nº 257-2022-SUNAFIL",
    title: "Aprueban la Versión 02 del Protocolo N° 007-2019-SUNAFIL/INII, denominado \"PROTOCOLO DE FISCALIZACIÓN EN MATERIA DE HOSTIGAMIENTO SEXUAL\"",
    enlace: "https://www.gob.pe/institucion/sunafil/normas-legales/2982523-257-2022-sunafil"
  },
  {
    id: "norm-53",
    type: "Resolución Directoral",
    code: "Nº 004-2022-INACAL/DN",
    title: "Aprueban Normas Técnicas Peruanas y textos afines, sobre gestión de la seguridad y salud en el trabajo y otro",
    enlace: "https://www.gob.pe/institucion/inacal/normas-legales/2993388-004-2022-inacal-dn"
  },
  {
    id: "norm-54",
    type: "Resolución Ministerial",
    code: "Nº 144-2022-TR",
    title: "Aprueban documentos denominados: i) Manual de usuario externo del Sistema Informático de Notificación de Accidentes de Trabajo, Incidentes Peligrosos y Enfermedades Ocupacionales – SAT; y, ii) Manual de usuario interno del Sistema Informático de Notificación de Accidentes de Trabajo, Incidentes Peligrosos y Enfermedades Ocupacionales – SAT",
    enlace: "https://www.gob.pe/institucion/mtpe/normas-legales/3034604-144-2022-tr"
  },
  {
    id: "norm-55",
    type: "Resolución Ministerial",
    code: "Nº 400-2022/MINSA",
    title: "Aprueban la \"Tabla referencial de valoración mínima de días de incapacidad temporal por accidente de tránsito\"",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/3043320-400-2022-minsa"
  },
  {
    id: "norm-56",
    type: "Decreto Supremo",
    code: "Nº 008-2022-SA",
    title: "Actualización del Anexo 5 del Reglamento de la Ley N° 26790, Ley de Modernización de la Seguridad Social en Salud, aprobado por Decreto Supremo N° 009-97-SA",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/3113954-008-2022-sa"
  },
  {
    id: "norm-57",
    type: "Resolución Directoral",
    code: "N° 009-2022-INACAL/DN",
    title: "Aprueban y dejan sin efecto diversas Normas Técnicas Peruanas y textos afines",
    enlace: "https://www.gob.pe/institucion/inacal/normas-legales/3280757-009-2022-inacal-dn"
  },
  {
    id: "norm-58",
    type: "Decreto Supremo",
    code: "N° 009-2022-MIMP",
    title: "Decreto Supremo que aprueba la relación de trabajos y actividades peligrosas o nocivas para la salud física o moral de las/los adolescentes",
    enlace: "https://www.gob.pe/institucion/mimp/normas-legales/3299174-009-2022-mimp"
  },
  {
    id: "norm-59",
    type: "Convenio",
    code: "190",
    title: "Convenio sobre la Eliminación de la Violencia y el Acoso en el Mundo del Trabajo",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/2096249-1"
  },
  {
    id: "norm-60",
    type: "Ley",
    code: "Nº 31572",
    title: "Ley del teletrabajo",
    enlace: "https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/3460247-31572"
  },
  {
    id: "norm-61",
    type: "Resolución Ministerial",
    code: "N° 831-2022/MINSA",
    title: "Aprueban la NTS N° 194-MINSA/DIGESA-2022 \"Norma Técnica de Salud para la Vigilancia y Control de Lutzomyia spp. en el territorio nacional\"",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/3608366-831-2022-minsa"
  },
  {
    id: "norm-62",
    type: "Resolución Jefatural",
    code: "Nº D000149-2022-INDECI-JEF INDECI",
    title: "Aprueban la Directiva Nº D000007-2022- INDECI-SEC GRAL denominada \"Organización, Ejecución y Evaluación de los Ejercicios de Simulación Nacional ante Desastre de Gran Magnitud 2022-2024, en el ámbito de Nivel Sectorial\"",
    enlace: "https://www.gob.pe/institucion/indeci/normas-legales/3627186-149-2022-indeci"
  },
  {
    id: "norm-63",
    type: "Decreto Supremo",
    code: "N° 002-2023-TR",
    title: "\"Decreto Supremo que aprueba el Reglamento de la Ley N° 31572 Ley del Teletrabajo\"",
    enlace: "https://www.gob.pe/institucion/servir/normas-legales/3945454-002-2023-tr"
  },
  {
    id: "norm-64",
    type: "Decreto Supremo",
    code: "N° 008-2023-SA",
    title: "Decreto Supremo que aprueba el Reglamento de la Ley N° 28553, Ley general de protección a las personas con Diabetes, modificada por la Ley N° 30867",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/4198235-008-2023-sa"
  },
  {
    id: "norm-65",
    type: "Decreto Supremo",
    code: "N° 005-2023-IN",
    title: "Decreto Supremo que aprueba el Reglamento del Decreto Legislativo Nº 1213, Decreto Legislativo que regula los servicios de seguridad privada",
    enlace: "https://www.gob.pe/institucion/mininter/normas-legales/4232479-005-2023-in"
  },
  {
    id: "norm-66",
    type: "Resolución Ministerial",
    code: "N° 462-2023/MINSA",
    title: "Aprueban la \"Directiva Administrativa que regula el uso de la firma electrónica y firma digital en los actos médicos y actos de salud\"",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/4234106-462-2023-minsa"
  },
  {
    id: "norm-67",
    type: "Directiva Administrativa",
    code: "N° 343-MINSA/OGTI-2023",
    title: "Directiva Administrativa que regula el uso de la firma electrónica y firma digital en los actos médicos y actos de salud",
    enlace: "https://bvs.minsa.gob.pe/local/MINSA/6259.pdf"
  },
  {
    id: "norm-68",
    type: "Decreto Legislativo",
    code: "N° 1570",
    title: "Ley de gestión integral de sustancias químicas",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/2181948-2"
  },
  {
    id: "norm-69",
    type: "Resolución",
    code: "N° 0555-2022/CEB-INDECOPI",
    title: "Declaran barreras burocráticas ilegales diversas medidas contenidas en la NTS N° 142-MINSA/2018/DIGESA, Norma Sanitaria para Restaurantes y Servicios Afines, aprobada por la Resolución Ministerial N° 822-2018-MINSA",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/2194919-1"
  },
  {
    id: "norm-70",
    type: "Resolución Directoral",
    code: "N° 009-2023-INACAL",
    title: "Aprueba la norma técnica peruana NTP-ISO 712.300:2023 -Orientaciones para la Integración de sistemas de Gestión ISO 9001, ISO 14001 e ISO 45001 -1ª Edición",
    enlace: "https://www.gob.pe/institucion/inacal/normas-legales/4463261-009-2023-inacal-dn"
  },
  {
    id: "norm-71",
    type: "Decreto Supremo",
    code: "N° 022-2023-SA",
    title: "Decreto Supremo que modifica las Normas Técnicas del Seguro Complementario de Trabajo de Riesgo, aprobadas por Decreto Supremo N° 003-98-SA",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/4546699-022-2023-sa"
  },
  {
    id: "norm-72",
    type: "Resolución Ministerial",
    code: "N° 811-2023/MINSA",
    title: "Modifican el inciso 6.3.1 del numeral 6.3 del apartado 6 de la NTS N° 142-MINSA/2018/ DIGESA \"Norma Sanitaria para Restaurantes y Servicios Afines\"",
    enlace: "https://busquedas.elperuano.pe/dispositivo/NL/811-2023-minsa"
  },
  {
    id: "norm-73",
    type: "Resolución Directoral",
    code: "N° 012-2023-INACAL",
    title: "Aprueban Norma Técnica Peruana NTP-ISO 6385:2023 Principios ergonómicos en el diseño de sistemas de trabajo (Primera Edición).",
    enlace: "https://www.gob.pe/institucion/inacal/normas-legales/4616948-012-2023-inacal-dn"
  },
  {
    id: "norm-74",
    type: "Decreto Supremo",
    code: "N° 031-2023-SA",
    title: "Decreto Supremo que aprueba el Reglamento de Regulación y Fiscalización de Sustancias Peligrosas de Uso Doméstico, Industrial y/o en Salud Pública",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/4925164-031-2023-sa"
  },
  {
    id: "norm-75",
    type: "Decreto Supremo",
    code: "N° 001-2024-SA",
    title: "Reglamento de la Ley N° 31561, Ley de prevención del cáncer en las mujeres y del fortalecimiento de la atención especializada oncológica",
    enlace: "https://www.gob.pe/institucion/minsa/normas-legales/5121497-001-2024-sa"
  }
];
