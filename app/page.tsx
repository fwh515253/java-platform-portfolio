"use client";

import { useEffect, useState } from "react";
import AgentAssistant from "./agent-assistant";

const resumePath = "/范文豪-Java全栈开发工程师.pdf";

const skills = [
  "Java / Spring Boot",
  "Docker / Harbor",
  "Kubernetes / Istio",
  "Prometheus / Grafana",
  "RAG / Milvus",
  "Go（工程辅助）",
];

const capabilities = [
  { code: "01", title: "Java 后端", text: "业务建模、接口设计、状态流转、数据处理与异常治理。", tags: ["Java", "Spring Boot", "MyBatis"] },
  { code: "02", title: "云原生平台", text: "应用发布、镜像制品、集群资源、服务治理和运行状态管理。", tags: ["Docker", "Kubernetes", "Istio"] },
  { code: "03", title: "可观测性", text: "指标查询、监控看板、告警规则、事件关联和线上问题定位。", tags: ["Prometheus", "Grafana", "PromQL"] },
  { code: "04", title: "AI 应用工程化", text: "文档解析、向量检索、知识库问答、证据引用和流式响应。", tags: ["RAG", "Milvus", "SSE"] },
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
    evidence: ["已上线使用", "支持 100+ 服务监控", "资源 / 指标 / 告警关联"],
    tags: ["Java", "Vue", "Kubernetes", "Istio", "Prometheus", "RAG"], tone: "blue",
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
    evidence: ["Kubernetes / Jenkins 双通道", "状态与日志统一追踪", "失败重试与回滚"],
    tags: ["Spring Boot", "Vue", "Kubernetes", "Jenkins", "Pipeline"], tone: "lilac",
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
    evidence: ["服务 / 接口 / 环境 / 路由模型", "配置下发与状态回读", "网关联调与问题定位"],
    tags: ["Java", "Spring Cloud", "MyBatis", "MySQL", "Redis", "API Gateway"], tone: "peach",
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
    evidence: ["端到端全栈模块交付", "审批状态可追踪", "权限与审计留痕"],
    tags: ["Java", "Spring Boot", "Vue", "MySQL", "Redis", "JWT"], tone: "rose",
  },
  {
    number: "05", mark: "C", stage: "正式项目 / 已上线", slug: "cloudops",
    flow: ["事件接入", "工单生成", "分派流转", "协同处置", "知识沉淀"],
    category: "智能运维平台", name: "CloudOps", subtitle: "智能工单与协同处置平台",
    role: "Java 后端 / 平台工程", scope: "工单流程 / 规则分派 / SLA / AI 辅助",
    challenge: "监控告警、人工反馈和运维任务分散在不同渠道，缺少统一事件入口、责任分派、处理时限、协作记录和复盘知识。",
    details: [
      { title: "事件与工单模型", text: "统一告警事件、人工报障和运维任务，设计工单、处理人、优先级、状态、SLA 和操作时间线等核心对象。" },
      { title: "流转与协同机制", text: "围绕创建、分派、接单、转派、处理、验证和关闭组织状态流转，并保留评论、附件及操作记录。" },
      { title: "智能辅助", text: "结合历史工单与知识库，为工单分类、相似问题检索、处置建议和复盘摘要提供辅助能力。" },
    ],
    value: "面向真实运维场景落地事件接入、责任分派、SLA 管理、协同处置、过程审计与知识复用闭环，推动 AI 能力进入实际运维工作流。",
    evidence: ["已上线使用", "事件 / 工单 / SLA 建模", "RAG 辅助处置流程"],
    tags: ["Java", "Spring Boot", "Vue", "MySQL", "Redis", "Workflow", "RAG"], tone: "mint",
  },
];

export default function Home() {
  const [copyMessage, setCopyMessage] = useState("");
  const [activeCase, setActiveCase] = useState(projects[0].slug);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".liquid-reveal"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    revealItems.forEach((item) => item.classList.add("motion-ready"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -42px" });
    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".liquid-project-card[id^='case-']"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveCase(entry.target.id.replace("case-", ""));
      });
    }, { rootMargin: "-22% 0px -66% 0px", threshold: 0 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const copyContact = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label}已复制`);
    } catch {
      setCopyMessage("复制失败，请手动复制");
    }
    window.setTimeout(() => setCopyMessage(""), 2200);
  };

  return (
    <main className="liquid-page" id="top">
      <div className="liquid-ambient liquid-ambient-one" aria-hidden="true" />
      <div className="liquid-ambient liquid-ambient-two" aria-hidden="true" />
      <div className="liquid-frame">
        <header className="liquid-nav">
          <a className="liquid-brand" href="#top"><span className="liquid-brand-mark">F</span><span>范文豪 / 作品集</span></a>
          <nav aria-label="页面导航">
            <a href="#capabilities">技术能力</a>
            <a href="#projects">项目案例</a>
            <a href="#experience">工作经历</a>
            <a href="#contact">联系方式</a>
          </nav>
          <div className="liquid-mobile-links" aria-label="移动端页面导航">
            <a href="#capabilities">能力</a><a href="#projects">项目</a><a href="#contact">联系</a>
          </div>
          <a className="liquid-nav-github" href="https://github.com/fwh515253/java-platform-portfolio" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="liquid-nav-cta" href={resumePath} download>下载简历 <span>↓</span></a>
        </header>

        <section className="liquid-hero liquid-reveal is-visible" aria-labelledby="hero-title">
          <div className="liquid-hero-copy">
            <p className="liquid-eyebrow"><span className="liquid-status-dot" /> Java 后端工程师 · 云原生平台 · AI 应用</p>
            <h1 id="hero-title">Java 后端工程师<br /><em>云原生平台与 AI 应用</em></h1>
            <p className="liquid-hero-description">以 Java / Spring Boot 为主，参与云原生平台、持续交付、可观测性和 RAG 应用的设计、开发与落地。</p>
            <div className="liquid-hero-actions"><a className="liquid-button liquid-button-dark" href="#projects">查看项目 <span>↗</span></a><a className="liquid-button liquid-button-light" href={resumePath} download>下载 PDF <span>↓</span></a></div>
            <div className="liquid-hero-meta"><span>工作经验</span><span>3 年</span><span>合肥 / 仅考虑合肥</span></div>
            <div className="liquid-proof-strip" aria-label="求职能力摘要"><div><strong>3 年</strong><span>Java 后端开发</span></div><div><strong>100+</strong><span>服务监控支持</span></div><div><strong>已上线</strong><span>NativeSphere 平台</span></div></div>
          </div>
          <div className="liquid-hero-art" aria-label="能力概览">
            <div className="liquid-orbit orbit-large" /><div className="liquid-orbit orbit-small" />
            <div className="liquid-float-card float-platform"><span>平台工程</span><strong>NativeSphere</strong><small>资源 · 发布 · 治理 · 观测</small><i>↗</i></div>
            <div className="liquid-float-card float-observe"><span>可观测性</span><strong>100+</strong><small>服务监控与告警支持</small></div>
            <div className="liquid-float-card float-ai"><span>AI 应用</span><strong>RAG</strong><small>带引用来源的智能问答</small></div>
          </div>
        </section>

        <section className="liquid-section liquid-capabilities" id="capabilities" aria-labelledby="capabilities-title">
          <div className="liquid-section-head liquid-reveal"><div><p className="liquid-eyebrow">技术能力</p><h2 id="capabilities-title">我能解决什么问题</h2></div><p>从服务代码到平台运行环境，关注系统边界、数据流转和最终交付。</p></div>
          <div className="liquid-capability-grid">{capabilities.map((item) => <article className="liquid-capability-card liquid-reveal" key={item.code}><div className="liquid-card-top"><span>{item.code}</span><i>↗</i></div><h3>{item.title}</h3><p>{item.text}</p><div className="liquid-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        </section>

        <section className="liquid-section liquid-projects" id="projects" aria-labelledby="projects-title">
          <div className="liquid-section-head liquid-reveal"><div><p className="liquid-eyebrow">项目案例</p><h2 id="projects-title">参与过的工程</h2></div><p>每个项目提供独立工程视图，展开查看系统边界、关键动作和交付结果。</p></div>
          <div className="liquid-project-index" aria-label="项目索引"><span>项目索引</span>{projects.map((project) => <a className={activeCase === project.slug ? "is-active" : ""} href={`#case-${project.slug}`} key={project.slug}>{project.name}</a>)}</div>
          <div className="liquid-project-list">{projects.map((project) => <article className={`liquid-project-card liquid-card-${project.tone} liquid-reveal`} id={`case-${project.slug}`} key={project.slug}>
            <div className="liquid-project-preview"><span className="liquid-preview-label">{project.category}</span><div className="liquid-preview-symbol">{project.mark}</div><div className="liquid-preview-lines"><i /><i /><i /></div><span className="liquid-preview-stage">{project.stage}</span></div>
            <div className="liquid-project-copy"><div className="liquid-project-meta"><span>{project.number} / {project.category}</span><span>{project.stage}</span></div><div className="liquid-project-title"><div><h3>{project.name}</h3><h4>{project.subtitle}</h4></div><a className="liquid-view-button" href={`/projects/${project.slug}`}>查看工程视图 <span>↗</span></a></div><p className="liquid-project-challenge">{project.challenge}</p><div className="liquid-project-facts"><div><span>角色定位</span><strong>{project.role}</strong></div><div><span>负责范围</span><strong>{project.scope}</strong></div></div><div className="liquid-project-evidence" aria-label="项目证据"><span>工程证据</span>{project.evidence.map((item) => <b key={item}>{item}</b>)}</div><div className="liquid-flow">{project.flow.map((step, index) => <span key={step}>{step}{index < project.flow.length - 1 && <b>→</b>}</span>)}</div><details className="liquid-project-more"><summary>查看关键工程动作 <span>＋</span></summary><div className="liquid-work-grid">{project.details.map((detail) => <div key={detail.title}><strong>{detail.title}</strong><p>{detail.text}</p></div>)}</div><div className="liquid-value"><span>工程价值</span><p>{project.value}</p></div></details><div className="liquid-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          </article>)}</div>
        </section>

        <section className="liquid-section liquid-experience" id="experience" aria-labelledby="experience-title">
          <div className="liquid-section-head liquid-reveal"><div><p className="liquid-eyebrow">工作经历</p><h2 id="experience-title">经历与方向</h2></div><p>从 Java 后端开发进入云原生平台建设，在真实项目中扩大负责范围。</p></div>
          <div className="liquid-timeline"><article className="liquid-timeline-item liquid-reveal"><div className="liquid-timeline-date">2023.06—2026.03</div><div><h3>航天宏图信息技术股份有限公司</h3><p>Java 后端工程师 · 云原生应用管理 / 镜像制品 / 服务治理 / 项目交付支持</p></div><span>正式工作</span></article><article className="liquid-timeline-item liquid-reveal"><div className="liquid-timeline-date">2020—2024</div><div><h3>东北林业大学</h3><p>本科 · 软件工程</p></div><span>教育经历</span></article></div>
        </section>

        <section className="liquid-contact liquid-reveal" id="contact" aria-labelledby="contact-title"><div><p className="liquid-eyebrow">联系方式</p><h2 id="contact-title">欢迎交流</h2><p>求职方向：Java 后端开发、云原生平台开发</p></div><div className="liquid-contact-actions"><button type="button" onClick={() => void copyContact("wh5136823@163.com", "邮箱")} aria-label="复制邮箱"><img src="/contact-email.png" alt="" /><span>wh5136823@163.com</span><small>复制</small></button><button type="button" onClick={() => void copyContact("13051368230", "手机号")} aria-label="复制手机号"><img src="/contact-phone.png" alt="" /><span>13051368230</span><small>复制</small></button><a className="liquid-direct-link" href="mailto:wh5136823@163.com">邮件联系 ↗</a><a className="liquid-direct-link" href="tel:13051368230">电话联系 ↗</a><a className="liquid-button liquid-button-dark" href={resumePath} download>下载简历 <span>↓</span></a></div>{copyMessage && <div className="liquid-copy-toast" role="status" aria-live="polite">{copyMessage}</div>}</section>

        <footer className="liquid-footer"><span>Java 后端 / 平台工程 / AI 应用</span><span>© 2026 范文豪</span></footer>
      </div>
      <AgentAssistant />
    </main>
  );
}
