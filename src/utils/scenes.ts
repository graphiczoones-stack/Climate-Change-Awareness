// Scene definitions: each scene maps a scroll range [start, end] on 0→1 scale
export interface SceneDef {
  id: string;
  label: string;         // Arabic chapter title
  scrollStart: number;   // 0 → 1
  scrollEnd: number;
  accentColor: string;
  bgGradient: string;
}

export const SCENES: SceneDef[] = [
  {
    id: 'landing',
    label: 'البداية',
    scrollStart: 0,
    scrollEnd: 0.05,
    accentColor: '#4FC3F7',
    bgGradient: 'radial-gradient(ellipse at center, #0a0a1a 0%, #050505 100%)',
  },
  {
    id: 'nature',
    label: 'توازن الطبيعة',
    scrollStart: 0.05,
    scrollEnd: 0.15,
    accentColor: '#00B48A',
    bgGradient: 'radial-gradient(ellipse at center, #051a0e 0%, #050505 100%)',
  },
  {
    id: 'development',
    label: 'التطور البشري',
    scrollStart: 0.15,
    scrollEnd: 0.28,
    accentColor: '#FFB347',
    bgGradient: 'radial-gradient(ellipse at center, #1a1005 0%, #050505 100%)',
  },
  {
    id: 'pollution',
    label: 'التلوث',
    scrollStart: 0.28,
    scrollEnd: 0.40,
    accentColor: '#FF4500',
    bgGradient: 'radial-gradient(ellipse at center, #1a0500 0%, #050505 100%)',
  },
  {
    id: 'greenhouse',
    label: 'الاحتباس الحراري',
    scrollStart: 0.40,
    scrollEnd: 0.52,
    accentColor: '#FF6B35',
    bgGradient: 'radial-gradient(ellipse at center, #150800 0%, #050505 100%)',
  },
  {
    id: 'warming',
    label: 'ارتفاع الحرارة',
    scrollStart: 0.52,
    scrollEnd: 0.62,
    accentColor: '#FF2200',
    bgGradient: 'radial-gradient(ellipse at center, #1a0200 0%, #050505 100%)',
  },
  {
    id: 'ice',
    label: 'ذوبان الجليد',
    scrollStart: 0.62,
    scrollEnd: 0.70,
    accentColor: '#89D4F5',
    bgGradient: 'radial-gradient(ellipse at center, #00101a 0%, #050505 100%)',
  },
  {
    id: 'wildfire',
    label: 'الحرائق والجفاف',
    scrollStart: 0.70,
    scrollEnd: 0.78,
    accentColor: '#FF4500',
    bgGradient: 'radial-gradient(ellipse at center, #1a0800 0%, #050505 100%)',
  },
  {
    id: 'flood',
    label: 'الفيضانات والعواصف',
    scrollStart: 0.78,
    scrollEnd: 0.85,
    accentColor: '#1E90FF',
    bgGradient: 'radial-gradient(ellipse at center, #000a1a 0%, #050505 100%)',
  },
  {
    id: 'wildlife',
    label: 'الحياة البرية',
    scrollStart: 0.85,
    scrollEnd: 0.90,
    accentColor: '#9B8FFF',
    bgGradient: 'radial-gradient(ellipse at center, #05001a 0%, #050505 100%)',
  },
  {
    id: 'solutions',
    label: 'الحلول',
    scrollStart: 0.90,
    scrollEnd: 0.96,
    accentColor: '#00B48A',
    bgGradient: 'radial-gradient(ellipse at center, #001a0e 0%, #050505 100%)',
  },
  {
    id: 'cta',
    label: 'نحن الحل',
    scrollStart: 0.96,
    scrollEnd: 1.0,
    accentColor: '#00E5AD',
    bgGradient: 'radial-gradient(ellipse at center, #001a0e 0%, #050505 100%)',
  },
];

// Total scroll height in vh units (the longer this is, the slower the story unfolds)
export const TOTAL_SCROLL_HEIGHT = 1200; // vh

// Scene narrative content (Arabic)
export const SCENE_CONTENT: Record<string, {
  title: string;
  subtitle?: string;
  body: string;
  chapter: number;
}> = {
  landing: {
    chapter: 0,
    title: 'الأرض في خطر',
    subtitle: 'رحلة بصرية في قلب تغيُّر المناخ',
    body: '',
  },
  nature: {
    chapter: 1,
    title: 'ده كوكبنا',
    subtitle: 'البيت اللي عايشين فيه كلنا',
    body: 'على مدار ملايين السنين، الطبيعة كانت ماشية بتوازنها الطبيعي. الغابات بتكبر، والمحيطات مليانة حياة، والجو مستقر.',
  },
  development: {
    chapter: 2,
    title: 'الإنسان بدأ يطوّر حياته',
    subtitle: 'بنينا مدن أكبر وشغلنا مصانع أكتر',
    body: 'بنينا مدن أكبر. وشغلنا مصانع أكتر. وصنعنا ملايين العربيات. واستخدمنا طاقة أكتر من أي وقت فات. وكل ده كان شكله تطور... لكن كان ليه تمن.',
  },
  pollution: {
    chapter: 3,
    title: 'التلوث والانبعاثات',
    subtitle: 'الغازات الدفيئة تحبس الحرارة',
    body: 'الغازات المسببة لظاهرة الاحتباس الحراري زي ثاني أكسيد الكربون والميثان بتتراكم في الغلاف الجوي وبتمنع الحرارة من الخروج.',
  },
  greenhouse: {
    chapter: 4,
    title: 'ظاهرة الاحتباس الحراري',
    subtitle: 'الغلاف الجوي محاصر الحرارة',
    body: 'الشمس بتبعت أشعتها للأرض، لكن الغازات الدفيئة بتمنع الحرارة من الفرار مرة تانية. النتيجة؟ الأرض بتسخن أكتر وأكتر.',
  },
  warming: {
    chapter: 5,
    title: 'درجة الحرارة بترتفع',
    subtitle: 'أرقام قياسية سنة ورا سنة',
    body: 'في السنين الأخيرة، درجة حرارة الأرض بدأت تزيد بشكل واضح. والعلماء بقوا يسجلوا أرقام قياسية سنة ورا سنة.',
  },
  ice: {
    chapter: 6,
    title: 'الجليد بيذوب',
    subtitle: 'ارتفاع مستوى البحار والمحيطات',
    body: 'الجليد بدأ يدوب في أماكن كتير حوالين العالم. وده بيخلي مستوى البحار يرتفع، وبيهدد المدن الساحلية.',
  },
  wildfire: {
    chapter: 7,
    title: 'الحرائق والجفاف',
    subtitle: 'الأرض محترقة من الجوع والعطش',
    body: 'الموجات الحارة بتتكرر أكتر. الجفاف بيضرب مناطق أوسع. والحرائق بتستعر في الغابات والحقول.',
  },
  flood: {
    chapter: 8,
    title: 'الفيضانات والعواصف',
    subtitle: 'الطبيعة في حالة غضب',
    body: 'العواصف بتزيد في حدتها وتكرارها. الفيضانات بتغرق مدن كاملة. والبشر بيدفعوا الثمن.',
  },
  wildlife: {
    chapter: 9,
    title: 'الحياة البرية في خطر',
    subtitle: 'الحيوانات بتفقد بيوتها',
    body: 'التغير المناخي بيهدد مئات الآلاف من الأنواع بالانقراض. الحيوانات بتهاجر بحثاً عن بيئات أنسب.',
  },
  solutions: {
    chapter: 10,
    title: 'الحلول موجودة',
    subtitle: 'الطاقة النظيفة والمستقبل الأخضر',
    body: 'الطاقة الشمسية، وطاقة الرياح، وزراعة الأشجار، وترشيد الاستهلاك. كل ده بيساعد. ولو اشتغلنا مع بعض، هنقدر نغيّر.',
  },
  cta: {
    chapter: 11,
    title: 'نحن الحل',
    subtitle: 'معاً نستطيع حماية كوكبنا',
    body: 'التغيير مش بس مسؤولية الحكومات والشركات. ده مسؤوليتنا كلنا. كل قرار صغير بيحسب. ابدأ النهارده.',
  },
};
