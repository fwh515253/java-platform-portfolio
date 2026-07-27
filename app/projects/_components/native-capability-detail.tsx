import Link from "next/link";

export type NativeCapabilityDetailSpec = {
  code: string;
  title: string;
  subtitle: string;
  period: string;
  overview: string;
  integration: string;
  capabilities: [string, string][];
  mechanisms: [string, string][];
  flow: string[];
  ownership: string[];
  value: string[];
  visualType?: "monitoring" | "assistant";
};

function NativeCapabilityVisual({ type }: { type: "monitoring" | "assistant" }) {
  if (type === "monitoring") {
    return <div className="monitoring-product-view">
      <header><div><span>NativeSphere / 可观测性</span><strong>集群与工作负载监控中心</strong></div><p><b>生产集群</b><b>近 30 分钟</b></p></header>
      <div className="monitoring-scope"><span className="active">平台总览</span><span>集群</span><span>节点</span><span>工作负载</span><span>Pod</span><span>服务</span><span>告警规则</span></div>
      <div className="monitoring-kpis"><article><span>集群资源</span><strong>3 个集群</strong><p>资源状态统一同步</p></article><article><span>活跃告警</span><strong className="alert">7 条</strong><p>严重 2 · 警告 5</p></article><article><span>监控目标</span><strong>正常</strong><p>指标采集链路可用</p></article><article><span>告警恢复</span><strong>4 条</strong><p>保留恢复时间与上下文</p></article></div>
      <div className="monitoring-main-grid">
        <section className="metric-chart"><div><span>工作负载 CPU 使用趋势</span><b>Prometheus / rate</b></div><div className="metric-lines"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><footer><span>14:00</span><span>14:10</span><span>14:20</span><span>14:30</span></footer></section>
        <section className="active-alerts"><div><span>活跃告警</span><b>按资源定位</b></div><article><i className="critical" /><p><strong>PodRestartRate</strong><span>application-api / pod-7d8f</span></p><em>严重</em></article><article><i className="warning" /><p><strong>WorkloadCpuHigh</strong><span>gateway-service / deployment</span></p><em>警告</em></article><article><i /><p><strong>TargetMissing</strong><span>processing-service / service</span></p><em>待确认</em></article></section>
      </div>
      <div className="signal-correlation"><span>一次告警的定位上下文</span><div><b>告警事件</b><i>→</i><b>关联资源</b><i>→</i><b>指标趋势</b><i>→</i><b>K8s 事件</b><i>→</i><b>Pod 日志</b><i>→</i><b>恢复验证</b></div></div>
      <p className="view-caption">示意视图用于展示项目真实的信息组织方式：监控对象复用平台资源身份，告警能够下钻到资源、指标、事件和日志。</p>
    </div>;
  }

  return <div className="assistant-product-view">
    <header><div><span>NativeSphere / 智能运维</span><strong>告警分析工作台</strong></div><p><b>P1 告警</b><span>上下文已聚合</span></p></header>
    <div className="assistant-layout">
      <aside><span>故障上下文</span><article><small>当前告警</small><strong>gateway-service 延迟升高</strong><p>持续 8 分钟 · production</p></article><article><small>关联资源</small><b>Deployment / gateway</b><b>Service / gateway-service</b><b>Pod / gateway-7f95</b></article><article><small>关联信号</small><b>指标趋势 6</b><b>K8s 事件 3</b><b>日志片段 12</b></article></aside>
      <main><div className="assistant-question"><span>用户提问</span><p>分析这次延迟告警的可能原因，并给出有依据的排查顺序。</p></div><div className="assistant-answer"><div><span>智能助手</span><b>基于运行上下文与知识检索生成</b></div><h4>初步判断</h4><p>告警发生前入口请求量明显上升，gateway-service 的 P95 延迟同步增加，但下游 application-api 指标保持稳定。建议优先检查网关实例负载、连接池及最近的治理配置变更。</p><h4>建议排查路径</h4><ol><li>核对入口流量与实例 CPU、线程指标</li><li>检查告警前后的发布与 Istio 配置变更</li><li>对比异常 Pod 与正常副本日志</li><li>执行修复后观察告警恢复状态</li></ol><div className="assistant-evidence"><span>引用证据</span><b>运行手册 / latency</b><b>历史事件 / gateway-0218</b><b>发布记录 / release-1842</b></div></div></main>
      <section><span>RAG 检索链路</span><div><b>故障上下文</b><i>↓</i><b>语义检索</b><i>↓</i><b>知识与历史记录</b><i>↓</i><b>证据重排</b><i>↓</i><b>模型回答</b></div><p>回答保留来源，由人工验证，不直接替代平台执行控制。</p></section>
    </div>
  </div>;
}

export function NativeCapabilityDetail({ spec }: { spec: NativeCapabilityDetailSpec }) {
  return <main className={`native-detail native-detail-${spec.code}`}>
    <nav><Link href="/projects/nativesphere">← NativeSphere 平台总览</Link><span>{spec.code.toUpperCase()} / CAPABILITY DOMAIN</span><Link href="/#projects">全部项目</Link></nav>
    <header>
      <div><span>{spec.period}</span><small>NativeSphere 子系统</small></div>
      <h1>{spec.title}</h1>
      <p>{spec.subtitle}</p>
    </header>
    <section className="native-detail-overview">
      <div><span>01 / 能力定位</span><h2>它在平台中<br />解决什么问题。</h2></div>
      <div><p>{spec.overview}</p><aside><strong>与平台的整合关系</strong><span>{spec.integration}</span></aside></div>
    </section>
    {spec.visualType && <section className="native-detail-product-section"><div className="native-detail-heading"><span>02 / 项目交互视图</span><h2>{spec.visualType === "monitoring" ? "监控对象、信号与告警定位" : "告警上下文、知识检索与辅助分析"}</h2></div><NativeCapabilityVisual type={spec.visualType} /></section>}
    <section>
      <div className="native-detail-heading"><span>{spec.visualType ? "03" : "02"} / 子系统能力</span><h2>能力范围与处理粒度</h2></div>
      <div className="native-detail-cards">{spec.capabilities.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><strong>{title}</strong><p>{text}</p></article>)}</div>
    </section>
    <section className="native-detail-mechanism">
      <div className="native-detail-heading"><span>{spec.visualType ? "04" : "03"} / 核心机制</span><h2>这些能力如何落地</h2></div>
      <div>{spec.mechanisms.map(([title,text])=><article key={title}><strong>{title}</strong><p>{text}</p></article>)}</div>
    </section>
    <section>
      <div className="native-detail-heading"><span>{spec.visualType ? "05" : "04"} / 关键链路</span><h2>端到端执行过程</h2></div>
      <div className="native-detail-flow">{spec.flow.map((item,index)=><div key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong>{index<spec.flow.length-1&&<i>→</i>}</div>)}</div>
    </section>
    <section className="native-detail-ownership">
      <div className="native-detail-heading"><span>{spec.visualType ? "06" : "05"} / 本人责任</span><h2>能够在面试中展开的工作</h2></div>
      <div>{spec.ownership.map((item,index)=><p key={item}><span>{String(index+1).padStart(2,"0")}</span>{item}</p>)}</div>
    </section>
    <section>
      <div className="native-detail-heading"><span>{spec.visualType ? "07" : "06"} / 平台价值</span><h2>整合后形成的能力</h2></div>
      <div className="native-detail-value">{spec.value.map(item=><p key={item}>{item}</p>)}</div>
    </section>
    <footer><Link href="/projects/nativesphere">← 返回 NativeSphere</Link><span>{spec.title}</span><Link href="/resume.pdf">查看简历 →</Link></footer>
  </main>;
}
