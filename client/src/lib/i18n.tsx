import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

export type Locale = "zh-CN" | "zh-Hant" | "en";
export type LocalePreference = Locale | "auto";

const zhCN = {
  pageTitle: "聚乾科技｜企业 AI 工具与网络安全方案咨询",
  pageDescription: "长沙聚乾科技有限公司企业技术方案咨询，聚焦非聊天类 AI 工具、网络安全巡检辅助方案与物联网技术方向。",
  languageLabel: "语言",
  languageAuto: "跟随地区",
  brandName: "聚乾科技",
  brandTagline: "企业技术方案咨询",
  brandAria: "聚乾科技，返回页面顶部",
  navAria: "主导航",
  navSolution: "方案方向",
  navReference: "合作参考",
  navCompany: "企业信息",
  phoneConsult: "电话咨询",
  heroEyebrow: "AI 工具 / 网络安全工具方案",
  heroLine1: "把 AI 做成工具，",
  heroLine2: "让巡检思路",
  heroLine3: "更清晰。",
  heroIntro: "面向企业团队的非聊天类 AI 工具方案咨询，聚焦网络安全巡检辅助场景；从需求梳理到功能方向评估，和你一起把想法落到合适的技术路径上。",
  heroSubmit: "提交项目意向",
  heroLearn: "了解方案方向",
  privacyNote: "不收集身份证或银行账户信息",
  visualAria: "企业网络安全巡检工具方案示意图",
  visualOverline: "方案示意 / 01",
  visualTitle: "智能巡检辅助",
  visualBadge: "方案示意",
  nodeAssets: "网络资产",
  nodeRisks: "风险线索",
  nodeReview: "人工复核",
  visualFooterLeft: "从信息梳理开始",
  visualFooterRight: "以人工判断为核心",
  visualCaptionLeft: "构想 → 评估 → 行动",
  visualCaptionRight: "按实际业务需求评估",
  stripAria: "业务方向简述",
  stripLabel: "本页聚焦",
  stripTitle: "AI 工具（非交友 / 聊天）",
  stripDetail: "企业网络与信息安全巡检辅助方向",
  stripLink: "查看方案方向",
  sectionOneKicker: "沟通内容 / 01",
  sectionOneTitle: "从一个清楚的问题开始。",
  sectionOneDesc: "不是泛泛的聊天机器人，而是围绕企业实际工作流，讨论能辅助团队的信息整理与安全巡检工具。",
  featureTag: "主打方向 · AI 工具",
  featureTitleOne: "企业网络安全",
  featureTitleTwo: "巡检辅助工具",
  featureDesc: "可沟通网络资产梳理、风险线索归纳、巡检记录整理等辅助场景。实际功能、数据来源与交付范围，均需结合项目需求评估。",
  featureAction: "聊聊你的使用场景",
  serviceIndexLabel: "技术服务",
  networkTitle: "网络技术服务",
  networkDetail: "围绕企业网络技术需求，沟通技术开发、实施与优化方向。",
  securityTitle: "网络安全软件",
  securityDetail: "聚焦网络与信息安全软件的产品构想、功能梳理与方案评估。",
  iotTitle: "物联网与智能工具",
  iotDetail: "结合物联网技术研发与 AI 工具场景，讨论适合团队的应用路径。",
  processNote: "页面展示的是方案咨询方向，不代表产品已上线或相关技术能力已完成交付。",
  referenceKicker: "开户与充值参考 / 02",
  referenceTitleOne: "合作前，先把",
  referenceTitleTwo: "要求看明白。",
  referenceIntro: "以下条件整理自你提供的图片，只作为沟通前的第三方规则参考。开户资格、政策及金额请务必向对应平台再次核实。",
  referenceAction: "就具体情况咨询",
  referenceItemOneTitle: "开户主体",
  referenceItemOneDesc: "图片建议主体优先为中国大陆或中国香港。",
  referenceItemTwoTitle: "新加坡地区执照",
  referenceItemTwoDesc: "图片称可提交审核，并需客户提供 ACRA 公司注册执照；以平台实际审核为准。",
  referenceItemThreeTitle: "客户与主体匹配",
  referenceItemThreeDesc: "图片称可接国内出海客户；海外客户使用国内主体无法开户，需向平台确认适用范围。",
  referenceItemFourTitle: "充值门槛参考",
  referenceItemFourDesc: "图片称首充及后续充值最低为 5,000，且不可协商；原图未注明币种。",
  referenceFlag: "需再次确认",
  referenceDisclaimer: "非开户承诺，非官方规则说明；具体审核主体、可投行业、客户地域、充值金额与币种，以平台书面确认为准。",
  contactKicker: "联系沟通 / 03",
  contactTitleOne: "把需求告诉我们，",
  contactTitleTwo: "先聊方案，再做判断。",
  contactDesc: "留下基本联系方式与项目方向，便于我们了解你的需求。请勿在表单或备注中填写身份证、银行卡、账户密码等敏感信息。",
  companyName: "长沙聚乾科技有限公司",
  companyAddress: "湖南省长沙市 · 雨花区",
  contactCardLabel: "项目意向",
  contactCardTitleOne: "描述你的使用场景，",
  contactCardTitleTwo: "我们来一起梳理。",
  contactCardDesc: "在线提交依赖可用的服务端。提交成功后页面会显示确认；也可以直接拨打页面电话咨询。",
  contactCardPrivacy: "请勿填写身份证或银行账户信息",
  contactFormButton: "打开意向表单",
  closeModal: "关闭弹窗",
  formEyebrow: "项目意向 / 03",
  formTitle: "提交项目意向",
  formDescription: "留下基本联系方式与项目方向，我们会据此了解你的需求。带 * 为必填项。",
  successTitle: "提交成功，感谢你的信任。",
  successDescription: "我们已收到你的意向，会根据你提供的联系方式跟进沟通。",
  submitError: "暂时没有收到提交确认。请稍后重试或拨打页面电话；请勿重复提交身份证、银行账户或密码等敏感信息。",
  consentError: "请先阅读并同意信息使用说明。",
  fieldName: "联系人姓名",
  placeholderName: "怎么称呼你",
  fieldCompany: "企业名称",
  placeholderCompany: "填写企业或团队名称",
  fieldPhone: "联系电话",
  placeholderPhone: "便于我们与你联系",
  invalidPhone: "请输入有效的联系电话",
  fieldEmail: "联系邮箱",
  optional: "选填",
  fieldInterest: "咨询方向",
  directionAi: "AI工具（非交友/聊天）· 企业网络安全巡检辅助方案",
  directionSecurity: "网络与信息安全软件方案咨询",
  directionIot: "物联网技术研发与应用",
  directionNetwork: "网络技术服务与技术咨询",
  directionOther: "其他合规技术需求",
  fieldMessage: "补充说明",
  placeholderMessage: "简单说说业务场景或希望解决的问题（最多 500 字）",
  consentText: "我已阅读并同意：若提交成功，信息仅用于回应本次咨询及后续沟通。我不会在表单中提交身份证、银行账户或密码等敏感信息。",
  submitPending: "正在提交…",
  submitButton: "提交咨询",
  privacyFooter: "如需查询、更正或申请删除已成功提交的信息，请拨打页面电话联系。表单内容不会在页面公开。",
  complianceAria: "业务合规提示",
  complianceTitle: "合规提示",
  complianceBody: "企业业务以营业执照及实际获批范围为准；第二类增值电信业务、互联网信息服务等许可项目，须依法取得批准或许可后方可开展。本页面仅用于技术方案咨询与意向收集。",
  backToTop: "回到顶部",
} as const;

type CopyKey = keyof typeof zhCN;

const zhHant: Record<CopyKey, string> = {
  pageTitle: "聚乾科技｜企業 AI 工具與網絡安全方案諮詢",
  pageDescription: "長沙聚乾科技有限公司企業技術方案諮詢，聚焦非聊天類 AI 工具、網絡安全巡檢輔助方案與物聯網技術方向。",
  languageLabel: "語言",
  languageAuto: "跟隨地區",
  brandName: "聚乾科技",
  brandTagline: "企業技術方案諮詢",
  brandAria: "聚乾科技，返回頁面頂部",
  navAria: "主導覽",
  navSolution: "方案方向",
  navReference: "合作參考",
  navCompany: "企業資訊",
  phoneConsult: "電話諮詢",
  heroEyebrow: "AI 工具 / 網絡安全工具方案",
  heroLine1: "把 AI 做成工具，",
  heroLine2: "讓巡檢思路",
  heroLine3: "更清晰。",
  heroIntro: "面向企業團隊的非聊天類 AI 工具方案諮詢，聚焦網絡安全巡檢輔助場景；從需求梳理到功能方向評估，和你一起把想法落到合適的技術路徑上。",
  heroSubmit: "提交項目意向",
  heroLearn: "了解方案方向",
  privacyNote: "不收集身份證或銀行帳戶資訊",
  visualAria: "企業網絡安全巡檢工具方案示意圖",
  visualOverline: "方案示意 / 01",
  visualTitle: "智能巡檢輔助",
  visualBadge: "方案示意",
  nodeAssets: "網絡資產",
  nodeRisks: "風險線索",
  nodeReview: "人工覆核",
  visualFooterLeft: "從資訊整理開始",
  visualFooterRight: "以人工判斷為核心",
  visualCaptionLeft: "構想 → 評估 → 行動",
  visualCaptionRight: "按實際業務需求評估",
  stripAria: "業務方向簡述",
  stripLabel: "本頁聚焦",
  stripTitle: "AI 工具（非交友 / 聊天）",
  stripDetail: "企業網絡與資訊安全巡檢輔助方向",
  stripLink: "查看方案方向",
  sectionOneKicker: "溝通內容 / 01",
  sectionOneTitle: "從一個清楚的問題開始。",
  sectionOneDesc: "不是泛泛的聊天機械人，而是圍繞企業實際工作流程，討論能協助團隊整理資訊與安全巡檢的工具。",
  featureTag: "主打方向 · AI 工具",
  featureTitleOne: "企業網絡安全",
  featureTitleTwo: "巡檢輔助工具",
  featureDesc: "可討論網絡資產梳理、風險線索歸納、巡檢記錄整理等輔助場景。實際功能、資料來源與交付範圍，均需按項目需求評估。",
  featureAction: "聊聊你的使用場景",
  serviceIndexLabel: "技術服務",
  networkTitle: "網絡技術服務",
  networkDetail: "圍繞企業網絡技術需求，溝通技術開發、實施與優化方向。",
  securityTitle: "網絡安全軟件",
  securityDetail: "聚焦網絡與資訊安全軟件的產品構想、功能梳理與方案評估。",
  iotTitle: "物聯網與智能工具",
  iotDetail: "結合物聯網技術研發與 AI 工具場景，討論適合團隊的應用路徑。",
  processNote: "頁面展示的是方案諮詢方向，不代表產品已上線或相關技術能力已完成交付。",
  referenceKicker: "開戶與充值參考 / 02",
  referenceTitleOne: "合作前，先把",
  referenceTitleTwo: "要求看清楚。",
  referenceIntro: "以下條件整理自你提供的圖片，只作為溝通前的第三方規則參考。開戶資格、政策及金額請務必向對應平台再次核實。",
  referenceAction: "就具體情況諮詢",
  referenceItemOneTitle: "開戶主體",
  referenceItemOneDesc: "圖片建議主體優先為中國大陸或中國香港。",
  referenceItemTwoTitle: "新加坡地區執照",
  referenceItemTwoDesc: "圖片稱可提交審核，並需客戶提供 ACRA 公司註冊執照；以平台實際審核為準。",
  referenceItemThreeTitle: "客戶與主體匹配",
  referenceItemThreeDesc: "圖片稱可接國內出海客戶；海外客戶使用國內主體無法開戶，需向平台確認適用範圍。",
  referenceItemFourTitle: "充值門檻參考",
  referenceItemFourDesc: "圖片稱首充及後續充值最低為 5,000，且不可協商；原圖未註明幣種。",
  referenceFlag: "需再次確認",
  referenceDisclaimer: "非開戶承諾，非官方規則說明；具體審核主體、可投行業、客戶地域、充值金額與幣種，以平台書面確認為準。",
  contactKicker: "聯絡溝通 / 03",
  contactTitleOne: "把需求告訴我們，",
  contactTitleTwo: "先聊方案，再作判斷。",
  contactDesc: "留下基本聯絡方式與項目方向，方便我們了解你的需求。請勿在表單或備註中填寫身份證、銀行卡、帳戶密碼等敏感資訊。",
  companyName: "長沙聚乾科技有限公司",
  companyAddress: "湖南省長沙市 · 雨花區",
  contactCardLabel: "項目意向",
  contactCardTitleOne: "描述你的使用場景，",
  contactCardTitleTwo: "我們一起梳理。",
  contactCardDesc: "網上提交依賴可用的服務端。提交成功後頁面會顯示確認；也可以直接致電頁面上的電話諮詢。",
  contactCardPrivacy: "請勿填寫身份證或銀行帳戶資訊",
  contactFormButton: "打開意向表單",
  closeModal: "關閉彈窗",
  formEyebrow: "項目意向 / 03",
  formTitle: "提交項目意向",
  formDescription: "留下基本聯絡方式與項目方向，我們會據此了解你的需求。帶 * 為必填項。",
  successTitle: "提交成功，感謝你的信任。",
  successDescription: "我們已收到你的意向，會按你提供的聯絡方式跟進溝通。",
  submitError: "暫時未收到提交確認。請稍後重試或致電頁面上的電話；請勿重複提交身份證、銀行帳戶或密碼等敏感資訊。",
  consentError: "請先閱讀並同意資訊使用說明。",
  fieldName: "聯絡人姓名",
  placeholderName: "怎樣稱呼你",
  fieldCompany: "企業名稱",
  placeholderCompany: "填寫企業或團隊名稱",
  fieldPhone: "聯絡電話",
  placeholderPhone: "方便我們與你聯絡",
  invalidPhone: "請輸入有效的聯絡電話",
  fieldEmail: "聯絡電郵",
  optional: "選填",
  fieldInterest: "諮詢方向",
  directionAi: "AI工具（非交友/聊天）· 企業網絡安全巡檢輔助方案",
  directionSecurity: "網絡與資訊安全軟件方案諮詢",
  directionIot: "物聯網技術研發與應用",
  directionNetwork: "網絡技術服務與技術諮詢",
  directionOther: "其他合規技術需求",
  fieldMessage: "補充說明",
  placeholderMessage: "簡單說說業務場景或希望解決的問題（最多 500 字）",
  consentText: "我已閱讀並同意：若提交成功，資訊只用於回應本次諮詢及後續溝通。我不會在表單中提交身份證、銀行帳戶或密碼等敏感資訊。",
  submitPending: "正在提交…",
  submitButton: "提交諮詢",
  privacyFooter: "如需查詢、更正或申請刪除已成功提交的資訊，請致電頁面上的電話聯絡。表單內容不會在頁面公開。",
  complianceAria: "業務合規提示",
  complianceTitle: "合規提示",
  complianceBody: "企業業務以營業執照及實際獲批範圍為準；第二類增值電信業務、互聯網資訊服務等許可項目，須依法取得批准或許可後方可開展。本頁面僅用於技術方案諮詢與意向收集。",
  backToTop: "返回頂部",
};

const en: Record<CopyKey, string> = {
  pageTitle: "Juqian Technology | Enterprise AI & Cybersecurity Solutions",
  pageDescription: "Enterprise technology consultation from Changsha Juqian Technology, focused on non-chat AI tools, cybersecurity inspection assistance, and IoT solutions.",
  languageLabel: "Language",
  languageAuto: "Follow region",
  brandName: "Juqian Technology",
  brandTagline: "Enterprise technology consulting",
  brandAria: "Juqian Technology, back to top",
  navAria: "Main navigation",
  navSolution: "Solutions",
  navReference: "Requirements",
  navCompany: "Company",
  phoneConsult: "Call us",
  heroEyebrow: "AI TOOLS / CYBERSECURITY SOLUTIONS",
  heroLine1: "Turn AI into a tool,",
  heroLine2: "make inspection",
  heroLine3: "work clearer.",
  heroIntro: "Non-chat AI tool planning for business teams, focused on cybersecurity inspection assistance. From scoping needs to assessing features, we help explore a practical technical direction.",
  heroSubmit: "Share your project",
  heroLearn: "Explore the approach",
  privacyNote: "We do not ask for ID or bank account details",
  visualAria: "Concept illustration of a cybersecurity inspection tool",
  visualOverline: "SOLUTION CONCEPT / 01",
  visualTitle: "Inspection assistance",
  visualBadge: "Concept only",
  nodeAssets: "Network assets",
  nodeRisks: "Risk signals",
  nodeReview: "Human review",
  visualFooterLeft: "Start with information",
  visualFooterRight: "Human judgment stays central",
  visualCaptionLeft: "IDEA → REVIEW → ACTION",
  visualCaptionRight: "Scoped to real business needs",
  stripAria: "Selected service direction",
  stripLabel: "FOCUS",
  stripTitle: "AI tools (not dating or chat)",
  stripDetail: "Cybersecurity inspection assistance for businesses",
  stripLink: "View solutions",
  sectionOneKicker: "WHAT WE DISCUSS / 01",
  sectionOneTitle: "Start with a clear problem.",
  sectionOneDesc: "Not a generic chatbot. We discuss tools that help teams organize information and support security inspections in real business workflows.",
  featureTag: "FOCUS AREA · AI TOOLS",
  featureTitleOne: "Cybersecurity",
  featureTitleTwo: "inspection assistant",
  featureDesc: "Discuss support for network asset reviews, risk signal summaries, and inspection records. Features, data sources, and delivery scope are assessed for each project.",
  featureAction: "Discuss your use case",
  serviceIndexLabel: "TECH SERVICES",
  networkTitle: "Network technology services",
  networkDetail: "Discuss development, implementation, and optimization for business network needs.",
  securityTitle: "Network security software",
  securityDetail: "Explore product concepts, feature scoping, and solution evaluation for network and information security software.",
  iotTitle: "IoT and intelligent tools",
  iotDetail: "Explore practical applications combining IoT research and AI tool use cases.",
  processNote: "This page presents a consultation direction; it does not claim a finished or launched product.",
  referenceKicker: "ACCOUNT & FUNDING REFERENCE / 02",
  referenceTitleOne: "Before working together,",
  referenceTitleTwo: "review the requirements.",
  referenceIntro: "These points are summarized from the image you shared and are only third-party reference information. Confirm eligibility, policies, and amounts directly with the relevant platform.",
  referenceAction: "Ask about your case",
  referenceItemOneTitle: "Eligible business entity",
  referenceItemOneDesc: "The image recommends an entity registered in mainland China or Hong Kong SAR.",
  referenceItemTwoTitle: "Singapore registration",
  referenceItemTwoDesc: "The image says Singapore business licenses may be submitted for review and an ACRA company registration document is required; platform review applies.",
  referenceItemThreeTitle: "Customer and entity fit",
  referenceItemThreeDesc: "The image says domestic export-oriented customers may be served; overseas customers using a mainland entity cannot open an account. Confirm with the platform.",
  referenceItemFourTitle: "Funding threshold reference",
  referenceItemFourDesc: "The image states a minimum of 5,000 for both initial and later top-ups, non-negotiable. The currency is not specified in the image.",
  referenceFlag: "Confirm directly",
  referenceDisclaimer: "This is not an account-opening promise or official policy. Confirm eligible entities, industries, customer regions, amounts, and currency in writing with the platform.",
  contactKicker: "CONTACT / 03",
  contactTitleOne: "Tell us what you need.",
  contactTitleTwo: "Discuss the approach, then decide.",
  contactDesc: "Share basic contact details and your project direction so we can understand your needs. Do not enter ID, bank card, or account password details in the form or notes.",
  companyName: "Changsha Juqian Technology Co., Ltd.",
  companyAddress: "Yuhua District · Changsha, Hunan",
  contactCardLabel: "PROJECT INQUIRY",
  contactCardTitleOne: "Describe your use case,",
  contactCardTitleTwo: "and we’ll scope it together.",
  contactCardDesc: "Online submission depends on an available backend. The page will confirm a successful submission; you can also call the number shown here.",
  contactCardPrivacy: "Do not enter ID or bank account details",
  contactFormButton: "Open inquiry form",
  closeModal: "Close dialog",
  formEyebrow: "PROJECT INQUIRY / 03",
  formTitle: "Share your project",
  formDescription: "Leave basic contact details and a project direction so we can understand your needs. Fields marked * are required.",
  successTitle: "Submitted. Thank you.",
  successDescription: "We received your inquiry and will follow up using the contact details you provided.",
  submitError: "We have not received a submission confirmation. Please try again later or call the number on this page. Do not repeat sensitive details such as ID, bank account, or passwords.",
  consentError: "Please read and agree to the information-use notice first.",
  fieldName: "Contact name",
  placeholderName: "How should we address you?",
  fieldCompany: "Company name",
  placeholderCompany: "Company or team name",
  fieldPhone: "Phone number",
  placeholderPhone: "So we can contact you",
  invalidPhone: "Enter a valid phone number",
  fieldEmail: "Email",
  optional: "Optional",
  fieldInterest: "Area of interest",
  directionAi: "AI tools (not dating or chat) · Business cybersecurity inspection assistant",
  directionSecurity: "Network and information security software consultation",
  directionIot: "IoT technology research and applications",
  directionNetwork: "Network technology services and consulting",
  directionOther: "Other compliant technology needs",
  fieldMessage: "Additional details",
  placeholderMessage: "Briefly describe your use case or problem (up to 500 characters)",
  consentText: "I have read and agree: if submitted successfully, my information will be used only to respond to this inquiry and follow up. I will not enter ID, bank account, or password details.",
  submitPending: "Submitting…",
  submitButton: "Send inquiry",
  privacyFooter: "To request access, correction, or deletion of information submitted successfully, call the number on this page. Form details are not published here.",
  complianceAria: "Business compliance notice",
  complianceTitle: "Compliance notice",
  complianceBody: "Business activities are subject to the company license and actual approvals. Licensed services such as Category II telecom value-added services and internet information services may be provided only after required approvals or licenses are obtained. This page is for technology consultation and inquiry collection only.",
  backToTop: "Back to top",
};

const translations: Record<Locale, Record<CopyKey, string>> = {
  "zh-CN": zhCN,
  "zh-Hant": zhHant,
  en,
};

const STORAGE_KEY = "juqianlead.locale.preference";

function isLocale(value: unknown): value is Locale {
  return value === "zh-CN" || value === "zh-Hant" || value === "en";
}

function storedPreference(): LocalePreference {
  if (typeof window === "undefined") return "auto";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(saved) ? saved : "auto";
  } catch {
    return "auto";
  }
}

function browserLocale(): Locale {
  if (typeof navigator === "undefined") return "zh-CN";
  const language = navigator.language.toLowerCase();
  if (language.includes("hant") || language.endsWith("-tw") || language.endsWith("-hk") || language.endsWith("-mo")) return "zh-Hant";
  if (language.startsWith("zh")) return "zh-CN";
  return "en";
}

export function localeFromCountry(country: string | null | undefined): Locale {
  const code = country?.trim().toUpperCase();
  if (code === "CN") return "zh-CN";
  if (code === "HK" || code === "MO" || code === "TW") return "zh-Hant";
  return "en";
}

interface I18nContextValue {
  locale: Locale;
  preference: LocalePreference;
  setPreference: (preference: LocalePreference) => void;
  t: (key: CopyKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({ children }: PropsWithChildren) {
  const [preference, setPreferenceState] = useState<LocalePreference>(storedPreference);
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = storedPreference();
    return saved === "auto" ? browserLocale() : saved;
  });

  useEffect(() => {
    if (preference !== "auto") {
      setLocale(preference);
      return;
    }

    let active = true;
    fetch("/api/locale", { cache: "no-store", headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error("Locale endpoint unavailable");
        return response.json() as Promise<{ country?: string | null }>;
      })
      .then(({ country }) => {
        if (active) setLocale(country ? localeFromCountry(country) : browserLocale());
      })
      .catch(() => {
        if (active) setLocale(browserLocale());
      });

    return () => {
      active = false;
    };
  }, [preference]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translations[locale].pageTitle;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", translations[locale].pageDescription);
  }, [locale]);

  const setPreference = (next: LocalePreference) => {
    setPreferenceState(next);
    try {
      if (next === "auto") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Keep the in-memory selection if browser storage is unavailable.
    }
    if (next !== "auto") setLocale(next);
  };

  const t = (key: CopyKey) => translations[locale][key];

  return <I18nContext.Provider value={{ locale, preference, setPreference, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside LocaleProvider");
  return value;
}
