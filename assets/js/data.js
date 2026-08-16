/*
 * First Ex — Real Estate Investment & Development
 * Bilingual content source. All site copy lives here so that non-technical
 * editors can update the website without touching markup or styles.
 *
 * Sources:
 *  - Company profile deck (First_Ex_Editable_Profile_V5)
 *  - Commercial Registration certificate (Unified National Number 7011647117)
 */

const COMPANY = {
  phone: '0114880122',
  phoneDisplay: '011 488 0122',
  phoneIntl: '+966114880122',
  email: 'Info@firstex.estate',
  cr: {
    unifiedNumber: '7011647117',
    issueDate: '03/11/2001',
    entityTypeEn: 'Establishment',
    entityTypeAr: 'مؤسسة',
    statusEn: 'Active',
    statusAr: 'نشط',
    legalNameEn: 'The First Ex Real Estate Development & Investment Est.',
    legalNameAr: 'مؤسسة ذا فيرست إكس للتطوير والاستثمار العقاري'
  }
};

/* ------------------------------------------------------------------ */
/* Portfolio concepts                                                   */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: 'first-ex-tower',
    art: 'tower',
    category: 'commercial',
    areaValue: 48000,
    en: {
      name: 'First Ex Tower',
      location: 'Riyadh',
      summary:
        'A premium commercial landmark in Riyadh, combining business offices, retail spaces and high-end services.',
      detail:
        'Positioned on a strategic Riyadh corridor, First Ex Tower is conceived as a modern business destination: grade-A office floors above an active retail podium, with concierge services, structured parking and a signature double-height lobby.',
      area: '48,000 m²',
      scope: '18 Floors',
      type: 'Commercial Tower',
      highlights: ['Grade-A office floors', 'Retail podium', 'Structured parking']
    },
    ar: {
      name: 'برج فيرست إكس',
      location: 'الرياض',
      summary: 'برج تجاري فاخر في موقع استراتيجي داخل الرياض، مصمم ليكون وجهة أعمال حديثة تجمع بين المكاتب الفاخرة والخدمات التجارية.',
      detail:
        'يقع البرج على أحد المحاور الاستراتيجية في مدينة الرياض، ويضم أدواراً مكتبية من الفئة الأولى فوق قاعدة تجارية نشطة، مع خدمات استقبال ومواقف منظمة وبهو رئيسي بارتفاع مزدوج.',
      area: '٤٨٬٠٠٠ م²',
      scope: '١٨ دوراً',
      type: 'برج تجاري',
      highlights: ['مكاتب من الفئة الأولى', 'قاعدة تجارية', 'مواقف منظمة']
    }
  },
  {
    id: 'fe-residence',
    art: 'residence',
    category: 'residential',
    areaValue: 65000,
    en: {
      name: 'FE Residence',
      location: 'North Riyadh',
      summary:
        'A luxury residential villa compound designed for families seeking privacy, comfort and premium living.',
      detail:
        'A gated family community in North Riyadh built around landscaped spines and shaded walkways. Villa typologies are arranged to maximise privacy, while a central amenity hub carries the clubhouse, gym and children’s areas.',
      area: '65,000 m²',
      scope: '80 Villas',
      type: 'Residential Compound',
      highlights: ['Gated community', 'Landscaped green spaces', 'Clubhouse & amenities']
    },
    ar: {
      name: 'إف إي ريزيدنس',
      location: 'شمال الرياض',
      summary: 'مجمع سكني فاخر يضم فللاً ووحدات عائلية بتصميم حديث ومساحات خضراء ومرافق مجتمعية متكاملة.',
      detail:
        'مجتمع سكني مغلق في شمال الرياض يتمحور حول ممرات خضراء ومسارات مظللة، مع توزيع للفلل يراعي الخصوصية، ومركز خدمات مركزي يضم النادي والصالة الرياضية ومناطق الأطفال.',
      area: '٦٥٬٠٠٠ م²',
      scope: '٨٠ فيلا',
      type: 'مجمع سكني',
      highlights: ['مجتمع مغلق', 'مساحات خضراء', 'نادٍ ومرافق مجتمعية']
    }
  },
  {
    id: 'fe-district',
    art: 'district',
    category: 'mixed',
    areaValue: 120000,
    en: {
      name: 'FE District',
      location: 'Riyadh',
      summary: 'A mixed-use district combining residential, retail, offices and lifestyle facilities.',
      detail:
        'The flagship concept of the portfolio: a walkable urban district where residential blocks, workplaces and daily-need retail share one public realm. Phased delivery allows early revenue while later plots mature.',
      area: '120,000 m²',
      scope: 'Mixed Use',
      type: 'Urban District',
      highlights: ['Walkable public realm', 'Phased delivery', 'Daily-need retail']
    },
    ar: {
      name: 'حي فيرست إكس المتكامل',
      location: 'الرياض',
      summary: 'وجهة متعددة الاستخدامات تجمع بين السكن والتجزئة والمكاتب والخدمات اليومية ضمن بيئة عمرانية عصرية.',
      detail:
        'المشروع الأبرز في المحفظة: حي عمراني قابل للمشي تتشارك فيه الوحدات السكنية ومساحات العمل ومحلات الخدمات اليومية نطاقاً عاماً واحداً، مع تسليم على مراحل يتيح تحقيق عوائد مبكرة.',
      area: '١٢٠٬٠٠٠ م²',
      scope: 'متعدد الاستخدامات',
      type: 'حي عمراني',
      highlights: ['نطاق عام قابل للمشي', 'تنفيذ على مراحل', 'خدمات يومية']
    }
  },
  {
    id: 'fe-waterfront',
    art: 'waterfront',
    category: 'residential',
    areaValue: 55000,
    en: {
      name: 'FE Waterfront',
      location: 'Jeddah',
      summary: 'A sea-view residential concept with premium apartments and urban lifestyle services.',
      detail:
        'An address on the Jeddah seafront: stepped residential massing that opens every level toward the water, with a ground-level promenade of cafés, wellness and lifestyle services.',
      area: '55,000 m²',
      scope: '220 Units',
      type: 'Waterfront Living',
      highlights: ['Sea-view apartments', 'Ground-level promenade', 'Lifestyle services']
    },
    ar: {
      name: 'واجهة فيرست إكس',
      location: 'جدة',
      summary: 'مشروع سكني بإطلالات بحرية مصمم للشقق الفاخرة والخدمات الراقية على واجهة حضرية جذابة.',
      detail:
        'عنوان سكني على واجهة جدة البحرية، بكتل متدرجة تفتح جميع الأدوار على البحر، مع ممشى أرضي يضم المقاهي وخدمات العافية وأنماط الحياة.',
      area: '٥٥٬٠٠٠ م²',
      scope: '٢٢٠ وحدة',
      type: 'سكن على الواجهة البحرية',
      highlights: ['شقق بإطلالات بحرية', 'ممشى أرضي', 'خدمات راقية']
    }
  },
  {
    id: 'dammam-business-park',
    art: 'business',
    category: 'commercial',
    areaValue: 75000,
    en: {
      name: 'Dammam Business Park',
      location: 'Dammam',
      summary: 'A commercial business park serving the Eastern Province with modern offices and retail spaces.',
      detail:
        'A low-rise business campus for the Eastern Province, planned for corporate tenants who need flexible floorplates, logistics access and long-term lease stability.',
      area: '75,000 m²',
      scope: 'Business Campus',
      type: 'Business Park',
      highlights: ['Flexible floorplates', 'Corporate tenants', 'Long-term leases']
    },
    ar: {
      name: 'مركز الأعمال — الدمام',
      location: 'الدمام',
      summary: 'مجمع أعمال وتجاري في المنطقة الشرقية يركز على المكاتب والخدمات التجارية والاستثمار طويل الأجل.',
      detail:
        'مجمع أعمال منخفض الارتفاع في المنطقة الشرقية، مخطط للمستأجرين من الشركات الذين يحتاجون مساحات مرنة وسهولة وصول لوجستي واستقراراً في عقود الإيجار طويلة الأجل.',
      area: '٧٥٬٠٠٠ م²',
      scope: 'مجمع أعمال',
      type: 'مركز أعمال',
      highlights: ['مساحات مرنة', 'مستأجرون من الشركات', 'عقود طويلة الأجل']
    }
  },
  {
    id: 'fe-avenue',
    art: 'avenue',
    category: 'retail',
    areaValue: 32000,
    en: {
      name: 'FE Avenue',
      location: 'Riyadh',
      summary: 'A premium retail and lifestyle avenue for restaurants, cafés, showrooms and services.',
      detail:
        'An open-air retail street tuned for F&B and showroom brands, with generous frontages, shaded outdoor seating and an evening-first lighting concept.',
      area: '32,000 m²',
      scope: 'Retail & F&B',
      type: 'Retail Destination',
      highlights: ['Open-air street', 'F&B terraces', 'Showroom frontages']
    },
    ar: {
      name: 'إف إي أفنيو',
      location: 'الرياض',
      summary: 'وجهة تجارية راقية تجمع بين المطاعم والمقاهي والتجزئة والخدمات ضمن تصميم حضري فاخر.',
      detail:
        'شارع تجاري مفتوح مصمم لعلامات المطاعم والمقاهي والمعارض، بواجهات واسعة وجلسات خارجية مظللة ومفهوم إضاءة يبرز في الفترة المسائية.',
      area: '٣٢٬٠٠٠ م²',
      scope: 'تجزئة ومطاعم',
      type: 'وجهة تجارية',
      highlights: ['شارع مفتوح', 'شرفات مطاعم', 'واجهات معارض']
    }
  }
];

/* ------------------------------------------------------------------ */
/* Interface strings                                                    */
/* ------------------------------------------------------------------ */

const I18N = {
  en: {
    'meta.title': 'First Ex — Real Estate Investment & Development',
    'meta.description':
      'First Ex is a Saudi real estate investment and development company with a commercial registration history exceeding 21 years, developing residential, commercial and mixed-use assets in Riyadh, Jeddah and Dammam.',

    'brand.name': 'FIRST EX',
    'brand.tagline': 'Real Estate Investment & Development',

    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Portfolio',
    'nav.services': 'What We Do',
    'nav.investment': 'Investment',
    'nav.contact': 'Contact',
    'nav.cta': 'Talk to Us',
    'nav.langLabel': 'العربية',
    'nav.menu': 'Menu',
    'nav.skip': 'Skip to content',

    'hero.eyebrow': 'Kingdom of Saudi Arabia · Since 2001',
    'hero.title': 'Building Value.<br><span class="accent">Creating Future.</span>',
    'hero.lead':
      'First Ex is a premium real estate investment and development company with a commercial registration history exceeding 21 years, focused on high-value residential, commercial and mixed-use opportunities.',
    'hero.ctaPrimary': 'Explore the Portfolio',
    'hero.ctaSecondary': 'Partner With Us',
    'hero.scroll': 'Scroll',

    'stats.years': 'Years of Commercial Record',
    'stats.concepts': 'Portfolio Concepts',
    'stats.cities': 'Key Cities',
    'stats.area': 'm² Development Area',

    'about.eyebrow': 'Company Overview',
    'about.title': 'A development house built on a 21-year record',
    'about.body':
      'First Ex is a specialised real estate investment and development company operating across the Kingdom of Saudi Arabia. We identify promising locations, structure the right asset for each site, and deliver quality developments that hold their value for investors, tenants and end users alike.',
    'about.body2':
      'Our work spans commercial towers, gated residential communities, waterfront living, business parks and retail destinations — a portfolio deliberately diversified across asset classes and across the Kingdom’s three principal markets.',

    'vision.eyebrow': 'Vision & Mission',
    'vision.visionTitle': 'Our Vision',
    'vision.visionBody':
      'To become a trusted real estate development brand, known for shaping modern destinations across the Kingdom.',
    'vision.missionTitle': 'Our Mission',
    'vision.missionBody':
      'To create high-quality assets that deliver sustainable value for investors, tenants and end users.',
    'vision.v1Title': 'Investment Value',
    'vision.v1Body': 'Returns underwritten before a single line is drawn.',
    'vision.v2Title': 'Premium Delivery',
    'vision.v2Body': 'Design and execution quality held to one standard.',
    'vision.v3Title': 'Strategic Growth',
    'vision.v3Body': 'Measured expansion into markets we understand.',

    'services.eyebrow': 'What We Do',
    'services.title': 'Four disciplines, one accountable team',
    'services.lead':
      'From sourcing the site to holding the completed asset, every stage stays inside the same house — so nothing is lost between consultants.',
    'services.s1Title': 'Real Estate Investment',
    'services.s1Body':
      'Acquiring and structuring opportunities in high-demand locations, with feasibility and returns tested before commitment.',
    'services.s2Title': 'Development Management',
    'services.s2Body':
      'Concept, design coordination, contractor selection and delivery oversight — managed end to end against budget and programme.',
    'services.s3Title': 'Asset & Portfolio Management',
    'services.s3Body':
      'Leasing strategy, tenant mix and operational performance for completed assets held over the long term.',
    'services.s4Title': 'Partnerships & Land Contribution',
    'services.s4Body':
      'Structured arrangements with landowners, investors and operators — including development-for-share and joint venture models.',

    'projects.eyebrow': 'Portfolio Showcase',
    'projects.title': 'Six concepts across three cities',
    'projects.lead':
      'Each concept below represents a development model First Ex is positioned to deliver — sized, scoped and located.',
    'projects.filterAll': 'All',
    'projects.filterCommercial': 'Commercial',
    'projects.filterResidential': 'Residential',
    'projects.filterMixed': 'Mixed Use',
    'projects.filterRetail': 'Retail',
    'projects.area': 'Development Area',
    'projects.scope': 'Project Scope',
    'projects.type': 'Asset Type',
    'projects.view': 'View concept',
    'projects.close': 'Close',
    'projects.highlights': 'Highlights',
    'projects.enquire': 'Enquire about this concept',

    'invest.eyebrow': 'Investment Strengths',
    'invest.title': 'Why capital works harder here',
    'invest.lead':
      'First Ex focuses on high-demand locations, scalable real estate assets and strategic partnerships with investors, landowners and operators.',
    'invest.i1Title': 'Site Selection',
    'invest.i1Body':
      'We buy the location before the building. Demand, access, catchment and exit are studied before a site is committed.',
    'invest.i2Title': 'Value Engineering',
    'invest.i2Body':
      'Design decisions are made against yield. Efficient plans, sensible specification, no cost that does not return.',
    'invest.i3Title': 'Strategic Partnerships',
    'invest.i3Body':
      'Landowners, investors and operators are brought in early, with clear structures and aligned incentives.',
    'invest.i4Title': 'Diversified Asset Mix',
    'invest.i4Body':
      'Commercial, residential, mixed-use and retail — spread across Riyadh, Jeddah and Dammam to balance cycle exposure.',

    'process.eyebrow': 'How We Work',
    'process.title': 'From land to legacy',
    'process.p1Title': 'Sourcing',
    'process.p1Body': 'Identify and secure sites in locations with proven, durable demand.',
    'process.p2Title': 'Feasibility',
    'process.p2Body': 'Underwrite the asset: cost, programme, absorption and exit before commitment.',
    'process.p3Title': 'Design & Development',
    'process.p3Body': 'Coordinate consultants and contractors against a fixed brief and budget.',
    'process.p4Title': 'Delivery & Operation',
    'process.p4Body': 'Hand over, lease up, and manage the asset for long-term performance.',

    'credentials.eyebrow': 'Credentials',
    'credentials.title': 'Registered, active and accountable',
    'credentials.lead':
      'First Ex operates under a commercial registration issued in 2001 and active with the Ministry of Commerce.',
    'credentials.legalName': 'Registered Name',
    'credentials.unified': 'Unified National Number',
    'credentials.issued': 'Registration Issued',
    'credentials.entity': 'Entity Type',
    'credentials.status': 'Registration Status',
    'credentials.statusValue': 'Active',
    'credentials.note':
      'Certificate details are reproduced from the official Commercial Registration certificate.',

    'cta.title': 'Have a site, a mandate, or capital to deploy?',
    'cta.body':
      'We work with landowners looking to unlock value, investors seeking structured real estate exposure, and operators who need the right building.',
    'cta.button': 'Start the conversation',

    'contact.eyebrow': 'Contact',
    'contact.title': 'Let’s build something that lasts',
    'contact.lead':
      'Send us the outline of your project or mandate and the right person will come back to you.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Working Hours',
    'contact.hoursValue': 'Sunday – Thursday, 9:00 – 17:00',
    'contact.locations': 'Markets',
    'contact.locationsValue': 'Riyadh · Jeddah · Dammam',

    'form.name': 'Full name',
    'form.namePlaceholder': 'Your name',
    'form.email': 'Email',
    'form.emailPlaceholder': 'you@company.com',
    'form.phone': 'Phone',
    'form.phonePlaceholder': '05X XXX XXXX',
    'form.interest': 'I am interested in',
    'form.interestInvest': 'Investing with First Ex',
    'form.interestLand': 'Contributing land / joint development',
    'form.interestLease': 'Leasing or buying a unit',
    'form.interestOther': 'Something else',
    'form.message': 'Message',
    'form.messagePlaceholder': 'Tell us about the site, the mandate or the requirement…',
    'form.submit': 'Send enquiry',
    'form.required': 'This field is required.',
    'form.invalidEmail': 'Please enter a valid email address.',
    'form.success': 'Thank you — your email client will open with the enquiry ready to send.',

    'footer.about':
      'A Saudi real estate investment and development company creating residential, commercial and mixed-use destinations.',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.cr': 'CR / Unified No.',
    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Building Value. Creating Future.'
  },

  ar: {
    'meta.title': 'فيرست إكس — للاستثمار والتطوير العقاري',
    'meta.description':
      'شركة فيرست إكس للاستثمار والتطوير العقاري، سجل تجاري يتجاوز ٢١ عاماً، وتطوير أصول سكنية وتجارية ومتعددة الاستخدامات في الرياض وجدة والدمام.',

    'brand.name': 'فيرست إكس',
    'brand.tagline': 'للاستثمار والتطوير العقاري',

    'nav.home': 'الرئيسية',
    'nav.about': 'عن الشركة',
    'nav.projects': 'المشاريع',
    'nav.services': 'خدماتنا',
    'nav.investment': 'الاستثمار',
    'nav.contact': 'تواصل معنا',
    'nav.cta': 'تحدث إلينا',
    'nav.langLabel': 'English',
    'nav.menu': 'القائمة',
    'nav.skip': 'تخطٍ إلى المحتوى',

    'hero.eyebrow': 'المملكة العربية السعودية · منذ ٢٠٠١',
    'hero.title': 'نبني القيمة<br><span class="accent">ونصنع المستقبل</span>',
    'hero.lead':
      'شركة فيرست إكس للاستثمار والتطوير العقاري شركة متخصصة تمتلك سجلاً تجارياً بعمر يتجاوز ٢١ عاماً، وتعمل على تطوير فرص عقارية نوعية في المواقع الواعدة داخل المملكة العربية السعودية.',
    'hero.ctaPrimary': 'استعرض المشاريع',
    'hero.ctaSecondary': 'كن شريكاً',
    'hero.scroll': 'مرر للأسفل',

    'stats.years': 'سنة سجل تجاري',
    'stats.concepts': 'نماذج مشاريع',
    'stats.cities': 'مدن رئيسية',
    'stats.area': 'م² مساحة تطويرية',

    'about.eyebrow': 'نبذة عن الشركة',
    'about.title': 'بيت تطوير عقاري بسجل يمتد ٢١ عاماً',
    'about.body':
      'فيرست إكس شركة متخصصة في الاستثمار والتطوير العقاري تعمل في مختلف مناطق المملكة العربية السعودية. نختار المواقع الواعدة، ونحدد الأصل الأنسب لكل موقع، وننفذ مشاريع عالية الجودة تحافظ على قيمتها للمستثمرين والمستأجرين والمستخدمين النهائيين.',
    'about.body2':
      'تشمل أعمالنا الأبراج التجارية والمجمعات السكنية المغلقة والواجهات البحرية ومراكز الأعمال والوجهات التجارية، ضمن محفظة متنوعة عن قصد بين فئات الأصول وبين الأسواق الرئيسية الثلاثة في المملكة.',

    'vision.eyebrow': 'الرؤية والرسالة',
    'vision.visionTitle': 'رؤيتنا',
    'vision.visionBody':
      'أن تكون فيرست إكس علامة موثوقة في تطوير الوجهات العقارية الحديثة داخل المملكة.',
    'vision.missionTitle': 'رسالتنا',
    'vision.missionBody':
      'بناء مشاريع عالية الجودة تحقق قيمة مستدامة للمستثمرين والمستخدمين النهائيين.',
    'vision.v1Title': 'عوائد استثمارية قوية',
    'vision.v1Body': 'دراسة العوائد قبل رسم أول خط في المشروع.',
    'vision.v2Title': 'جودة تصميم وتنفيذ',
    'vision.v2Body': 'معيار واحد للجودة في التصميم والتنفيذ.',
    'vision.v3Title': 'توسع مدروس',
    'vision.v3Body': 'نمو محسوب في الأسواق التي نعرفها جيداً.',

    'services.eyebrow': 'خدماتنا',
    'services.title': 'أربعة تخصصات وفريق واحد مسؤول',
    'services.lead':
      'من اختيار الموقع حتى تشغيل الأصل بعد اكتماله، تبقى كل مرحلة داخل الشركة نفسها دون فقدان للمعلومة بين الاستشاريين.',
    'services.s1Title': 'الاستثمار العقاري',
    'services.s1Body':
      'اقتناء الفرص وهيكلتها في المواقع عالية الطلب، مع دراسة الجدوى والعوائد قبل الالتزام.',
    'services.s2Title': 'إدارة التطوير',
    'services.s2Body':
      'التصور والتنسيق التصميمي واختيار المقاولين والإشراف على التنفيذ، بإدارة كاملة وفق الميزانية والبرنامج الزمني.',
    'services.s3Title': 'إدارة الأصول والمحافظ',
    'services.s3Body':
      'استراتيجية التأجير والمزيج التجاري والأداء التشغيلي للأصول المكتملة والمحتفظ بها طويل الأجل.',
    'services.s4Title': 'الشراكات والمساهمة بالأرض',
    'services.s4Body':
      'ترتيبات منظمة مع ملاك الأراضي والمستثمرين والمشغلين، تشمل نماذج التطوير مقابل حصة والمشاريع المشتركة.',

    'projects.eyebrow': 'نماذج المشاريع',
    'projects.title': 'ستة نماذج في ثلاث مدن',
    'projects.lead':
      'كل نموذج أدناه يمثل نمط تطوير قادرة فيرست إكس على تنفيذه، محدداً بالمساحة والنطاق والموقع.',
    'projects.filterAll': 'الكل',
    'projects.filterCommercial': 'تجاري',
    'projects.filterResidential': 'سكني',
    'projects.filterMixed': 'متعدد الاستخدامات',
    'projects.filterRetail': 'تجزئة',
    'projects.area': 'مساحة تطويرية',
    'projects.scope': 'نطاق المشروع',
    'projects.type': 'نوع المشروع',
    'projects.view': 'عرض النموذج',
    'projects.close': 'إغلاق',
    'projects.highlights': 'أبرز المزايا',
    'projects.enquire': 'استفسر عن هذا النموذج',

    'invest.eyebrow': 'نقاط القوة الاستثمارية',
    'invest.title': 'لماذا يعمل رأس المال بكفاءة أعلى معنا',
    'invest.lead':
      'تركز فيرست إكس على اختيار المواقع عالية الطلب، وتطوير أصول عقارية قابلة للنمو، وبناء شراكات استراتيجية مع المستثمرين وملاك الأراضي والمشغلين.',
    'invest.i1Title': 'اختيار المواقع',
    'invest.i1Body':
      'نشتري الموقع قبل المبنى. ندرس الطلب وسهولة الوصول والنطاق السكاني وفرص الخروج قبل الالتزام بأي أرض.',
    'invest.i2Title': 'رفع القيمة بالتصميم',
    'invest.i2Body':
      'قرارات التصميم تُتخذ في ضوء العائد: مخططات فعالة ومواصفات منطقية دون أي تكلفة لا تعود بقيمة.',
    'invest.i3Title': 'شراكات استراتيجية',
    'invest.i3Body':
      'إشراك ملاك الأراضي والمستثمرين والمشغلين مبكراً، بهياكل واضحة وحوافز متوافقة.',
    'invest.i4Title': 'تنوع فئات الأصول',
    'invest.i4Body':
      'تجاري وسكني ومتعدد الاستخدامات وتجزئة، موزعة بين الرياض وجدة والدمام لموازنة التعرض للدورات الاقتصادية.',

    'process.eyebrow': 'منهجية العمل',
    'process.title': 'من الأرض إلى الأثر',
    'process.p1Title': 'اختيار الأرض',
    'process.p1Body': 'تحديد المواقع وتأمينها في مناطق ذات طلب مثبت ومستدام.',
    'process.p2Title': 'دراسة الجدوى',
    'process.p2Body': 'تقييم الأصل من حيث التكلفة والبرنامج الزمني والامتصاص السوقي قبل الالتزام.',
    'process.p3Title': 'التصميم والتطوير',
    'process.p3Body': 'تنسيق الاستشاريين والمقاولين وفق نطاق وميزانية محددين.',
    'process.p4Title': 'التسليم والتشغيل',
    'process.p4Body': 'التسليم والتأجير وإدارة الأصل لتحقيق أداء طويل الأجل.',

    'credentials.eyebrow': 'البيانات النظامية',
    'credentials.title': 'سجل تجاري نشط وموثق',
    'credentials.lead':
      'تعمل فيرست إكس بموجب سجل تجاري صادر عام ٢٠٠١ وحالته نشطة لدى وزارة التجارة.',
    'credentials.legalName': 'الاسم في السجل',
    'credentials.unified': 'الرقم الوطني الموحد',
    'credentials.issued': 'تاريخ الإصدار',
    'credentials.entity': 'نوع الكيان',
    'credentials.status': 'حالة السجل',
    'credentials.statusValue': 'نشط',
    'credentials.note': 'البيانات منقولة من شهادة السجل التجاري الرسمية.',

    'cta.title': 'لديك أرض أو تفويض استثماري أو رأس مال؟',
    'cta.body':
      'نعمل مع ملاك الأراضي الراغبين في استثمار أصولهم، والمستثمرين الباحثين عن فرص عقارية منظمة، والمشغلين الذين يحتاجون المبنى المناسب.',
    'cta.button': 'ابدأ الحديث معنا',

    'contact.eyebrow': 'تواصل معنا',
    'contact.title': 'لنبنِ معاً ما يدوم',
    'contact.lead': 'أرسل لنا نبذة عن مشروعك أو تفويضك وسيتواصل معك المختص.',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.hours': 'أوقات العمل',
    'contact.hoursValue': 'الأحد – الخميس، ٩:٠٠ – ١٧:٠٠',
    'contact.locations': 'الأسواق',
    'contact.locationsValue': 'الرياض · جدة · الدمام',

    'form.name': 'الاسم الكامل',
    'form.namePlaceholder': 'اسمك',
    'form.email': 'البريد الإلكتروني',
    'form.emailPlaceholder': 'you@company.com',
    'form.phone': 'رقم الجوال',
    'form.phonePlaceholder': '05X XXX XXXX',
    'form.interest': 'أرغب في',
    'form.interestInvest': 'الاستثمار مع فيرست إكس',
    'form.interestLand': 'المساهمة بأرض / تطوير مشترك',
    'form.interestLease': 'استئجار أو شراء وحدة',
    'form.interestOther': 'موضوع آخر',
    'form.message': 'الرسالة',
    'form.messagePlaceholder': 'أخبرنا عن الموقع أو التفويض أو المتطلب…',
    'form.submit': 'إرسال الطلب',
    'form.required': 'هذا الحقل مطلوب.',
    'form.invalidEmail': 'يرجى إدخال بريد إلكتروني صحيح.',
    'form.success': 'شكراً لك — سيفتح برنامج البريد لديك والرسالة جاهزة للإرسال.',

    'footer.about':
      'شركة سعودية للاستثمار والتطوير العقاري تصنع وجهات سكنية وتجارية ومتعددة الاستخدامات.',
    'footer.explore': 'روابط',
    'footer.contact': 'تواصل',
    'footer.legal': 'بيانات نظامية',
    'footer.cr': 'الرقم الوطني الموحد',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.tagline': 'نبني القيمة ونصنع المستقبل'
  }
};
