export type EngineeringSpec = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  stage: string;
  brief: string;
  scope: string;
  meta: [string, string][];
  flow: [string, string][];
  previewTitle: string;
  previewStatus: string;
  previewType: "pipeline" | "observability" | "copilot";
  capabilities: [string, string][];
};

export const engineeringSpecs: Record<string, EngineeringSpec> = {
  "release-flow": {
    slug: "release-flow", title: "云原生持续交付与发布平台", subtitle: "发布流水线", category: "交付系统", stage: "系统设计",
    brief: "将代码变更、制品、环境和发布结果组织成一条可验证、可追踪、可恢复的交付链路。", scope: "版本 / 构建 / 发布 / 回滚",
    meta: [["项目定位", "持续交付控制面"], ["负责范围", "版本 / 构建 / 发布 / 回滚"], ["核心目标", "让交付过程可追踪"]],
    flow: [["代码变更", "提交"], ["制品构建", "构建"], ["环境发布", "部署"], ["回滚验证", "恢复"]], previewTitle: "发布流水线", previewStatus: "发布 / 生产环境", previewType: "pipeline",
    capabilities: [["交付对象抽象", "将代码版本、镜像制品、目标环境、发布任务和执行记录统一建模。"], ["阶段状态设计", "拆解构建、校验、发布、健康检查和回滚阶段，明确成功与失败边界。"], ["异常与恢复", "补齐幂等执行、失败重试、日志检索、环境隔离和回滚入口。"]],
  },
  "signal-room": {
    slug: "signal-room", title: "NativeSphere 云平台监控与告警系统", subtitle: "监控与告警", category: "可观测性", stage: "持续维护",
    brief: "在 100+ 服务的运行场景中维护从指标、告警、日志到问题定位的可用链路。", scope: "平台 / 集群 / 工作负载 / 服务 / 告警",
    meta: [["项目定位", "云平台运行观测系统"], ["负责范围", "指标 / 告警 / 状态 / 排障"], ["覆盖规模", "100+ 服务"]],
    flow: [["指标采集", "指标"], ["告警规则", "告警"], ["异常定位", "链路"], ["问题闭环", "验证"]], previewTitle: "监控与告警中心", previewStatus: "监控 / 运行中", previewType: "observability",
    capabilities: [["观测对象分层", "按平台、集群、项目、工作负载和服务组织指标，建立从全局到单实例的下钻路径。"], ["信号关联与降噪", "把告警规则、服务状态、事件、日志和链路放在同一条排障路径中，减少孤立指标。"], ["运行问题闭环", "维护指标缺失、状态不一致、告警误触发等场景的定位、修复和发布后验证。"]],
  },
  "ops-copilot": {
    slug: "ops-copilot", title: "云原生监控告警智能助手", subtitle: "运维智能助手", category: "AI 运维", stage: "智能流程",
    brief: "把告警事件、服务上下文和运维知识组织成可检索、有引用、可流式交互的辅助决策链路。", scope: "知识库 / 检索增强 / 流式问答",
    meta: [["项目定位", "AI 运维辅助决策"], ["负责范围", "知识 / 检索 / 模型 / 反馈"], ["核心目标", "让回答带着证据"]],
    flow: [["告警事件", "告警"], ["知识检索", "检索"], ["引用证据", "证据"], ["辅助决策", "回答"]], previewTitle: "运维智能助手", previewStatus: "RAG / 流式响应", previewType: "copilot",
    capabilities: [["故障知识建模", "组织告警事件、服务上下文、知识文档和排查结论，形成可检索结构。"], ["RAG 数据链路", "设计文档解析、语义切分、向量生成、批量写入和版本更新流程。"], ["模型服务适配", "覆盖模型切换、超时重试、会话上下文、流式输出和用户反馈收集。"]],
  },
};

function PreviewSurface({ spec }: { spec: EngineeringSpec }) {
  if (spec.previewType === "pipeline") {
    return <div className="generic-product-ui generic-pipeline-ui"><div className="generic-ui-sidebar"><span>发布平台</span><b className="selected">发布任务</b><b>运行环境</b><b>制品仓库</b><b>执行历史</b></div><div className="generic-ui-main"><div className="generic-ui-toolbar"><div><small>发布 / 生产环境</small><strong>release-2026.03</strong></div><div className="console-toolbar-actions"><span className="console-pill"><i className="ui-blue" />生产环境</span><em>发布中</em></div></div><div className="release-control-row"><div><span>当前发布</span><strong>第 3 阶段 / 共 4 阶段</strong><small>已运行 02:18 · 预计还需 01:04</small></div><div><span>发布策略</span><strong>灰度发布 10%</strong><small>健康检查通过后扩大流量</small></div><button type="button">查看发布详情 ↗</button></div><div className="pipeline-summary"><div><small>代码提交</small><strong>8f42c1a</strong><span>main · 12 分钟前</span></div><div><small>构建制品</small><strong>application-api:2026.03</strong><span>摘要校验已通过</span></div><div><small>变更范围</small><strong>14 个文件</strong><span>2 位审核人已通过</span></div></div><div className="pipeline-track">{spec.flow.map(([title, label], index) => <div className={`pipeline-stage ${index < 2 ? "done" : index === 2 ? "active" : ""}`} key={title}><i /><strong>{title}</strong><small>{label}</small>{index < spec.flow.length - 1 && <b />}</div>)}</div><div className="generic-ui-columns"><div className="ui-list"><small>执行日志</small><p><i className="ui-green" />制品校验通过 <span>00:12</span></p><p><i className="ui-blue" />目标环境已锁定 <span>00:18</span></p><p><i className="ui-gray" />健康检查等待中 <span>现在</span></p></div><div className="ui-metric"><small>发布健康度</small><strong>92%</strong><div><i style={{ width: "92%" }} /></div><span>回滚入口已保留</span></div></div><div className="pipeline-footer-grid"><div><small>最近发布</small><p><b>release-2026.02</b><span>成功 · 18 分钟</span></p><p><b>release-2026.01</b><span>成功 · 22 分钟</span></p></div><div><small>发布防线</small><p><b>灰度 10%</b><span className="text-green">已就绪</span></p><p><b>自动回滚</b><span className="text-blue">已启用</span></p></div></div></div></div>;
  }

  if (spec.previewType === "observability") {
    return <div className="generic-product-ui generic-observability-ui"><div className="generic-ui-sidebar observe-sidebar"><span>可观测性</span><b className="selected">总览</b><b>集群</b><b>工作负载</b><b>服务</b><b>告警 <sup>12</sup></b><b>事件</b></div><div className="generic-ui-main"><div className="observe-toolbar"><div><small>平台 / 集群 / 项目</small><strong>服务健康</strong></div><div className="console-toolbar-actions"><span className="console-pill">production-cluster⌄</span><span className="console-pill">近 30 分钟⌄</span></div></div><div className="observe-kpis"><div><small>请求速率</small><strong>1.82k/s</strong><em>较上一时段 +4.8%</em></div><div><small>P95 延迟</small><strong>184 <i>ms</i></strong><em>gateway-service 变慢</em></div><div><small>错误率</small><strong>0.42%</strong><em>下降 0.08%</em></div><div><small>可用性</small><strong>99.96%</strong><em>100+ 服务在线</em></div></div><div className="observe-grid"><div className="observe-chart"><div className="chart-heading"><div><small>请求延迟 / P95</small><strong>184 <em>ms</em></strong></div><span>实时</span></div><div className="chart-lines"><i /><i /><i /><i /></div><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><span>10:00　　10:10　　10:20　　10:30</span></div><div className="observe-alerts"><div className="panel-heading"><small>告警 / 信号</small><b>12 条待处理</b></div><div><i className="ui-red" /><strong>gateway-service</strong><span>P95 &gt; 180ms · 8 分钟</span><b>严重</b></div><div><i className="ui-orange" /><strong>processing-service</strong><span>指标缺失 · 14 分钟</span><b>警告</b></div><div><i className="ui-green" /><strong>application-api</strong><span>发布后已恢复 · 22 分钟</span><b>已恢复</b></div></div></div><div className="observe-metric-grid"><div className="observe-metric-card"><small>CPU 使用率</small><strong>46.8%</strong><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div><span>集群平均 · 3 个节点</span></div><div className="observe-metric-card"><small>内存使用率</small><strong>63.2%</strong><div className="mini-bars purple"><i /><i /><i /><i /><i /><i /><i /><i /></div><span>工作负载分配 · 稳定</span></div><div className="observe-metric-card"><small>网络吞吐</small><strong>842 <i>MB/s</i></strong><div className="network-line"><i /><i /><i /><i /></div><span>入口 512 · 出口 330</span></div></div><div className="observe-bottom-grid"><div className="observe-services"><div className="panel-heading"><small>服务健康</small><b>3 / 3 正常上报</b></div><div><strong>gateway-service</strong><span>184ms · 99.91%</span><b>降级</b></div><div><strong>processing-service</strong><span>92ms · 99.98%</span><b>健康</b></div><div><strong>application-api</strong><span>61ms · 100%</span><b>健康</b></div></div><div className="observe-trace"><small>链路关联</small><strong>gateway → application → database</strong><div className="trace-line"><i /><i /><i /><i /></div><span>3 个服务 · 1 个故障 · 6 条关联信号</span></div></div><div className="observe-event-grid"><div className="observe-alert-table"><div className="panel-heading"><small>活跃告警规则</small><b>规则组</b></div><p><strong>HighLatencyP95</strong><span>gateway-service</span><b className="status-red">触发中</b></p><p><strong>TargetDown</strong><span>processing-service</span><b className="status-orange">待确认</b></p><p><strong>PodRestartRate</strong><span>application-api</span><b className="status-green">正常</b></p></div><div className="observe-events"><small>最近事件</small><p><i className="ui-blue" />部署已完成 <span>2 分钟前</span></p><p><i className="ui-orange" />副本数量已调整 <span>9 分钟前</span></p><p><i className="ui-gray" />节点心跳已接收 <span>12 分钟前</span></p></div></div><div className="observe-timeline"><span>故障时间线</span><p><i />告警触发 <b>→</b> 指标确认 <b>→</b> 日志定位 <b>→</b> 版本验证 <b>→</b> 修复确认</p></div></div></div>;
  }

  return <div className="generic-product-ui generic-copilot-ui"><div className="generic-ui-sidebar"><span>运维助手</span><b className="selected">故障事件</b><b>知识库</b><b>处理流程</b><b>反馈记录</b></div><div className="generic-ui-main"><div className="generic-ui-toolbar"><div><small>故障事件 / GATEWAY-SERVICE</small><strong>智能排障工作台</strong></div><div className="console-toolbar-actions"><span className="console-pill"><i className="ui-red" />P1 / 未关闭</span><em>流式响应</em></div></div><div className="copilot-insight-row"><div><small>判断可信度</small><strong>86%</strong><span>基于证据推断</span></div><div><small>检索到的资料</small><strong>06</strong><span>运行手册 · 历史事件 · 日志</span></div><div><small>下一步建议</small><strong>检查入口流量</strong><span>建议优先执行</span></div></div><div className="copilot-workspace"><div className="copilot-context"><small>故障上下文</small><strong>gateway-service 延迟升高</strong><span><i className="ui-red" /> P1 / 未关闭 · 8 分钟</span><div><small>关联服务</small><b>gateway-service · 已降级</b><b>application-api · 健康</b><b>mesh-ingress · 健康</b></div><div><small>引用资料</small><b>运行手册 / latency-v3</b><b>历史事件 / 2026-02-18</b><b>发布记录 / release-2026.03</b></div></div><div className="copilot-chat"><div className="copilot-chat-head"><span>运维智能助手</span><i>正在生成回答</i></div><div className="chat-bubble user">帮助我判断这次延迟告警的可能原因，并给出排查顺序。</div><div className="chat-bubble assistant"><strong>初步判断</strong><p>当前告警与 gateway-service 的上游响应变慢有关，建议先检查入口流量、最近发布记录和关联服务的 P95 指标。</p><div className="evidence"><span>引用 01 / 运行手册</span><span>引用 02 / 历史事件</span><span>引用 03 / 发布记录</span></div></div><div className="chat-input">继续追问…<b>→</b></div></div></div><div className="copilot-actions"><div><small>建议排查路径</small><p><b>01</b>确认入口流量 <span>→</span> <b>02</b>对比发布前后 <span>→</span> <b>03</b>检查上游依赖 <span>→</span> <b>04</b>执行修复验证</p></div><button>生成排查报告 <span>↗</span></button></div></div></div>;
}

export function EngineeringView({ spec }: { spec: EngineeringSpec }) {
  return (
    <main className="ns-page">
      <nav className="ns-nav" aria-label={`${spec.title} 详情导航`}><a href="/#projects">← 返回项目案例</a><span>工程视图 / {spec.subtitle}</span><a href="/resume.pdf" download>下载简历 ↗</a></nav>
      <header className="ns-hero"><div className="ns-eyebrow"><span>{spec.stage}</span><i /><span>工程能力预览</span></div><div className="ns-hero-grid"><div><h1 className="generic-ns-title">{spec.subtitle}</h1><p>{spec.title}</p></div><div className="ns-hero-copy"><span>{spec.brief}</span><div className="ns-hero-tags"><span>{spec.category}</span><span>{spec.scope}</span></div></div></div><div className="ns-meta-strip">{spec.meta.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></header>
      <section className="ns-section ns-intro"><div className="ns-section-label">01 / 系统背景</div><div className="ns-intro-grid"><h2>把复杂链路，<br /><em>变成可追踪流程。</em></h2><p>{spec.brief} 这套工程视图用于展示我如何拆分对象、阶段、状态和异常边界，让系统能力可以被理解、验证和持续交付。</p></div></section>
      <section className="ns-section generic-preview-section"><div className="ns-section-label">02 / {spec.category}</div><div className="ns-section-heading"><h2>{spec.previewTitle}</h2><p>参考成熟云原生产品常见的信息结构制作的工程能力预览，重点展示对象之间的关系、流程状态和问题处理方式。</p></div><div className="generic-preview"><div className="generic-preview-top"><strong>{spec.previewTitle}</strong><span>{spec.previewStatus}</span><i /></div><PreviewSurface spec={spec} /></div></section>
      <section className="ns-section ns-lifecycle-section"><div className="ns-section-label">03 / 责任边界</div><div className="ns-section-heading"><h2>我负责的<br /><em>工程能力。</em></h2><p>这里展示项目中的核心责任边界，而不是技术名词清单。</p></div><div className="ns-capability-list">{spec.capabilities.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p><b>↗</b></article>)}</div></section>
      <footer className="ns-footer"><a href="/#projects">← 返回全部项目</a><span>{spec.subtitle} / 工程视图</span><a href="/resume.pdf" download>下载 PDF 简历 ↗</a></footer>
    </main>
  );
}
