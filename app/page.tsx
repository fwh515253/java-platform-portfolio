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
    number: "01",
    mark: "N",
    stage: "在线平台",
    slug: "nativesphere",
    flow: ["镜像制品", "应用生命周期", "集群管理", "服务治理", "运行状态"],
    category: "平台工程",
    name: "NativeSphere",
    subtitle: "云原生应用管理平台",
    role: "核心模块负责人",
    scope: "镜像 / 应用 / 集群 / 服务",
    challenge: "平台需要把镜像、应用、集群、服务和运行配置统一到一个可管理、可追踪的云原生控制面。",
    details: [
      { title: "镜像制品链路", text: "围绕 Docker API 建立构建、标签、推送 Harbor、结果回传和失败处理链路；后期将底层操作抽离为 Go dockertool，降低平台编排层耦合。" },
      { title: "应用生命周期", text: "建立预制应用与镜像的关联模型，串联应用上线、启动、停止、重启和状态回读，保证用户操作与运行结果一致。" },
      { title: "集群管理", text: "围绕集群接入、命名空间、工作负载和资源配额建立统一管理视图，将多环境资源状态纳入平台控制面。" },
      { title: "服务治理边界", text: "抽象基于 Istio 的服务治理配置，将限流等策略纳入参数校验、配置下发、状态核验和操作留痕。" },
      { title: "平台化沉淀", text: "将镜像、应用、集群、服务从孤立功能整理为可复用的控制面能力，支撑多个项目持续接入和使用。" },
    ],
    value: "把分散的基础设施操作收敛为面向业务人员的统一控制面，支撑已上线平台在多个项目中持续使用。",
    tags: ["Java", "Docker", "Kubernetes", "Harbor", "Istio"],
    tone: "cyan",
  },
  {
    number: "02",
    mark: "R",
    stage: "系统设计",
    slug: "release-flow",
    flow: ["代码变更", "制品构建", "环境发布", "回滚验证"],
    category: "交付系统",
    name: "Release Flow",
    subtitle: "云原生持续交付与发布平台",
    role: "交付流程设计与后端实现",
    scope: "版本 / 构建 / 发布 / 回滚",
    challenge: "发布过程涉及多个环境和执行阶段，任何一步缺少状态反馈，都会让问题难以定位、版本难以恢复。",
    details: [
      { title: "交付对象抽象", text: "将代码版本、镜像制品、目标环境、发布任务和执行记录统一建模，建立版本与运行结果之间的可追踪关系。" },
      { title: "阶段状态设计", text: "拆解构建、制品校验、环境发布、健康检查和回滚阶段，定义成功、失败、重试和中断等状态边界。" },
      { title: "异常与恢复", text: "补齐幂等执行、失败重试、日志检索、环境隔离和回滚入口，减少重复发布和人工介入带来的不确定性。" },
    ],
    value: "让发布从一次性脚本执行变成可以被观察、被复盘、被恢复的工程流程。",
    tags: ["Spring Boot", "Pipeline", "Rollback"],
    tone: "violet",
  },
  {
    number: "04",
    mark: "S",
    stage: "持续维护",
    slug: "signal-room",
    flow: ["指标采集", "告警规则", "异常定位", "问题闭环"],
    category: "可观测性",
    name: "Signal Room",
    subtitle: "NativeSphere 云平台监控与告警系统",
    role: "监控平台维护与问题闭环",
    scope: "指标 / 告警 / 服务状态 / 排障",
    challenge: "平台监控覆盖 100+ 服务，指标缺失、状态不一致或告警误触发都会直接影响交付和运维判断。",
    details: [
      { title: "监控链路维护", text: "维护监控与告警相关代码，梳理服务、环境、指标和告警之间的关联，确保问题能够沿链路定位。" },
      { title: "异常定位处理", text: "重点处理指标缺失、状态不一致、告警误触发和配置变更后的兼容问题，区分采集、规则和展示层原因。" },
      { title: "协同验证闭环", text: "协同研发与运维完成状态核验、日志定位、问题复现和版本部署，让修复结果回到真实运行环境验证。" },
    ],
    value: "积累复杂服务运行环境下的故障分析与协作经验，保证监控能力在项目交付中的稳定性。",
    tags: ["Prometheus", "Grafana", "Alerting"],
    tone: "orange",
  },
  {
    number: "05",
    mark: "O",
    stage: "智能流程",
    slug: "ops-copilot",
    flow: ["告警事件", "知识检索", "引用证据", "辅助决策"],
    category: "AI 运维",
    name: "Ops Copilot",
    subtitle: "云原生监控告警智能助手",
    role: "方案设计与工程化落地",
    scope: "知识入库 / 检索增强 / 流式问答",
    challenge: "告警信息本身不足以支撑排障，需要把服务上下文、历史经验和引用证据组织到同一条问答链路。",
    details: [
      { title: "故障知识建模", text: "组织告警事件、服务上下文、知识文档和排查结论，形成面向故障分析的可检索知识结构。" },
      { title: "RAG 数据链路", text: "设计文档解析、语义切分、向量生成、批量写入和版本更新流程，保留数据来源和可重建能力。" },
      { title: "模型服务适配", text: "设计模型适配层与流式问答链路，覆盖模型切换、超时重试、会话上下文和用户反馈收集。" },
    ],
    value: "将 AI 放进已有运维流程，用检索证据约束回答，让智能辅助具备工程落地的接口。",
    tags: ["RAG", "Embedding", "Milvus", "SSE"],
    tone: "pink",
  },
];

const capabilityItems = [
  { label: "系统设计", title: "系统设计", text: "从业务需求出发，拆解对象、状态、接口边界和模块关系。" },
  { label: "平台整合", title: "平台整合", text: "把后端服务与运行基础设施连接起来，形成统一、可使用的业务能力。" },
  { label: "工程交付", title: "工程交付", text: "持续跟进实现、联调、验证、上线和问题维护，关注最终运行结果。" },
  { label: "技术延展", title: "技术延展", text: "把新技术转化为可验证、可落地的工程方案，扩展系统解决问题的边界。" },
];

export default function Home() {
  return (
    <main className="portfolio-shell" id="top">
      <aside className="profile-rail" aria-label="个人信息">
        <div className="rail-inner">
          <div className="rail-brand"><span className="brand-mark">F</span><span>平台工程 / 01</span></div>

          <div className="profile-block">
            <div className="profile-orbit"><span>FH</span></div>
            <p className="rail-kicker">Java 后端工程师</p>
            <h1>把平台需求，<br /><em>落成可运行的系统。</em></h1>
            <p className="profile-summary">专注 Java 后端、云原生平台与 AI 应用工程化，参与从对象建模、流程编排到状态回读、异常闭环的完整建设过程。</p>
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
          <div className="overview-grid">
            <div>
              <h2 id="overview-title">从对象建模，<br /><strong>到运行闭环。</strong></h2>
              <p>我的工作重点，是把基础设施能力变成业务可以使用的流程：定义应用、镜像、服务和资源的关系，组织构建、发布、治理和监控，并让执行结果可回传、问题可定位、失败可恢复。</p>
            </div>
          </div>
          <div className="metric-strip"><div><strong>4</strong><span>核心项目</span></div><div><strong>100+</strong><span>监控服务覆盖</span></div><div><strong>10—30</strong><span>单项目服务规模</span></div><div><strong>Java</strong><span>主力开发语言</span></div></div>
        </section>

        <section className="content-section" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-marker"><span>个人定位</span><i /><span>能力概览</span></div>
          <div className="section-heading"><h2 id="capabilities-title">能力定位，<br /><em>我能承担什么。</em></h2><p>这一部分只回答“我能承担什么工作”，项目案例会在下面进一步说明“我具体做过什么”。</p></div>
          <div className="capability-grid">{capabilityItems.map((item) => <article className="capability-card" key={item.title}><div className="capability-card-top"><span>{item.label}</span><i /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-marker"><span>02</span><i /><span>精选项目</span></div>
          <div className="section-heading project-heading"><h2 id="projects-title">项目案例</h2><p>每个项目按四层展开：项目定位、负责边界、关键工程动作和最终价值，让贡献不再停留在技术名词。</p></div>
          <div className="project-stack">{projects.map((project) => <article className={`project-card project-${project.tone}`} key={project.number}><div className="project-detail"><div className="project-name-line"><span>{project.category}</span><span>{project.stage}</span></div><div className="project-title-line"><h3>{project.name}</h3><a className="project-detail-link" href={`/projects/${project.slug}`}>查看工程视图 <span>↗</span></a></div><h4>{project.subtitle}</h4><div className="project-facts"><div><span>角色定位</span><strong>{project.role}</strong></div><div><span>负责范围</span><strong>{project.scope}</strong></div></div><div className="detail-block"><span className="detail-label">问题边界</span><p>{project.challenge}</p></div><div className="detail-block"><span className="detail-label">关键工程动作</span><div className="work-grid">{project.details.map((detail, index) => <div className="work-item" key={detail.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h5>{detail.title}</h5><p>{detail.text}</p></div></div>)}</div></div><div className="project-value"><span className="detail-label">工程价值</span><p>{project.value}</p></div><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        </section>

        <section className="content-section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-marker"><span>03</span><i /><span>经历</span></div>
          <div className="section-heading"><h2 id="experience-title">经历与方向</h2><p>从后端开发进入云原生平台建设，在真实项目中不断扩大对系统边界和交付结果的负责范围。</p></div>
          <div className="experience-list"><div className="experience-item"><span className="experience-date">2023.06 — 2026.03</span><div><h3>航天宏图信息技术股份有限公司</h3><p>Java 后端工程师 · 云原生应用管理 / 镜像制品 / 服务治理 / 项目交付支持</p></div><span className="experience-type">正式工作</span></div><div className="experience-item"><span className="experience-date">2020 — 2024</span><div><h3>东北林业大学</h3><p>本科 · 软件工程</p></div><span className="experience-type">教育经历</span></div></div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-glow" />
          <div className="section-marker"><span>04</span><i /><span>联系</span></div>
          <h2 id="contact-title">如果你正在建设<br /><em>下一套平台。</em></h2>
          <p>欢迎交流后端工程、云原生平台、交付系统与 AI 运维应用。</p>
          <div className="contact-actions"><a href="mailto:[邮箱]">[邮箱] <span>↗</span></a><a href="tel:[手机]">[手机] <span>↗</span></a><a className="contact-resume" href="/resume.pdf" download>下载简历 <span>↓</span></a></div>
        </section>

        <footer className="content-footer"><span>Java 后端 / 平台工程</span><span>工程能力展示</span></footer>
      </section>
    </main>
  );
}
