const diseases = ["السكري",
"ارتفاع ضغط الدم",
"الربو",
"السرطان",
"مرض الزهايمر",
"الاكتئاب",
"التهاب المفاصل",
"الصرع",
"التصلب المتعدد",
"التهاب الكبد",
"الصدفية",
"الملاريا",
"الفطريات",
"السل",
"التهاب الكلى",
"فيروس نقص المناعة البشرية",
"السكري النوع الثاني",
"النقرس",
"التهاب الجيوب الأنفية",
"التهاب اللثة",
"التهاب المرارة",
"التهاب الأمعاء",
"الصدفية",
"فيروس زيكا",
"التوحد",
"متلازمة داون",
"الهشاشة",
"التهاب الدماغ",
"الاضطراب الثنائي القطب",
"النوبات الصرعية",
"متلازمة التعب المزمن",
"التهاب القولون",
"فقر الدم",
"التهاب البنكرياس",
"الصداع النصفي",
"مرض الزهايمر",
"مرض باركنسون",
"متلازمة ما قبل الطمث",
"متلازمة تكيس المبايض",
"مرض الفيلقية",
"مرض القلاع",
"اضطراب فرط الحركة وفرط النشاط",
"الرنين الحركي",
"التهاب المثانة",
"اعتلال الأعصاب",
"اعتلال الشبكية",
"مرض اللينفومة الحاد",
"مرض الصفيحات الدموية",
"التهاب البروستاتا",
"التهاب العين",
"التهاب اللوزتين",
"التهاب اللوزتين",
"متلازمة التعب المزمن",
"التصلب اللويحي",
"اضطراب فرط الحركة وتشتت الانتباه",
"التصلب الجانبي الضموري",
"مرض كرون",
"متلازمة الأنف المائي",
"الاكتئاب الاكتئابي",
"مرض الكبد الدهني غير الكحولي",
"مرض باركنسون",
"التهاب الجيوب الأنفية",
"الصداع",
"التهاب المفاصل",
"التهاب الكبد الفيروسي",
"مرض الايدز",
"مرض السكري النوع الثاني",
"القلق",
"اعتلال الشبكية",
"اضطراب طيف التوحد",
"مرض القولون التقرحي",
"الصرع",
"متلازمة فرط الحركة النشطة",
"مرض الزهايمر",
"اعتلال الشبكية السكري",
"التصلب المتعدد",
"الاكتئاب الاكتئابي",
"فيروس نقص المناعة البشرية",
"التهاب البروستاتا",
"الصداع النصفي",
"التهاب اللثة",
"مرض باركنسون",
"التهاب الجيوب الأنفية",
"السرطان",
"اعتلال الأعصاب المحيطية",
"مرض الزهايمر",
"التصلب العصبي المتعدد",
"مرض القولون التقرحي",
"مرض السكري",
"اعتلال الشبكية السكري",
"متلازمة تكيس المبايض",
"الصداع",
"التهاب اللوزتين",
"متلازمة داون",
"الاضطراب الثنائي القطب",
"الربو",
"الصدفية",
"التهاب المعدة",
"الاضطرابات الهضمية",
"فقر الدم",];


const countries = [
    "الجزائر",
    "البحرين",
    "مصر",
    "العراق",
    "الأردن",
    "الكويت",
    "لبنان",
    "ليبيا",
    "المغرب",
    "عُمان",
    "فلسطين",
    "قطر",
    "السعودية",
    "السودان",
    "سوريا",
    "تونس",
    "الإمارات",
    "اليمن",
    "ألبانيا",
    "أندورا",
    "النمسا",
    "بيلاروس",
    "بلجيكا",
    "البوسنة والهرسك",
    "بلغاريا",
    "كرواتيا",
    "قبرص",
    "التشيك",
    "الدنمارك",
    "إستونيا",
    "فنلندا",
    "فرنسا",
    "ألمانيا",
    "اليونان",
    "المجر",
    "آيسلندا",
    "إيرلندا",
    "إيطاليا",
    "كوسوفو",
    "لاتفيا",
    "ليختنشتاين",
    "ليتوانيا",
    "لوكسمبورغ",
    "مقدونيا الشمالية",
    "مالطا",
    "مولدوفا",
    "موناكو",
    "الجبل الأسود",
    "هولندا",
    "النرويج",
    "بولندا",
    "البرتغال",
    "رومانيا",
    "روسيا",
    "سان مارينو",
    "صربيا",
    "سلوفاكيا",
    "سلوفينيا",
    "إسبانيا",
    "السويد",
    "سويسرا",
    "تركيا",
    "أوكرانيا",
    "المملكة المتحدة",
    "فاتيكان",
];


const vaccines = [
    "كوفيد-19",
    "الإنفلونزا",
    "الحصبة",
    "شلل الأطفال",
    "السعال الديكي",
    "الحصبة الألمانية",
    "التهاب الكبد الفيروسي",
    "الجدري",
    "الحصبة الألمانية",
    "التهاب الكبد الوبائي",
    "شلل الأطفال",
    "السعال الديكي",
    "الحصبة",
    "التهاب السحايا",
    "السعال الديكي",
    "الحصبة",
    "التهاب السحايا",
    "البلهارسيا",
    "الهوجة",
    "التهاب الكبد الفيروسي",
    "النكاف",
    "التهاب الكبد B",
    "الهوجة",
    "الكزاز",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الحصبة",
    "البلهارسيا",
    "التهاب الكبد B",
    "الكزاز",
    "الحصبة",
    "التهاب السحايا",
    "النكاف",
    "الكزاز",
    "التهاب الكبد B",
    "التهاب السحايا",
    "الهوجة",
    "الكزاز",
    "الحصبة",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "الحصبة",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "الحصبة",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "الحصبة",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "الحصبة",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "الحصبة",
    "التهاب السحايا",
    "النكاف",
    "الهوجة",
    "الكزاز",
    "التهاب السحايا",
];

module.exports = {diseases , countries , vaccines};