export type CourseImage = {
  src: string;
  label: string;
};

const C = "/anatomy/course";

export const COURSE_IMAGES: Record<string, CourseImage[]> = {
  "joints/hip": [
    { src: `${C}/hip-bones.jpg`, label: "מפרק ירך — ראש הירך באצטבולום" },
    { src: `${C}/hip-ligaments.jpg`, label: "רצועות הירך: iliofemoral, pubofemoral, ischiofemoral" },
    { src: `${C}/slide-hip.jpg`, label: "שקופית: עצמות, סוג ותנועות" },
    { src: `${C}/slide-hip-stability.jpg`, label: "שקופית: יציבות המפרק" },
    { src: `${C}/slide-hip-ligaments.jpg`, label: "שקופית: רצועות המפרק" },
  ],
  "joints/knee": [
    { src: `${C}/knee-ligaments.jpg`, label: "רצועות ומניסקוסים של הברך" },
    { src: `${C}/knee-tibiofemoral.jpg`, label: "מפרק טיביופמורלי" },
    { src: `${C}/knee-collateral.jpg`, label: "MCL ו-LCL" },
    { src: `${C}/knee-cruciate.jpg`, label: "ACL ו-PCL" },
    { src: `${C}/genu-varus-valgus.jpg`, label: "Genu varus / genu valgus" },
    { src: `${C}/meniscus.jpg`, label: "מניסקוס מדיאלי ולטרלי" },
    { src: `${C}/patellofemoral.jpg`, label: "מפרק פטלوفמורלי" },
    { src: `${C}/infrapatellar-bursitis.jpg`, label: "דלקת בבורסה אינפרה-פטלרית" },
    { src: `${C}/slide-knee.jpg`, label: "שקופית: מפרק ברך טיביופמורלי" },
    { src: `${C}/slide-meniscus.jpg`, label: "שקופית: תפקידי המניסקוס" },
    { src: `${C}/slide-cartilage.jpg`, label: "שקופית: דרגות פגיעה בסחוס" },
    { src: `${C}/slide-osgood.jpg`, label: "שקופית: פיקה ואוסגוד-שלטר" },
  ],
  "joints/ankle": [
    { src: `${C}/ankle-bones.jpg`, label: "מפרק קרסול — טיביה, פיבולה, טאלוס" },
    { src: `${C}/ankle-sprain.jpg`, label: "נקע בקרסול (ankle sprain)" },
    { src: `${C}/slide-ankle.jpg`, label: "שקופית: עצמות, סוג ותנועות" },
    { src: `${C}/slide-ankle-sprain.jpg`, label: "שקופית: פתולוגיה — נקע" },
  ],
  "bones/femur": [
    { src: `${C}/hip-bones.jpg`, label: "ראש הירך במפרק הירך" },
    { src: `${C}/knee-tibiofemoral.jpg`, label: "קונדילים של הירך בברך" },
  ],
  "bones/tibia": [
    { src: `${C}/knee-tibiofemoral.jpg`, label: "Tibial plateau בברך" },
    { src: `${C}/ankle-bones.jpg`, label: "טיביה במפרק הקרסול" },
  ],
  "bones/fibula": [{ src: `${C}/ankle-bones.jpg`, label: "פיבולה במפרק הקרסול" }],
  "bones/patella": [
    { src: `${C}/patellofemoral.jpg`, label: "פיקה במפרק פטלوفמורלי" },
    { src: `${C}/patella-osgood.jpg`, label: "פיקה — עצם ססמואידית בגיד הארבע-ראשי" },
  ],
  "bones/talus": [{ src: `${C}/ankle-bones.jpg`, label: "טאלוס במפרק הקרסול" }],
  "bones/ilium": [
    { src: `${C}/hip-bones.jpg`, label: "אצטבולום של עצם האגן" },
    { src: `${C}/iliacus.jpg`, label: "גומה כסלית — origin של iliacus" },
  ],
  "muscles/psoas-major": [
    { src: `${C}/psoas-major.jpg`, label: "Psoas major" },
    { src: `${C}/iliopsoas.jpg`, label: "Iliopsoas = iliacus + psoas major" },
  ],
  "muscles/iliacus": [
    { src: `${C}/iliacus.jpg`, label: "Iliacus" },
    { src: `${C}/iliopsoas.jpg`, label: "Iliopsoas = iliacus + psoas major" },
  ],
  "muscles/tfl": [
    { src: `${C}/tfl.jpg`, label: "Tensor fasciae latae" },
    { src: `${C}/itb.jpg`, label: "Iliotibial band / trochanteric bursa" },
  ],
  "muscles/gluteus-maximus": [
    { src: `${C}/gluteus-maximus.jpg`, label: "Gluteus maximus" },
    { src: `${C}/gluteus-group.jpg`, label: "שרירי הישבן — שלוש השכבות" },
  ],
  "muscles/gluteus-medius": [
    { src: `${C}/gluteus-medius.jpg`, label: "Gluteus medius" },
    { src: `${C}/gluteus-group.jpg`, label: "שרירי הישבן — שלוש השכבות" },
  ],
  "muscles/gluteus-minimus": [
    { src: `${C}/gluteus-minimus.jpg`, label: "Gluteus minimus" },
    { src: `${C}/gluteus-group.jpg`, label: "שרירי הישבן — שלוש השכבות" },
  ],
  "muscles/pectineus": [{ src: `${C}/adductors.jpg`, label: "מקרבי הירך — קבוצה" }],
  "muscles/adductor-longus": [{ src: `${C}/adductors.jpg`, label: "מקרבי הירך — קבוצה" }],
  "muscles/adductor-brevis": [{ src: `${C}/adductors.jpg`, label: "מקרבי הירך — קבוצה" }],
  "muscles/adductor-magnus": [{ src: `${C}/adductors.jpg`, label: "מקרבי הירך — קבוצה" }],
  "muscles/gracilis": [{ src: `${C}/adductors.jpg`, label: "מקרבי הירך — Gracilis נאחז בטיביה" }],
  "muscles/rectus-femoris": [
    { src: `${C}/rectus-femoris.jpg`, label: "Rectus femoris" },
    { src: `${C}/quadriceps.jpg`, label: "ארבע-ראשי — ארבעה ראשים" },
    { src: `${C}/patella-osgood.jpg`, label: "גיד הארבע-ראשי, גיד הפיקה ואוסגוד-שלטר" },
  ],
  "muscles/vastus-lateralis": [
    { src: `${C}/vastus-lateralis.jpg`, label: "Vastus lateralis" },
    { src: `${C}/quadriceps.jpg`, label: "ארבע-ראשי — ארבעה ראשים" },
  ],
  "muscles/vastus-medialis": [
    { src: `${C}/vastus-medialis.jpg`, label: "Vastus medialis" },
    { src: `${C}/quadriceps.jpg`, label: "ארבע-ראשי — ארבעה ראשים" },
  ],
  "muscles/vastus-intermedius": [
    { src: `${C}/vastus-intermedius.jpg`, label: "Vastus intermedius" },
    { src: `${C}/quadriceps.jpg`, label: "ארבע-ראשי — ארבעה ראשים" },
  ],
  "muscles/biceps-femoris": [
    { src: `${C}/biceps-femoris.jpg`, label: "Biceps femoris" },
    { src: `${C}/hamstrings.jpg`, label: "המסטרינג — שלושה שרירים" },
    { src: `${C}/hamstrings-group.jpg`, label: "המסטרינג — מבט אחורי" },
  ],
  "muscles/semitendinosus": [
    { src: `${C}/hamstrings.jpg`, label: "המסטרינג — Semitendinosus" },
    { src: `${C}/hamstrings-group.jpg`, label: "המסטרינג — מבט אחורי" },
  ],
  "muscles/semimembranosus": [
    { src: `${C}/hamstrings.jpg`, label: "המסטרינג — Semimembranosus" },
    { src: `${C}/hamstrings-group.jpg`, label: "המסטרינג — מבט אחורי" },
  ],
  "muscles/gastrocnemius": [
    { src: `${C}/gastrocnemius.jpg`, label: "Gastrocnemius" },
    { src: `${C}/triceps-surae.jpg`, label: "Gastrocnemius + Soleus" },
  ],
  "muscles/soleus": [
    { src: `${C}/soleus.jpg`, label: "Soleus" },
    { src: `${C}/triceps-surae.jpg`, label: "Gastrocnemius + Soleus" },
  ],
  "muscles/tibialis-anterior": [
    { src: `${C}/tibialis-anterior.jpg`, label: "Tibialis anterior" },
  ],
  "regions/hip": [
    { src: `${C}/iliopsoas.jpg`, label: "Iliopsoas" },
    { src: `${C}/gluteus-group.jpg`, label: "שרירי הישבן" },
    { src: `${C}/adductors.jpg`, label: "מקרבי הירך" },
  ],
  "regions/thigh": [
    { src: `${C}/quadriceps.jpg`, label: "ארבע-ראשי" },
    { src: `${C}/hamstrings.jpg`, label: "המסטרינג" },
  ],
  "regions/leg": [
    { src: `${C}/triceps-surae.jpg`, label: "תאומים וסוליה" },
    { src: `${C}/tibialis-anterior.jpg`, label: "שוקה קדמית" },
  ],
};

export function courseImages(kind: string, id: string): CourseImage[] {
  return COURSE_IMAGES[`${kind}/${id}`] ?? [];
}
