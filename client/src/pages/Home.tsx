import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  FileCheck2,
  Globe2,
  LockKeyhole,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n, type LocalePreference } from "@/lib/i18n";

const directions = [
  { value: "AI工具（非交友/聊天）· 企业网络安全巡检辅助方案", key: "directionAi" },
  { value: "网络与信息安全软件方案咨询", key: "directionSecurity" },
  { value: "物联网技术研发与应用", key: "directionIot" },
  { value: "网络技术服务与技术咨询", key: "directionNetwork" },
  { value: "其他合规技术需求", key: "directionOther" },
] as const;

const services = [
  { icon: Network, index: "01", titleKey: "networkTitle", detailKey: "networkDetail" },
  { icon: ShieldCheck, index: "02", titleKey: "securityTitle", detailKey: "securityDetail" },
  { icon: BrainCircuit, index: "03", titleKey: "iotTitle", detailKey: "iotDetail" },
] as const;

export default function Home() {
  const { t, preference, setPreference } = useI18n();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submitLead = trpc.leads.submit.useMutation();
  const openInquiry = () => setDialogOpen(true);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(false);
    setSubmitError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const selectedInterest = String(data.get("interest") ?? "");
    const interest = directions.find((direction) => direction.value === selectedInterest)?.value ?? directions[0].value;
    if (data.get("privacyConsent") !== "on") {
      setSubmitError(t("consentError"));
      return;
    }

    try {
      await submitLead.mutateAsync({
        contactName: String(data.get("contactName") ?? "").trim(),
        companyName: String(data.get("companyName") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        email: email || undefined,
        interest,
        message: message || undefined,
        privacyConsent: true,
      });
      form.reset();
      setSent(true);
    } catch {
      setSubmitError(t("submitError"));
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (open) {
          setSent(false);
          setSubmitError("");
        }
      }}
    >
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t("brandAria")}>
          <span className="brand__mark" aria-hidden="true"><span>JQ</span></span>
          <span className="brand__text">
            <strong>{t("brandName")}</strong>
            <small>{t("brandTagline")}</small>
          </span>
        </a>
        <nav className="main-nav" aria-label={t("navAria")}>
          <a href="#solution">{t("navSolution")}</a>
          <a href="#reference">{t("navReference")}</a>
          <a href="#company">{t("navCompany")}</a>
        </nav>
        <div className="header-actions">
          <label className="language-picker">
            <Globe2 size={16} strokeWidth={1.8} />
            <select aria-label={t("languageLabel")} value={preference} onChange={(event) => setPreference(event.target.value as LocalePreference)}>
              <option value="auto">{t("languageAuto")}</option>
              <option value="zh-CN">简体中文</option>
              <option value="zh-Hant">繁體中文</option>
              <option value="en">English</option>
            </select>
          </label>
          <a className="header-contact" href="tel:+8615211857631">
            <Phone size={15} strokeWidth={1.8} />
            <span>{t("phoneConsult")}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero__copy">
            <div className="eyebrow"><span className="eyebrow__dot" /> {t("heroEyebrow")}</div>
            <h1 id="hero-title">{t("heroLine1")}<br /><span>{t("heroLine2")}</span><br />{t("heroLine3")}</h1>
            <p className="hero__intro">
              {t("heroIntro")}
            </p>
            <div className="hero__actions">
              <button className="button button--primary" type="button" onClick={openInquiry}>{t("heroSubmit")} <ArrowRight size={16} /></button>
              <a className="button button--text" href="#solution">{t("heroLearn")} <ArrowDown size={15} /></a>
            </div>
            <p className="hero__note"><LockKeyhole size={14} /> {t("privacyNote")}</p>
          </div>

          <div className="hero__visual" role="img" aria-label={t("visualAria")}>
            <div className="visual-card">
              <div className="visual-card__header">
                <div><span className="visual-card__overline">{t("visualOverline")}</span><strong>{t("visualTitle")}</strong></div>
                <span className="visual-card__badge"><span /> {t("visualBadge")}</span>
              </div>
              <div className="visual-map">
                <div className="visual-map__grid" />
                <div className="visual-map__orbit visual-map__orbit--outer" />
                <div className="visual-map__orbit visual-map__orbit--inner" />
                <div className="visual-map__core"><BrainCircuit size={31} strokeWidth={1.5} /><span>AI</span></div>
                <div className="visual-node visual-node--one"><Network size={16} /><span>{t("nodeAssets")}</span></div>
                <div className="visual-node visual-node--two"><ShieldCheck size={16} /><span>{t("nodeRisks")}</span></div>
                <div className="visual-node visual-node--three"><FileCheck2 size={16} /><span>{t("nodeReview")}</span></div>
                <span className="visual-map__spark visual-map__spark--one" />
                <span className="visual-map__spark visual-map__spark--two" />
              </div>
              <div className="visual-card__footer">
                <span>{t("visualFooterLeft")}</span><span>{t("visualFooterRight")} <ArrowRight size={13} /></span>
              </div>
            </div>
            <div className="hero__visual-caption"><span>{t("visualCaptionLeft")}</span><span>{t("visualCaptionRight")}</span></div>
          </div>
          <div className="hero__index" aria-hidden="true">01 <span>—</span> 04</div>
        </section>

        <section className="fit-strip" aria-label={t("stripAria")}>
          <div className="section-wrap fit-strip__inner">
            <span className="fit-strip__label">{t("stripLabel")}</span>
            <strong>{t("stripTitle")}</strong>
            <span className="fit-strip__divider" />
            <span>{t("stripDetail")}</span>
            <a href="#solution" aria-label={t("stripLink")}><ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section className="section-wrap section-block" id="solution">
          <div className="section-heading">
            <div><span className="section-kicker">{t("sectionOneKicker")}</span><h2>{t("sectionOneTitle")}</h2></div>
            <p>{t("sectionOneDesc")}</p>
          </div>
          <div className="idea-grid">
            <article className="idea-card idea-card--feature">
              <div className="idea-card__top"><span className="idea-card__tag">{t("featureTag")}</span><BrainCircuit size={23} /></div>
              <h3>{t("featureTitleOne")}<br />{t("featureTitleTwo")}</h3>
              <p>{t("featureDesc")}</p>
              <button type="button" onClick={openInquiry} className="inline-link">{t("featureAction")} <ArrowRight size={15} /></button>
              <div className="idea-card__orbit" aria-hidden="true"><span /><span /><span /></div>
            </article>
            <div className="idea-card-stack">
              {services.map(({ icon: Icon, index, titleKey, detailKey }) => (
                <article className="service-row" key={index}>
                  <div className="service-row__icon"><Icon size={19} strokeWidth={1.7} /></div>
                  <div className="service-row__body"><span className="service-row__index">{index} / {t("serviceIndexLabel")}</span><h3>{t(titleKey)}</h3><p>{t(detailKey)}</p></div>
                  <ChevronRight className="service-row__arrow" size={18} />
                </article>
              ))}
            </div>
          </div>
          <div className="process-note"><span className="process-note__line" /><span>{t("processNote")}</span></div>
        </section>

        <section className="reference-section" id="reference">
          <div className="section-wrap reference-layout">
            <div className="reference-intro">
              <span className="section-kicker section-kicker--light">{t("referenceKicker")}</span>
              <h2>{t("referenceTitleOne")}<br /><span>{t("referenceTitleTwo")}</span></h2>
              <p>{t("referenceIntro")}</p>
              <button className="reference-link" type="button" onClick={openInquiry}>{t("referenceAction")} <ArrowUpRight size={16} /></button>
            </div>
            <div className="reference-list">
              <article className="reference-item">
                <span className="reference-item__number">01</span>
                <div><h3>{t("referenceItemOneTitle")}</h3><p>{t("referenceItemOneDesc")}</p></div>
                <Check size={17} />
              </article>
              <article className="reference-item">
                <span className="reference-item__number">02</span>
                <div><h3>{t("referenceItemTwoTitle")}</h3><p>{t("referenceItemTwoDesc")}</p></div>
                <Check size={17} />
              </article>
              <article className="reference-item">
                <span className="reference-item__number">03</span>
                <div><h3>{t("referenceItemThreeTitle")}</h3><p>{t("referenceItemThreeDesc")}</p></div>
                <Check size={17} />
              </article>
              <article className="reference-item reference-item--amount">
                <span className="reference-item__number">04</span>
                <div><h3>{t("referenceItemFourTitle")}</h3><p>{t("referenceItemFourDesc")}</p></div>
                <span className="reference-item__flag">{t("referenceFlag")}</span>
              </article>
              <p className="reference-disclaimer">{t("referenceDisclaimer")}</p>
            </div>
          </div>
        </section>

        <section className="section-wrap contact-section" id="contact">
          <div className="contact-intro">
            <span className="section-kicker">{t("contactKicker")}</span>
            <h2>{t("contactTitleOne")}<br /><span>{t("contactTitleTwo")}</span></h2>
            <p>{t("contactDesc")}</p>
            <div className="contact-company" id="company">
              <span className="contact-company__mark">JQ</span>
              <div><strong>{t("companyName")}</strong><span><MapPin size={13} /> {t("companyAddress")}</span></div>
            </div>
            <a className="phone-link" href="tel:+8615211857631"><span className="phone-link__icon"><Phone size={17} /></span><span><small>{t("phoneConsult")}</small><strong>152-1185-7631</strong></span><ArrowUpRight size={16} /></a>
          </div>
          <div className="contact-cta-panel">
            <span className="contact-cta-panel__label">{t("contactCardLabel")}</span>
            <h3>{t("contactCardTitleOne")}<br />{t("contactCardTitleTwo")}</h3>
            <p>{t("contactCardDesc")}</p>
            <div className="contact-cta-panel__privacy"><LockKeyhole size={15} /><span>{t("contactCardPrivacy")}</span></div>
            <button className="button button--primary" type="button" onClick={openInquiry}>{t("contactFormButton")} <ArrowRight size={16} /></button>
          </div>
        </section>

        <DialogContent className="inquiry-dialog" showCloseButton={false}>
          <div className="inquiry-modal">
            <div className="inquiry-modal__accent" />
            <DialogClose asChild>
              <button className="inquiry-modal__close" type="button" aria-label={t("closeModal")}><X size={18} /></button>
            </DialogClose>
            <DialogHeader className="inquiry-modal__header">
              <span className="form-panel__label">{t("formEyebrow")}</span>
              <DialogTitle className="inquiry-modal__title">{t("formTitle")}</DialogTitle>
              <DialogDescription className="inquiry-modal__description">{t("formDescription")}</DialogDescription>
            </DialogHeader>
            <div className="form-panel inquiry-modal__form-panel">
              {sent && <div className="form-feedback form-feedback--success" role="status"><span><Check size={17} /></span><div><strong>{t("successTitle")}</strong><small>{t("successDescription")}</small></div></div>}
              {submitError && <div className="form-feedback form-feedback--error" role="alert">{submitError}</div>}
              <form className="lead-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label className="field"><span>{t("fieldName")} <b>*</b></span><input name="contactName" autoComplete="name" maxLength={80} placeholder={t("placeholderName")} required /></label>
                  <label className="field"><span>{t("fieldCompany")} <b>*</b></span><input name="companyName" autoComplete="organization" maxLength={160} placeholder={t("placeholderCompany")} required /></label>
                  <label className="field"><span>{t("fieldPhone")} <b>*</b></span><input name="phone" type="tel" autoComplete="tel" maxLength={24} pattern="[+0-9()\- ]{7,24}" title={t("invalidPhone")} placeholder={t("placeholderPhone")} required /></label>
                  <label className="field"><span>{t("fieldEmail")} <em>{t("optional")}</em></span><input name="email" type="email" autoComplete="email" maxLength={320} placeholder="name@example.com" /></label>
                  <label className="field field--wide"><span>{t("fieldInterest")} <b>*</b></span>
                    <select name="interest" defaultValue={directions[0].value} required>
                      {directions.map(({ value, key }) => <option key={value} value={value}>{t(key)}</option>)}
                    </select>
                  </label>
                  <label className="field field--wide"><span>{t("fieldMessage")} <em>{t("optional")}</em></span><textarea name="message" maxLength={500} rows={3} placeholder={t("placeholderMessage")} /></label>
                </div>
                <label className="consent-field"><input type="checkbox" name="privacyConsent" required /><span>{t("consentText")}</span></label>
                <button className="button button--submit" type="submit" disabled={submitLead.isPending}>
                  {submitLead.isPending ? t("submitPending") : t("submitButton")}{!submitLead.isPending && <ArrowRight size={16} />}
                </button>
                <p className="form-privacy" id="privacy">{t("privacyFooter")}</p>
              </form>
            </div>
          </div>
        </DialogContent>

        <section className="compliance-band" aria-label={t("complianceAria")}>
          <div className="section-wrap compliance-band__inner"><ShieldCheck size={20} /><p><strong>{t("complianceTitle")}</strong>　{t("complianceBody")}</p></div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand brand--footer" href="#top"><span className="brand__mark" aria-hidden="true"><span>JQ</span></span><span className="brand__text"><strong>{t("brandName")}</strong><small>{t("brandTagline")}</small></span></a>
        <p>{t("companyName")} <span>·</span> {t("companyAddress")}</p>
        <a href="#top" className="back-top">{t("backToTop")} <ArrowUpRight size={14} /></a>
      </footer>
    </div>
    </Dialog>
  );
}
