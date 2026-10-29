import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  FileCheck2,
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

const directions = [
  "AI工具（非交友/聊天）· 企业网络安全巡检辅助方案",
  "网络与信息安全软件方案咨询",
  "物联网技术研发与应用",
  "网络技术服务与技术咨询",
  "其他合规技术需求",
] as const;

const services = [
  {
    icon: Network,
    index: "01",
    title: "网络技术服务",
    detail: "围绕企业网络技术需求，沟通技术开发、实施与优化方向。",
  },
  {
    icon: ShieldCheck,
    index: "02",
    title: "网络安全软件",
    detail: "聚焦网络与信息安全软件的产品构想、功能梳理与方案评估。",
  },
  {
    icon: BrainCircuit,
    index: "03",
    title: "物联网与智能工具",
    detail: "结合物联网技术研发与 AI 工具场景，讨论适合团队的应用路径。",
  },
];

export default function Home() {
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
    const interest = directions.find((direction) => direction === selectedInterest) ?? directions[0];
    if (data.get("privacyConsent") !== "on") {
      setSubmitError("请先阅读并同意信息使用说明。");
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
      setSubmitError("暂时未能提交。请检查必填信息及联系电话，并确认补充说明不含身份证、银行账户或密码；也可稍后重试或拨打页面电话咨询。");
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
        <a className="brand" href="#top" aria-label="聚乾科技，返回页面顶部">
          <span className="brand__mark" aria-hidden="true"><span>JQ</span></span>
          <span className="brand__text">
            <strong>聚乾科技</strong>
            <small>企业技术方案咨询</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#solution">方案方向</a>
          <a href="#reference">合作参考</a>
          <a href="#company">企业信息</a>
        </nav>
        <a className="header-contact" href="tel:+8615211857631">
          <Phone size={15} strokeWidth={1.8} />
          <span>电话咨询</span>
          <ArrowUpRight size={14} />
        </a>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero__copy">
            <div className="eyebrow"><span className="eyebrow__dot" /> AI TOOL / 网络安全工具方案</div>
            <h1 id="hero-title">把 AI 做成工具，<br /><span>让巡检思路</span><br />更清晰。</h1>
            <p className="hero__intro">
              面向企业团队的非聊天类 AI 工具方案咨询，聚焦网络安全巡检辅助场景；从需求梳理到功能方向评估，和你一起把想法落到合适的技术路径上。
            </p>
            <div className="hero__actions">
              <button className="button button--primary" type="button" onClick={openInquiry}>提交项目意向 <ArrowRight size={16} /></button>
              <a className="button button--text" href="#solution">了解方案方向 <ArrowDown size={15} /></a>
            </div>
            <p className="hero__note"><LockKeyhole size={14} /> 不收集身份证或银行账户信息</p>
          </div>

          <div className="hero__visual" aria-label="企业网络安全巡检工具方案示意图">
            <div className="visual-card">
              <div className="visual-card__header">
                <div><span className="visual-card__overline">SOLUTION SKETCH / 01</span><strong>智能巡检辅助</strong></div>
                <span className="visual-card__badge"><span /> 方案示意</span>
              </div>
              <div className="visual-map">
                <div className="visual-map__grid" />
                <div className="visual-map__orbit visual-map__orbit--outer" />
                <div className="visual-map__orbit visual-map__orbit--inner" />
                <div className="visual-map__core"><BrainCircuit size={31} strokeWidth={1.5} /><span>AI</span></div>
                <div className="visual-node visual-node--one"><Network size={16} /><span>网络资产</span></div>
                <div className="visual-node visual-node--two"><ShieldCheck size={16} /><span>风险线索</span></div>
                <div className="visual-node visual-node--three"><FileCheck2 size={16} /><span>人工复核</span></div>
                <span className="visual-map__spark visual-map__spark--one" />
                <span className="visual-map__spark visual-map__spark--two" />
              </div>
              <div className="visual-card__footer">
                <span>从信息梳理开始</span><span>以人工判断为核心 <ArrowRight size={13} /></span>
              </div>
            </div>
            <div className="hero__visual-caption"><span>IDEA → REVIEW → ACTION</span><span>按真实业务需求评估</span></div>
          </div>
          <div className="hero__index" aria-hidden="true">01 <span>—</span> 04</div>
        </section>

        <section className="fit-strip" aria-label="业务方向简述">
          <div className="section-wrap fit-strip__inner">
            <span className="fit-strip__label">本页聚焦</span>
            <strong>AI 工具（非交友 / 聊天）</strong>
            <span className="fit-strip__divider" />
            <span>企业网络与信息安全巡检辅助方向</span>
            <a href="#solution" aria-label="查看方案方向"><ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section className="section-wrap section-block" id="solution">
          <div className="section-heading">
            <div><span className="section-kicker">WHAT WE DISCUSS / 01</span><h2>从一个清楚的问题开始。</h2></div>
            <p>不是泛泛的聊天机器人，而是围绕企业实际工作流，讨论能辅助团队的信息整理与安全巡检工具。</p>
          </div>
          <div className="idea-grid">
            <article className="idea-card idea-card--feature">
              <div className="idea-card__top"><span className="idea-card__tag">主打方向 · AI TOOL</span><BrainCircuit size={23} /></div>
              <h3>企业网络安全<br />巡检辅助工具</h3>
              <p>可沟通网络资产梳理、风险线索归纳、巡检记录整理等辅助场景。实际功能、数据来源与交付范围，均需结合项目需求评估。</p>
              <button type="button" onClick={openInquiry} className="inline-link">聊聊你的使用场景 <ArrowRight size={15} /></button>
              <div className="idea-card__orbit" aria-hidden="true"><span /><span /><span /></div>
            </article>
            <div className="idea-card-stack">
              {services.map(({ icon: Icon, index, title, detail }) => (
                <article className="service-row" key={index}>
                  <div className="service-row__icon"><Icon size={19} strokeWidth={1.7} /></div>
                  <div className="service-row__body"><span className="service-row__index">{index} / 技术服务</span><h3>{title}</h3><p>{detail}</p></div>
                  <ChevronRight className="service-row__arrow" size={18} />
                </article>
              ))}
            </div>
          </div>
          <div className="process-note"><span className="process-note__line" /><span>页面展示的是方案咨询方向，不代表产品已上线或相关技术能力已完成交付。</span></div>
        </section>

        <section className="reference-section" id="reference">
          <div className="section-wrap reference-layout">
            <div className="reference-intro">
              <span className="section-kicker section-kicker--light">ACCOUNT & FUNDING / 02</span>
              <h2>合作前，先把<br /><span>要求看明白。</span></h2>
              <p>以下条件整理自你提供的图片，只作为沟通前的第三方规则参考。开户资格、政策及金额请务必向对应平台再次核实。</p>
              <button className="reference-link" type="button" onClick={openInquiry}>就具体情况咨询 <ArrowUpRight size={16} /></button>
            </div>
            <div className="reference-list">
              <article className="reference-item">
                <span className="reference-item__number">01</span>
                <div><h3>开户主体</h3><p>图片建议主体优先为中国大陆或中国香港。</p></div>
                <Check size={17} />
              </article>
              <article className="reference-item">
                <span className="reference-item__number">02</span>
                <div><h3>新加坡地区执照</h3><p>图片称可提交审核，并需客户提供 ACRA 公司注册执照；以平台实际审核为准。</p></div>
                <Check size={17} />
              </article>
              <article className="reference-item">
                <span className="reference-item__number">03</span>
                <div><h3>客户与主体匹配</h3><p>图片称可接国内出海客户；海外客户使用国内主体无法开户，需向平台确认适用范围。</p></div>
                <Check size={17} />
              </article>
              <article className="reference-item reference-item--amount">
                <span className="reference-item__number">04</span>
                <div><h3>充值门槛参考</h3><p>图片称首充及后续充值最低为 <strong>5,000</strong>，且不可协商；原图未注明币种。</p></div>
                <span className="reference-item__flag">需再次确认</span>
              </article>
              <p className="reference-disclaimer">非开户承诺，非官方规则说明；具体审核主体、可投行业、客户地域、充值金额与币种，以平台书面确认为准。</p>
            </div>
          </div>
        </section>

        <section className="section-wrap contact-section" id="contact">
          <div className="contact-intro">
            <span className="section-kicker">LET’S TALK / 03</span>
            <h2>把需求告诉我们，<br /><span>先聊方案，再做判断。</span></h2>
            <p>留下基本联系方式与项目方向，便于我们了解你的需求。请勿在表单或备注中填写身份证、银行卡、账户密码等敏感信息。</p>
            <div className="contact-company" id="company">
              <span className="contact-company__mark">JQ</span>
              <div><strong>长沙聚乾科技有限公司</strong><span><MapPin size={13} /> 湖南省长沙市 · 雨花区</span></div>
            </div>
            <a className="phone-link" href="tel:+8615211857631"><span className="phone-link__icon"><Phone size={17} /></span><span><small>电话咨询</small><strong>152-1185-7631</strong></span><ArrowUpRight size={16} /></a>
          </div>
          <div className="contact-cta-panel">
            <span className="contact-cta-panel__label">PROJECT INQUIRY</span>
            <h3>描述你的使用场景，<br />我们来一起梳理。</h3>
            <p>提交表单后，意向信息会保存到项目数据库。我们只收集沟通所需的基本信息。</p>
            <div className="contact-cta-panel__privacy"><LockKeyhole size={15} /><span>不收集身份证或银行账户信息</span></div>
            <button className="button button--primary" type="button" onClick={openInquiry}>打开意向表单 <ArrowRight size={16} /></button>
          </div>
        </section>

        <DialogContent className="inquiry-dialog" showCloseButton={false}>
          <div className="inquiry-modal">
            <div className="inquiry-modal__accent" />
            <DialogClose asChild>
              <button className="inquiry-modal__close" type="button" aria-label="关闭弹窗"><X size={18} /></button>
            </DialogClose>
            <DialogHeader className="inquiry-modal__header">
              <span className="form-panel__label">PROJECT INQUIRY / 03</span>
              <DialogTitle className="inquiry-modal__title">提交项目意向</DialogTitle>
              <DialogDescription className="inquiry-modal__description">留下基本联系方式与项目方向，我们会据此了解你的需求。带 * 为必填项。</DialogDescription>
            </DialogHeader>
            <div className="form-panel inquiry-modal__form-panel">
              {sent && <div className="form-feedback form-feedback--success" role="status"><span><Check size={17} /></span><div><strong>提交成功，感谢你的信任。</strong><small>你的意向已安全保存，我们会根据你提供的联系方式跟进沟通。</small></div></div>}
              {submitError && <div className="form-feedback form-feedback--error" role="alert">{submitError}</div>}
              <form className="lead-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label className="field"><span>联系人姓名 <b>*</b></span><input name="contactName" autoComplete="name" maxLength={80} placeholder="怎么称呼你" required /></label>
                  <label className="field"><span>企业名称 <b>*</b></span><input name="companyName" autoComplete="organization" maxLength={160} placeholder="填写企业或团队名称" required /></label>
                  <label className="field"><span>联系电话 <b>*</b></span><input name="phone" type="tel" autoComplete="tel" maxLength={24} pattern="[+0-9()\- ]{7,24}" title="请输入有效的联系电话" placeholder="便于我们与你联系" required /></label>
                  <label className="field"><span>联系邮箱 <em>选填</em></span><input name="email" type="email" autoComplete="email" maxLength={320} placeholder="name@example.com" /></label>
                  <label className="field field--wide"><span>咨询方向 <b>*</b></span>
                    <select name="interest" defaultValue={directions[0]} required>
                      {directions.map((direction) => <option key={direction} value={direction}>{direction}</option>)}
                    </select>
                  </label>
                  <label className="field field--wide"><span>补充说明 <em>选填</em></span><textarea name="message" maxLength={500} rows={3} placeholder="简单说说业务场景或希望解决的问题（最多 500 字）" /></label>
                </div>
                <label className="consent-field"><input type="checkbox" name="privacyConsent" required /><span>我已阅读并同意：提交的信息仅用于回应本次咨询及后续沟通，并保存在网站后端数据库。我不会在表单中提交身份证、银行账户或密码等敏感信息。</span></label>
                <button className="button button--submit" type="submit" disabled={submitLead.isPending}>
                  {submitLead.isPending ? "正在提交…" : "提交咨询"}{!submitLead.isPending && <ArrowRight size={16} />}
                </button>
                <p className="form-privacy" id="privacy">如需查询、更正或申请删除已提交信息，请拨打页面电话联系。我们不会在页面公开你的表单内容。</p>
              </form>
            </div>
          </div>
        </DialogContent>

        <section className="compliance-band" aria-label="业务合规提示">
          <div className="section-wrap compliance-band__inner"><ShieldCheck size={20} /><p><strong>合规提示</strong>　企业业务以营业执照及实际获批范围为准；第二类增值电信业务、互联网信息服务等许可项目，须依法取得批准或许可后方可开展。本页面仅用于技术方案咨询与意向收集。</p></div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand brand--footer" href="#top"><span className="brand__mark" aria-hidden="true"><span>JQ</span></span><span className="brand__text"><strong>聚乾科技</strong><small>企业技术方案咨询</small></span></a>
        <p>长沙聚乾科技有限公司 <span>·</span> 长沙市雨花区</p>
        <a href="#top" className="back-top">回到顶部 <ArrowUpRight size={14} /></a>
      </footer>
    </div>
    </Dialog>
  );
}
