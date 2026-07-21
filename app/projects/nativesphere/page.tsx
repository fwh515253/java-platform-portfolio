const lifecycleSteps = [
  ["01", "构建镜像", "构建"],
  ["02", "推送制品", "Harbor"],
  ["03", "接入集群", "集群"],
  ["04", "绑定应用", "应用"],
  ["05", "发布服务", "运行"],
];

const capabilities = [
  ["镜像制品管理", "将构建参数、标签规范、仓库推送、结果回传和异常处理组织为完整链路。"],
  ["应用生命周期", "通过预制应用关联镜像，覆盖上线、启动、停止、重启和运行状态回读。"],
  ["集群管理", "围绕集群接入、命名空间、工作负载和资源配额建立统一的资源管理视图。"],
  ["服务治理", "将限流等服务策略纳入配置、校验、下发、状态核验和操作留痕。"],
  ["执行能力解耦", "将底层 Docker 操作抽离为 Go dockertool，降低平台编排层与执行层的耦合。"],
];

export default function NativeSpherePage() {
  return (
    <main className="ns-page">
      <nav className="ns-nav" aria-label="NativeSphere 详情导航">
        <a href="/#projects">← 返回项目案例</a>
        <span>工程视图 / NativeSphere</span>
        <a href="/resume.pdf" download>下载简历 ↗</a>
      </nav>

      <header className="ns-hero">
        <div className="ns-eyebrow"><span>在线平台</span><i /><span>工程能力预览</span></div>
        <div className="ns-hero-grid">
          <div>
            <h1>NativeSphere</h1>
            <p>云原生应用管理平台</p>
          </div>
          <div className="ns-hero-copy">
            <span>我负责把底层容器能力，整理成可被业务使用的应用控制面。</span>
            <div className="ns-hero-tags"><span>镜像管理</span><span>应用管理</span><span>服务治理</span></div>
          </div>
        </div>
        <div className="ns-meta-strip"><div><span>项目定位</span><strong>云原生应用控制面</strong></div><div><span>负责范围</span><strong>镜像 / 应用 / 集群 / 服务</strong></div><div><span>使用状态</span><strong className="ns-live"><i /> 已上线使用</strong></div></div>
      </header>

      <section className="ns-section ns-intro">
        <div className="ns-section-label">01 / 系统背景</div>
        <div className="ns-intro-grid"><h2>从制品进入平台，<br /><em>到服务真正运行。</em></h2><p>NativeSphere 将镜像、应用、服务和运行配置放到同一个控制面中。我的工作重点不是单独完成某个接口，而是定义对象关系、状态边界和执行结果，让用户操作能够对应到真实的运行变化。</p></div>
      </section>

      <section className="ns-section ns-workspace-section">
        <div className="ns-section-label">02 / 控制面</div>
        <div className="ns-section-heading"><h2>工程能力预览</h2><p>基于项目负责范围抽象的控制面界面，展示系统对象之间如何连接。</p></div>
        <div className="ns-workspace" aria-label="NativeSphere 控制面工程能力预览">
          <div className="ns-window-bar"><span className="ns-window-brand"><i /> NativeSphere</span><span>workspace / production</span><span className="ns-window-user">● platform admin</span></div>
          <div className="ns-window-body">
            <aside className="ns-sidebar"><span className="ns-side-label">控制面</span><a className="active" href="#overview">总览</a><a href="#images">镜像管理</a><a href="#apps">应用管理</a><a href="#clusters">集群管理</a><a href="#services">服务管理</a><a href="#audit">操作审计</a><div className="ns-sidebar-bottom"><span>连接状态</span><strong><i /> cluster-main</strong></div></aside>
            <div className="ns-console">
              <div className="ns-console-head"><div><span>平台总览</span><h3>应用运行总览</h3></div><button type="button">+ 创建应用</button></div>
              <div className="ns-stat-row"><div><span>应用</span><strong>04</strong><small>已注册应用</small></div><div><span>服务</span><strong>12</strong><small>运行中服务</small></div><div><span>镜像</span><strong>18</strong><small>已管理制品</small></div><div><span>平台状态</span><strong className="healthy">正常</strong><small>平台连接正常</small></div></div>
              <div className="ns-console-grid">
                <section className="ns-console-card ns-application-card" id="apps"><div className="ns-card-head"><span>应用</span><a href="#apps">查看全部 ↗</a></div><div className="ns-application-list"><div><i className="green-dot" /><div><strong>application-api</strong><span>release-2026.03 · 运行中</span></div><b>正常</b></div><div><i className="green-dot" /><div><strong>processing-service</strong><span>release-2026.02 · 运行中</span></div><b>正常</b></div><div><i className="blue-dot" /><div><strong>gateway-service</strong><span>release-2026.01 · 更新中</span></div><b>更新中</b></div></div></section>
                <section className="ns-console-card ns-governance-card" id="services"><div className="ns-card-head"><span>服务治理</span><a href="#services">策略管理 ↗</a></div><div className="ns-governance-main"><div className="ns-ring"><strong>03</strong><span>条策略</span></div><div><strong>服务策略已下发</strong><span>限流 / 状态回读 / 审计</span><em><i /> 系统运行正常</em></div></div><div className="ns-policy-row"><span>gateway-service</span><b>限流已启用</b><small>已同步</small></div></section>
              </div>
              <section className="ns-console-card ns-cluster-summary" id="clusters"><div className="ns-card-head"><span>集群管理</span><a href="#clusters">资源视图 ↗</a></div><div className="ns-cluster-list"><div><strong>cluster-main</strong><span>生产环境 · 连接正常</span><b>12 个工作负载</b></div><div><strong>cluster-staging</strong><span>测试环境 · 状态同步中</span><b>08 个工作负载</b></div><div><strong>project-production</strong><span>命名空间 · 配额 68%</span><b>运行正常</b></div></div></section>
              <section className="ns-console-card ns-image-card" id="images"><div className="ns-card-head"><span>镜像仓库</span><a href="#images">Harbor ↗</a></div><div className="ns-image-table"><div className="ns-table-head"><span>制品名称</span><span>版本标签</span><span>仓库状态</span><span>最近操作</span></div><div><strong>application-api</strong><span>release-2026.03</span><b>已推送</b><small>刚刚</small></div><div><strong>processing-service</strong><span>release-2026.02</span><b>已推送</b><small>2 小时前</small></div></div></section>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-section ns-lifecycle-section">
        <div className="ns-section-label">03 / 生命周期</div>
        <div className="ns-section-heading"><h2>一次操作，<br /><em>经过哪些边界。</em></h2><p>通过清晰的对象关系和阶段状态，把底层执行转化为可理解、可追踪的业务流程。</p></div>
        <div className="ns-lifecycle">{lifecycleSteps.map(([number, title, label], index) => <div className="ns-lifecycle-step" key={number}><span className="ns-step-index">{number}</span><div className="ns-step-icon"><i /></div><strong>{title}</strong><span>{label}</span>{index < lifecycleSteps.length - 1 && <i className="ns-step-arrow">→</i>}</div>)}</div>
      </section>

      <section className="ns-section ns-capability-section">
        <div className="ns-section-label">04 / 责任边界</div>
        <div className="ns-section-heading"><h2>我负责的<br /><em>工程能力。</em></h2><p>这里展示 NativeSphere 中我实际参与的核心边界，而不是技术名词清单。</p></div>
        <div className="ns-capability-list">{capabilities.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p><b>↗</b></article>)}</div>
      </section>

      <footer className="ns-footer"><a href="/#projects">← 返回全部项目</a><span>NativeSphere / 工程视图</span><a href="/resume.pdf" download>下载 PDF 简历 ↗</a></footer>
    </main>
  );
}
