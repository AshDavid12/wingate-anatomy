export type AnatomyImageMeta = {
  src: string;
  wikiTitle: string;
  wikiPage: string;
  file: string;
  source?: "wiki" | "course";
  extras?: { src: string; label: string }[];
};

export const ANATOMY_IMAGES: Record<string, AnatomyImageMeta> = {
  "muscles/trapezius": {
    "src": "/anatomy/muscles/trapezius.png",
    "wikiTitle": "Trapezius",
    "wikiPage": "Trapezius",
    "file": ""
  },
  "muscles/levator-scapulae": {
    "src": "/anatomy/muscles/levator-scapulae.png",
    "wikiTitle": "Levator scapulae",
    "wikiPage": "Levator scapulae",
    "file": ""
  },
  "muscles/rhomboid-major": {
    "src": "/anatomy/muscles/rhomboid-major.png",
    "wikiTitle": "Rhomboid major",
    "wikiPage": "Rhomboid major",
    "file": ""
  },
  "muscles/rhomboid-minor": {
    "src": "/anatomy/muscles/rhomboid-minor.png",
    "wikiTitle": "Rhomboid minor",
    "wikiPage": "Rhomboid minor",
    "file": ""
  },
  "muscles/serratus-anterior": {
    "src": "/anatomy/muscles/serratus-anterior.jpg",
    "wikiTitle": "Serratus anterior",
    "wikiPage": "Serratus anterior",
    "file": ""
  },
  "muscles/pectoralis-minor": {
    "src": "/anatomy/muscles/pectoralis-minor.png",
    "wikiTitle": "Pectoralis minor",
    "wikiPage": "Pectoralis minor",
    "file": ""
  },
  "muscles/latissimus-dorsi": {
    "src": "/anatomy/muscles/latissimus-dorsi.jpg",
    "wikiTitle": "Latissimus dorsi",
    "wikiPage": "Latissimus dorsi",
    "file": ""
  },
  "muscles/pectoralis-major": {
    "src": "/anatomy/muscles/pectoralis-major.png",
    "wikiTitle": "Pectoralis major",
    "wikiPage": "Pectoralis major",
    "file": ""
  },
  "muscles/deltoid": {
    "src": "/anatomy/muscles/deltoid.png",
    "wikiTitle": "Deltoid muscle",
    "wikiPage": "Deltoid muscle",
    "file": ""
  },
  "muscles/supraspinatus": {
    "src": "/anatomy/muscles/supraspinatus.png",
    "wikiTitle": "Supraspinatus muscle",
    "wikiPage": "Supraspinatus muscle",
    "file": ""
  },
  "muscles/infraspinatus": {
    "src": "/anatomy/muscles/infraspinatus.png",
    "wikiTitle": "Infraspinatus",
    "wikiPage": "Infraspinatus",
    "file": ""
  },
  "muscles/teres-minor": {
    "src": "/anatomy/muscles/teres-minor.png",
    "wikiTitle": "Teres minor",
    "wikiPage": "Teres minor",
    "file": ""
  },
  "muscles/subscapularis": {
    "src": "/anatomy/muscles/subscapularis.png",
    "wikiTitle": "Subscapularis muscle",
    "wikiPage": "Subscapularis muscle",
    "file": ""
  },
  "muscles/teres-major": {
    "src": "/anatomy/muscles/teres-major.png",
    "wikiTitle": "Teres major",
    "wikiPage": "Teres major",
    "file": ""
  },
  "muscles/coracobrachialis": {
    "src": "/anatomy/muscles/coracobrachialis.png",
    "wikiTitle": "Coracobrachialis muscle",
    "wikiPage": "Coracobrachialis muscle",
    "file": ""
  },
  "muscles/biceps-brachii": {
    "src": "/anatomy/muscles/biceps-brachii.png",
    "wikiTitle": "Biceps",
    "wikiPage": "Biceps",
    "file": ""
  },
  "muscles/brachialis": {
    "src": "/anatomy/muscles/brachialis.jpg",
    "wikiTitle": "Brachialis muscle",
    "wikiPage": "Brachialis muscle",
    "file": ""
  },
  "muscles/brachioradialis": {
    "src": "/anatomy/muscles/brachioradialis.png",
    "wikiTitle": "Brachioradialis",
    "wikiPage": "Brachioradialis",
    "file": ""
  },
  "muscles/triceps-brachii": {
    "src": "/anatomy/muscles/triceps-brachii.png",
    "wikiTitle": "Triceps",
    "wikiPage": "Triceps",
    "file": ""
  },
  "muscles/anconeus": {
    "src": "/anatomy/muscles/anconeus.png",
    "wikiTitle": "Anconeus muscle",
    "wikiPage": "Anconeus muscle",
    "file": ""
  },
  "muscles/pronator-teres": {
    "src": "/anatomy/muscles/pronator-teres.png",
    "wikiTitle": "Pronator teres muscle",
    "wikiPage": "Pronator teres muscle",
    "file": ""
  },
  "muscles/pronator-quadratus": {
    "src": "/anatomy/muscles/pronator-quadratus.jpg",
    "wikiTitle": "Pronator quadratus",
    "wikiPage": "Pronator quadratus",
    "file": ""
  },
  "muscles/supinator": {
    "src": "/anatomy/muscles/supinator.jpg",
    "wikiTitle": "Supinator muscle",
    "wikiPage": "Supinator muscle",
    "file": ""
  },
  "muscles/flexor-carpi-radialis": {
    "src": "/anatomy/muscles/flexor-carpi-radialis.png",
    "wikiTitle": "Flexor carpi radialis muscle",
    "wikiPage": "Flexor carpi radialis muscle",
    "file": ""
  },
  "muscles/flexor-carpi-ulnaris": {
    "src": "/anatomy/muscles/flexor-carpi-ulnaris.png",
    "wikiTitle": "Flexor carpi ulnaris",
    "wikiPage": "Flexor carpi ulnaris",
    "file": ""
  },
  "muscles/palmaris-longus": {
    "src": "/anatomy/muscles/palmaris-longus.jpg",
    "wikiTitle": "Palmaris longus muscle",
    "wikiPage": "Palmaris longus muscle",
    "file": ""
  },
  "muscles/flexor-digitorum-superficialis": {
    "src": "/anatomy/muscles/flexor-digitorum-superficialis.png",
    "wikiTitle": "Flexor digitorum superficialis muscle",
    "wikiPage": "Flexor digitorum superficialis muscle",
    "file": ""
  },
  "muscles/extensor-carpi-radialis-longus": {
    "src": "/anatomy/muscles/extensor-carpi-radialis-longus.png",
    "wikiTitle": "Extensor carpi radialis longus",
    "wikiPage": "Extensor carpi radialis longus",
    "file": ""
  },
  "muscles/extensor-carpi-radialis-brevis": {
    "src": "/anatomy/muscles/extensor-carpi-radialis-brevis.png",
    "wikiTitle": "Extensor carpi radialis brevis muscle",
    "wikiPage": "Extensor carpi radialis brevis muscle",
    "file": ""
  },
  "muscles/extensor-carpi-ulnaris": {
    "src": "/anatomy/muscles/extensor-carpi-ulnaris.jpg",
    "wikiTitle": "Extensor carpi ulnaris muscle",
    "wikiPage": "Extensor carpi ulnaris muscle",
    "file": ""
  },
  "muscles/extensor-digitorum": {
    "src": "/anatomy/muscles/extensor-digitorum.png",
    "wikiTitle": "Extensor digitorum muscle",
    "wikiPage": "Extensor digitorum muscle",
    "file": ""
  },
  "muscles/scm": {
    "src": "/anatomy/muscles/scm.png",
    "wikiTitle": "Sternocleidomastoid muscle",
    "wikiPage": "Sternocleidomastoid muscle",
    "file": ""
  },
  "muscles/rectus-abdominis": {
    "src": "/anatomy/muscles/rectus-abdominis.png",
    "wikiTitle": "Rectus abdominis muscle",
    "wikiPage": "Rectus abdominis muscle",
    "file": ""
  },
  "muscles/external-oblique": {
    "src": "/anatomy/muscles/external-oblique.jpg",
    "wikiTitle": "Abdominal external oblique muscle",
    "wikiPage": "Abdominal external oblique muscle",
    "file": ""
  },
  "muscles/internal-oblique": {
    "src": "/anatomy/muscles/internal-oblique.png",
    "wikiTitle": "Abdominal internal oblique muscle",
    "wikiPage": "Abdominal internal oblique muscle",
    "file": ""
  },
  "muscles/transversus-abdominis": {
    "src": "/anatomy/muscles/transversus-abdominis.jpg",
    "wikiTitle": "Transverse abdominal muscle",
    "wikiPage": "Transverse abdominal muscle",
    "file": ""
  },
  "muscles/quadratus-lumborum": {
    "src": "/anatomy/muscles/quadratus-lumborum.png",
    "wikiTitle": "Quadratus lumborum",
    "wikiPage": "Quadratus lumborum",
    "file": ""
  },
  "muscles/erector-spinae": {
    "src": "/anatomy/muscles/erector-spinae.png",
    "wikiTitle": "Erector spinae muscles",
    "wikiPage": "Erector spinae muscles",
    "file": ""
  },
  "muscles/multifidus": {
    "src": "/anatomy/muscles/multifidus.png",
    "wikiTitle": "Multifidus muscle",
    "wikiPage": "Multifidus muscle",
    "file": ""
  },
  "muscles/diaphragm": {
    "src": "/anatomy/muscles/diaphragm.png",
    "wikiTitle": "Thoracic diaphragm",
    "wikiPage": "Thoracic diaphragm",
    "file": ""
  },
  "muscles/intercostals": {
    "src": "/anatomy/muscles/intercostals.jpg",
    "wikiTitle": "Intercostal muscles",
    "wikiPage": "Intercostal muscles",
    "file": ""
  },
  "muscles/psoas-major": {
    "src": "/anatomy/muscles/psoas-major.png",
    "wikiTitle": "Psoas major muscle",
    "wikiPage": "Psoas major muscle",
    "file": ""
  },
  "muscles/iliacus": {
    "src": "/anatomy/muscles/iliacus.png",
    "wikiTitle": "Iliacus muscle",
    "wikiPage": "Iliacus muscle",
    "file": ""
  },
  "muscles/gluteus-maximus": {
    "src": "/anatomy/muscles/gluteus-maximus.png",
    "wikiTitle": "Gluteus maximus",
    "wikiPage": "Gluteus maximus",
    "file": ""
  },
  "muscles/gluteus-medius": {
    "src": "/anatomy/muscles/gluteus-medius.png",
    "wikiTitle": "Gluteus medius",
    "wikiPage": "Gluteus medius",
    "file": ""
  },
  "muscles/gluteus-minimus": {
    "src": "/anatomy/muscles/gluteus-minimus.png",
    "wikiTitle": "Gluteus minimus",
    "wikiPage": "Gluteus minimus",
    "file": ""
  },
  "muscles/tfl": {
    "src": "/anatomy/muscles/tfl.png",
    "wikiTitle": "Tensor fasciae latae",
    "wikiPage": "Tensor fasciae latae",
    "file": ""
  },
  "muscles/piriformis": {
    "src": "/anatomy/muscles/piriformis.jpg",
    "wikiTitle": "Piriformis muscle",
    "wikiPage": "Piriformis muscle",
    "file": ""
  },
  "muscles/sartorius": {
    "src": "/anatomy/muscles/sartorius.png",
    "wikiTitle": "Sartorius muscle",
    "wikiPage": "Sartorius muscle",
    "file": ""
  },
  "muscles/pectineus": {
    "src": "/anatomy/muscles/pectineus.png",
    "wikiTitle": "Pectineus muscle",
    "wikiPage": "Pectineus muscle",
    "file": ""
  },
  "muscles/adductor-longus": {
    "src": "/anatomy/muscles/adductor-longus.png",
    "wikiTitle": "Adductor longus muscle",
    "wikiPage": "Adductor longus muscle",
    "file": ""
  },
  "muscles/adductor-brevis": {
    "src": "/anatomy/muscles/adductor-brevis.png",
    "wikiTitle": "Adductor brevis muscle",
    "wikiPage": "Adductor brevis muscle",
    "file": ""
  },
  "muscles/adductor-magnus": {
    "src": "/anatomy/muscles/adductor-magnus.png",
    "wikiTitle": "Adductor magnus muscle",
    "wikiPage": "Adductor magnus muscle",
    "file": ""
  },
  "muscles/gracilis": {
    "src": "/anatomy/muscles/gracilis.png",
    "wikiTitle": "Gracilis muscle",
    "wikiPage": "Gracilis muscle",
    "file": ""
  },
  "muscles/rectus-femoris": {
    "src": "/anatomy/muscles/rectus-femoris.png",
    "wikiTitle": "Rectus femoris",
    "wikiPage": "Rectus femoris",
    "file": ""
  },
  "muscles/vastus-lateralis": {
    "src": "/anatomy/muscles/vastus-lateralis.jpg",
    "wikiTitle": "Vastus lateralis",
    "wikiPage": "Vastus lateralis",
    "file": ""
  },
  "muscles/vastus-medialis": {
    "src": "/anatomy/muscles/vastus-medialis.jpg",
    "wikiTitle": "Vastus medialis",
    "wikiPage": "Vastus medialis",
    "file": ""
  },
  "muscles/vastus-intermedius": {
    "src": "/anatomy/muscles/vastus-intermedius.jpg",
    "wikiTitle": "Vastus intermedius",
    "wikiPage": "Vastus intermedius",
    "file": ""
  },
  "muscles/biceps-femoris": {
    "src": "/anatomy/muscles/biceps-femoris.png",
    "wikiTitle": "Biceps femoris muscle",
    "wikiPage": "Biceps femoris muscle",
    "file": ""
  },
  "muscles/semitendinosus": {
    "src": "/anatomy/muscles/semitendinosus.png",
    "wikiTitle": "Semitendinosus",
    "wikiPage": "Semitendinosus",
    "file": ""
  },
  "muscles/semimembranosus": {
    "src": "/anatomy/muscles/semimembranosus.png",
    "wikiTitle": "Semimembranosus muscle",
    "wikiPage": "Semimembranosus muscle",
    "file": ""
  },
  "muscles/gastrocnemius": {
    "src": "/anatomy/muscles/gastrocnemius.jpg",
    "wikiTitle": "Gastrocnemius muscle",
    "wikiPage": "Gastrocnemius muscle",
    "file": ""
  },
  "muscles/soleus": {
    "src": "/anatomy/muscles/soleus.jpg",
    "wikiTitle": "Soleus muscle",
    "wikiPage": "Soleus muscle",
    "file": ""
  },
  "muscles/plantaris": {
    "src": "/anatomy/muscles/plantaris.png",
    "wikiTitle": "Plantaris muscle",
    "wikiPage": "Plantaris muscle",
    "file": ""
  },
  "muscles/tibialis-anterior": {
    "src": "/anatomy/muscles/tibialis-anterior.png",
    "wikiTitle": "Tibialis anterior muscle",
    "wikiPage": "Tibialis anterior muscle",
    "file": ""
  },
  "muscles/tibialis-posterior": {
    "src": "/anatomy/muscles/tibialis-posterior.png",
    "wikiTitle": "Tibialis posterior muscle",
    "wikiPage": "Tibialis posterior muscle",
    "file": ""
  },
  "muscles/fibularis-longus": {
    "src": "/anatomy/muscles/fibularis-longus.png",
    "wikiTitle": "Fibularis longus",
    "wikiPage": "Fibularis longus",
    "file": ""
  },
  "muscles/fibularis-brevis": {
    "src": "/anatomy/muscles/fibularis-brevis.png",
    "wikiTitle": "Fibularis brevis",
    "wikiPage": "Fibularis brevis",
    "file": ""
  },
  "muscles/extensor-hallucis-longus": {
    "src": "/anatomy/muscles/extensor-hallucis-longus.png",
    "wikiTitle": "Extensor hallucis longus muscle",
    "wikiPage": "Extensor hallucis longus muscle",
    "file": ""
  },
  "muscles/flexor-hallucis-longus": {
    "src": "/anatomy/muscles/flexor-hallucis-longus.png",
    "wikiTitle": "Flexor hallucis longus muscle",
    "wikiPage": "Flexor hallucis longus muscle",
    "file": ""
  },
  "bones/occipital": {
    "src": "/anatomy/bones/occipital.png",
    "wikiTitle": "Occipital bone",
    "wikiPage": "Occipital bone",
    "file": ""
  },
  "bones/temporal": {
    "src": "/anatomy/bones/temporal.png",
    "wikiTitle": "Temporal bone",
    "wikiPage": "Temporal bone",
    "file": ""
  },
  "bones/cervical": {
    "src": "/anatomy/bones/cervical.png",
    "wikiTitle": "Cervical vertebrae",
    "wikiPage": "Cervical vertebrae",
    "file": ""
  },
  "bones/thoracic": {
    "src": "/anatomy/bones/thoracic.png",
    "wikiTitle": "Thoracic vertebrae",
    "wikiPage": "Thoracic vertebrae",
    "file": ""
  },
  "bones/lumbar": {
    "src": "/anatomy/bones/lumbar.png",
    "wikiTitle": "Lumbar vertebrae",
    "wikiPage": "Lumbar vertebrae",
    "file": ""
  },
  "bones/sacrum": {
    "src": "/anatomy/bones/sacrum.png",
    "wikiTitle": "Sacrum",
    "wikiPage": "Sacrum",
    "file": ""
  },
  "bones/coccyx": {
    "src": "/anatomy/bones/coccyx.png",
    "wikiTitle": "Coccyx",
    "wikiPage": "Coccyx",
    "file": ""
  },
  "bones/sternum": {
    "src": "/anatomy/bones/sternum.png",
    "wikiTitle": "Sternum",
    "wikiPage": "Sternum",
    "file": ""
  },
  "bones/ribs": {
    "src": "/anatomy/bones/ribs.png",
    "wikiTitle": "Rib cage",
    "wikiPage": "Rib cage",
    "file": ""
  },
  "bones/clavicle": {
    "src": "/anatomy/bones/clavicle.png",
    "wikiTitle": "Clavicle",
    "wikiPage": "Clavicle",
    "file": ""
  },
  "bones/scapula": {
    "src": "/anatomy/bones/scapula.png",
    "wikiTitle": "Scapula",
    "wikiPage": "Scapula",
    "file": ""
  },
  "bones/humerus": {
    "src": "/anatomy/bones/humerus.png",
    "wikiTitle": "Humerus",
    "wikiPage": "Humerus",
    "file": ""
  },
  "bones/radius": {
    "src": "/anatomy/bones/radius.png",
    "wikiTitle": "Radius (bone)",
    "wikiPage": "Radius (bone)",
    "file": ""
  },
  "bones/ulna": {
    "src": "/anatomy/bones/ulna.png",
    "wikiTitle": "Ulna",
    "wikiPage": "Ulna",
    "file": ""
  },
  "bones/carpals": {
    "src": "/anatomy/bones/carpals.jpg",
    "wikiTitle": "Carpal bones",
    "wikiPage": "Carpal bones",
    "file": ""
  },
  "bones/metacarpals": {
    "src": "/anatomy/bones/metacarpals.png",
    "wikiTitle": "Metacarpal bones",
    "wikiPage": "Metacarpal bones",
    "file": ""
  },
  "bones/phalanges-hand": {
    "src": "/anatomy/bones/phalanges-hand.png",
    "wikiTitle": "Phalanx bone",
    "wikiPage": "Phalanx bone",
    "file": ""
  },
  "bones/ilium": {
    "src": "/anatomy/bones/ilium.png",
    "wikiTitle": "Ilium (bone)",
    "wikiPage": "Ilium (bone)",
    "file": ""
  },
  "bones/ischium": {
    "src": "/anatomy/bones/ischium.png",
    "wikiTitle": "Ischium",
    "wikiPage": "Ischium",
    "file": ""
  },
  "bones/pubis": {
    "src": "/anatomy/bones/pubis.png",
    "wikiTitle": "Pubis (bone)",
    "wikiPage": "Pubis (bone)",
    "file": ""
  },
  "bones/femur": {
    "src": "/anatomy/bones/femur.png",
    "wikiTitle": "Femur",
    "wikiPage": "Femur",
    "file": ""
  },
  "bones/patella": {
    "src": "/anatomy/bones/patella.png",
    "wikiTitle": "Patella",
    "wikiPage": "Patella",
    "file": ""
  },
  "bones/tibia": {
    "src": "/anatomy/bones/tibia.png",
    "wikiTitle": "Tibia",
    "wikiPage": "Tibia",
    "file": ""
  },
  "bones/fibula": {
    "src": "/anatomy/bones/fibula.png",
    "wikiTitle": "Fibula",
    "wikiPage": "Fibula",
    "file": ""
  },
  "bones/talus": {
    "src": "/anatomy/bones/talus.png",
    "wikiTitle": "Talus (bone)",
    "wikiPage": "Talus (bone)",
    "file": ""
  },
  "bones/calcaneus": {
    "src": "/anatomy/bones/calcaneus.png",
    "wikiTitle": "Calcaneus",
    "wikiPage": "Calcaneus",
    "file": ""
  },
  "bones/tarsals": {
    "src": "/anatomy/bones/tarsals.png",
    "wikiTitle": "Tarsus (skeleton)",
    "wikiPage": "Tarsus (skeleton)",
    "file": ""
  },
  "bones/metatarsals": {
    "src": "/anatomy/bones/metatarsals.png",
    "wikiTitle": "Metatarsal bones",
    "wikiPage": "Metatarsal bones",
    "file": ""
  },
  "bones/phalanges-foot": {
    "src": "/anatomy/bones/phalanges-foot.png",
    "wikiTitle": "Toe",
    "wikiPage": "Toe",
    "file": ""
  },
  "joints/gh": {
    "src": "/anatomy/joints/gh.png",
    "wikiTitle": "Shoulder joint",
    "wikiPage": "Shoulder joint",
    "file": ""
  },
  "joints/st": {
    "src": "/anatomy/joints/st.png",
    "wikiTitle": "Shoulder girdle",
    "wikiPage": "Shoulder girdle",
    "file": ""
  },
  "joints/sc": {
    "src": "/anatomy/joints/sc.png",
    "wikiTitle": "Sternoclavicular joint",
    "wikiPage": "Sternoclavicular joint",
    "file": ""
  },
  "joints/ac": {
    "src": "/anatomy/joints/ac.png",
    "wikiTitle": "Acromioclavicular joint",
    "wikiPage": "Acromioclavicular joint",
    "file": ""
  },
  "joints/elbow": {
    "src": "/anatomy/joints/elbow.jpg",
    "wikiTitle": "Elbow joint",
    "wikiPage": "Elbow joint",
    "file": ""
  },
  "joints/wrist": {
    "src": "/anatomy/joints/wrist.jpg",
    "wikiTitle": "Wrist",
    "wikiPage": "Wrist",
    "file": ""
  },
  "joints/hip": {
    "src": "/anatomy/joints/hip.jpg",
    "wikiTitle": "Hip",
    "wikiPage": "Hip",
    "file": ""
  },
  "joints/knee": {
    "src": "/anatomy/joints/knee.jpg",
    "wikiTitle": "Knee",
    "wikiPage": "Knee",
    "file": ""
  },
  "joints/ankle": {
    "src": "/anatomy/joints/ankle.jpg",
    "wikiTitle": "Ankle",
    "wikiPage": "Ankle",
    "file": ""
  },
  "joints/subtalar": {
    "src": "/anatomy/joints/subtalar.png",
    "wikiTitle": "Subtalar joint",
    "wikiPage": "Subtalar joint",
    "file": ""
  },
  "regions/shoulder-girdle": {
    "src": "/anatomy/regions/shoulder-girdle.png",
    "wikiTitle": "Shoulder girdle",
    "wikiPage": "Shoulder girdle",
    "file": ""
  },
  "regions/shoulder": {
    "src": "/anatomy/regions/shoulder.png",
    "wikiTitle": "Rotator cuff",
    "wikiPage": "Rotator cuff",
    "file": ""
  },
  "regions/arm": {
    "src": "/anatomy/regions/arm.jpg",
    "wikiTitle": "Human arm",
    "wikiPage": "Human arm",
    "file": ""
  },
  "regions/forearm": {
    "src": "/anatomy/regions/forearm.jpg",
    "wikiTitle": "Posterior compartment of the forearm",
    "wikiPage": "Posterior compartment of the forearm",
    "file": ""
  },
  "regions/neck-trunk": {
    "src": "/anatomy/regions/neck-trunk.png",
    "wikiTitle": "Human torso",
    "wikiPage": "Human torso",
    "file": ""
  },
  "regions/hip": {
    "src": "/anatomy/regions/hip.png",
    "wikiTitle": "Gluteal muscles",
    "wikiPage": "Gluteal muscles",
    "file": ""
  },
  "regions/thigh": {
    "src": "/anatomy/regions/thigh.png",
    "wikiTitle": "Quadriceps femoris muscle",
    "wikiPage": "Quadriceps femoris muscle",
    "file": ""
  },
  "regions/leg": {
    "src": "/anatomy/regions/leg.png",
    "wikiTitle": "Human leg",
    "wikiPage": "Human leg",
    "file": ""
  },
  "landmarks/foramen-magnum": {
    "src": "/anatomy/landmarks/foramen-magnum.png",
    "wikiTitle": "Foramen magnum - inferior view.png",
    "wikiPage": "Foramen magnum",
    "file": "Foramen magnum - inferior view.png"
  },
  "landmarks/vertebral-body": {
    "src": "/anatomy/landmarks/vertebral-body.png",
    "wikiTitle": "Gray90.png",
    "wikiPage": "Vertebra",
    "file": "Gray90.png"
  },
  "landmarks/vertebral-foramen": {
    "src": "/anatomy/landmarks/vertebral-foramen.png",
    "wikiTitle": "Gray90.png",
    "wikiPage": "Vertebral foramen",
    "file": "Gray90.png"
  },
  "landmarks/transverse-process": {
    "src": "/anatomy/landmarks/transverse-process.png",
    "wikiTitle": "Gray90.png",
    "wikiPage": "Transverse process",
    "file": "Gray90.png"
  },
  "landmarks/spinous-process": {
    "src": "/anatomy/landmarks/spinous-process.png",
    "wikiTitle": "Lumbar vertebra 1 posterior2.png",
    "wikiPage": "Spinous process",
    "file": "Lumbar vertebra 1 posterior2.png"
  },
  "landmarks/intervertebral-foramen": {
    "src": "/anatomy/landmarks/intervertebral-foramen.png",
    "wikiTitle": "Gray94.png",
    "wikiPage": "Intervertebral foramen",
    "file": "Gray94.png"
  },
  "landmarks/superior-articular-process": {
    "src": "/anatomy/landmarks/superior-articular-process.png",
    "wikiTitle": "Superior articular process of sacrum 01 posterior view.png",
    "wikiPage": "Articular process",
    "file": "Superior articular process of sacrum 01 posterior view.png"
  },
  "landmarks/inferior-articular-process": {
    "src": "/anatomy/landmarks/inferior-articular-process.png",
    "wikiTitle": "Gray90.png",
    "wikiPage": "Articular process",
    "file": "Gray90.png"
  },
  "landmarks/cervical-transverse-foramen": {
    "src": "/anatomy/landmarks/cervical-transverse-foramen.png",
    "wikiTitle": "Cervical vertebra english.png",
    "wikiPage": "Transverse foramen",
    "file": "Cervical vertebra english.png"
  },
  "landmarks/atlas": {
    "src": "/anatomy/landmarks/atlas.png",
    "wikiTitle": "Gray86.png",
    "wikiPage": "Atlas (anatomy)",
    "file": "Gray86.png"
  },
  "landmarks/axis-dens": {
    "src": "/anatomy/landmarks/axis-dens.png",
    "wikiTitle": "Gray87.png",
    "wikiPage": "Axis (anatomy)",
    "file": "Gray87.png"
  },
  "landmarks/cervical-features": {
    "src": "/anatomy/landmarks/cervical-features.png",
    "wikiTitle": "Cervical vertebra english.png",
    "wikiPage": "Cervical vertebrae",
    "file": "Cervical vertebra english.png"
  },
  "landmarks/thoracic-costal-facet": {
    "src": "/anatomy/landmarks/thoracic-costal-facet.png",
    "wikiTitle": "Gray91.png",
    "wikiPage": "Thoracic vertebrae",
    "file": "Gray91.png"
  },
  "landmarks/lumbar-features": {
    "src": "/anatomy/landmarks/lumbar-features.png",
    "wikiTitle": "Lumbar vertebra 1 lateral2.png",
    "wikiPage": "Lumbar vertebrae",
    "file": "Lumbar vertebra 1 lateral2.png"
  },
  "landmarks/sacrum-overview": {
    "src": "/anatomy/landmarks/sacrum-overview.png",
    "wikiTitle": "Sacrum - posterior view02.png",
    "wikiPage": "Sacrum",
    "file": "Sacrum - posterior view02.png"
  },
  "landmarks/annulus-fibrosus": {
    "src": "/anatomy/landmarks/annulus-fibrosus.png",
    "wikiTitle": "Annulus Fibrosus.png",
    "wikiPage": "Annulus fibrosus",
    "file": "Annulus Fibrosus.png"
  },
  "landmarks/nucleus-pulposus": {
    "src": "/anatomy/landmarks/nucleus-pulposus.png",
    "wikiTitle": "Intervertebral disc",
    "wikiPage": "Nucleus pulposus",
    "file": "716_Intervertebral_Disk.svg"
  },
  "landmarks/manubrium": {
    "src": "/anatomy/landmarks/manubrium.png",
    "wikiTitle": "Gray117.png",
    "wikiPage": "Sternum",
    "file": "Gray117.png"
  },
  "landmarks/sternal-body": {
    "src": "/anatomy/landmarks/sternal-body.png",
    "wikiTitle": "Body of sternum frontal2.png",
    "wikiPage": "Sternum",
    "file": "Body of sternum frontal2.png"
  },
  "landmarks/xiphoid": {
    "src": "/anatomy/landmarks/xiphoid.png",
    "wikiTitle": "Xiphoid process frontal2.png",
    "wikiPage": "Xiphoid process",
    "file": "Xiphoid process frontal2.png"
  },
  "landmarks/true-ribs": {
    "src": "/anatomy/landmarks/true-ribs.png",
    "wikiTitle": "True ribs frontal2.png",
    "wikiPage": "Rib cage",
    "file": "True ribs frontal2.png"
  },
  "landmarks/false-ribs": {
    "src": "/anatomy/landmarks/false-ribs.png",
    "wikiTitle": "False ribs back2.png",
    "wikiPage": "Rib cage",
    "file": "False ribs back2.png"
  },
  "landmarks/floating-ribs": {
    "src": "/anatomy/landmarks/floating-ribs.png",
    "wikiTitle": "Floating ribs back2.png",
    "wikiPage": "Rib cage",
    "file": "Floating ribs back2.png"
  },
  "landmarks/clavicle-sternal": {
    "src": "/anatomy/landmarks/clavicle-sternal.png",
    "wikiTitle": "Gray200.png",
    "wikiPage": "Clavicle",
    "file": "Gray200.png"
  },
  "landmarks/clavicle-acromial": {
    "src": "/anatomy/landmarks/clavicle-acromial.png",
    "wikiTitle": "Gray200.png",
    "wikiPage": "Clavicle",
    "file": "Gray200.png"
  },
  "landmarks/scapula-medial-border": {
    "src": "/anatomy/landmarks/scapula-medial-border.png",
    "wikiTitle": "Medial border of scapula02.png",
    "wikiPage": "Scapula",
    "file": "Medial border of scapula02.png"
  },
  "landmarks/scapula-lateral-border": {
    "src": "/anatomy/landmarks/scapula-lateral-border.png",
    "wikiTitle": "Lateral border of scapula01.png",
    "wikiPage": "Scapula",
    "file": "Lateral border of scapula01.png"
  },
  "landmarks/scapula-inferior-angle": {
    "src": "/anatomy/landmarks/scapula-inferior-angle.png",
    "wikiTitle": "Inferior angle of the scapula01.png",
    "wikiPage": "Scapula",
    "file": "Inferior angle of the scapula01.png"
  },
  "landmarks/scapula-superior-angle": {
    "src": "/anatomy/landmarks/scapula-superior-angle.png",
    "wikiTitle": "Superior angle of scapula02.png",
    "wikiPage": "Scapula",
    "file": "Superior angle of scapula02.png"
  },
  "landmarks/spine-of-scapula": {
    "src": "/anatomy/landmarks/spine-of-scapula.png",
    "wikiTitle": "Spine of scapula02.png",
    "wikiPage": "Spine of scapula",
    "file": "Spine of scapula02.png"
  },
  "landmarks/acromion": {
    "src": "/anatomy/landmarks/acromion.png",
    "wikiTitle": "Acromion of scapula02.png",
    "wikiPage": "Acromion",
    "file": "Acromion of scapula02.png"
  },
  "landmarks/supraspinous-fossa": {
    "src": "/anatomy/landmarks/supraspinous-fossa.png",
    "wikiTitle": "Supraspinous fossa of scapula01.png",
    "wikiPage": "Supraspinatous fossa",
    "file": "Supraspinous fossa of scapula01.png"
  },
  "landmarks/infraspinous-fossa": {
    "src": "/anatomy/landmarks/infraspinous-fossa.png",
    "wikiTitle": "Infraspinatous fossa of scapula02.png",
    "wikiPage": "Infraspinatous fossa",
    "file": "Infraspinatous fossa of scapula02.png"
  },
  "landmarks/subscapular-fossa": {
    "src": "/anatomy/landmarks/subscapular-fossa.png",
    "wikiTitle": "Subscapular fossa02.png",
    "wikiPage": "Subscapular fossa",
    "file": "Subscapular fossa02.png"
  },
  "landmarks/coracoid": {
    "src": "/anatomy/landmarks/coracoid.png",
    "wikiTitle": "Coracoid process of scapula02.png",
    "wikiPage": "Coracoid process",
    "file": "Coracoid process of scapula02.png"
  },
  "landmarks/glenoid": {
    "src": "/anatomy/landmarks/glenoid.png",
    "wikiTitle": "Glenoid cavity of scapula02.png",
    "wikiPage": "Glenoid cavity",
    "file": "Glenoid cavity of scapula02.png"
  },
  "landmarks/glenoid-labrum": {
    "src": "/anatomy/landmarks/glenoid-labrum.png",
    "wikiTitle": "Gray327.png",
    "wikiPage": "Glenoid labrum",
    "file": "Gray327.png"
  },
  "landmarks/head-of-humerus": {
    "src": "/anatomy/landmarks/head-of-humerus.png",
    "wikiTitle": "Gray207.png",
    "wikiPage": "Humerus",
    "file": "Gray207.png"
  },
  "landmarks/greater-tubercle": {
    "src": "/anatomy/landmarks/greater-tubercle.png",
    "wikiTitle": "Gray207.png",
    "wikiPage": "Greater tubercle",
    "file": "Gray207.png"
  },
  "landmarks/lesser-tubercle": {
    "src": "/anatomy/landmarks/lesser-tubercle.jpg",
    "wikiTitle": "Lesser tubercle",
    "wikiPage": "Lesser tubercle",
    "file": "Lesser-Tubercle-of-Right-Humerus.jpg"
  },
  "landmarks/bicipital-groove": {
    "src": "/anatomy/landmarks/bicipital-groove.png",
    "wikiTitle": "Gray207.png",
    "wikiPage": "Intertubercular sulcus",
    "file": "Gray207.png"
  },
  "landmarks/deltoid-tuberosity": {
    "src": "/anatomy/landmarks/deltoid-tuberosity.png",
    "wikiTitle": "Gray207.png",
    "wikiPage": "Deltoid tuberosity",
    "file": "Gray207.png"
  },
  "landmarks/medial-epicondyle-humerus": {
    "src": "/anatomy/landmarks/medial-epicondyle-humerus.png",
    "wikiTitle": "Gray210.png",
    "wikiPage": "Medial epicondyle of the humerus",
    "file": "Gray210.png"
  },
  "landmarks/lateral-epicondyle-humerus": {
    "src": "/anatomy/landmarks/lateral-epicondyle-humerus.png",
    "wikiTitle": "Gray210.png",
    "wikiPage": "Lateral epicondyle of the humerus",
    "file": "Gray210.png"
  },
  "landmarks/olecranon-fossa": {
    "src": "/anatomy/landmarks/olecranon-fossa.png",
    "wikiTitle": "Gray208.png",
    "wikiPage": "Olecranon fossa",
    "file": "Gray208.png"
  },
  "landmarks/head-of-radius": {
    "src": "/anatomy/landmarks/head-of-radius.png",
    "wikiTitle": "Gray213.png",
    "wikiPage": "Radius (bone)",
    "file": "Gray213.png"
  },
  "landmarks/neck-of-radius": {
    "src": "/anatomy/landmarks/neck-of-radius.png",
    "wikiTitle": "Gray213.png",
    "wikiPage": "Radius (bone)",
    "file": "Gray213.png"
  },
  "landmarks/radial-tuberosity": {
    "src": "/anatomy/landmarks/radial-tuberosity.png",
    "wikiTitle": "Radial tuberosity",
    "wikiPage": "Radial tuberosity",
    "file": "Tuberositasradii.png"
  },
  "landmarks/olecranon": {
    "src": "/anatomy/landmarks/olecranon.png",
    "wikiTitle": "Gray212.png",
    "wikiPage": "Olecranon",
    "file": "Gray212.png"
  },
  "landmarks/ulnar-tuberosity": {
    "src": "/anatomy/landmarks/ulnar-tuberosity.png",
    "wikiTitle": "Gray212.png",
    "wikiPage": "Ulna",
    "file": "Gray212.png"
  },
  "landmarks/radial-styloid": {
    "src": "/anatomy/landmarks/radial-styloid.png",
    "wikiTitle": "Gray219.png",
    "wikiPage": "Styloid process of radius",
    "file": "Gray219.png"
  },
  "landmarks/ulnar-styloid": {
    "src": "/anatomy/landmarks/ulnar-styloid.png",
    "wikiTitle": "Gray219.png",
    "wikiPage": "Ulnar styloid process",
    "file": "Gray219.png"
  },
  "landmarks/iliac-fossa": {
    "src": "/anatomy/landmarks/iliac-fossa.png",
    "wikiTitle": "Iliac fossa 01 anterior view.png",
    "wikiPage": "Iliac fossa",
    "file": "Iliac fossa 01 anterior view.png"
  },
  "landmarks/gluteal-fossa": {
    "src": "/anatomy/landmarks/gluteal-fossa.png",
    "wikiTitle": "Gray237.png",
    "wikiPage": "Ilium (bone)",
    "file": "Gray237.png"
  },
  "landmarks/iliac-crest": {
    "src": "/anatomy/landmarks/iliac-crest.png",
    "wikiTitle": "Iliac crest 03 - lateral view.png",
    "wikiPage": "Iliac crest",
    "file": "Iliac crest 03 - lateral view.png"
  },
  "landmarks/asis": {
    "src": "/anatomy/landmarks/asis.png",
    "wikiTitle": "Gray236.png",
    "wikiPage": "Anterior superior iliac spine",
    "file": "Gray236.png"
  },
  "landmarks/psis": {
    "src": "/anatomy/landmarks/psis.png",
    "wikiTitle": "Gray237.png",
    "wikiPage": "Posterior superior iliac spine",
    "file": "Gray237.png"
  },
  "landmarks/ischial-tuberosity": {
    "src": "/anatomy/landmarks/ischial-tuberosity.png",
    "wikiTitle": "Ischial tuberosity 01 posterior view.png",
    "wikiPage": "Ischial tuberosity",
    "file": "Ischial tuberosity 01 posterior view.png"
  },
  "landmarks/superior-pubic-ramus": {
    "src": "/anatomy/landmarks/superior-pubic-ramus.png",
    "wikiTitle": "Gray241.png",
    "wikiPage": "Superior pubic ramus",
    "file": "Gray241.png"
  },
  "landmarks/inferior-pubic-ramus": {
    "src": "/anatomy/landmarks/inferior-pubic-ramus.png",
    "wikiTitle": "Gray241.png",
    "wikiPage": "Inferior pubic ramus",
    "file": "Gray241.png"
  },
  "landmarks/pubic-symphysis": {
    "src": "/anatomy/landmarks/pubic-symphysis.png",
    "wikiTitle": "Gray321.png",
    "wikiPage": "Pubic symphysis",
    "file": "Gray321.png"
  },
  "landmarks/acetabulum": {
    "src": "/anatomy/landmarks/acetabulum.png",
    "wikiTitle": "Acetabulum 04 lateral view (Right hip bone).png",
    "wikiPage": "Acetabulum",
    "file": "Acetabulum 04 lateral view (Right hip bone).png"
  },
  "landmarks/sacroiliac-joint": {
    "src": "/anatomy/landmarks/sacroiliac-joint.png",
    "wikiTitle": "Gray237.png",
    "wikiPage": "Sacroiliac joint",
    "file": "Gray237.png"
  },
  "landmarks/head-of-femur": {
    "src": "/anatomy/landmarks/head-of-femur.png",
    "wikiTitle": "Gray244.png",
    "wikiPage": "Femur",
    "file": "Gray244.png"
  },
  "landmarks/greater-trochanter": {
    "src": "/anatomy/landmarks/greater-trochanter.png",
    "wikiTitle": "Gray244.png",
    "wikiPage": "Greater trochanter",
    "file": "Gray244.png"
  },
  "landmarks/lesser-trochanter": {
    "src": "/anatomy/landmarks/lesser-trochanter.png",
    "wikiTitle": "Gray244.png",
    "wikiPage": "Lesser trochanter",
    "file": "Gray244.png"
  },
  "landmarks/medial-condyle-femur": {
    "src": "/anatomy/landmarks/medial-condyle-femur.png",
    "wikiTitle": "Gray246.png",
    "wikiPage": "Medial condyle of femur",
    "file": "Gray246.png"
  },
  "landmarks/lateral-condyle-femur": {
    "src": "/anatomy/landmarks/lateral-condyle-femur.png",
    "wikiTitle": "Gray246.png",
    "wikiPage": "Lateral condyle of femur",
    "file": "Gray246.png"
  },
  "landmarks/patellar-surface": {
    "src": "/anatomy/landmarks/patellar-surface.png",
    "wikiTitle": "Gray246.png",
    "wikiPage": "Femur",
    "file": "Gray246.png"
  },
  "landmarks/medial-condyle-tibia": {
    "src": "/anatomy/landmarks/medial-condyle-tibia.png",
    "wikiTitle": "Gray258.png",
    "wikiPage": "Tibia",
    "file": "Gray258.png"
  },
  "landmarks/lateral-condyle-tibia": {
    "src": "/anatomy/landmarks/lateral-condyle-tibia.png",
    "wikiTitle": "Gray258.png",
    "wikiPage": "Tibia",
    "file": "Gray258.png"
  },
  "landmarks/tibial-plateau": {
    "src": "/anatomy/landmarks/tibial-plateau.png",
    "wikiTitle": "Gray258.png",
    "wikiPage": "Tibia",
    "file": "Gray258.png"
  },
  "landmarks/tibial-tuberosity": {
    "src": "/anatomy/landmarks/tibial-tuberosity.png",
    "wikiTitle": "Gray258.png",
    "wikiPage": "Tibial tuberosity",
    "file": "Gray258.png"
  },
  "landmarks/medial-malleolus": {
    "src": "/anatomy/landmarks/medial-malleolus.png",
    "wikiTitle": "Gray258.png",
    "wikiPage": "Malleolus",
    "file": "Gray258.png"
  },
  "landmarks/head-of-fibula": {
    "src": "/anatomy/landmarks/head-of-fibula.png",
    "wikiTitle": "Gray259.png",
    "wikiPage": "Fibula",
    "file": "Gray259.png"
  },
  "landmarks/lateral-malleolus": {
    "src": "/anatomy/landmarks/lateral-malleolus.png",
    "wikiTitle": "Gray259.png",
    "wikiPage": "Malleolus",
    "file": "Gray259.png"
  },
  "landmarks/linea-aspera": {
    "src": "/anatomy/landmarks/linea-aspera.png",
    "wikiTitle": "Gray245.png",
    "wikiPage": "Gray245.png",
    "file": "Gray245.png"
  }
};

export type AnatomyKind = "muscles" | "bones" | "joints" | "regions" | "landmarks";

export function anatomyImage(kind: AnatomyKind, id: string): AnatomyImageMeta | undefined {
  return ANATOMY_IMAGES[`${kind}/${id}`];
}
