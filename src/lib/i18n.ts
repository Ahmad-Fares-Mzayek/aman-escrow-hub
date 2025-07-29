import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.buy": "Buy",
      "nav.sell": "Sell", 
      "nav.payments": "Payments",
      "nav.dashboard": "Dashboard",
      "nav.signIn": "Sign In",
      "nav.getStarted": "Get Started",
      "nav.signOut": "Sign out",
      "nav.accountSettings": "Account Settings",
      "nav.tutorial": "Tutorial",
      
      // Homepage
      "home.hero.title": "AMN | أمن",
      "home.hero.subtitle": "Your trusted intermediary for secure individual-to-individual transactions",
      "home.hero.description": "Supporting small local businesses and boutiques in KSA through our escrow-style platform. Buy and sell with confidence, knowing your transactions are protected.",
      "home.hero.getStarted": "Get Started",
      "home.hero.learnMore": "Learn More",
      
      "home.stats.title": "Trusted by Thousands",
      "home.stats.activeUsers": "Active Users",
      "home.stats.completedTransactions": "Completed Transactions", 
      "home.stats.totalVolumeSecured": "Total Volume Secured",
      "home.stats.thisHour": "this hour",
      "home.stats.today": "today",
      
      "home.howItWorks.title": "How AMN Protects Your Transactions",
      "home.howItWorks.step1.title": "1. Secure Escrow",
      "home.howItWorks.step1.description": "Buyer's payment is held securely until the seller delivers the product and buyer confirms receipt.",
      "home.howItWorks.step2.title": "2. Safe Delivery", 
      "home.howItWorks.step2.description": "Both parties are protected during the transaction. Sellers ship with confidence, buyers receive what they ordered.",
      "home.howItWorks.step3.title": "3. Instant Release",
      "home.howItWorks.step3.description": "Once buyer confirms receipt, payment is instantly released to the seller. Disputes are handled fairly by our team.",
      
      "home.cta.title": "Ready to Start Trading Safely?",
      "home.cta.subtitle": "Join thousands of satisfied users who trust AMN with their transactions",
      "home.cta.createAccount": "Create Free Account",
      
      // Dashboard
      "dashboard.welcome": "Welcome back",
      "dashboard.overview": "Here's your transaction overview",
      "dashboard.totalSpent": "Total Spent",
      "dashboard.totalReceived": "Total Received",
      "dashboard.yourSellerId": "Your Seller ID",
      "dashboard.acrossPurchases": "Across all purchases",
      "dashboard.fromSales": "From sales",
      "dashboard.shareWithBuyers": "Share with buyers",
      "dashboard.quickBuy": "Quick Buy",
      "dashboard.quickBuyDescription": "Start a new transaction by entering seller and product details",
      "dashboard.goToBuyPage": "Go to Buy Page",
      "dashboard.manageProducts": "Manage Products",
      "dashboard.manageProductsDescription": "Add new products or manage your existing listings",
      "dashboard.goToSellPage": "Go to Sell Page",
      "dashboard.monthlySpending": "Monthly Spending",
      "dashboard.transactionTypes": "Transaction Types",
      "dashboard.buying": "Buying",
      "dashboard.selling": "Selling", 
      "dashboard.pending": "Pending",
      "dashboard.aiTip": "AI Analyst Tip",
      "dashboard.aiTipContent": "You've spent 1,020 SAR this month, mostly on boutique items. Consider setting a monthly spending cap or scheduling buys in batches to reduce risk.",
      
      // Learn More Page
      "learn.title": "Why Choose AMN?",
      "learn.subtitle": "Your Security is Our Priority",
      "learn.whyUse.title": "Why Use AMN?",
      "learn.whyUse.content": "Experience peace of mind with our safety-first payment protection system.",
      "learn.problem.title": "The Problem Today",
      "learn.problem.content": "Peer-to-peer and boutique transactions lack protection, leaving both buyers and sellers vulnerable.",
      "learn.different.title": "Why AMN is Different", 
      "learn.different.content": "Our escrow system, dispute resolution, and credibility verification protect every transaction.",
      "learn.scenarios.title": "Real-World Scenarios",
      "learn.scenarios.content": "\"I paid for an abaya, but it never arrived. With AMN, my money would have been protected until delivery confirmation.\"",
      "learn.dangers.title": "Dangers Solved",
      "learn.dangers.content": "Fraud prevention, delivery delays protection, and verified seller authentication.",
      "learn.cta.title": "Ready to shop securely?",
      "learn.cta.getStarted": "Get Started",
      "learn.cta.createAccount": "Create Account",
      
      // Buy Page
      "buy.title": "Initiate Purchase",
      "buy.sellerId": "Seller ID",
      "buy.productId": "Product ID",
      "buy.sellerName": "Seller Name",
      "buy.productName": "Product Name",
      "buy.productPrice": "Product Price",
      "buy.productDescription": "Product Description",
      "buy.initiateTransaction": "Initiate Transaction",
      
      // Sell Page
      "sell.title": "Manage Your Products",
      "sell.yourSellerId": "Your Seller ID",
      "sell.addProduct": "Add Product",
      "sell.productName": "Product Name",
      "sell.price": "Price",
      "sell.description": "Description",
      "sell.addNewProduct": "Add New Product",
      
      // Payments Page
      "payments.title": "Transaction History",
      "payments.incoming": "Incoming",
      "payments.outgoing": "Outgoing",
      "payments.status.pending": "Pending",
      "payments.status.confirmed": "Confirmed", 
      "payments.status.disputed": "Under Review",
      "payments.status.completed": "Completed",
      "payments.confirmReceipt": "Confirm Receipt of Product",
      "payments.fileComplaint": "File Complaint",
      
      // Common
      "common.currency": "SAR",
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.success": "Success"
    }
  },
  ar: {
    translation: {
      // Navigation - Arabic
      "nav.buy": "شراء",
      "nav.sell": "بيع",
      "nav.payments": "المدفوعات",
      "nav.dashboard": "لوحة التحكم",
      "nav.signIn": "تسجيل الدخول",
      "nav.getStarted": "ابدأ الآن",
      "nav.signOut": "تسجيل الخروج",
      "nav.accountSettings": "إعدادات الحساب",
      "nav.tutorial": "الدليل التعليمي",
      
      // Homepage - Arabic
      "home.hero.title": "AMN | أمن",
      "home.hero.subtitle": "وسيطك الموثوق للمعاملات الآمنة بين الأفراد",
      "home.hero.description": "ندعم الشركات المحلية الصغيرة والبوتيكات في المملكة العربية السعودية من خلال منصة الضمان الخاصة بنا. اشتري وبع بثقة، مع العلم أن معاملاتك محمية.",
      "home.hero.getStarted": "ابدأ الآن",
      "home.hero.learnMore": "اعرف المزيد",
      
      "home.stats.title": "موثوق من الآلاف",
      "home.stats.activeUsers": "المستخدمون النشطون",
      "home.stats.completedTransactions": "المعاملات المكتملة",
      "home.stats.totalVolumeSecured": "إجمالي الحجم المؤمن",
      "home.stats.thisHour": "هذه الساعة",
      "home.stats.today": "اليوم",
      
      "home.howItWorks.title": "كيف يحمي أمن معاملاتك",
      "home.howItWorks.step1.title": "١. ضمان آمن",
      "home.howItWorks.step1.description": "يتم الاحتفاظ بدفعة المشتري بأمان حتى يسلم البائع المنتج ويؤكد المشتري الاستلام.",
      "home.howItWorks.step2.title": "٢. تسليم آمن",
      "home.howItWorks.step2.description": "كلا الطرفين محميان أثناء المعاملة. يشحن البائعون بثقة، ويحصل المشترون على ما طلبوه.",
      "home.howItWorks.step3.title": "٣. إطلاق فوري",
      "home.howItWorks.step3.description": "بمجرد أن يؤكد المشتري الاستلام، يتم إطلاق الدفعة فوراً للبائع. يتم التعامل مع المنازعات بعدالة من قبل فريقنا.",
      
      "home.cta.title": "مستعد لبدء التداول بأمان؟",
      "home.cta.subtitle": "انضم إلى آلاف المستخدمين الراضين الذين يثقون في أمن لمعاملاتهم",
      "home.cta.createAccount": "إنشاء حساب مجاني",
      
      // Dashboard - Arabic  
      "dashboard.welcome": "مرحباً بعودتك",
      "dashboard.overview": "إليك نظرة عامة على معاملاتك",
      "dashboard.totalSpent": "إجمالي المنفق",
      "dashboard.totalReceived": "إجمالي المستلم",
      "dashboard.yourSellerId": "معرف البائع الخاص بك",
      "dashboard.acrossPurchases": "عبر جميع المشتريات",
      "dashboard.fromSales": "من المبيعات",
      "dashboard.shareWithBuyers": "شارك مع المشترين",
      "dashboard.quickBuy": "شراء سريع",
      "dashboard.quickBuyDescription": "ابدأ معاملة جديدة عن طريق إدخال تفاصيل البائع والمنتج",
      "dashboard.goToBuyPage": "اذهب إلى صفحة الشراء",
      "dashboard.manageProducts": "إدارة المنتجات",
      "dashboard.manageProductsDescription": "أضف منتجات جديدة أو أدر قوائمك الحالية",
      "dashboard.goToSellPage": "اذهب إلى صفحة البيع",
      "dashboard.monthlySpending": "الإنفاق الشهري",
      "dashboard.transactionTypes": "أنواع المعاملات",
      "dashboard.buying": "شراء",
      "dashboard.selling": "بيع",
      "dashboard.pending": "قيد الانتظار",
      "dashboard.aiTip": "نصيحة المحلل الذكي",
      "dashboard.aiTipContent": "لقد أنفقت ١٠٢٠ ريال سعودي هذا الشهر، معظمها على عناصر البوتيك. فكر في وضع حد أقصى للإنفاق الشهري أو جدولة المشتريات على دفعات لتقليل المخاطر.",
      
      // Learn More Page - Arabic
      "learn.title": "لماذا تختار أمن؟",
      "learn.subtitle": "أمانك هو أولويتنا",
      "learn.whyUse.title": "لماذا تستخدم أمن؟",
      "learn.whyUse.content": "اختبر راحة البال مع نظام حماية المدفوعات الذي يضع الأمان في المقدمة.",
      "learn.problem.title": "المشكلة اليوم",
      "learn.problem.content": "تفتقر المعاملات بين الأقران والبوتيكات إلى الحماية، مما يترك كلاً من المشترين والبائعين عرضة للخطر.",
      "learn.different.title": "لماذا أمن مختلف",
      "learn.different.content": "نظام الضمان وحل المنازعات والتحقق من المصداقية يحمي كل معاملة.",
      "learn.scenarios.title": "سيناريوهات من الواقع",
      "learn.scenarios.content": "\"دفعت ثمن عباءة، لكنها لم تصل أبداً. مع أمن، كانت أموالي ستكون محمية حتى تأكيد التسليم.\"",
      "learn.dangers.title": "المخاطر المحلولة",
      "learn.dangers.content": "منع الاحتيال، حماية تأخير التسليم، والتحقق من صحة البائع.",
      "learn.cta.title": "مستعد للتسوق بأمان؟",
      "learn.cta.getStarted": "ابدأ الآن",
      "learn.cta.createAccount": "إنشاء حساب",
      
      // Buy Page - Arabic
      "buy.title": "بدء عملية شراء",
      "buy.sellerId": "معرف البائع",
      "buy.productId": "معرف المنتج",
      "buy.sellerName": "اسم البائع",
      "buy.productName": "اسم المنتج",
      "buy.productPrice": "سعر المنتج",
      "buy.productDescription": "وصف المنتج",
      "buy.initiateTransaction": "بدء المعاملة",
      
      // Sell Page - Arabic
      "sell.title": "إدارة منتجاتك",
      "sell.yourSellerId": "معرف البائع الخاص بك",
      "sell.addProduct": "إضافة منتج",
      "sell.productName": "اسم المنتج",
      "sell.price": "السعر",
      "sell.description": "الوصف",
      "sell.addNewProduct": "إضافة منتج جديد",
      
      // Payments Page - Arabic
      "payments.title": "تاريخ المعاملات",
      "payments.incoming": "واردة",
      "payments.outgoing": "صادرة",
      "payments.status.pending": "قيد الانتظار",
      "payments.status.confirmed": "مؤكدة",
      "payments.status.disputed": "قيد المراجعة",
      "payments.status.completed": "مكتملة",
      "payments.confirmReceipt": "تأكيد استلام المنتج",
      "payments.fileComplaint": "تقديم شكوى",
      
      // Common - Arabic
      "common.currency": "ريال",
      "common.loading": "جاري التحميل...",
      "common.error": "خطأ",
      "common.success": "نجح"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;