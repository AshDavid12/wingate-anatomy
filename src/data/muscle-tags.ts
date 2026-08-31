import type { ActionId } from "./planes";

export type JointTag =
  | "gh"
  | "st"
  | "sc"
  | "ac"
  | "elbow"
  | "ru"
  | "wrist"
  | "spine"
  | "neck"
  | "hip"
  | "knee"
  | "ankle"
  | "subtalar";

export type MuscleTag = {
  actions: ActionId[];
  joints: JointTag[];
  /** Actions that actually occur at each joint (biarticular muscles). */
  at?: Partial<Record<JointTag, ActionId[]>>;
};

/** Prime-mover actions that belong to a joint — used to hide hip abduction on the knee panel, etc. */
export const JOINT_PRIMARY_ACTIONS: Record<JointTag, ActionId[]> = {
  gh: [
    "flexion",
    "extension",
    "abduction",
    "adduction",
    "internal-rotation",
    "external-rotation",
    "horizontal-abduction",
    "horizontal-adduction",
    "stabilize",
  ],
  st: [
    "elevation",
    "depression",
    "protraction",
    "retraction",
    "upward-rotation",
    "downward-rotation",
    "stabilize",
  ],
  sc: ["elevation", "depression", "protraction", "retraction"],
  ac: ["upward-rotation", "downward-rotation"],
  elbow: ["flexion", "extension"],
  ru: ["pronation", "supination"],
  wrist: ["flexion", "extension", "abduction", "adduction"],
  neck: ["flexion", "extension", "lateral-flexion", "external-rotation", "internal-rotation"],
  spine: [
    "flexion",
    "extension",
    "lateral-flexion",
    "external-rotation",
    "internal-rotation",
    "anterior-tilt",
    "posterior-tilt",
    "stabilize",
  ],
  hip: [
    "flexion",
    "extension",
    "abduction",
    "adduction",
    "internal-rotation",
    "external-rotation",
    "anterior-tilt",
    "posterior-tilt",
    "stabilize",
  ],
  knee: ["flexion", "extension", "internal-rotation", "external-rotation"],
  ankle: ["dorsiflexion", "plantarflexion"],
  subtalar: ["inversion", "eversion"],
};

export const JOINT_TAGS: { id: JointTag; he: string; en: string }[] = [
  { id: "st", he: "שכמה–חזה", en: "Scapulothoracic" },
  { id: "gh", he: "כתף", en: "Glenohumeral" },
  { id: "sc", he: "סטרנום–בריח", en: "Sternoclavicular" },
  { id: "ac", he: "אקרומיון–בריח", en: "Acromioclavicular" },
  { id: "elbow", he: "מרפק", en: "Elbow" },
  { id: "ru", he: "רדיו–אולנרי", en: "Radioulnar" },
  { id: "wrist", he: "שורש כף היד", en: "Wrist" },
  { id: "neck", he: "צוואר", en: "Cervical spine" },
  { id: "spine", he: "עמוד שדרה / גו", en: "Spine / trunk" },
  { id: "hip", he: "ירך", en: "Hip" },
  { id: "knee", he: "ברך", en: "Knee" },
  { id: "ankle", he: "קרסול", en: "Ankle" },
  { id: "subtalar", he: "תת-קרסולי", en: "Subtalar" },
];

export const MUSCLE_TAGS: Record<string, MuscleTag> = {
  trapezius: {
    actions: ["retraction", "elevation", "depression", "upward-rotation"],
    joints: ["st"],
  },
  "levator-scapulae": {
    actions: ["elevation", "downward-rotation", "lateral-flexion"],
    joints: ["st", "neck"],
  },
  "rhomboid-major": {
    actions: ["retraction", "elevation", "downward-rotation"],
    joints: ["st"],
  },
  "rhomboid-minor": {
    actions: ["retraction", "elevation", "downward-rotation"],
    joints: ["st"],
  },
  "serratus-anterior": {
    actions: ["protraction", "upward-rotation", "stabilize"],
    joints: ["st"],
  },
  "pectoralis-minor": {
    actions: ["depression", "protraction", "downward-rotation"],
    joints: ["st"],
  },
  "latissimus-dorsi": {
    actions: ["extension", "adduction", "internal-rotation"],
    joints: ["gh"],
  },
  "pectoralis-major": {
    actions: ["horizontal-adduction", "adduction", "internal-rotation", "flexion", "extension"],
    joints: ["gh"],
  },
  deltoid: {
    actions: ["abduction", "flexion", "extension", "horizontal-adduction", "horizontal-abduction", "internal-rotation", "external-rotation"],
    joints: ["gh"],
  },
  supraspinatus: { actions: ["abduction", "stabilize"], joints: ["gh"] },
  infraspinatus: { actions: ["external-rotation", "stabilize"], joints: ["gh"] },
  "teres-minor": { actions: ["external-rotation", "stabilize"], joints: ["gh"] },
  subscapularis: { actions: ["internal-rotation", "stabilize"], joints: ["gh"] },
  "teres-major": {
    actions: ["extension", "adduction", "internal-rotation"],
    joints: ["gh"],
  },
  coracobrachialis: {
    actions: ["flexion", "adduction", "horizontal-adduction"],
    joints: ["gh"],
  },
  "biceps-brachii": {
    actions: ["flexion", "supination"],
    joints: ["elbow", "ru", "gh"],
    at: { elbow: ["flexion"], ru: ["supination"], gh: ["flexion"] },
  },
  brachialis: { actions: ["flexion"], joints: ["elbow"] },
  brachioradialis: { actions: ["flexion"], joints: ["elbow"] },
  "triceps-brachii": {
    actions: ["extension"],
    joints: ["elbow", "gh"],
    at: { elbow: ["extension"], gh: ["extension"] },
  },
  anconeus: { actions: ["extension", "stabilize"], joints: ["elbow"] },
  "pronator-teres": {
    actions: ["pronation", "flexion"],
    joints: ["ru", "elbow"],
    at: { ru: ["pronation"], elbow: ["flexion"] },
  },
  "pronator-quadratus": { actions: ["pronation"], joints: ["ru"] },
  supinator: { actions: ["supination"], joints: ["ru"] },
  "flexor-carpi-radialis": { actions: ["flexion", "abduction"], joints: ["wrist"] },
  "flexor-carpi-ulnaris": { actions: ["flexion", "adduction"], joints: ["wrist"] },
  "palmaris-longus": { actions: ["flexion"], joints: ["wrist"] },
  "flexor-digitorum-superficialis": { actions: ["flexion"], joints: ["wrist"] },
  "extensor-carpi-radialis-longus": { actions: ["extension", "abduction"], joints: ["wrist"] },
  "extensor-carpi-radialis-brevis": { actions: ["extension", "abduction"], joints: ["wrist"] },
  "extensor-carpi-ulnaris": { actions: ["extension", "adduction"], joints: ["wrist"] },
  "extensor-digitorum": { actions: ["extension"], joints: ["wrist"] },
  scm: {
    actions: ["flexion", "lateral-flexion", "external-rotation"],
    joints: ["neck"],
  },
  "rectus-abdominis": { actions: ["flexion", "posterior-tilt"], joints: ["spine"] },
  "external-oblique": {
    actions: ["flexion", "lateral-flexion", "external-rotation", "posterior-tilt"],
    joints: ["spine"],
  },
  "internal-oblique": {
    actions: ["flexion", "lateral-flexion", "internal-rotation", "posterior-tilt"],
    joints: ["spine"],
  },
  "transversus-abdominis": { actions: ["stabilize"], joints: ["spine"] },
  "quadratus-lumborum": { actions: ["lateral-flexion", "extension", "stabilize"], joints: ["spine"] },
  "erector-spinae": { actions: ["extension", "lateral-flexion", "stabilize"], joints: ["spine"] },
  multifidus: { actions: ["stabilize", "extension"], joints: ["spine"] },
  diaphragm: { actions: ["stabilize"], joints: ["spine"] },
  intercostals: { actions: ["stabilize"], joints: ["spine"] },
  "psoas-major": {
    actions: ["flexion", "anterior-tilt"],
    joints: ["hip", "spine"],
    at: { hip: ["flexion", "anterior-tilt"], spine: ["flexion"] },
  },
  iliacus: { actions: ["flexion"], joints: ["hip"] },
  "gluteus-maximus": {
    actions: ["extension", "external-rotation", "posterior-tilt"],
    joints: ["hip"],
  },
  "gluteus-medius": { actions: ["abduction", "internal-rotation", "external-rotation", "stabilize"], joints: ["hip"] },
  "gluteus-minimus": { actions: ["abduction", "internal-rotation", "stabilize"], joints: ["hip"] },
  tfl: {
    actions: ["flexion", "abduction", "internal-rotation"],
    joints: ["hip"],
  },
  piriformis: { actions: ["external-rotation"], joints: ["hip"] },
  sartorius: {
    actions: ["flexion", "abduction", "external-rotation"],
    joints: ["hip", "knee"],
    at: {
      hip: ["flexion", "abduction", "external-rotation"],
      knee: ["flexion"],
    },
  },
  pectineus: { actions: ["adduction", "flexion"], joints: ["hip"] },
  "adductor-longus": { actions: ["adduction", "flexion"], joints: ["hip"] },
  "adductor-brevis": { actions: ["adduction", "flexion"], joints: ["hip"] },
  "adductor-magnus": { actions: ["adduction", "flexion", "extension"], joints: ["hip"] },
  gracilis: {
    actions: ["adduction", "flexion"],
    joints: ["hip", "knee"],
    at: { hip: ["adduction", "flexion"], knee: ["flexion"] },
  },
  "rectus-femoris": {
    actions: ["extension", "flexion"],
    joints: ["knee", "hip"],
    at: { knee: ["extension"], hip: ["flexion"] },
  },
  "vastus-lateralis": { actions: ["extension"], joints: ["knee"] },
  "vastus-medialis": { actions: ["extension"], joints: ["knee"] },
  "vastus-intermedius": { actions: ["extension"], joints: ["knee"] },
  "biceps-femoris": {
    actions: ["flexion", "extension", "external-rotation"],
    joints: ["knee", "hip"],
    at: { knee: ["flexion", "external-rotation"], hip: ["extension", "external-rotation"] },
  },
  semitendinosus: {
    actions: ["flexion", "extension", "internal-rotation"],
    joints: ["knee", "hip"],
    at: { knee: ["flexion", "internal-rotation"], hip: ["extension"] },
  },
  semimembranosus: {
    actions: ["flexion", "extension", "internal-rotation"],
    joints: ["knee", "hip"],
    at: { knee: ["flexion", "internal-rotation"], hip: ["extension"] },
  },
  gastrocnemius: {
    actions: ["plantarflexion", "flexion"],
    joints: ["ankle", "knee"],
    at: { ankle: ["plantarflexion"], knee: ["flexion"] },
  },
  soleus: { actions: ["plantarflexion"], joints: ["ankle"] },
  plantaris: {
    actions: ["plantarflexion", "flexion"],
    joints: ["ankle", "knee"],
    at: { ankle: ["plantarflexion"], knee: ["flexion"] },
  },
  "tibialis-anterior": { actions: ["dorsiflexion", "inversion"], joints: ["ankle", "subtalar"] },
  "tibialis-posterior": { actions: ["plantarflexion", "inversion"], joints: ["ankle", "subtalar"] },
  "fibularis-longus": { actions: ["eversion", "plantarflexion"], joints: ["subtalar", "ankle"] },
  "fibularis-brevis": { actions: ["eversion", "plantarflexion"], joints: ["subtalar", "ankle"] },
  "extensor-hallucis-longus": { actions: ["dorsiflexion", "extension"], joints: ["ankle"] },
  "flexor-hallucis-longus": { actions: ["plantarflexion", "flexion"], joints: ["ankle"] },
};
