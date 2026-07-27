"use client";

import { useEffect, useState } from "react";

const skills = [
  "Java / Spring Boot",
  "Docker / Harbor",
  "Kubernetes / Istio",
  "Prometheus / Grafana",
  "RAG / Milvus",
  "Go（工程辅助）",
];

const projects = [
  {
    number: "01", mark: "N", stage: "2023.10—2026.03", slug: "nativesphere",
    flow: ["资源管理", "应用交付", "服务治理", "监控告警", "AI 辅助运维"],
    category: "平台工程", name: "NativeSphere", subtitle: "企业级云原生平台",
    role: "Java / 全栈研发工程师", scope: "平台控制面 / 可观测性 / AI 运维",
    challenge: "企业需要在统一平台中完成 Kubernetes 资源与应用交付、服务治理、运行观测和故障处置，并保证平台操作与真实集群状态一致；监控告警智能助手进一步消费资源、指标、事件和日志上下文，通过 RAG 提供可追溯的辅助分析。",
    details: [
      { title: "平台控制面", text: "封装 Kubernetes API，完成资源模型转换、生命周期操作、状态同步、事件日志及异常处理，并串联 Docker 构建与 Harbor 制品交付。" },
      { title: "服务治理与可观测性", text: "接入 Istio 路由与限流策略；将资源模型映射至 Prometheus 指标，关联告警、资源状态、事件和日志形成排障链路。" },
      { title: "AI 辅助运维", text: "聚合告警、指标、日志与资源上下文，结合 RAG 检索运维知识和历史处置记录，生成带依据的原因分析与处理建议。" },
      { title: "全栈交付", text: "参与 Vue 管理端页面、接口联调、测试发布、部署排障和文档沉淀，覆盖功能从设计到运行验证的完整过程。" },
    ],
    value: "形成资源接管、制品交付、应用部署、服务治理、运行观测与事件处置的一体化闭环，降低研发和运维团队使用云原生基础设施的复杂度。",
    tags: ["Java", "Vue", "Kubernetes", "Istio", "Prometheus", "RAG"], tone: "cyan",
  },
  {
    number: "02", mark: "R", stage: "2024.06—2026.03", slug: "release-flow",
    flow: ["发布申请", "执行编排", "K8s / Jenkins", "状态跟踪", "异常恢复"],
    category: "持续交付", name: "Release Flow", subtitle: "云原生持续交付与发布平台",
    role: "Java / 全栈研发工程师", scope: "版本 / 制品 / 环境 / 发布执行",
    challenge: "不同项目既有直接向 Kubernetes 部署的需求，也有复用 Jenkins Pipeline 的交付方式，需要统一发布对象、执行状态和异常恢复机制。",
    details: [
      { title: "发布领域建模", text: "围绕应用版本、构建制品、目标环境、发布批次、执行记录和状态流转建立统一模型。" },
      { title: "双执行通道", text: "根据发布方式编排 Kubernetes 直接部署或 Jenkins Pipeline，统一参数传递、状态回读、日志和结果处理。" },
      { title: "异常恢复", text: "完善幂等校验、失败重试、超时处理、环境隔离和回滚机制，处理重复触发、状态不一致及流程中断。" },
      { title: "发布控制台", text: "参与 Vue 端发布创建、执行方式选择、环境配置、进度日志、重试与回滚页面及接口联调。" },
    ],
    value: "将 Kubernetes 与 Jenkins 两类发布方式纳入同一控制面，建立版本、制品、环境、任务和结果的端到端追溯关系。",
    tags: ["Spring Boot", "Vue", "Kubernetes", "Jenkins", "Pipeline"], tone: "violet",
  },
  {
    number: "03", mark: "B", stage: "2024.10—2026.03", slug: "bpaas",
    flow: ["服务接入", "接口配置", "环境映射", "路由下发", "状态回传"],
    category: "微服务基础设施", name: "BPAAS", subtitle: "统一网关与服务接入平台",
    role: "Java 后端开发工程师", scope: "服务 / 接口 / 环境 / 路由配置",
    challenge: "多个内部业务系统需要通过一致的接入规范管理服务、接口、环境和路由，并与网关执行模块保持配置及运行状态同步。",
    details: [
      { title: "接入模型", text: "参与服务、接口、环境和路由领域模型及后端接口开发，完善参数校验、关联关系和状态管理。" },
      { title: "网关协同", text: "对接网关核心模块，完成路由配置下发、处理结果回读、异常记录和运行状态同步。" },
      { title: "运行支持", text: "维护调用记录和运行信息，配合网关研发完成策略验证、系统联调、问题定位及版本发布。" },
    ],
    value: "形成统一的服务接入和配置管理流程，提升内部系统网关接入的规范性、可维护性与问题追溯能力。",
    tags: ["Java", "Spring Cloud", "MyBatis", "MySQL", "Redis", "API Gateway"], tone: "orange",
  },
  {
    number: "04", mark: "O", stage: "2024.10—2026.03", slug: "oa",
    flow: ["业务申请", "流程审批", "权限校验", "状态流转", "审计追踪"],
    category: "企业业务系统", name: "OA", subtitle: "企业内部综合管理系统",
    role: "Java 全栈开发工程师", scope: "业务流程 / 权限 / 前后端功能",
    challenge: "内部申请与审批流程需要线上化，并在多角色协作中保证权限边界、状态流转和操作记录清晰可追溯。",
    details: [
      { title: "全栈模块交付", text: "参与需求梳理和模块设计，独立完成部分功能的数据表、后端接口、Vue 页面及前后端联调。" },
      { title: "流程与审计", text: "实现申请提交、审批处理、状态流转和操作记录，保证业务过程可查询、可追踪。" },
      { title: "权限与体验", text: "维护用户、角色、菜单及数据权限，完成列表、表单、详情和审批页面的交互及异常提示。" },
    ],
    value: "完成从数据模型、服务接口到前端交互的端到端交付，将线下流程转化为具有权限控制和审计能力的线上业务流程。",
    tags: ["Java", "Spring Boot", "Vue", "MySQL", "Redis", "JWT"], tone: "pink",
  },
  {
    number: "05", mark: "C", stage: "2026.04—至今", slug: "cloudops",
    flow: ["事件接入", "工单生成", "分派流转", "协同处置", "知识沉淀"],
    category: "独立交付项目", name: "CloudOps", subtitle: "智能工单与协同处置平台",
    role: "全栈方案设计与实现", scope: "工单流程 / 规则分派 / SLA / AI 辅助",
    challenge: "监控告警、人工反馈和运维任务分散在不同渠道，缺少统一事件入口、责任分派、处理时限、协作记录和复盘知识。",
    details: [
      { title: "事件与工单模型", text: "统一告警事件、人工报障和运维任务，设计工单、处理人、优先级、状态、SLA 和操作时间线等核心对象。" },
      { title: "流转与协同机制", text: "围绕创建、分派、接单、转派、处理、验证和关闭组织状态流转，并保留评论、附件及操作记录。" },
      { title: "智能辅助", text: "结合历史工单与知识库，为工单分类、相似问题检索、处置建议和复盘摘要提供辅助能力。" },
    ],
    value: "形成事件接入、责任分派、SLA 管理、协同处置、过程审计与知识复用的完整闭环，体现复杂业务建模、全栈交付及 AI 与实际工作流结合的能力。",
    tags: ["Java", "Spring Boot", "Vue", "MySQL", "Redis", "Workflow", "RAG"], tone: "cyan",
  },
];

const capabilityItems = [
  { label: "系统设计", title: "系统设计", text: "从业务需求出发，拆解对象、状态、接口边界和模块关系。" },
  { label: "平台整合", title: "平台整合", text: "把后端服务与运行基础设施连接起来，形成统一、可使用的业务能力。" },
  { label: "工程交付", title: "工程交付", text: "持续跟进实现、联调、验证、上线和问题维护，关注最终运行结果。" },
  { label: "技术延展", title: "技术延展", text: "把新技术转化为可验证、可落地的工程方案，扩展系统解决问题的边界。" },
];

export default function Home() {
  const [copyMessage, setCopyMessage] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [activeCase, setActiveCase] = useState(projects[0].slug);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setShowTopButton(window.scrollY > 520);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const projectCards = Array.from(document.querySelectorAll<HTMLElement>(".project-card[id^='case-']"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveCase(entry.target.id.replace("case-", ""));
      });
    }, { rootMargin: "-18% 0px -62% 0px", threshold: 0 });

    projectCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal-item"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px" });

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const copyContact = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label}已复制`);
      window.setTimeout(() => setCopyMessage(""), 2200);
    } catch {
      setCopyMessage("复制失败，请手动复制");
      window.setTimeout(() => setCopyMessage(""), 2200);
    }
  };

  return (
    <main className="portfolio-shell" id="top">
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <aside className="profile-rail" aria-label="个人信息">
        <div className="rail-inner">
          <div className="rail-brand"><span className="brand-mark">F</span><span>平台工程 / 01</span></div>

          <div className="profile-block">
            <div className="profile-orbit"><span>FH</span></div>
            <p className="rail-kicker">技术栈 / 能力域</p>
            <h1>Java 后端<br /><em>工程师</em></h1>
            <p className="profile-summary">Java / Spring Boot · Docker / Kubernetes · Prometheus / Grafana · RAG / Milvus</p>
            <div className="availability"><i /> 正在寻找合适机会</div>
          </div>

          <div className="rail-section">
            <p className="rail-label">核心技术栈</p>
            <div className="stack-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>

          <div className="rail-section rail-links">
            <p className="rail-label">页面导航</p>
            <a href="#projects">项目案例 <span>↗</span></a>
            <a href="#capabilities">能力边界 <span>↗</span></a>
            <a href="#experience">工作经历 <span>↗</span></a>
          </div>

          <div className="rail-bottom">
            <a className="rail-button" href="/resume.pdf" download>下载 PDF 简历 <span>↓</span></a>
            <p>© 2026 / 简历作品集</p>
          </div>
        </div>
      </aside>

      <section className="content-column">
        <header className="content-topbar">
          <span>精选项目 / 2023—2026</span>
          <a href="#contact">联系我 <span>↗</span></a>
        </header>

        <section className="overview-section" aria-labelledby="overview-title">
          <div className="section-marker"><span>00</span><i /><span>总览</span></div>
          <div className="overview-grid overview-ability-grid">
            <div className="overview-intro">
              <span className="overview-kicker">核心技术能力</span>
              <h2 id="overview-title">核心技术<br /><strong>能力覆盖</strong></h2>
              <p>以 Java / Spring Boot 为主，具备云原生平台、服务治理、监控告警与 RAG 应用的项目经验。</p>
            </div>
            <div className="overview-stack-grid" aria-label="核心技术能力">
              <article className="overview-stack-card reveal-item">
                <div className="overview-stack-card-top"><span>01 / 后端服务</span><i /></div>
                <strong>Java · Spring Boot</strong>
                <p>服务建模、接口设计、业务流程与状态管理</p>
                <div className="overview-stack-tags"><span>Java</span><span>Spring Boot</span><span>REST</span></div>
              </article>
              <article className="overview-stack-card reveal-item">
                <div className="overview-stack-card-top"><span>02 / 云原生平台</span><i /></div>
                <strong>Docker · Kubernetes · Istio</strong>
                <p>镜像制品、应用编排、集群接入与服务治理</p>
                <div className="overview-stack-tags"><span>Docker</span><span>Kubernetes</span><span>Istio</span></div>
              </article>
              <article className="overview-stack-card reveal-item">
                <div className="overview-stack-card-top"><span>03 / 可观测性</span><i /></div>
                <strong>Prometheus · Grafana</strong>
                <p>指标采集、监控面板、告警规则与异常定位</p>
                <div className="overview-stack-tags"><span>Metrics</span><span>Alerting</span><span>Tracing</span></div>
              </article>
              <article className="overview-stack-card reveal-item">
                <div className="overview-stack-card-top"><span>04 / AI 工程化</span><i /></div>
                <strong>RAG · Milvus · SSE</strong>
                <p>知识入库、检索增强、引用证据与流式问答</p>
                <div className="overview-stack-tags"><span>RAG</span><span>Embedding</span><span>SSE</span></div>
              </article>
            </div>
          </div>
          <div className="metric-strip overview-tech-strip"><div><strong>Java / Spring Boot</strong><span>主力后端技术</span></div><div><strong>Docker / K8s</strong><span>云原生运行基础</span></div><div><strong>Prometheus / Grafana</strong><span>监控与告警体系</span></div><div><strong>Go / dockertool</strong><span>工程辅助能力</span></div></div>
        </section>

        <section className="content-section" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-marker"><span>个人定位</span><i /><span>能力概览</span></div>
          <div className="section-heading"><h2 id="capabilities-title">能力概览</h2><p>覆盖 Java 后端、云原生平台、可观测性与 AI 应用，具体实践见下方项目案例。</p></div>
          <div className="capability-grid">{capabilityItems.map((item) => <article className="capability-card reveal-item" key={item.title}><div className="capability-card-top"><span>{item.label}</span><i /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-marker"><span>02</span><i /><span>精选项目</span></div>
          <div className="section-heading project-heading"><h2 id="projects-title">项目案例</h2><p>每个项目按四层展开：项目定位、负责边界、关键工程动作和最终价值，让贡献不再停留在技术名词。</p></div>
          <div className="project-index" aria-label="项目索引"><span>项目索引</span><div>{projects.map((project) => <a className={activeCase === project.slug ? "is-active" : ""} href={`#case-${project.slug}`} key={project.slug}>{project.name}</a>)}</div></div>
          <div className="project-stack">{projects.map((project) => <article id={`case-${project.slug}`} className={`project-card project-${project.tone} reveal-item`} key={project.number}><div className="project-detail"><div className="project-name-line"><span>{project.category}</span><span>{project.stage}</span></div><div className="project-title-line"><h3>{project.name}</h3><a className="project-detail-link" href={`/projects/${project.slug}`}>查看工程视图 <span>↗</span></a></div><h4>{project.subtitle}</h4><div className="project-facts"><div><span>角色定位</span><strong>{project.role}</strong></div><div><span>负责范围</span><strong>{project.scope}</strong></div></div>{project.slug === "nativesphere" && <div className="project-subsystem-links" aria-label="NativeSphere 重点子系统"><span>重点子系统</span><a href="/projects/nativesphere/observability"><b>监控与告警系统</b><small>资源、指标、告警、事件与日志关联 →</small></a><a className="ai-link" href="/projects/nativesphere/ai-ops"><b>监控告警智能助手</b><small>告警上下文、RAG 检索与辅助处置 →</small></a></div>}<div className="project-flow" aria-label={`${project.name} 工程链路`}>{project.flow.map((step, index) => <div className="project-flow-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < project.flow.length - 1 && <i aria-hidden="true" />}</div>)}</div><div className="detail-block"><span className="detail-label">问题边界</span><p>{project.challenge}</p></div><div className="detail-block"><span className="detail-label">关键工程动作</span><div className="work-grid">{project.details.map((detail, index) => <div className="work-item" key={detail.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h5>{detail.title}</h5><p>{detail.text}</p></div></div>)}</div></div><div className="project-value"><span className="detail-label">工程价值</span><p>{project.value}</p></div><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        </section>

        <section className="content-section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-marker"><span>03</span><i /><span>经历</span></div>
          <div className="section-heading"><h2 id="experience-title">经历与方向</h2><p>从后端开发进入云原生平台建设，在真实项目中不断扩大对系统边界和交付结果的负责范围。</p></div>
          <div className="experience-list"><div className="experience-item reveal-item"><span className="experience-date">2023.06 — 2026.03</span><div><h3>航天宏图信息技术股份有限公司</h3><p>Java 后端工程师 · 云原生应用管理 / 镜像制品 / 服务治理 / 项目交付支持</p></div><span className="experience-type">正式工作</span></div><div className="experience-item reveal-item"><span className="experience-date">2020 — 2024</span><div><h3>东北林业大学</h3><p>本科 · 软件工程</p></div><span className="experience-type">教育经历</span></div></div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-glow" />
          <div className="section-marker"><span>04</span><i /><span>联系</span></div>
          <h2 id="contact-title">联系我</h2>
          <p>求职方向：Java 后端开发、云原生平台开发</p>
          <div className="contact-actions"><button className="contact-copy" type="button" onClick={() => void copyContact("wh51368230@163.com", "邮箱")}><img className="contact-icon contact-icon-image" src="/contact-email.png" alt="" /><span>wh51368230@163.com</span><small>复制</small></button><button className="contact-copy" type="button" onClick={() => void copyContact("13051368230", "手机号")}><img className="contact-icon contact-icon-image" src="/contact-phone.png" alt="" /><span>13051368230</span><small>复制</small></button><a className="contact-resume" href="/resume.pdf" download>下载简历 <span>↓</span></a></div>
          {copyMessage && <div className="copy-toast" role="status" aria-live="polite"><i />{copyMessage}</div>}
        </section>

        <footer className="content-footer"><span>Java 后端 / 平台工程</span><span>工程能力展示</span></footer>
      </section>
      <button className={`back-to-top${showTopButton ? " is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="回到顶部">↑</button>
    </main>
  );
}
