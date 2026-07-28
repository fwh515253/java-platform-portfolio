import Link from "next/link";
import { AnimatedCapabilityCharts } from "../_components/animated-capability-charts";

const lifecycle = ["事件接入", "规则判断", "生成工单", "分派接单", "协同处理", "结果验证", "关闭复盘"];

export default function CloudOpsPage() {
  return <main className="cloudops-page">
    <nav><Link href="/#projects">← 返回项目案例</Link><span>独立交付项目 / 2026.07—至今</span><a href="/范文豪-Java全栈开发工程师.pdf">查看简历 →</a></nav>
    <header><div><span>CLOUDOPS / WORK ORDER PLATFORM</span><h1>智能工单与<br />协同处置平台</h1></div><p>面向告警事件、人工报障和运维任务的统一协同平台。围绕事件接入、工单流转、责任分派、SLA、过程留痕和知识复用建立端到端处理闭环。<b>离职后独立完成方案设计、业务建模及前后端功能落地。</b></p></header>
    <section className="cloudops-position"><div><span>01 / 项目定位</span><h2>把一次问题，<br />变成可追踪的处理过程。</h2></div><p>系统不只保存一张工单表，而是需要回答：问题从哪里来、由谁负责、当前处于什么阶段、是否超时、多人如何协作、处理结果如何验证，以及同类问题能否复用已有经验。</p></section>
    <section className="cloudops-workbench-section"><div className="cloudops-heading"><span>02 / 工单工作台</span><h2>事件、责任人与处理状态</h2></div><div className="cloudops-workbench">
      <aside><strong>CloudOps</strong><span className="active">工单中心</span><span>事件接入</span><span>我的待办 <b>6</b></span><span>SLA 看板</span><span>知识库</span><span>规则配置</span></aside>
      <main><header><div><small>工单 / INC-202607-0184</small><strong>gateway-service 延迟告警</strong></div><p><b>P1</b><span>处理中</span><em>SLA 剩余 01:42</em></p></header><div className="ticket-context"><article><span>事件来源</span><strong>NativeSphere 告警</strong><p>HighLatencyP95 · production</p></article><article><span>当前处理人</span><strong>平台研发组 / 范文豪</strong><p>规则自动分派 · 已接单</p></article><article><span>关联对象</span><strong>gateway-service</strong><p>Deployment · Service · 3 Pods</p></article></div><div className="ticket-main-grid"><section><div><strong>处置时间线</strong><span>全部操作留痕</span></div><p><i />14:02　告警事件触发并自动创建工单</p><p><i />14:03　匹配“平台网关”分派规则</p><p><i />14:08　处理人接单，开始分析运行上下文</p><p><i />14:21　关联历史工单 INC-0116</p><p className="active"><i />14:32　等待修复验证</p></section><section><div><strong>协同记录</strong><span>评论 / 附件 / 操作</span></div><article><b>范文豪</b><p>已核对入口流量和 Pod 指标，准备验证治理配置。</p></article><article><b>运维同事</b><p>补充生产环境日志片段与配置快照。</p></article><button type="button">添加处理记录</button></section></div></main>
    </div></section>
    <section className="cloudops-chart-section"><div className="cloudops-heading"><span>03 / 动态能力图表</span><h2>事件、流程与知识如何形成闭环</h2></div><AnimatedCapabilityCharts type="cloudops" /></section>
    <section><div className="cloudops-heading"><span>04 / 核心能力</span><h2>不仅是 CRUD 工单</h2></div><div className="cloudops-capabilities"><article><span>事件中心</span><strong>多来源统一接入</strong><p>接收监控告警、人工报障和计划任务，保留来源信息、关联对象和原始上下文。</p></article><article><span>流程引擎</span><strong>受约束的状态流转</strong><p>定义创建、分派、接单、转派、处理、验证、关闭和重开，并校验角色与前置状态。</p></article><article><span>规则分派</span><strong>责任自动匹配</strong><p>按事件类型、服务、环境、优先级和责任组匹配处理人，支持人工调整与转派记录。</p></article><article><span>SLA</span><strong>响应与解决时限</strong><p>分别跟踪响应、处理和解决时限，为超时提醒和升级机制提供依据。</p></article><article><span>协同与审计</span><strong>完整处理时间线</strong><p>统一保存评论、附件、操作、状态变化和参与人，使问题处理过程可复盘。</p></article><article><span>知识与 AI</span><strong>从历史问题中复用经验</strong><p>以历史工单和知识库支持相似问题检索、处置建议、分类辅助和复盘摘要。</p></article></div></section>
    <section className="cloudops-lifecycle"><div className="cloudops-heading"><span>05 / 业务链路</span><h2>从事件到知识沉淀</h2></div><div>{lifecycle.map((item,index)=><p key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong>{index<lifecycle.length-1&&<i>→</i>}</p>)}</div></section>
    <section className="cloudops-boundary"><div className="cloudops-heading"><span>06 / 工程成果</span><h2>落地后形成的能力</h2></div><div><article><strong>事件处置闭环</strong><p>打通事件接入、工单生成、规则分派、接单处理、结果验证和关闭复盘，问题状态及责任归属全程可追踪。</p></article><article><strong>协同与知识复用</strong><p>通过 SLA、操作时间线、评论附件、相似工单检索、处置建议和复盘摘要，将处理过程沉淀为可复用经验。</p></article></div></section>
    <footer><Link href="/#projects">← 返回全部项目</Link><span>CloudOps / 独立交付项目</span><a href="/范文豪-Java全栈开发工程师.pdf">查看 PDF 简历 →</a></footer>
  </main>;
}
