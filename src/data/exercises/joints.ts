import type { RegionId } from "@/data/exercises/content";

export type JointRow = {
  joint: string;
  action: string;
  agonist: string;
  synergist?: string;
  /** The joint is held, not moved. */
  still?: boolean;
};

export type JointPattern = {
  id: string;
  region: RegionId;
  he: string;
  en: string;
  when: string;
  rows: JointRow[];
  hold?: string;
  mistakes?: string[];
};

export const JOINT_PATTERNS: JointPattern[] = [
  {
    id: "squat-family",
    region: "legs",
    he: "סקוואט, מכרע ודד ליפט",
    en: "Squat, lunge, deadlift",
    when: "אותה טבלה בשלושתם. הרגל הקדמית עובדת במכרע. בסקוואט קדמי הגו זקוף יותר והדלתא הקדמית מייצבת.",
    rows: [
      { joint: "ירך", action: "פשיטת ירך", agonist: "Gluteus maximus", synergist: "Hamstrings" },
      { joint: "ברך", action: "פשיטת ברך", agonist: "Quadriceps" },
      { joint: "קרסול", action: "פלנטר פלקשן", agonist: "Gastrocnemius", synergist: "Soleus" },
      { joint: "עמוד שדרה", action: "פשיטת גו", agonist: "Erector spinae" },
    ],
    mistakes: [
      "סקוואט: הברך בורחת קדימה ואין תנועה של האגן.",
      "סקוואט: הגו נשפך קדימה. זרוע המשא על הגב גדלה והלחץ על הדיסק עולה.",
      "סקוואט: העקבים עולים. המסטרינג או הסולאוס קצרים ומפריעים לירידה.",
      "מעבר מ־60 ל־45: סיבוב אגן לאחור, הלורדוזה מושטחת, יותר עומס על הדיסק, ובברך זווית חדה עם רכיב פריקה.",
      "מכרע: צעד ארוך מדי. ברגל האחורית יש פשיטת ירך וכפיפת ברך, ו-Rectus femoris נכנס לאי ספיקה פסיבית.",
    ],
  },
  {
    id: "leg-press",
    region: "legs",
    he: "לחיצת רגליים",
    en: "Leg press",
    when: "בזווית אותם מפרקים כמו בסקוואט. בשכיבה התאומים והסולאוס יורדים מהטבלה.",
    rows: [
      { joint: "ירך", action: "פשיטת ירך", agonist: "Gluteus maximus", synergist: "Hamstrings" },
      { joint: "ברך", action: "פשיטת ברך", agonist: "Quadriceps" },
      { joint: "קרסול", action: "פלנטר פלקשן, רק בזווית", agonist: "Gastrocnemius", synergist: "Soleus" },
    ],
    mistakes: [
      "סיבוב אגן לאחור כשמקרבים את הברכיים לחזה.",
      "כפות נמוכות מדי מעמיסות את הברך ואת הפיקה. כפות גבוהות מאריכות את פושטי הירך.",
    ],
  },
  {
    id: "leg-extension",
    region: "legs",
    he: "פשיטת ברכיים",
    en: "Leg extension",
    when: "רק הברך זזה. שרשרת פתוחה, תרגיל פשוט.",
    rows: [{ joint: "ברך", action: "פשיטת ברך", agonist: "Quadriceps" }],
    mistakes: ["הרמת הישבן היא סיבוב אגן לאחור, והיא מאריכה את Rectus femoris."],
  },
  {
    id: "leg-curl",
    region: "legs",
    he: "כפיפת ברכיים ועל הברכיים",
    en: "Leg curl, Nordic",
    when: "רק הברך זזה. במכונה השרשרת פתוחה. על הברכיים הקרסול קבוע, שרשרת סגורה, והירך לא זזה.",
    rows: [
      { joint: "ברך", action: "כפיפת ברך", agonist: "Hamstrings", synergist: "Gastrocnemius" },
    ],
    mistakes: [
      "סיבוב אגן לפנים, כדי להאריך את ההמסטרינג. זו הרמאות.",
      "פלנטר פלקשן מקצר את התאומים עד אי ספיקה אקטיבית, והם כמעט לא עוזרים.",
    ],
  },
  {
    id: "hip-abd",
    region: "legs",
    he: "הרחקת ירך",
    en: "Hip abduction",
    when: "הרגל הרחוקה עובדת, עד כ־45 מעלות. הרגל העומדת מייצבת.",
    rows: [
      { joint: "ירך", action: "הרחקת ירך", agonist: "Gluteus medius", synergist: "Gluteus minimus" },
    ],
  },
  {
    id: "hip-add",
    region: "legs",
    he: "קירוב ירך",
    en: "Hip adduction",
    when: "הרגל הקרובה נמשכת אל הרגל העומדת.",
    rows: [{ joint: "ירך", action: "קירוב ירך", agonist: "Hip adductors" }],
  },
  {
    id: "hip-ext",
    region: "legs",
    he: "פשיטת ירך בפולי",
    en: "Cable hip extension",
    when: "גו מוטה. מעבר ל־10–20 מעלות של פשיטת יתר נכנסים פושטי הגו.",
    rows: [
      { joint: "ירך", action: "פשיטת ירך", agonist: "Gluteus maximus", synergist: "Hamstrings" },
    ],
    mistakes: [
      "הקשתת הגב. עוצרים לפני שפושטי הגו נכנסים.",
      "ברך ישרה משאירה את ההמסטרינג בעבודה. ברך כפופה מכניסה אותו לאי ספיקה אקטיבית, והעומס נשאר על הישבן.",
    ],
  },
  {
    id: "rdl",
    region: "legs",
    he: "דד ליפט רומני",
    en: "RDL",
    when: "הירך היא המפרק שעובד. המוט נשאר על הגוף. למתקדמים.",
    rows: [
      { joint: "ירך", action: "פשיטת ירך", agonist: "Gluteus maximus", synergist: "Hamstrings" },
      { joint: "עמוד שדרה", action: "פשיטת גו", agonist: "Erector spinae" },
    ],
    mistakes: [
      "רגליים נעולות ישר: ההמסטרינג באי ספיקה פסיבית, והמומנט על עמוד השדרה גדול.",
    ],
  },
  {
    id: "hip-thrust",
    region: "legs",
    he: "היפ טראסט",
    en: "Hip thrust",
    when: "הברכיים נשארות ב־90 כל הדרך. מתאים לכיווץ איזומטרי בשיא.",
    rows: [
      { joint: "ירך", action: "פשיטת ירך", agonist: "Gluteus maximus", synergist: "Hamstrings" },
      { joint: "עמוד שדרה", action: "פשיטת גו", agonist: "Erector spinae" },
    ],
    mistakes: [
      "יישור הברכיים מוציא את ההמסטרינג מאי ספיקה אקטיבית, והוא מתחיל לעזור לישבן.",
    ],
  },
  {
    id: "calf-stand",
    region: "legs",
    he: "הרמת עקבים בעמידה",
    en: "Standing calf raise",
    when: "רק הקרסול. ברך ישרה. סמיט, מכונה או משקולת אחת, על מדרגה.",
    rows: [
      { joint: "קרסול", action: "פלנטר פלקשן", agonist: "Gastrocnemius", synergist: "Soleus" },
    ],
    mistakes: ["מוט חופשי. ובלי מדרגה אין טווח לעקב."],
  },
  {
    id: "calf-sit",
    region: "legs",
    he: "הרמת עקבים בישיבה",
    en: "Seated calf raise",
    when: "רק הקרסול. הברך כפופה ולא זזה.",
    rows: [
      { joint: "קרסול", action: "פלנטר פלקשן", agonist: "Soleus", synergist: "Gastrocnemius" },
    ],
    mistakes: [
      "כפיפת הברך יחד עם עליית העקב מכניסה את התאומים לאי ספיקה אקטיבית. אם מיישרים ברך, הם חוזרים להיות האגוניסט.",
    ],
  },
  {
    id: "bench",
    region: "chest",
    he: "לחיצת חזה",
    en: "Bench press",
    when: "שלושה מפרקים. בכתף קירוב אופקי. האנטגוניסט בכתף הוא Posterior deltoid.",
    rows: [
      {
        joint: "כתף",
        action: "קירוב אופקי",
        agonist: "Pectoralis major",
        synergist: "Anterior deltoid, Coracobrachialis, short head of biceps",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
      { joint: "מרפק", action: "פשיטת מרפק", agonist: "Triceps" },
    ],
    mistakes: ["הרמת אגן היא סיבוב אגן לפנים, והלט נכנס כסינרגיסט."],
  },
  {
    id: "incline",
    region: "chest",
    he: "לחיצה ופרפר בשיפוע",
    en: "Incline press and fly",
    when: "ספסל 40–45 מעלות. התנועה בין כפיפת כתף לקירוב אופקי. בפרפר המרפק לא מתיישר.",
    rows: [
      {
        joint: "כתף",
        action: "בין כפיפה לקירוב אופקי",
        agonist: "Upper pectoralis",
        synergist: "Anterior deltoid, Coracobrachialis, short head of biceps",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
      { joint: "מרפק", action: "פשיטה בלחיצה, כפיפה סטטית בפרפר", agonist: "Triceps בלחיצה", synergist: "Biceps בפרפר, סטטי" },
    ],
  },
  {
    id: "decline",
    region: "chest",
    he: "חזה תחתון ומקבילים רחבים",
    en: "Decline, wide dips",
    when: "בין קירוב אופקי לקירוב. הלט נכנס, ולכן אפשר להרים יותר. במקבילים רחבים הגוף מוטה, הישבן לאחור והמרפקים החוצה.",
    rows: [
      {
        joint: "כתף",
        action: "בין קירוב אופקי לקירוב",
        agonist: "Lower pectoralis",
        synergist: "Anterior deltoid, Coracobrachialis, short head of biceps, Latissimus dorsi",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
      { joint: "מרפק", action: "פשיטת מרפק", agonist: "Triceps" },
    ],
  },
  {
    id: "fly",
    region: "chest",
    he: "פרפר",
    en: "Fly",
    when: "תרגיל פשוט. המרפק נשאר כפוף ולא זז.",
    rows: [
      {
        joint: "כתף",
        action: "קירוב אופקי",
        agonist: "Pectoralis major",
        synergist: "Anterior deltoid, Coracobrachialis, short head of biceps",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
      {
        joint: "מרפק",
        action: "כפיפה, בלי תנועה",
        agonist: "Biceps brachii",
        synergist: "Brachialis, Brachioradialis",
        still: true,
      },
    ],
    mistakes: ["יישור המרפקים מאריך את זרוע המשא והתרגיל נהיה לחיצה."],
  },
  {
    id: "crossover",
    region: "chest",
    he: "קרוסאובר מלמעלה",
    en: "High cable crossover",
    when: "חזה תחתון. המרפק גבוה מכף היד. הגו נשאר ניטרלי.",
    rows: [
      {
        joint: "כתף",
        action: "בין קירוב לקירוב אופקי",
        agonist: "Lower pectoralis",
        synergist: "Anterior deltoid, Coracobrachialis, short head of biceps, Latissimus dorsi",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
      {
        joint: "מרפק",
        action: "כפיפה, בלי תנועה",
        agonist: "Biceps brachii",
        synergist: "Brachialis, Brachioradialis",
        still: true,
      },
    ],
    hold: "מייצבים: שרשרת קדמית, הבטן וכופפי הירך.",
  },
  {
    id: "pulldown-narrow",
    region: "back",
    he: "משיכה צרה ועליות מתח צרות",
    en: "Narrow pulldown, chin-up",
    when: "אחיזה צרה לסנטר היא פשיטת כתף. סופינציה קלה יותר: הלט מאורך והדו ראשי חזק יותר.",
    rows: [
      {
        joint: "כתף",
        action: "פשיטת כתף",
        agonist: "Latissimus dorsi",
        synergist: "Teres major, Posterior deltoid, Lower pectoralis, long head of triceps",
      },
      { joint: "שכמה", action: "קירוב שכמות", agonist: "Trapezius", synergist: "Rhomboids" },
      {
        joint: "מרפק",
        action: "כפיפת מרפק",
        agonist: "סופינציה או מיד: Biceps. פרונציה: Brachialis",
        synergist: "Brachialis או Biceps, ו-Brachioradialis",
      },
    ],
  },
  {
    id: "pulldown-wide",
    region: "back",
    he: "משיכה רחבה",
    en: "Wide pulldown",
    when: "אחיזה רחבה לחזה היא קירוב כתף. אותו דבר לעורף. קשה יותר מכנית, וזרוע המשא גדולה יותר.",
    rows: [
      {
        joint: "כתף",
        action: "קירוב כתף",
        agonist: "Latissimus dorsi",
        synergist: "Teres major, Posterior deltoid, Lower pectoralis, long head of triceps, Coracobrachialis",
      },
      { joint: "שכמה", action: "קירוב שכמות", agonist: "Trapezius", synergist: "Rhomboids" },
      {
        joint: "מרפק",
        action: "כפיפת מרפק",
        agonist: "Biceps brachii",
        synergist: "Brachialis, Brachioradialis",
      },
    ],
    mistakes: [
      "משיכת הזרועות קדימה מכניסה את החזה. רוטציה חיצונית בכתף מונעת את זה. באחיזה רחבה האנטגוניסטים הם מרחיקי הכתף.",
      "הטיית הגב לאחור הופכת את התרגיל לחתירה אופקית, ו-Posterior deltoid נעשה עיקרי במקום הלט.",
    ],
  },
  {
    id: "pullover",
    region: "back",
    he: "פולאובר",
    en: "Pullover",
    when: "התרגיל הפשוט של הלט. עד שהידיים אנכיות, לא מעבר.",
    rows: [
      {
        joint: "כתף",
        action: "פשיטת כתף",
        agonist: "Latissimus dorsi",
        synergist: "Teres major, Posterior deltoid, Lower pectoralis, long head of triceps",
      },
      { joint: "שכמה", action: "קירוב שכמות", agonist: "Trapezius", synergist: "Rhomboids" },
    ],
    hold: "מייצבים: הבטן, נגד הקשתה וסיבוב אגן לפנים. פושטי המרפק מחזיקים את המרפק.",
    mistakes: ["מעבר לקו האנכי מכניס את כופפי הכתף לעבודה אקסצנטרית."],
  },
  {
    id: "row",
    region: "back",
    he: "חתירה",
    en: "Row",
    when: "אחיזה צרה היא פשיטת כתף, כמו משיכה צרה. המרפקים צמודים והתנועה יוצאת מהכתף.",
    rows: [
      {
        joint: "כתף",
        action: "פשיטת כתף",
        agonist: "Latissimus dorsi",
        synergist: "Teres major, Posterior deltoid, Lower pectoralis, long head of triceps",
      },
      { joint: "שכמה", action: "קירוב שכמות", agonist: "Trapezius", synergist: "Rhomboids" },
      {
        joint: "מרפק",
        action: "כפיפת מרפק",
        agonist: "סופינציה או מיד: Biceps. פרונציה: Brachialis",
        synergist: "Brachialis או Biceps, ו-Brachioradialis",
      },
    ],
    hold: "בחתירה בישיבה מייצבים השרשרת האחורית: זוקפי הגב, Gluteus maximus וההמסטרינג.",
    mistakes: [
      "חתירה ביד אחת, שלוש שמדגימים: גב מעוגל. מרפק לא צמוד לגוף. היד התומכת מתחת לכתף במקום צמודה לברך.",
      "התנועה יוצאת מהמרפק ולא מהכתף.",
      "המרפק עובר הרבה את קו הגו, ו-Posterior deltoid נעשה דומיננטי.",
      "ב-T-bar אחיזה רחבה מעבירה את העבודה לדלתא האחורית. צרה נשארת על הלט.",
    ],
  },
  {
    id: "shrug",
    region: "shoulders",
    he: "הרמת שכמות",
    en: "Shrug",
    when: "רק מפרק השכמה. ההתנגדות מלמטה. המרפקים לא זזים.",
    rows: [
      { joint: "שכמה", action: "הרמת שכמות", agonist: "Upper trapezius", synergist: "Rhomboids" },
    ],
  },
  {
    id: "retract",
    region: "shoulders",
    he: "קירוב שכמות",
    en: "Prone retraction",
    when: "שכיבה. התרגיל המבודד. בלי כפיפת מרפק.",
    rows: [
      { joint: "שכמה", action: "קירוב שכמות", agonist: "Trapezius", synergist: "Rhomboids" },
    ],
    mistakes: ["משיכה במרפק הופכת את התרגיל לחתירה."],
  },
  {
    id: "abduction",
    region: "shoulders",
    he: "הרחקת כתף ולחיצה רחבה",
    en: "Lateral raise, wide press",
    when: "עד 120 מעלות הדלתא בשיא. מעבר לזה השכמה עובדת חזק יותר, עד 180. בלחיצה הרחבה המרפק מתיישר.",
    rows: [
      {
        joint: "כתף",
        action: "הרחקת כתף",
        agonist: "Middle deltoid",
        synergist: "Supraspinatus, Anterior deltoid, Posterior deltoid",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
      {
        joint: "מרפק",
        action: "בהרחקה בלי תנועה, בלחיצה פשיטה",
        agonist: "Triceps",
      },
    ],
    mistakes: [
      "הרחקה במכונה עם סיבוב פנימה פחות מומלצת. יש צביטה מתחת לאקרומיון.",
      "באחיזה חיצונית Posterior deltoid נהיה אנטגוניסט, ו-Anterior עוזר.",
    ],
  },
  {
    id: "upright",
    region: "shoulders",
    he: "חתירה ישרה",
    en: "Upright row",
    when: "אחיזה צרה מרוחב הכתפיים, המוט על הגוף עד הסנטר, מרפקים למעלה. סיבוב פנימי.",
    rows: [
      {
        joint: "כתף",
        action: "הרחקת כתף",
        agonist: "Middle deltoid",
        synergist: "Supraspinatus, Anterior and posterior deltoid",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
      {
        joint: "מרפק",
        action: "כפיפת מרפק",
        agonist: "Biceps brachii",
        synergist: "Brachialis, Brachioradialis",
      },
    ],
    hold: "מייצבים: זוקפי הגו ופושטי הירך.",
    mistakes: [
      "עמידה רחוק מפולי תחתון מקרבת את התנועה לפשיטה או להרחקה אופקית, ומוסיפה מומנט על הגב.",
    ],
  },
  {
    id: "reverse",
    region: "shoulders",
    he: "פרפר הפוך וחתירה אופקית",
    en: "Reverse fly, face pull",
    when: "פרונציה מבודדת את הדלתא האחורית. בחתירה האופקית המרפק גם נכפף, וזה כבר מורכב.",
    rows: [
      {
        joint: "כתף",
        action: "הרחקה אופקית",
        agonist: "Posterior deltoid",
        synergist: "Teres minor, Infraspinatus",
      },
      { joint: "שכמה", action: "קירוב שכמות", agonist: "Trapezius", synergist: "Rhomboids" },
      {
        joint: "מרפק",
        action: "כפיפה רק בחתירה האופקית",
        agonist: "Biceps brachii",
        synergist: "Brachialis, Brachioradialis",
      },
    ],
  },
  {
    id: "front-raise",
    region: "shoulders",
    he: "כפיפת כתף",
    en: "Front raise",
    when: "תרגיל פשוט, ישיבה בשיפוע של כ־60 מעלות. בעמידה העומס יוצא משטח הבסיס ועולה על הגב.",
    rows: [
      {
        joint: "כתף",
        action: "כפיפת כתף",
        agonist: "Anterior deltoid",
        synergist: "Upper pectoralis, Coracobrachialis",
      },
      {
        joint: "שכמה",
        action: "הרחקה ורוטציה למעלה",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
    ],
    mistakes: ["סיבוב פנימה מכניס את Middle deltoid כסינרגיסט. בלי הסיבוב הוא לא אמור לעזור."],
  },
  {
    id: "narrow-press",
    region: "arms",
    he: "אחיזה צרה: כתפיים, חזה, מקבילים",
    en: "Close-grip press and dips",
    when: "הדגש עובר לטרייספס, והכתף בכפיפה. אחיזה רחבה במקבילים חוזרת לחזה התחתון.",
    rows: [
      { joint: "מרפק", action: "פשיטת מרפק", agonist: "Triceps" },
      {
        joint: "כתף",
        action: "כפיפת כתף",
        agonist: "Anterior deltoid",
        synergist: "Pectoralis major, Coracobrachialis",
      },
      {
        joint: "שכמה",
        action: "הרחקה, בלחיצה ובמקבילים עד קו הגוף",
        agonist: "Serratus anterior",
        synergist: "Upper and lower trapezius",
      },
    ],
    mistakes: [
      "במקבילים צרים המרפקים בורחים החוצה והגוף נשפך לפנים, והתרגיל חוזר לחזה.",
      "בלחיצה צרה האמה לא נשארת אנכית.",
    ],
  },
  {
    id: "french",
    region: "arms",
    he: "פשיטת מרפק",
    en: "French press, pressdown, kickback",
    when: "רק המרפק זז. בצרפתית הדגש על הראש הארוך, והמומנט הכי גדול כשהאמה מקבילה לרצפה.",
    rows: [{ joint: "מרפק", action: "פשיטת מרפק", agonist: "Triceps" }],
    hold: "מייצבים נגד כפיפת כתף: Latissimus dorsi, Teres major, Lower pectoralis, Posterior deltoid. בשכיבה גם הבטן. עם הגב לפולי מייצבת השרשרת הקדמית.",
    mistakes: [
      "המרפקים בורחים מהגוף או הכתף זזה, ופושטי הכתף עושים את העבודה במקום הטרייספס.",
      "בלחיצה מלמעלה עומדים רחוק מהפולי. הטווח קטן ונוסף מומנט על הגב.",
      "פשיטה מאחורי הראש עם בטן חלשה: הגו לא נשאר יציב.",
    ],
  },
  {
    id: "curl",
    region: "arms",
    he: "כפיפת מרפק",
    en: "Curl",
    when: "האגוניסט לפי כף היד. מיד הוא המנח שבו הכי נוח להרים. בפרונציה מפתחים בערך 25% פחות כוח.",
    rows: [
      {
        joint: "מרפק",
        action: "כפיפת מרפק",
        agonist: "סופינציה או מיד: Biceps. פרונציה: Brachialis",
        synergist: "Brachialis, Brachioradialis, או Biceps בפרונציה",
      },
    ],
    hold: "מייצבים בעמידה: Erector spinae, Gluteus maximus וההמסטרינג.",
    mistakes: [
      "כפיפה קלה בברכיים לא מורידה עומס מהגב. ליציבות עומדים בפיסוק, צעד לפנים.",
      "הרמת המרפקים בשיא. הדו ראשי כבר מקוצר לגמרי ולא עוזר לכפיפת הכתף.",
      "תנופה. היא מקלה דווקא איפה שזווית היישום שטוחה והתרגיל קשה.",
    ],
  },
  {
    id: "crunch",
    region: "core",
    he: "כפיפת בטן",
    en: "Crunch",
    when: "רק עמוד השדרה. לא הירך. שומרים מרווח בין הסנטר לצוואר כדי לא לכופף את הצוואר.",
    rows: [
      {
        joint: "עמוד שדרה",
        action: "כפיפת גו",
        agonist: "Rectus abdominis",
        synergist: "Internal and external oblique, Transversus abdominis",
      },
    ],
    mistakes: [
      "כפיפת ירך מחזקת את Iliopsoas, לא את הבטן.",
      "הצמדת הסנטר לחזה מכופפת את הצוואר במקום את הגו.",
    ],
  },
  {
    id: "oblique",
    region: "core",
    he: "אלכסונים",
    en: "Obliques",
    when: "הזוג מתחלף לפי הכיוון. כפיפה צידית היא שניהם של אותו צד.",
    rows: [
      {
        joint: "עמוד שדרה",
        action: "כפיפה אלכסונית לשמאל",
        agonist: "Internal שמאל",
        synergist: "External ימין",
      },
      {
        joint: "עמוד שדרה",
        action: "רוטציה ימינה בישיבה",
        agonist: "Internal ימין",
        synergist: "External שמאל",
      },
      {
        joint: "עמוד שדרה",
        action: "כפיפה צידית",
        agonist: "Internal ו-External של אותו צד",
      },
    ],
  },
  {
    id: "erector",
    region: "core",
    he: "ספסל רומי ופשיטת גב",
    en: "Back extension",
    when: "מיקום הכרית מחליף את המפרק שעובד.",
    rows: [
      { joint: "עמוד שדרה", action: "כרית מעל מפרק הירך: פשיטת גו", agonist: "Erector spinae" },
      {
        joint: "ירך",
        action: "כרית מתחת לאגן: פשיטת ירך, והגו סטטי",
        agonist: "Gluteus maximus",
        synergist: "Hamstrings",
      },
    ],
    mistakes: ["כרית במקום הלא נכון. מעל הירך עובד הגב, מתחת לאגן עובדת הירך."],
  },
  {
    id: "hang",
    region: "core",
    he: "הרמת אגן בתלייה",
    en: "Hanging pelvic raise",
    when: "מתחילים עם ירך שכבר כפופה, כדי ש-Iliopsoas יהיה מקוצר.",
    rows: [
      {
        joint: "אגן",
        action: "סיבוב אגן לאחור",
        agonist: "כופפי עמוד השדרה",
        synergist: "Rectus abdominis והאלכסונים",
      },
    ],
    mistakes: ["פתיחה מירך ישרה נותנת את התנועה ל-Iliopsoas במקום לבטן."],
  },
];
