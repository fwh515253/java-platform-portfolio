import { agentKnowledge, retrieveAgentKnowledge, type AgentKnowledgeChunk } from "../../agent-knowledge";

type AgentRequest = { query?: unknown };
type ToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };
type ChatMessage = { role: "system" | "user" | "assistant" | "tool"; content?: string | null; tool_calls?: ToolCall[]; tool_call_id?: string };
type AgentToolResult = { label: string; content: string; sources: string[] };

const contactPattern = /联系方式|邮箱|邮件|手机|电话|联系我|email|mail/i;

const agentTools = [
  { type: "function", function: { name: "search_profile", description: "检索个人技术能力、工作经历和求职方向。", parameters: { type: "object", properties: { query: { type: "string", description: "需要检索的主题" } }, required: ["query"] } } },
  { type: "function", function: { name: "get_project_detail", description: "查询某个项目的个人职责、工程能力和项目边界。", parameters: { type: "object", properties: { project: { type: "string", description: "项目名称，例如 NativeSphere、监控平台、BPAAS、RAG" } }, required: ["project"] } } },
  { type: "function", function: { name: "compare_projects", description: "比较多个项目体现的技术能力和适合的岗位方向。", parameters: { type: "object", properties: { projects: { type: "array", items: { type: "string" }, description: "需要比较的项目名称" } }, required: ["projects"] } } },
  { type: "function", function: { name: "generate_interview_questions", description: "根据某个项目或技术方向生成适合 HR 继续追问的面试问题。", parameters: { type: "object", properties: { topic: { type: "string", description: "项目或技术方向" } }, required: ["topic"] } } },
  { type: "function", function: { name: "get_contact", description: "在访客明确索要联系方式时返回公开联系方式。", parameters: { type: "object", properties: { confirmed: { type: "boolean", description: "访客是否明确要求联系方式" } }, required: ["confirmed"] } } },
  { type: "function", function: { name: "get_resume_link", description: "返回简历下载入口。", parameters: { type: "object", properties: {}, required: [] } } },
];

const projectAliases: Record<string, string[]> = {
  nativesphere: ["nativesphere", "云原生平台", "集群管理", "镜像管理"],
  observability: ["监控", "告警", "prometheus", "grafana", "可观测性"],
  "release-flow": ["release flow", "持续交付", "发布平台", "jenkins", "pipeline"],
  bpaas: ["bpaas", "网关", "服务接入", "路由"],
  oa: ["oa", "审批", "权限", "综合管理"],
  rag: ["rag", "知识库", "milvus", "智能问答"],
  cloudops: ["cloudops", "智能运维", "工单", "sla"],
};

const projectLabels: Record<string, string> = {
  nativesphere: "NativeSphere",
  observability: "监控与告警平台",
  "release-flow": "持续交付与发布平台",
  bpaas: "BPAAS",
  oa: "OA",
  rag: "RAG 知识库问答",
  cloudops: "CloudOps",
};

const toolLabels: Record<string, string> = {
  search_profile: "检索个人能力资料",
  get_project_detail: "查询项目工程证据",
  compare_projects: "对比项目能力侧重点",
  generate_interview_questions: "生成面试追问方向",
  get_contact: "核验联系方式权限",
  get_resume_link: "准备简历入口",
};

function findProjectChunks(project: string) {
  const normalized = project.toLowerCase();
  const matchedId = Object.entries(projectAliases).find(([, aliases]) => aliases.some((alias) => normalized.includes(alias)))?.[0];
  if (!matchedId) return retrieveAgentKnowledge(project, 3);
  if (matchedId === "nativesphere") return agentKnowledge.filter((chunk) => ["nativesphere", "nativesphere-delivery"].includes(chunk.id));
  if (matchedId === "observability") return agentKnowledge.filter((chunk) => chunk.id === "observability");
  return agentKnowledge.filter((chunk) => chunk.id === matchedId);
}

function detectProjectMentions(query: string) {
  const normalized = query.toLowerCase();
  return Object.entries(projectAliases)
    .filter(([, aliases]) => aliases.some((alias) => normalized.includes(alias)))
    .map(([id]) => projectLabels[id]);
}

function formatChunks(chunks: AgentKnowledgeChunk[]) {
  return chunks.map((chunk) => `来源：${chunk.title}\n${chunk.content}`).join("\n\n").slice(0, 6000);
}

function executeTool(name: string, args: Record<string, unknown>, originalQuery: string): AgentToolResult {
  if (name === "search_profile") {
    const query = typeof args.query === "string" ? args.query : originalQuery;
    const chunks = retrieveAgentKnowledge(query, 4);
    return { label: toolLabels[name], content: formatChunks(chunks), sources: chunks.map((chunk) => chunk.title) };
  }

  if (name === "get_project_detail") {
    const project = typeof args.project === "string" ? args.project : originalQuery;
    const chunks = findProjectChunks(project);
    return { label: toolLabels[name], content: formatChunks(chunks), sources: chunks.map((chunk) => chunk.title) };
  }

  if (name === "compare_projects") {
    const projects = Array.isArray(args.projects) ? args.projects.filter((item): item is string => typeof item === "string").slice(0, 4) : [];
    const chunks = projects.flatMap((project) => findProjectChunks(project)).filter((chunk, index, all) => all.findIndex((item) => item.id === chunk.id) === index);
    return { label: toolLabels[name], content: formatChunks(chunks), sources: chunks.map((chunk) => chunk.title) };
  }

  if (name === "generate_interview_questions") {
    const topic = typeof args.topic === "string" ? args.topic : originalQuery;
    const chunks = findProjectChunks(topic);
    const questions = [
      `你在${topic}中负责的边界是什么？`,
      `这个项目最核心的业务对象和状态流转如何设计？`,
      "遇到执行状态与管理状态不一致时，你如何定位和恢复？",
      "你如何验证这项能力真正形成了可交付的工程闭环？",
    ];
    return { label: toolLabels[name], content: `基于${topic}资料：\n${questions.map((question, index) => `${index + 1}. ${question}`).join("\n")}\n\n关联资料：\n${formatChunks(chunks)}`, sources: chunks.map((chunk) => chunk.title) };
  }

  if (name === "get_contact") {
    if (args.confirmed !== true || !contactPattern.test(originalQuery)) {
      return { label: toolLabels[name], content: "权限拒绝：只有访客明确询问联系方式时才允许展示。", sources: [] };
    }
    const chunk = agentKnowledge.find((item) => item.id === "contact");
    return { label: toolLabels[name], content: chunk?.content ?? "联系方式资料不可用。", sources: chunk ? [chunk.title] : [] };
  }

  if (name === "get_resume_link") {
    return { label: toolLabels[name], content: "简历下载地址：/范文豪-Java全栈开发工程师.pdf", sources: [] };
  }

  return { label: "安全校验", content: "未识别的工具请求，已拒绝执行。", sources: [] };
}

function buildLocalAnswer(query: string, sources: ReturnType<typeof retrieveAgentKnowledge>) {
  if (!sources.length) return "我暂时没有在公开资料中找到与这个问题直接相关的信息。你可以询问技术栈、项目职责、NativeSphere、监控告警、持续交付、网关、RAG 或求职方向。";
  const body = sources.slice(0, 2).map((source) => `【${source.title}】\n${source.content}`).join("\n\n");
  return `${body}\n\n如果你希望继续了解，可以追问某个项目的具体职责、技术方案或工程结果。`;
}

function buildPrompt(query: string, sources: ReturnType<typeof retrieveAgentKnowledge>, mentionedProjects: string[], preloadedToolResult = "") {
  const contactQuestion = contactPattern.test(query);
  const context = sources.map((source) => `来源：${source.title}\n${source.content}`).join("\n\n");
  const routingHint = mentionedProjects.length >= 2 ? `\n路由提示：问题同时涉及 ${mentionedProjects.join("、")}，首轮必须调用 compare_projects，并把这些项目作为 projects 参数。` : "";
  const preloadedContext = preloadedToolResult ? `\n\n已由系统预先执行的工具结果：\n${preloadedToolResult}` : "";
  return `你是范文豪个人网站的招聘问答 Agent。你可以通过工具检索和分析个人资料，再给访客回答。\n\n工作方式：\n1. 先判断访客意图；涉及具体项目时调用 get_project_detail，涉及多个项目时调用 compare_projects，涉及岗位匹配时先调用 search_profile 再调用相关项目工具。\n2. 工具返回结果后，结合结果回答；必要时可以继续调用另一个工具，但最多执行 4 轮。\n3. 回答优先表达“构建了什么能力、解决了什么问题、形成了什么工程闭环”，不要把回答写成 API 清单。\n4. 区分“已上线/正式项目”“运行支持”“AI 方向方案或原型”。\n5. 回答控制在 3—5 个要点，先给结论，再给职责和工程价值。\n6. 不得编造资料中没有的公司、指标、项目结果或技术深度。\n7. 访客没有明确询问联系方式时，不得主动输出手机号或邮箱。\n8. 如果资料不足，直接说“资料中没有明确记录”，并给出可以继续询问的方向。\n9. 结尾用“资料来源：……”列出 1—2 个相关来源。${routingHint}\n访客问题：${query}\n\n初始候选资料：\n${context}${preloadedContext}\n\n联系方式展示权限：${contactQuestion ? "访客已明确询问，可以展示联系方式" : "禁止展示联系方式"}`;
}

async function callModel(apiUrl: string, apiKey: string, model: string, messages: ChatMessage[], toolChoice: unknown) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, temperature: 0.2, messages, tools: agentTools, tool_choice: toolChoice }),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const result = await response.json() as { choices?: Array<{ message?: ChatMessage }> };
    return result.choices?.[0]?.message ?? null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  let body: AgentRequest;
  try {
    body = await request.json() as AgentRequest;
  } catch {
    return Response.json({ error: "请求格式不正确" }, { status: 400 });
  }

  const query = typeof body.query === "string" ? body.query.trim().slice(0, 500) : "";
  if (!query) return Response.json({ error: "请输入问题" }, { status: 400 });

  const initialSources = retrieveAgentKnowledge(query, 4);
  const apiKey = process.env.AGENT_MODEL_API_KEY;
  const apiUrl = process.env.AGENT_MODEL_API_URL;
  const model = process.env.AGENT_MODEL_NAME ?? "deepseek-v4-flash";
  const steps = ["理解访客问题"];
  const usedSources = new Set(initialSources.map((source) => source.title));
  const mentionedProjects = detectProjectMentions(query);
  const preloadedToolResult = mentionedProjects.length >= 2 ? executeTool("compare_projects", { projects: mentionedProjects }, query) : null;
  if (preloadedToolResult) {
    steps.push(preloadedToolResult.label);
    preloadedToolResult.sources.forEach((source) => usedSources.add(source));
  }

  if (apiKey && apiUrl) {
    try {
      const messages: ChatMessage[] = [
        { role: "system", content: buildPrompt(query, initialSources, mentionedProjects, preloadedToolResult?.content) },
        { role: "user", content: query },
      ];
      for (let round = 0; round < 4; round += 1) {
        const message = await callModel(apiUrl, apiKey, model, messages, "auto");
        if (!message) break;
        if (!message.tool_calls?.length) {
          const answer = message.content?.trim();
          if (answer) return Response.json({ answer, sources: [...usedSources].slice(0, 4), steps: [...steps, "组织工程化回答"], mode: steps.length > 1 ? "模型 + RAG + Tool Calls" : "模型 + RAG" });
          break;
        }
        messages.push(message);
        for (const toolCall of message.tool_calls) {
          const label = toolLabels[toolCall.function.name] ?? "执行资料工具";
          steps.push(label);
          let args: Record<string, unknown> = {};
          try { args = JSON.parse(toolCall.function.arguments) as Record<string, unknown>; } catch { /* 使用安全默认参数 */ }
          const toolResult = executeTool(toolCall.function.name, args, query);
          toolResult.sources.forEach((source) => usedSources.add(source));
          messages.push({ role: "tool", tool_call_id: toolCall.id, content: toolResult.content });
        }
      }
    } catch {
      // 模型或工具调用不可用时回退到本地知识库，保证网站仍然可用。
    }
  }

  return Response.json({ answer: buildLocalAnswer(query, initialSources), sources: [...usedSources].slice(0, 4), steps: [...steps, "回退本地知识库"], mode: "本地知识库" });
}
