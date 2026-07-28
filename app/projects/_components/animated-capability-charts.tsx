"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type ChartType = "platform" | "pipeline" | "gateway" | "oa" | "cloudops";

const viewMeta: Record<ChartType, { eyebrow: string; title: string }> = {
  platform: {
    eyebrow: "PLATFORM RESOURCE TOPOLOGY",
    title: "资源控制面、可观测性与智能运维协同",
  },
  pipeline: {
    eyebrow: "DUAL-CHANNEL DELIVERY PIPELINE",
    title: "一次发布如何在 K8s 直发与 Jenkins 通道中执行",
  },
  gateway: {
    eyebrow: "GATEWAY CONFIG PROPAGATION",
    title: "管理面配置进入网关运行时的完整链路",
  },
  oa: {
    eyebrow: "FULL-STACK APPROVAL SWIMLANE",
    title: "角色、流程、权限与审计如何共同驱动业务",
  },
  cloudops: {
    eyebrow: "INCIDENT COMMAND BOARD",
    title: "事件、工单、SLA 与知识沉淀的处置闭环",
  },
};

function ViewHeader({ type }: { type: ChartType }) {
  const meta = viewMeta[type];
  return <header className="business-viz-header">
    <div><span>{meta.eyebrow}</span><strong>{meta.title}</strong></div>
    <p><i className="chart-live-dot" />实时能力演示</p>
  </header>;
}

function PlatformTopology() {
  const capabilities = [
    ["计算", "工作负载 / Pod", "compute"],
    ["网络", "Service / Istio", "network"],
    ["存储", "PVC / StorageClass", "storage"],
    ["交付", "镜像 / 应用", "delivery"],
  ];

  return <div className="platform-topology">
    <section className="platform-map viz-panel">
      <div className="viz-section-title"><span>资源拓扑</span><b>统一资源身份与状态回读</b></div>
      <div className="topology-canvas">
        <svg viewBox="0 0 720 360" role="img" aria-label="NativeSphere 平台资源拓扑">
          <path className="topology-link" d="M360 180L118 86M360 180L602 86M360 180L118 274M360 180L602 274" />
          <path className="topology-link topology-link-secondary" d="M118 86L118 274M602 86L602 274" />
        </svg>
        <div className="topology-core viz-node">
          <small>CONTROL PLANE</small>
          <strong>NativeSphere</strong>
          <span>Kubernetes API</span>
          <i className="topology-pulse" />
        </div>
        {capabilities.map(([title, text, position]) => <article className={`topology-domain topology-${position} viz-node`} key={title}>
          <span>{title}</span><strong>{text}</strong><small>状态同步 · 生命周期</small>
        </article>)}
      </div>
    </section>
    <aside className="platform-observe viz-panel">
      <div className="viz-section-title"><span>观测与智能闭环</span><b>从资源进入信号，再返回处置入口</b></div>
      <div className="observe-stack">
        <article><i className="observe-wave" /><div><small>METRICS</small><strong>Prometheus 指标</strong></div><b>正常</b></article>
        <article><i /><div><small>ALERT</small><strong>规则与告警事件</strong></div><b className="warn">7 条</b></article>
        <article><i /><div><small>CONTEXT</small><strong>资源 / 事件 / 日志</strong></div><b>已关联</b></article>
        <article className="observe-ai"><i /><div><small>AI OPS</small><strong>RAG 分析与排查建议</strong></div><b>可追溯</b></article>
      </div>
      <div className="platform-loop">
        <span>资源详情</span><i>→</i><span>指标告警</span><i>→</i><span>上下文聚合</span><i>→</i><span>辅助处置</span>
      </div>
    </aside>
  </div>;
}

function PipelineExecution() {
  const stages = ["版本锁定", "配置校验", "执行调度", "状态回读", "验证 / 回滚"];
  return <div className="pipeline-execution viz-panel">
    <div className="pipeline-summary">
      <div><span>RELEASE</span><strong>release-2026.07.27</strong><small>production · app-gateway</small></div>
      <p><b>执行中</b><span>统一发布模型</span><span>环境隔离</span><span>可恢复</span></p>
    </div>
    <div className="pipeline-stage-head">
      <span>执行通道</span>{stages.map((stage, index) => <b key={stage}><i>{index + 1}</i>{stage}</b>)}
    </div>
    <section className="pipeline-lane lane-k8s">
      <header><strong>K8s 直发</strong><span>Manifest / API</span></header>
      <div className="release-track"><i className="pipeline-packet" /></div>
      {stages.map((stage, index) => <article className={`release-stage ${index < 4 ? "done" : "active"}`} key={stage}>
        <i /> <strong>{index < 4 ? "完成" : "健康检查"}</strong><small>{["对象快照", "Schema 通过", "Apply 执行", "状态一致", "等待验证"][index]}</small>
      </article>)}
    </section>
    <section className="pipeline-lane lane-jenkins">
      <header><strong>Jenkins</strong><span>Pipeline / Agent</span></header>
      <div className="release-track"><i className="pipeline-packet" /></div>
      {stages.map((stage, index) => <article className={`release-stage ${index < 3 ? "done" : index === 3 ? "active" : ""}`} key={stage}>
        <i /> <strong>{index < 3 ? "完成" : index === 3 ? "同步中" : "待执行"}</strong><small>{["制品确认", "参数检查", "Job #1842", "日志归一", "回滚入口"][index]}</small>
      </article>)}
    </section>
    <footer className="pipeline-result">
      <article><span>统一状态</span><strong>底层差异转换为一致的阶段与结果</strong></article>
      <article><span>异常恢复</span><strong>超时、重试、幂等与回滚入口</strong></article>
      <article><span>审计链路</span><strong>操作者、版本、日志和状态完整留痕</strong></article>
    </footer>
  </div>;
}

function GatewayPropagation() {
  return <div className="gateway-propagation">
    <section className="gateway-editor viz-panel">
      <div className="viz-section-title"><span>管理面</span><b>领域对象与配置版本</b></div>
      <div className="gateway-form">
        <label><span>服务</span><strong>payment-service</strong></label>
        <label><span>接口</span><strong>POST /api/payment</strong></label>
        <label><span>环境</span><strong>production</strong></label>
        <label><span>路由策略</span><strong>灰度 20% · JWT 校验</strong></label>
      </div>
      <div className="config-version"><span>CONFIG VERSION</span><strong>v18</strong><p>校验通过 · 待下发</p></div>
    </section>
    <section className="gateway-runtime viz-panel">
      <div className="gateway-sync">
        <span>配置生成</span><i className="gateway-packet" /><b>下发 / 回读</b>
      </div>
      <div className="gateway-core viz-node"><small>RUNTIME</small><strong>API Gateway</strong><span>路由 · 鉴权 · 限流</span><i /></div>
      <div className="gateway-routes">
        <article><span>/payment</span><strong>payment-v2</strong><b>20%</b></article>
        <article><span>/payment</span><strong>payment-v1</strong><b>80%</b></article>
        <article><span>/account</span><strong>account-service</strong><b>100%</b></article>
      </div>
      <div className="gateway-feedback"><i />运行状态回读：版本 v18 已生效，3 条路由正常</div>
    </section>
    <aside className="gateway-trace viz-panel">
      <div className="viz-section-title"><span>一次请求</span><b>运行链路</b></div>
      <div className="trace-line"><span>Client</span><i /><span>JWT</span><i /><span>Rate Limit</span><i /><span>Route</span><i /><span>Service</span></div>
      <p><span>200</span><strong>148 ms</strong><small>trace-id: 7f2a…91c</small></p>
    </aside>
  </div>;
}

function OaSwimlane() {
  const lanes = [
    { role: "申请人", events: [["提交申请", 1], ["查看进度", 5]] },
    { role: "OA 系统", events: [["表单校验", 2], ["权限判断", 4], ["归档留痕", 6]] },
    { role: "部门负责人", events: [["一级审批", 3]] },
    { role: "行政 / 财务", events: [["业务复核", 4], ["执行确认", 5]] },
  ];
  return <div className="oa-swimlane viz-panel">
    <div className="oa-process-head">
      <div><span>PROCESS INSTANCE</span><strong>用印申请 #OA-20260727</strong></div>
      <p><b>已完成</b><span>耗时 4h 26m</span><span>6 个审计节点</span></p>
    </div>
    <div className="oa-timeline-head"><span>角色</span>{["发起", "校验", "审批", "复核", "执行", "归档"].map(item => <b key={item}>{item}</b>)}</div>
    <div className="oa-lanes">
      <i className="oa-progress-line" />
      {lanes.map(lane => <section key={lane.role}>
        <header><i>{lane.role.slice(0, 1)}</i><strong>{lane.role}</strong></header>
        <div>{lane.events.map(([event, column]) => <article className="oa-event" style={{ gridColumn: Number(column) }} key={event}>
          <i /><strong>{event}</strong><small>已完成</small>
        </article>)}</div>
      </section>)}
    </div>
    <footer className="oa-audit">
      <span>权限边界</span><b>页面权限</b><i>+</i><b>操作权限</b><i>+</i><b>数据范围</b><em>全部流转写入审计记录</em>
    </footer>
  </div>;
}

function SlaRing({ value, label, tone }: { value: number; label: string; tone: string }) {
  const offset = 176 - (176 * value) / 100;
  return <article className={`sla-ring sla-${tone}`}>
    <svg viewBox="0 0 72 72" aria-label={`${label} ${value}%`}>
      <circle cx="36" cy="36" r="28" />
      <circle className="sla-progress" cx="36" cy="36" r="28" data-offset={offset} style={{ strokeDashoffset: offset }} />
    </svg>
    <div><strong>{value}%</strong><span>{label}</span></div>
  </article>;
}

function CloudOpsBoard() {
  const columns = [
    ["待响应", ["数据库连接异常", "节点磁盘告警"]],
    ["处理中", ["网关延迟升高", "证书即将过期"]],
    ["待验证", ["应用重启频繁"]],
    ["已关闭", ["镜像拉取失败", "发布健康检查失败"]],
  ];
  return <div className="cloudops-board">
    <section className="incident-overview viz-panel">
      <div className="viz-section-title"><span>处置态势</span><b>事件与 SLA</b></div>
      <div className="incident-kpis">
        <article><span>活跃工单</span><strong>12</strong><small>较昨日 -3</small></article>
        <article><span>P1 事件</span><strong className="danger">2</strong><small>均已响应</small></article>
        <article><span>平均响应</span><strong>8m</strong><small>目标 ≤ 15m</small></article>
      </div>
      <div className="sla-rings">
        <SlaRing value={82} label="响应 SLA" tone="blue" />
        <SlaRing value={64} label="解决 SLA" tone="amber" />
      </div>
    </section>
    <section className="ticket-kanban viz-panel">
      <div className="viz-section-title"><span>工单流转</span><b>责任与状态实时推进</b></div>
      <div className="kanban-columns">
        {columns.map(([title, tickets], index) => <article key={title}>
          <header><strong>{title}</strong><span>{tickets.length}</span></header>
          <div>{tickets.map((ticket, ticketIndex) => <p className="ticket-card" key={ticket}>
            <i className={index === 1 && ticketIndex === 0 ? "p1" : ""} />
            <strong>{ticket}</strong><small>{["平台组", "运维组", "研发组"][ticketIndex % 3]}</small>
          </p>)}</div>
        </article>)}
      </div>
    </section>
    <aside className="knowledge-reuse viz-panel">
      <div className="viz-section-title"><span>处置完成后</span><b>知识沉淀</b></div>
      <div><span>历史工单</span><i>→</i><span>结构化复盘</span><i>→</i><span>知识库</span><i>→</i><span>AI 建议</span></div>
      <p><strong>相似事件已召回 3 条</strong><span>网关延迟 / 连接池 / Istio 配置</span></p>
    </aside>
  </div>;
}

function BusinessView({ type }: { type: ChartType }) {
  if (type === "platform") return <PlatformTopology />;
  if (type === "pipeline") return <PipelineExecution />;
  if (type === "gateway") return <GatewayPropagation />;
  if (type === "oa") return <OaSwimlane />;
  return <CloudOpsBoard />;
}

export function AnimatedCapabilityCharts({ type }: { type: ChartType }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();

    media.add({
      animate: "(prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) {
        gsap.set(".viz-panel, .viz-node, .release-stage, .oa-event, .ticket-card", { clearProps: "all" });
        return;
      }

      gsap.from(".viz-panel", { y: 18, autoAlpha: 0, duration: 0.65, stagger: 0.1, ease: "power2.out" });
      gsap.from(".viz-node", { scale: 0.92, autoAlpha: 0, duration: 0.65, stagger: 0.08, ease: "back.out(1.35)" });
      gsap.fromTo(".topology-link", { strokeDasharray: 600, strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.5, stagger: 0.08, ease: "power2.inOut" });
      gsap.to(".topology-pulse", { scale: 1.65, autoAlpha: 0, repeat: -1, duration: 1.8, ease: "power1.out" });
      gsap.from(".release-stage", { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" });
      gsap.to(".pipeline-packet", { xPercent: 780, repeat: -1, duration: 3.4, stagger: 0.7, ease: "none" });
      gsap.to(".gateway-packet", { xPercent: 420, repeat: -1, duration: 2.3, ease: "power1.inOut" });
      gsap.from(".gateway-routes article", { x: -18, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
      gsap.fromTo(".oa-progress-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.5, ease: "power2.inOut" });
      gsap.from(".oa-event", { scale: 0.8, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: "back.out(1.5)" });
      gsap.fromTo(".sla-progress", { strokeDashoffset: 176 }, { strokeDashoffset: (_, target) => target.dataset.offset ?? 40, duration: 1.3, stagger: 0.14, ease: "power2.out" });
      gsap.from(".ticket-card", { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" });
      gsap.to(".chart-live-dot", { scale: 1.55, autoAlpha: 0.25, repeat: -1, yoyo: true, duration: 1.1, ease: "sine.inOut" });
    }, root.current);

    return () => media.revert();
  }, { scope: root });

  return <section ref={root} className={`business-capability-viz business-viz-${type}`}>
    <ViewHeader type={type} />
    <BusinessView type={type} />
    <footer className="business-viz-footnote">视图表达项目的业务对象、系统边界与执行机制，不代表生产业务量或性能统计。</footer>
  </section>;
}
