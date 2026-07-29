import Link from "next/link";

type CapabilityViewType = "platform" | "pipeline" | "gateway" | "oa";

function CapabilityGroup({ title, subtitle, items }: { title: string; subtitle: string; items: string[] }) {
  return <article className="capability-group"><header><span>{subtitle}</span><strong>{title}</strong></header><div>{items.map((item) => <p key={item}><i />{item}</p>)}</div></article>;
}

function NativeSphereCapabilities() {
  return <div className="capability-blueprint native-capability-blueprint">
    <div className="blueprint-heading"><div><span>PLATFORM CAPABILITY MAP</span><strong>Kubernetes 资源接管与平台能力分层</strong></div><p>不是单个资源页面，而是把资源操作、运行状态、服务治理、可观测性和故障处置组织为统一控制面。</p></div>
    <div className="native-evolution">
      <span>平台能力演进与整合</span>
      <div><article><small>2023.10</small><b>资源与应用管理</b><p>Kubernetes 资源接管、镜像制品和应用生命周期构成平台基础。</p></article><i>→</i><article className="monitoring-milestone"><small>2024.02</small><b>监控告警整合</b><p>将指标、规则、告警事件和日志定位能力并入资源控制面。</p></article><i>→</i><article><small>2025.06</small><b>AI 辅助运维</b><p>在告警上下文之上接入 RAG 知识检索和处置建议。</p></article></div>
    </div>
    <nav className="native-capability-portals" aria-label="NativeSphere 子系统详情">
      <Link href="/projects/nativesphere/resource-control"><span>01</span><strong>资源控制面</strong><p>资源接管、对象模型与状态同步</p><b>进入子系统 →</b></Link>
      <Link href="/projects/nativesphere/delivery-governance"><span>02</span><strong>应用交付与服务治理</strong><p>制品、部署、Istio 路由与限流</p><b>进入子系统 →</b></Link>
      <Link className="monitoring-portal" href="/projects/nativesphere/observability"><span>03</span><strong>监控与告警系统</strong><p>指标模型、告警上下文与平台整合</p><b>查看整合详情 →</b></Link>
      <Link href="/projects/nativesphere/ai-ops"><span>04</span><strong>监控告警智能助手</strong><p>故障上下文、RAG 与辅助处置</p><b>进入子系统 →</b></Link>
    </nav>
    <div className="native-capability-layers">
      <section className="capability-layer user-layer"><span>使用入口</span><div><b>平台管理员</b><b>研发人员</b><b>运维人员</b></div></section>
      <i>↓</i>
      <section className="capability-layer platform-layer"><span>NativeSphere 平台能力</span><div>
        <CapabilityGroup title="平台与租户空间" subtitle="PLATFORM" items={["集群接入与连接状态", "工作空间 / 命名空间", "用户、角色与资源权限", "配额及使用范围"]} />
        <CapabilityGroup title="计算与工作负载" subtitle="COMPUTE" items={["Deployment / StatefulSet", "DaemonSet / Job / CronJob", "Pod 状态、事件与日志", "启停、重启、升级及副本调整"]} />
        <CapabilityGroup title="网络与服务治理" subtitle="NETWORK" items={["Service / Ingress 等网络资源", "服务访问与路由配置", "Istio 流量策略", "限流配置、下发与状态核验"]} />
        <CapabilityGroup title="存储与配置" subtitle="CONFIGURATION" items={["PV / PVC / StorageClass", "ConfigMap / Secret", "配置关联与使用关系", "资源状态与异常信息"]} />
        <CapabilityGroup title="镜像与应用交付" subtitle="DELIVERY" items={["Docker 镜像构建", "Harbor 制品推送与版本", "应用与镜像关联", "部署、升级与运行状态回读"]} />
        <CapabilityGroup title="可观测与智能运维" subtitle="OBSERVABILITY" items={["Prometheus 指标查询与聚合", "规则、告警事件与状态", "资源 / 指标 / 告警 / 日志关联", "RAG 知识检索与处置建议"]} />
      </div></section>
      <i>↓</i>
      <section className="capability-layer adapter-layer"><span>能力适配与状态一致性</span><div><b>Kubernetes API</b><b>Docker / Harbor</b><b>Istio</b><b>Prometheus / Grafana</b><b>大模型与知识库</b></div></section>
    </div>
    <div className="mechanism-strip"><span>关键工程机制</span><p><b>统一资源模型</b>对象转换与接口封装</p><p><b>双向状态同步</b>请求结果与集群真实状态校验</p><p><b>关联上下文</b>资源、指标、告警、事件和日志串联</p><p><b>生命周期闭环</b>创建、变更、运行、观测与处置</p></div>
  </div>;
}

function ReleaseFlowCapabilities() {
  return <div className="capability-blueprint release-capability-blueprint">
    <div className="blueprint-heading"><div><span>DELIVERY DOMAIN MODEL</span><strong>发布对象、执行引擎与恢复机制</strong></div><p>项目核心不是一条流水线动画，而是用统一领域模型承接两种发布通道，并保证状态、日志和结果可追踪。</p></div>
    <div className="release-domain-map">
      <section><span>发布输入</span><div><b>应用</b><b>版本</b><b>镜像制品</b><b>目标环境</b><b>发布批次</b></div></section>
      <i>→</i>
      <section className="release-orchestrator"><span>发布编排核心</span><div><b>对象校验</b><b>环境隔离</b><b>执行策略</b><b>状态机</b><b>操作审计</b></div></section>
      <i>→</i>
      <section className="release-executors"><span>执行适配器</span><div><article><strong>Kubernetes 直接发布</strong><p>资源生成 · 配置下发 · rollout 状态 · 结果回读</p></article><article><strong>Jenkins Pipeline</strong><p>任务触发 · 参数传递 · 状态轮询 · 日志与结果同步</p></article></div></section>
    </div>
    <div className="release-command-center"><header><div><span>RELEASE CONTROL PLANE</span><strong>application-api / production</strong></div><p><i />发布执行中 <b>#RF-1842</b></p></header><div className="release-command-grid"><article className="release-command-summary"><div className="release-command-kpis"><section><span>应用版本</span><strong>v2.8.0</strong><small>commit 8f42c1a</small></section><section><span>镜像制品</span><strong>app-api:2.8.0</strong><small>Harbor 已校验</small></section><section><span>目标集群</span><strong>cluster-main</strong><small>production</small></section></div><div className="release-guard-grid"><b>制品校验 <i>通过</i></b><b>环境隔离 <i>已启用</i></b><b>重复发布 <i>已拦截</i></b><b>操作审计 <i>已记录</i></b></div></article><article className="release-stage-rail"><div className="release-stage-rail-head"><span>执行阶段</span><b>62%</b></div><div className="release-stage-track"><i /><i className="active" /><i /><i /><i /></div><div className="release-stage-labels"><span>对象校验</span><span className="active">资源下发</span><span>状态回读</span><span>结果确认</span><span>完成</span></div><p>当前执行通道：<strong>Kubernetes 直接发布</strong></p></article><article className="release-event-feed"><div><span>实时执行事件</span><b>最近 30 秒</b></div><p><i className="done" />14:32:08　发布对象校验完成</p><p><i className="done" />14:32:12　deployment/application-api configured</p><p><i className="active" />14:32:16　waiting for rollout status...</p><p><i />14:32:20　结果确认等待中</p></article></div></div>
    <div className="release-state-machine"><span>统一执行状态</span><div><b>待执行</b><i>→</i><b>执行中</b><i>→</i><b>成功</b></div><div><b>执行中</b><i>→</i><b className="failed">失败</b><i>→</i><b>重试 / 回滚</b></div><p>无论底层通过 Kubernetes 还是 Jenkins 执行，上层均使用一致的阶段、日志、结果和恢复入口。</p></div>
    <div className="capability-matrix">
      <CapabilityGroup title="过程可见" subtitle="OBSERVABLE" items={["阶段进度与执行状态", "实时日志和失败原因", "版本、环境与结果关联"]} />
      <CapabilityGroup title="执行可靠" subtitle="RELIABILITY" items={["幂等与重复触发校验", "超时和流程中断处理", "失败重试与状态核对"]} />
      <CapabilityGroup title="结果可恢复" subtitle="RECOVERY" items={["保留历史发布记录", "回滚入口与目标版本", "异常处理后的结果确认"]} />
    </div>
  </div>;
}

function BpaasCapabilities() {
  return <div className="capability-blueprint gateway-capability-blueprint">
    <div className="blueprint-heading"><div><span>SERVICE ACCESS MODEL</span><strong>从服务登记到网关执行的配置闭环</strong></div><p>平台负责统一接入和配置管理，网关核心负责请求转发与运行时执行；视图明确两者边界及本人参与范围。</p></div>
    <div className="gateway-domain-model">
      <CapabilityGroup title="服务域" subtitle="SERVICE" items={["服务基础信息", "所属系统与负责人", "启用状态", "环境关联"]} />
      <CapabilityGroup title="接口域" subtitle="API" items={["接口路径与请求方式", "服务归属关系", "参数与访问约束", "接口状态"]} />
      <CapabilityGroup title="环境域" subtitle="ENVIRONMENT" items={["开发 / 测试 / 生产映射", "上游访问地址", "环境级配置", "有效性校验"]} />
      <CapabilityGroup title="路由域" subtitle="ROUTE" items={["路径匹配规则", "服务及环境目标", "配置版本", "下发状态"]} />
    </div>
    <div className="gateway-command-center"><header><div><span>GATEWAY CONTROL PLANE</span><strong>服务接入配置 / production</strong></div><p><i />配置已同步 <b>v34</b></p></header><div className="gateway-command-grid"><article className="gateway-input-panel"><div><span>接入对象</span><b>服务与路由</b></div><p><small>服务</small><strong>order-service</strong><em>已登记</em></p><p><small>接口</small><strong>/api/orders/**</strong><em>已校验</em></p><p><small>环境</small><strong>prod-cluster</strong><em>可用</em></p><p><small>策略</small><strong>RateLimit 200/s</strong><em>已启用</em></p></article><article className="gateway-control-core"><span>配置控制面</span><strong>BPAAS</strong><small>统一模型 · 参数校验 · 版本管理</small><div><i /><i /><i /><i /></div><b>配置版本 v34</b></article><article className="gateway-runtime-panel"><div><span>运行时状态</span><b>健康</b></div><section><i className="gateway-health" /><div><strong>Route Config</strong><small>配置已下发</small></div><em>已同步</em></section><section><i className="gateway-health" /><div><strong>Runtime Status</strong><small>处理结果回读</small></div><em>正常</em></section><section><i className="gateway-warn" /><div><strong>调用记录</strong><small>最近 5 分钟</small></div><em>1.28k/s</em></section></article></div><div className="gateway-command-trace"><span>配置传播链路</span><b>管理面</b><i>→</i><b>领域模型</b><i>→</i><b>路由版本</b><i>→</i><b>网关执行</b><i>→</i><b>上游服务</b><em>状态回读 42ms</em></div></div>
    <div className="gateway-config-loop"><section><span>01</span><b>接入配置</b><p>登记服务、接口、环境与路由关系</p></section><i>→</i><section><span>02</span><b>领域校验</b><p>验证参数、关联关系和目标环境</p></section><i>→</i><section><span>03</span><b>网关协同</b><p>配置下发并接收处理结果</p></section><i>→</i><section><span>04</span><b>状态追踪</b><p>记录异常、调用信息和运行状态</p></section></div>
    <div className="ownership-map"><div><span>本人实际参与</span><p>服务、接口、环境及路由模型；后端接口；服务接入流程；配置下发、结果回读、异常记录、联调与问题定位。</p></div><div><span>协作但不归为本人独立负责</span><p>网关运行时内核、请求转发机制以及核心策略执行实现。</p></div></div>
  </div>;
}

function OaCapabilities() {
  return <div className="capability-blueprint oa-capability-blueprint">
    <div className="blueprint-heading"><div><span>FULL-STACK BUSINESS SLICE</span><strong>一项业务功能如何端到端落地</strong></div><p>OA 的价值不在“有审批页面”，而在于把业务规则、状态流转、权限边界、交互体验和审计记录完整串联。</p></div>
    <div className="oa-vertical-slice">
      <section><span>前端交互</span><div><b>列表与查询</b><b>申请表单</b><b>详情与状态</b><b>审批工作台</b><b>异常反馈</b></div></section>
      <i>↓</i>
      <section><span>业务服务</span><div><b>申请创建 / 草稿</b><b>提交与撤回</b><b>审批 / 驳回</b><b>状态流转</b><b>处理记录</b></div></section>
      <i>↓</i>
      <section><span>访问控制</span><div><b>JWT 身份</b><b>用户与角色</b><b>菜单权限</b><b>操作权限</b><b>数据范围</b></div></section>
      <i>↓</i>
      <section><span>数据与审计</span><div><b>业务数据</b><b>审批意见</b><b>状态历史</b><b>操作人及时间</b><b>缓存与会话</b></div></section>
    </div>
    <div className="oa-business-flow"><span>典型业务闭环</span><div><b>创建申请</b><i>→</i><b>表单校验</b><i>→</i><b>提交审批</b><i>→</i><b>权限判断</b><i>→</i><b>处理反馈</b><i>→</i><b>记录归档</b></div></div>
    <div className="capability-matrix oa-delivery-matrix">
      <CapabilityGroup title="后端能力" subtitle="BACKEND" items={["数据模型与接口设计", "业务规则及状态流转", "权限与数据范围控制"]} />
      <CapabilityGroup title="前端能力" subtitle="FRONTEND" items={["Vue 页面和组件", "表单、分页及校验", "接口联调与状态呈现"]} />
      <CapabilityGroup title="交付能力" subtitle="DELIVERY" items={["需求拆分与模块设计", "测试、上线及问题处理", "从数据库到页面完整交付"]} />
    </div>
  </div>;
}

export function ProjectCapabilityView({ type }: { type: CapabilityViewType }) {
  if (type === "platform") return <NativeSphereCapabilities />;
  if (type === "pipeline") return <ReleaseFlowCapabilities />;
  if (type === "gateway") return <BpaasCapabilities />;
  return <OaCapabilities />;
}
