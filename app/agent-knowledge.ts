export type AgentKnowledgeChunk = {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  content: string;
  sensitive?: boolean;
};

/**
 * 招聘 Agent 的第一版知识库。
 * 每条记录保持短小，便于检索、引用和后续迁移到向量数据库。
 */
export const agentKnowledge: AgentKnowledgeChunk[] = [
  {
    id: "profile",
    title: "个人定位与技术栈",
    category: "基本信息",
    keywords: ["技术栈", "会什么", "Java", "后端", "云原生", "AI"],
    content: "范文豪，Java 后端工程师，正式工作经历为 2023.06—2026.03。主要技术方向是 Java、Spring Boot、MyBatis、MySQL、Redis、Vue，以及 Docker、Harbor、Kubernetes、Istio、Prometheus、Grafana、Milvus 和 RAG。能够参与从业务建模、后端接口、前后端联调到容器化部署、运行排障的完整工程链路。Go 主要用于工程辅助和简单技术落地。",
  },
  {
    id: "strengths",
    title: "能力边界",
    category: "能力定位",
    keywords: ["能力", "优势", "负责", "全能", "平台", "排障"],
    content: "能够承担 Java 后端模块开发、云原生平台功能建设、应用发布与资源管理、服务治理、监控告警接入、接口联调和线上问题排查。相比只实现单个接口，更关注业务对象、状态流转、权限边界、异常处理、日志审计和运行结果是否形成闭环。",
  },
  {
    id: "nativesphere",
    title: "NativeSphere 云原生平台",
    category: "正式项目 / 已上线",
    keywords: ["NativeSphere", "镜像", "Harbor", "应用管理", "服务管理", "集群管理", "Istio", "Kubernetes"],
    content: "NativeSphere 是面向企业云原生环境的应用与资源管理平台，已经上线并用于实际项目。个人参与构建平台的资源控制面与应用交付闭环，覆盖镜像制品、应用生命周期、服务治理和多集群资源管理等核心能力。镜像侧建立从构建、版本管理、制品仓储到状态回读的交付链路，并将容器处理能力沉淀为独立 Go dockertool，降低平台业务与运行时实现的耦合。应用侧围绕预制应用、制品绑定、发布、启动和状态回收建立统一的生命周期模型。服务侧融入 Istio 服务治理能力，支撑流量策略、限流和运行状态管理。集群侧提供多集群资源的统一抽象、状态查看和运维入口。",
  },
  {
    id: "nativesphere-delivery",
    title: "NativeSphere 个人贡献",
    category: "正式项目 / 个人职责",
    keywords: ["NativeSphere负责什么", "镜像管理", "应用上线", "服务治理", "Go", "dockertool"],
    content: "在 NativeSphere 中，个人工作重点是参与平台控制面和交付链路的工程化建设：围绕镜像、应用、服务、集群和资源建立清晰的领域关系与状态边界；将构建、制品交付、应用发布、服务治理、状态回收和异常校验组织成可追踪的操作闭环；通过控制面与执行模块之间的协同，保证管理状态与实际运行状态保持一致；配合前端完成平台能力落地，并结合日志、操作记录和线上问题完成定位与修复。监控相关工作以代码维护、问题定位和运行支持为主，不将监控平台整体建设归为个人独立完成。",
  },
  {
    id: "observability",
    title: "监控与告警平台",
    category: "正式项目 / 运行支持",
    keywords: ["监控", "告警", "Prometheus", "Grafana", "PromQL", "100+", "指标"],
    content: "参与云原生可观测性平台的代码维护和运行支持，平台覆盖 100+ 服务。工作重点是维护从指标采集、查询分析、可视化呈现到异常处置的运行链路：通过 Prometheus 查询体系沉淀 CPU、内存、容器状态、服务状态、接口耗时和异常率等运行信号；参与 Grafana 监控看板和趋势分析；维护监控配置、告警规则、告警记录和异常信息管理；协助完成日志分析、服务排障和 Kubernetes 环境运行维护。这里的定位是可观测性链路维护、联调和问题定位，不夸大为从零独立设计整套监控平台。",
  },
  {
    id: "release-flow",
    title: "云原生持续交付与发布平台",
    category: "项目经验",
    keywords: ["发布", "持续交付", "Jenkins", "Pipeline", "回滚", "重试", "Kubernetes发布"],
    content: "云原生持续交付与发布平台统一管理应用版本、构建制品、目标环境、发布批次、执行记录和状态流转，形成从版本进入到运行结果确认的可追踪交付链路。项目能力包括 Kubernetes 直接发布与 Jenkins Pipeline 双执行通道、参数编排、状态回读、执行日志、失败重试、超时处理、环境隔离和版本回滚。个人能力重点体现在发布领域建模、执行状态机、异步结果归并、异常恢复和交付过程可视化，而不是简单调用某个发布接口。",
  },
  {
    id: "bpaas",
    title: "BPAAS 服务接入与网关平台",
    category: "项目经验",
    keywords: ["BPAAS", "网关", "服务接入", "路由", "环境", "限流", "配置下发"],
    content: "BPAAS 面向内部服务接入和网关配置管理，建立服务、接口、环境和路由的统一管理模型。个人参与构建从服务注册、接口编排、环境映射、策略配置到运行结果确认的管理闭环，打通管理端模型与网关执行模块之间的配置协同和状态同步；配合完成路由策略验证、系统联调、问题定位和版本发布。重点体现的是将分散的网关接入规则沉淀为可维护、可追踪的平台能力。",
  },
  {
    id: "oa",
    title: "企业内部综合管理系统",
    category: "正式项目 / 全栈交付",
    keywords: ["OA", "审批", "权限", "审计", "全栈", "业务流程"],
    content: "企业内部综合管理系统将业务申请、审批、信息查询和处理记录线上化。个人参与需求梳理和模块设计，完成部分功能的数据表、Spring Boot 后端接口、Vue 页面及前后端联调；实现申请提交、审批处理、状态流转和操作记录；维护用户、角色、菜单和数据权限，保证业务过程可查询、可追踪。",
  },
  {
    id: "rag",
    title: "RAG 知识库问答应用",
    category: "AI 应用方向 / 方案原型",
    keywords: ["RAG", "知识库", "Milvus", "Embedding", "DeepSeek", "通义千问", "SSE"],
    content: "RAG 知识库问答应用面向企业制度、产品手册、操作文档和常见问题。方案包括文档解析、文本提取、Chunk 切分、Embedding 生成、Milvus 向量存储、TopK 检索、相似度阈值、Prompt 组装、带引用来源的答案生成和 SSE 流式响应。个人可承担知识库、文档、文本分段、会话、问答记录和模型配置等核心数据模型及接口设计，并封装 DeepSeek、通义千问等 OpenAI 兼容 API，支持模型切换、超时重试和调用日志。该项目在网站中作为 AI 应用方向方案与原型展示，面试时应明确实际落地状态。",
  },
  {
    id: "cloudops",
    title: "CloudOps 智能运维助手",
    category: "AI 运维方向 / 持续完善",
    keywords: ["CloudOps", "智能运维", "工单", "SLA", "AI助手", "事件", "RAG运维"],
    content: "CloudOps 是围绕真实运维场景设计的智能工单与协同处置方案原型。方案统一接入告警事件、人工报障和运维任务，建立事件、工单、处理人、优先级、状态、SLA、评论、附件和操作时间线等对象；支持分派、接单、转派、处理、验证和关闭；结合历史工单与知识库，为工单分类、相似问题检索、处置建议和复盘摘要提供 RAG 辅助。它属于 AI 方向持续完善的作品，不应表述为已经上线的正式生产系统。",
  },
  {
    id: "job-preference",
    title: "求职方向",
    category: "求职信息",
    keywords: ["求职", "岗位", "期望", "方向", "工作"],
    content: "求职方向是 Java 后端开发、云原生平台开发和平台工程相关岗位。希望承担业务后端、平台能力、交付编排、服务治理、可观测性或 AI 工程化相关工作，并持续扩大从模块开发到系统运行和工程交付的责任范围。",
  },
  {
    id: "contact",
    title: "联系方式",
    category: "联系方式",
    keywords: ["联系方式", "邮箱", "邮件", "手机", "电话", "联系我", "email"],
    content: "邮箱：wh5136823@163.com；手机号：13051368230。只有在访客明确询问联系方式时才展示。",
    sensitive: true,
  },
];

const normalize = (value: string) => value.toLowerCase().replace(/[\s，。！？、；：/\\()[\]{}<>“”"'·—_-]+/g, "");

export function retrieveAgentKnowledge(query: string, limit = 4) {
  const normalizedQuery = normalize(query);
  const asksForContact = /联系方式|邮箱|邮件|手机|电话|联系我|email|mail/.test(normalizedQuery);
  const queryTerms = normalizedQuery.match(/[a-z0-9+#]{2,}|[\u4e00-\u9fff]/g) ?? [];

  return agentKnowledge
    .filter((chunk) => !chunk.sensitive || asksForContact)
    .map((chunk) => {
      const keywordScore = chunk.keywords.reduce((score, keyword) => score + (normalizedQuery.includes(normalize(keyword)) ? 4 : 0), 0);
      const contentScore = queryTerms.reduce((score, term) => score + (normalize(chunk.content).includes(term) ? 1 : 0), 0);
      return { chunk, score: keywordScore + contentScore };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk }) => chunk);
}
