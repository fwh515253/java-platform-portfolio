import Link from "next/link";
import { ProjectCapabilityView } from "./project-capability-views";
import { AnimatedCapabilityCharts } from "./animated-capability-charts";

export type EngineeringSpec = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  period: string;
  role: string;
  brief: string;
  problem: string;
  scope: string;
  technologies: string[];
  modules: [string, string][];
  architecture: [string, string][];
  flow: [string, string][];
  responsibilities: [string, string][];
  achievements: [string, string][];
  previewType: "platform" | "pipeline" | "gateway" | "oa";
};

export const engineeringSpecs: Record<string, EngineeringSpec> = {
  nativesphere: {
    slug: "nativesphere",
    title: "NativeSphere 企业级云原生平台",
    shortTitle: "NativeSphere",
    category: "云原生平台",
    period: "2023.10—2026.03",
    role: "Java / 全栈研发工程师",
    brief: "面向企业研发与运维团队的 Kubernetes 云原生平台，提供资源与应用管理、镜像制品、服务治理、监控告警和 AI 辅助运维等一体化能力。",
    problem: "原始 Kubernetes、镜像仓库、服务网格与监控系统分别提供底层能力，但使用入口、资源模型和运行状态彼此割裂。平台需要把它们组织为面向研发与运维人员的统一业务控制面，并处理操作请求、异步执行结果与集群真实状态之间的一致性。",
    scope: "平台控制面 / 可观测性 / AI 运维",
    technologies: ["Java", "Spring Boot", "Spring Cloud", "MyBatis", "Vue", "MySQL", "Redis", "Kubernetes", "Docker", "Harbor", "Istio", "Prometheus", "PromQL", "Grafana", "RAG"],
    modules: [
      ["应用与资源管理", "封装 Kubernetes 资源操作，覆盖资源模型转换、生命周期管理、状态同步、事件日志和异常处理。"],
      ["镜像与应用交付", "串联 Docker 构建、Harbor 制品分发与应用部署，使镜像版本、构建结果和运行状态可追踪。"],
      ["服务治理", "通过 Istio 管理流量路由、限流等治理策略，并处理配置校验、下发结果和状态回读。"],
      ["监控与告警", "以 Kubernetes 资源模型组织 Prometheus 指标、告警规则、告警事件和 Grafana 可视化。"],
      ["监控告警智能助手", "聚合告警上下文、资源状态、指标和日志，结合 RAG 检索运维知识与历史处置记录。"],
    ],
    architecture: [
      ["交互层", "Vue 管理控制台承载资源、应用、服务治理、监控告警和智能问答等操作入口。"],
      ["平台服务层", "Java 服务负责领域模型、权限校验、业务编排、状态管理和对外 REST API。"],
      ["能力适配层", "分别适配 Kubernetes API、Docker、Harbor、Istio、Prometheus、Grafana 与大模型服务。"],
      ["基础设施层", "多集群 Kubernetes 及其工作负载、网络、存储、配置和扩展资源。"],
    ],
    flow: [["资源接入", "统一模型"], ["镜像交付", "制品可追踪"], ["应用运行", "状态同步"], ["治理观测", "信号关联"], ["智能处置", "辅助决策"]],
    responsibilities: [
      ["平台资源控制面", "封装 Kubernetes API，完成资源模型转换、增删改查、状态同步、事件日志查询及异常处理。"],
      ["应用与制品生命周期", "串联 Docker 构建、Harbor 推送、应用部署、启停、重启、升级和状态查询。"],
      ["服务治理能力", "接入 Istio，将路由与限流策略纳入参数校验、配置下发、结果验证和操作留痕。"],
      ["可观测性模型", "将 Kubernetes 资源模型映射到 Prometheus 时序指标，串联指标、告警、资源状态、事件和日志。"],
      ["AI 辅助运维", "聚合故障上下文，结合 RAG 检索运维知识和历史记录，生成有依据的原因分析与处置建议。"],
      ["全栈工程交付", "参与 Vue 管理端页面、接口联调、单元与接口测试、发布部署、线上排障及技术文档。"],
    ],
    achievements: [
      ["统一自助入口", "将分散的基础设施能力沉淀为可视化、自助式平台功能，降低 YAML、命令行和管理员人工操作依赖。"],
      ["平台能力闭环", "形成资源接管、制品交付、应用部署、服务治理、运行观测和事件处置的一体化链路。"],
      ["故障分析增强", "通过统一指标模型、告警上下文关联和 RAG 知识检索，提高监控能力的扩展性与问题分析效率。"],
    ],
    previewType: "platform",
  },
  "release-flow": {
    slug: "release-flow",
    title: "ReleaseFlow 云原生持续交付与发布平台",
    shortTitle: "ReleaseFlow",
    category: "持续交付平台",
    period: "2024.06—2026.03",
    role: "Java / 全栈研发工程师",
    brief: "面向云原生应用交付场景的发布管理平台，将应用版本、构建制品、目标环境和发布批次组织为标准化交付流程。",
    problem: "不同项目同时存在直接向 Kubernetes 部署和调用 Jenkins Pipeline 的发布方式。若两类通道各自维护对象和状态，版本、环境、日志与结果难以统一追踪，失败后的重试和回滚也依赖人工判断。",
    scope: "版本 / 制品 / 环境 / 发布执行",
    technologies: ["Java", "Spring Boot", "Vue", "MySQL", "Redis", "Kubernetes", "Jenkins Pipeline", "Docker", "Harbor"],
    modules: [
      ["发布对象管理", "统一管理应用版本、构建制品、目标环境、发布批次和执行记录。"],
      ["Kubernetes 直接发布", "由平台完成资源生成、配置下发、执行状态同步和发布结果处理。"],
      ["Jenkins Pipeline 发布", "触发 Jenkins 任务并完成参数传递、状态轮询、日志读取和结果回传。"],
      ["异常恢复", "支持失败重试、超时处理、环境隔离、回滚及执行过程追踪。"],
    ],
    architecture: [
      ["发布控制台", "创建发布任务、选择执行通道和环境，查看进度、日志、重试与回滚。"],
      ["发布编排服务", "校验发布对象并驱动状态机，根据策略选择 Kubernetes 或 Jenkins 执行器。"],
      ["执行适配器", "屏蔽 Kubernetes API 与 Jenkins Pipeline 的调用差异，回传统一执行事件。"],
      ["状态与审计", "持久化任务、阶段、日志、结果及操作记录，支持发布过程追溯。"],
    ],
    flow: [["发布申请", "对象校验"], ["策略编排", "选择通道"], ["执行发布", "K8s / Jenkins"], ["状态跟踪", "日志结果"], ["异常恢复", "重试回滚"]],
    responsibilities: [
      ["发布领域建模", "围绕应用版本、制品、环境、发布批次、执行阶段和状态流转设计核心对象。"],
      ["双通道执行编排", "实现 Kubernetes 直接部署链路，并集成 Jenkins Pipeline 的触发、参数、状态、日志和结果。"],
      ["可靠性机制", "处理幂等校验、失败重试、超时、环境隔离、状态不一致、流程中断与回滚。"],
      ["发布控制台", "参与 Vue 端发布创建、执行方式选择、环境配置、进度日志、重试与回滚页面。"],
      ["质量与运行支持", "完成接口联调、测试、发布部署、线上问题定位和流程文档沉淀。"],
    ],
    achievements: [
      ["统一发布控制面", "将 Kubernetes 直接部署与 Jenkins Pipeline 两类执行模式纳入同一业务流程。"],
      ["端到端追溯", "建立版本、制品、环境、发布任务、执行日志和运行结果之间的完整关联。"],
      ["降低发布风险", "通过状态校验、失败重试和回滚机制增强异常场景下的可恢复性。"],
    ],
    previewType: "pipeline",
  },
  bpaas: {
    slug: "bpaas",
    title: "BPAAS 统一网关与服务接入平台",
    shortTitle: "BPAAS",
    category: "微服务基础设施",
    period: "2024.10—2026.03",
    role: "Java 后端开发工程师",
    brief: "面向公司内部业务系统的统一服务接入平台，对服务、接口、环境和路由配置进行集中管理，并与网关执行模块协同完成配置下发及服务访问。",
    problem: "内部系统接入网关时存在服务信息、接口定义、环境地址和路由规则分散维护的问题。平台需要提供统一接入模型和配置流程，同时与网关核心模块保持配置、执行结果和运行状态同步。",
    scope: "服务 / 接口 / 环境 / 路由配置",
    technologies: ["Java", "Spring Boot", "Spring Cloud", "MyBatis", "MySQL", "Redis", "微服务", "API Gateway"],
    modules: [
      ["服务管理", "维护服务基础信息、环境配置、启停状态和接入关系。"],
      ["接口管理", "集中管理接口路径、请求方式、参数定义及服务归属。"],
      ["路由配置", "组织路由规则及环境映射，并向网关执行模块下发配置。"],
      ["调用与运行记录", "保存配置处理结果、调用记录和异常信息，支撑联调与排障。"],
    ],
    architecture: [
      ["业务接入层", "内部系统通过平台登记服务、接口、环境与路由信息。"],
      ["配置管理层", "Java 服务完成领域校验、关联管理、状态维护和配置版本组织。"],
      ["网关协同层", "对接网关核心模块，完成配置下发、结果回读与状态同步。"],
      ["运行追踪层", "沉淀调用记录、异常信息和变更结果，为联调及问题定位提供依据。"],
    ],
    flow: [["登记服务", "基础信息"], ["配置接口", "契约关系"], ["映射环境", "访问目标"], ["下发路由", "网关执行"], ["回读状态", "结果追踪"]],
    responsibilities: [
      ["领域与接口开发", "参与服务、接口、环境和路由领域模型设计及后端 REST API 开发。"],
      ["服务接入流程", "实现服务信息、接口关系、环境映射、参数校验和状态管理。"],
      ["网关模块协同", "完成路由配置下发、处理结果回读、异常记录和运行状态同步。"],
      ["联调与问题处理", "维护调用记录与运行信息，配合网关研发进行策略验证、系统联调和问题定位。"],
      ["工程交付", "参与单元与接口测试、版本发布、部署支持和接口文档维护。"],
    ],
    achievements: [
      ["统一接入规范", "形成服务、接口、环境和路由的一致化管理流程，减少各系统重复配置。"],
      ["集中配置管理", "统一维护服务元数据和网关配置关系，提高变更的可维护性。"],
      ["结果可追溯", "打通管理端与网关执行模块的配置及状态链路，提升联调和故障定位效率。"],
    ],
    previewType: "gateway",
  },
  oa: {
    slug: "oa",
    title: "企业内部综合管理系统（OA）",
    shortTitle: "OA",
    category: "企业业务系统",
    period: "2024.10—2026.03",
    role: "Java 全栈开发工程师",
    brief: "面向公司内部员工和管理人员的综合管理系统，将业务申请、审核、信息查询及处理记录等工作流程进行线上化管理。",
    problem: "线下申请与审批缺少统一入口，处理进度、角色权限和历史记录难以追踪。系统需要在支持灵活业务流程的同时，保证数据权限、状态流转和审计信息完整。",
    scope: "业务流程 / 权限 / 前后端功能",
    technologies: ["Java", "Spring Boot", "MyBatis", "Vue", "JavaScript", "MySQL", "Redis", "JWT", "Element UI"],
    modules: [
      ["业务申请", "提供申请创建、草稿、提交、撤回、详情和历史记录查询。"],
      ["流程审批", "按业务状态驱动待办、审批、驳回和完结，并记录处理意见。"],
      ["权限管理", "维护用户、角色、菜单和数据权限，控制页面、操作及数据范围。"],
      ["审计记录", "保存关键操作、状态变化和处理人信息，使业务过程可追踪。"],
    ],
    architecture: [
      ["Vue 前端", "列表、表单、详情与审批工作台，负责交互校验、状态呈现和异常反馈。"],
      ["业务服务", "Spring Boot 承载申请、审批、权限、查询及状态流转规则。"],
      ["数据与缓存", "MySQL 保存业务及审计数据，Redis 支撑缓存和会话相关场景。"],
      ["安全边界", "通过 JWT、角色和数据权限约束访问范围与可执行操作。"],
    ],
    flow: [["创建申请", "表单校验"], ["提交审批", "状态流转"], ["权限判断", "角色范围"], ["处理反馈", "结果通知"], ["记录归档", "审计查询"]],
    responsibilities: [
      ["需求与模块设计", "参与业务需求梳理，拆分申请、审批、记录和状态等核心对象。"],
      ["全栈功能开发", "独立完成部分模块的数据表、后端接口、Vue 页面和前后端联调。"],
      ["流程与审计", "实现提交、审批、状态流转及操作留痕，保证处理过程可查询。"],
      ["权限控制", "维护用户、角色、菜单和数据权限，处理不同角色的访问边界。"],
      ["页面与交互", "完成列表、表单、详情和审批页面的分页、校验、状态展示及异常提示。"],
      ["交付支持", "参与测试、上线发布、使用问题处理和功能维护。"],
    ],
    achievements: [
      ["端到端全栈交付", "覆盖数据模型、服务接口、前端页面和联调验证，形成完整模块交付能力。"],
      ["流程线上化", "将分散的线下申请和审批转为状态明确、进度可查的线上流程。"],
      ["权限与审计完善", "通过角色、数据权限和操作记录保障内部业务过程规范可追溯。"],
    ],
    previewType: "oa",
  },
};

export function LegacyProductPreview({ spec }: { spec: EngineeringSpec }) {
  if (spec.previewType === "platform") {
    return <div className="native-console">
      <div className="native-topbar"><strong>NativeSphere</strong><span>cluster-prod / overview</span><b><i /> 系统健康</b></div>
      <div className="native-body">
        <aside><small>平台能力</small><span className="active">工作空间</span><span>集群资源</span><span>应用负载</span><span>服务治理</span><span>监控告警</span><span>AI 助手</span></aside>
        <div className="native-canvas">
          <header><div><small>集群控制面</small><strong>生产集群资源拓扑</strong></div><span>最近同步 12 秒前</span></header>
          <div className="native-summary"><div><span>集群</span><strong>03</strong><small>全部可用</small></div><div><span>工作负载</span><strong>128</strong><small>124 运行中</small></div><div><span>告警</span><strong>07</strong><small>2 条待处理</small></div><div><span>服务治理</span><strong>18</strong><small>策略已生效</small></div></div>
          <div className="native-map">
            <section className="native-resource-tree"><small>KUBERNETES RESOURCE GRAPH</small><div className="native-node root"><b>K8s API</b><span>统一资源适配</span></div><div className="native-branches"><div><b>Workloads</b><span>Deployments · Pods</span></div><div><b>Network</b><span>Service · Ingress</span></div><div><b>Storage</b><span>PVC · StorageClass</span></div></div><div className="native-runtime"><span>状态同步</span><i /><span>事件 / 日志</span><i /><span>异常校验</span></div></section>
            <section className="native-signal"><small>OBSERVABILITY &amp; AI</small><div><span>Prometheus</span><strong>指标映射</strong><b>正常</b></div><div><span>Alert Center</span><strong>7 条活跃告警</strong><b className="warn">关注</b></div><div><span>Ops Assistant</span><strong>上下文已聚合</strong><b>RAG 就绪</b></div><p>资源状态 → 指标 → 告警 → 日志 → 知识检索 → 处置建议</p></section>
          </div>
        </div>
      </div>
    </div>;
  }

  if (spec.previewType === "pipeline") {
    return <div className="release-board">
      <header><div><small>RELEASE / 2026.03.18</small><strong>application-api · production</strong></div><span className="release-running"><i /> 发布执行中</span></header>
      <div className="release-object-row"><div><small>应用版本</small><strong>v2.8.0</strong><span>commit 8f42c1a</span></div><div><small>镜像制品</small><strong>app-api:2.8.0</strong><span>Harbor 已校验</span></div><div><small>目标环境</small><strong>production</strong><span>cluster-main</span></div><div><small>发布批次</small><strong>#RF-1842</strong><span>创建人：范文豪</span></div></div>
      <div className="release-router"><small>执行方式由发布策略选择</small><div className="release-lanes">
        <section><div className="lane-head"><b>Kubernetes 直接发布</b><span>当前通道</span></div><div className="lane-steps"><p className="done"><i />资源生成<em>完成</em></p><p className="done"><i />配置下发<em>完成</em></p><p className="active"><i />状态回读<em>执行中</em></p><p><i />结果确认<em>等待</em></p></div></section>
        <section><div className="lane-head"><b>Jenkins Pipeline</b><span>可选通道</span></div><div className="lane-steps"><p><i />参数组装<em>READY</em></p><p><i />Job 触发<em>READY</em></p><p><i />日志回传<em>READY</em></p><p><i />结果同步<em>READY</em></p></div></section>
      </div></div>
      <footer><div><small>执行日志</small><p><i />14:32:08　deployment/application-api configured</p><p><i />14:32:16　waiting for rollout status...</p></div><div><small>恢复能力</small><span>失败重试</span><span>状态校验</span><span>版本回滚</span></div></footer>
    </div>;
  }

  if (spec.previewType === "gateway") {
    return <div className="gateway-map">
      <header><div><small>BPAAS / SERVICE ACCESS</small><strong>服务接入与网关配置链路</strong></div><span>配置版本 v34</span></header>
      <div className="gateway-topology">
        <div className="gateway-zone consumers"><small>调用方</small><div><b>业务系统 A</b><span>internal-client</span></div><div><b>业务系统 B</b><span>open-client</span></div></div>
        <i className="gateway-arrow">→</i>
        <div className="gateway-zone management"><small>BPAAS 管理面</small><div className="gateway-models"><span>服务</span><span>接口</span><span>环境</span><span>路由</span></div><p>领域校验 · 关联管理 · 配置版本 · 状态维护</p></div>
        <i className="gateway-arrow">→</i>
        <div className="gateway-zone execution"><small>网关执行模块</small><div><b>Route Config</b><span>配置下发</span></div><div><b>Runtime Status</b><span>结果回读</span></div></div>
        <i className="gateway-arrow">→</i>
        <div className="gateway-zone upstream"><small>上游服务</small><div><b>user-service</b><span>prod / healthy</span></div><div><b>order-service</b><span>prod / healthy</span></div></div>
      </div>
      <div className="gateway-table"><div className="gateway-table-head"><span>服务 / 接口</span><span>目标环境</span><span>路由规则</span><span>下发状态</span></div><div><strong>user-service /api/users/**</strong><span>prod-cluster</span><span>StripPrefix=1</span><b>已同步</b></div><div><strong>order-service /api/orders/**</strong><span>prod-cluster</span><span>RateLimit=200/s</span><b>已同步</b></div><div><strong>report-service /api/report/**</strong><span>staging</span><span>AuthRequired</span><b className="waiting">待验证</b></div></div>
      <footer><span>本人边界</span><p>负责管理面领域模型、接入接口及与网关执行模块的配置和状态协同；不将网关内核实现归为个人职责。</p></footer>
    </div>;
  }

  return <div className="oa-workbench">
    <aside><strong>协同办公</strong><span className="active">工作台</span><span>我的申请</span><span>待办审批 <b>8</b></span><span>流程查询</span><span>组织权限</span><span>审计日志</span></aside>
    <div className="oa-main">
      <header><div><small>上午好，范文豪</small><strong>业务协同工作台</strong></div><button type="button">＋ 发起申请</button></header>
      <div className="oa-kpis"><div><span>我的待办</span><strong>08</strong><small>2 项即将超时</small></div><div><span>处理中</span><strong>12</strong><small>状态持续更新</small></div><div><span>本月办结</span><strong>36</strong><small>全部留痕</small></div></div>
      <div className="oa-grid">
        <section className="oa-tasks"><div className="oa-panel-head"><strong>待办审批</strong><span>查看全部 →</span></div><div><i className="urgent" /><p><b>项目资源申请</b><span>申请人：张三 · 15 分钟前</span></p><em>待审批</em></div><div><i /><p><b>用章申请</b><span>申请人：李四 · 1 小时前</span></p><em>待审批</em></div><div><i /><p><b>出差申请</b><span>申请人：王五 · 昨天</span></p><em>待审批</em></div></section>
        <section className="oa-flow"><div className="oa-panel-head"><strong>流程进度</strong><span>#OA-20260318</span></div><div className="oa-flow-line"><p className="done"><i />提交申请<span>09:20</span></p><p className="done"><i />直属审批<span>10:05</span></p><p className="active"><i />部门复核<span>处理中</span></p><p><i />流程归档<span>等待</span></p></div></section>
      </div>
      <div className="oa-permission"><div><small>当前角色</small><strong>研发人员</strong></div><span>页面权限 12</span><span>操作权限 26</span><span>数据范围：本人及所在部门</span><b>JWT 会话有效</b></div>
    </div>
  </div>;
}

function DetailList({ items }: { items: [string, string][] }) {
  return <div className="ns-capability-list">{items.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p><b>↗</b></article>)}</div>;
}

export function EngineeringView({ spec }: { spec: EngineeringSpec }) {
  return (
    <main className={`ns-page project-case project-case-${spec.previewType}`}>
      <nav className="ns-nav" aria-label={`${spec.title} 详情导航`}><Link href="/#projects">← 返回项目案例</Link><span>项目视图 / {spec.shortTitle}</span><a href="/resume.pdf" download>下载简历 ↗</a></nav>
      <header className="ns-hero">
        <div className="ns-eyebrow"><span>{spec.period}</span><i /><span>{spec.category}</span></div>
        <div className="ns-hero-grid"><div><h1 className="generic-ns-title">{spec.shortTitle}</h1><p>{spec.title}</p></div><div className="ns-hero-copy"><span>{spec.brief}</span><div className="ns-hero-tags"><span>{spec.role}</span><span>{spec.scope}</span></div></div></div>
        <div className="ns-meta-strip"><div><span>项目周期</span><strong>{spec.period}</strong></div><div><span>角色定位</span><strong>{spec.role}</strong></div><div><span>负责范围</span><strong>{spec.scope}</strong></div></div>
      </header>

      <section className="ns-section ns-intro">
        <div className="ns-section-label">01 / 项目全貌</div>
        <div className="ns-intro-grid"><h2>项目解决什么，<br /><em>边界在哪里。</em></h2><div><p>{spec.brief}</p><p className="case-problem"><strong>核心问题：</strong>{spec.problem}</p></div></div>
        <div className="case-tech-stack">{spec.technologies.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="ns-section">
        <div className="ns-section-label">02 / 系统架构</div>
        <div className="ns-section-heading"><h2>从交互入口，<br /><em>到执行基础设施。</em></h2><p>按系统分层展示项目真实边界，说明数据和控制指令如何流转。</p></div>
        <div className="case-architecture">{spec.architecture.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{text}</p></div>{index < spec.architecture.length - 1 && <i>↓</i>}</article>)}</div>
      </section>

      <section className="ns-section">
        <div className="ns-section-label">03 / 核心模块</div>
        <div className="ns-section-heading"><h2>项目由哪些能力，<br /><em>共同构成。</em></h2><p>不把项目压缩成技术名词，而是展示核心业务模块及其职责。</p></div>
        <div className="case-module-grid">{spec.modules.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{text}</p></article>)}</div>
      </section>

      <section className="ns-section generic-preview-section">
        <div className="ns-section-label">04 / 能力模型与实现机制</div>
        <div className="ns-section-heading"><h2>项目究竟能做什么。</h2><p>从能力范围、核心对象和执行机制展开项目，并明确平台整体能力与个人责任边界。</p></div>
        <div className="generic-preview capability-preview"><div className="generic-preview-top"><strong>{spec.title}</strong><span>CAPABILITY VIEW</span><i /></div><ProjectCapabilityView type={spec.previewType} /></div>
        <AnimatedCapabilityCharts type={spec.previewType} />
      </section>

      <section className="ns-section ns-lifecycle-section">
        <div className="ns-section-label">05 / 关键链路</div>
        <div className="ns-section-heading"><h2>一次业务操作，<br /><em>经过哪些环节。</em></h2><p>从入口到结果回传，呈现项目最重要的端到端链路。</p></div>
        <div className="ns-lifecycle">{spec.flow.map(([title, label], index) => <div className="ns-lifecycle-step" key={title}><span className="ns-step-index">{String(index + 1).padStart(2, "0")}</span><div className="ns-step-icon"><i /></div><strong>{title}</strong><span>{label}</span>{index < spec.flow.length - 1 && <i className="ns-step-arrow">→</i>}</div>)}</div>
      </section>

      <section className="ns-section ns-capability-section">
        <div className="ns-section-label">06 / 责任边界</div>
        <div className="ns-section-heading"><h2>我具体负责什么。</h2><p>区分项目整体能力与个人工作，避免用平台全部功能代替本人职责。</p></div>
        <DetailList items={spec.responsibilities} />
      </section>

      <section className="ns-section ns-capability-section">
        <div className="ns-section-label">07 / 工程成果</div>
        <div className="ns-section-heading"><h2>最终沉淀了什么。</h2><p>强调系统形成的能力与工程改进，不虚构未经验证的量化数据。</p></div>
        <DetailList items={spec.achievements} />
      </section>

      <footer className="ns-footer"><Link href="/#projects">← 返回全部项目</Link><span>{spec.shortTitle} / 项目视图</span><a href="/resume.pdf" download>下载 PDF 简历 ↗</a></footer>
    </main>
  );
}
