"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
  fullContent?: string;
  streaming?: boolean;
  sources?: string[];
  steps?: string[];
  plan?: TaskPlan;
};

type TaskPlan = {
  goal: string;
  actions: string[];
  boundary: string;
};

type RecordStage = "已记录" | "已联系" | "已约面" | "面试中" | "已结束";
type RecruiterDraft = {
  companyName: string;
  position: string;
  location: string;
  stage: RecordStage;
  interviewAt: string;
  jobDescription: string;
  contactName: string;
};

type RecordStep = "companyName" | "position" | "location" | "stage" | "interviewAt" | "jobDescription" | "contactName" | "confirm";

const suggestedQuestions = [
  "你最擅长哪些技术？",
  "NativeSphere 中你具体负责什么？",
  "你做过哪些 AI 项目？",
];

const initialRecruiterDraft: RecruiterDraft = {
  companyName: "",
  position: "",
  location: "",
  stage: "已记录",
  interviewAt: "",
  jobDescription: "",
  contactName: "",
};

const recordPrompts: Record<Exclude<RecordStep, "confirm">, { question: string; hint: string; optional?: boolean; multiline?: boolean }> = {
  companyName: { question: "好的，我可以帮我记录这次招聘沟通。先告诉我公司名称。", hint: "例如：某某科技有限公司" },
  position: { question: "收到。这个岗位的名称是什么？", hint: "例如：云平台开发工程师" },
  location: { question: "岗位工作地点或所属团队方便说明吗？如果暂时不方便，直接回复“跳过”。", hint: "例如：合肥 / PaaS 团队", optional: true },
  stage: { question: "目前沟通处于哪个阶段？", hint: "例如：已联系、已约面、面试中", optional: true },
  interviewAt: { question: "是否已约定面试时间？没有的话回复“跳过”即可。", hint: "例如：2026-08-10 14:00", optional: true },
  jobDescription: { question: "可以补充一下岗位描述、技术重点或希望我准备的方向吗？这会帮助我后续更有针对性地沟通。", hint: "可粘贴 JD 或简要说明", optional: true, multiline: true },
  contactName: { question: "最后，方便留下联系人姓名或称呼吗？不方便也可以跳过。", hint: "例如：张老师", optional: true },
};

const recordOrder: Exclude<RecordStep, "confirm">[] = ["companyName", "position", "location", "stage", "interviewAt", "jobDescription", "contactName"];

function isSkip(value: string) {
  return /^(跳过|略过|暂无|没有|无|不方便)$/i.test(value.trim());
}

function normalizeStage(value: string): RecordStage {
  if (/结束|拒绝|offer|终止/i.test(value)) return "已结束";
  if (/面试|一面|二面|三面|笔试/i.test(value)) return "面试中";
  if (/约面|约谈|待面/i.test(value)) return "已约面";
  if (/联系|沟通|初聊/i.test(value)) return "已联系";
  return "已记录";
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <span key={index}>{part}</span>;
  });
}

function renderAnswer(content: string) {
  const lines = content.split(/\r?\n/);
  const nodes: ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }
    if (line.startsWith("|") && index + 1 < lines.length && /^\|?[\s|:-]+\|?$/.test(lines[index + 1].trim())) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) tableLines.push(lines[index++].trim());
      const rows = tableLines.filter((row) => !/^\|?[\s|:-]+\|?$/.test(row)).map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));
      if (rows.length > 0) nodes.push(<table key={`table-${index}`}><thead><tr>{rows[0].map((cell, cellIndex) => <th key={cellIndex}>{renderInline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell)}</td>)}</tr>)}</tbody></table>);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) items.push(lines[index++].replace(/^\s*[-*]\s+/, ""));
      nodes.push(<ul key={`list-${index}`}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>);
      continue;
    }
    if (/^#{1,3}\s+/.test(line)) {
      const heading = line.replace(/^#{1,3}\s+/, "");
      nodes.push(<h3 key={`heading-${index}`}>{renderInline(heading)}</h3>);
      index += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      nodes.push(<blockquote key={`quote-${index}`}>{renderInline(line.slice(2))}</blockquote>);
      index += 1;
      continue;
    }
    nodes.push(<p key={`paragraph-${index}`}>{renderInline(line)}</p>);
    index += 1;
  }
  return nodes;
}

export default function AgentAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordStep, setRecordStep] = useState<RecordStep | null>(null);
  const [recordDraft, setRecordDraft] = useState<RecruiterDraft>(initialRecruiterDraft);
  const [recordSaving, setRecordSaving] = useState(false);
  const [recordError, setRecordError] = useState("");
  const [recordPromptVisible, setRecordPromptVisible] = useState(false);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "你好，我是范文豪的个人 Agent。你可以直接向我了解我的技术能力、项目职责、工程经验和求职方向。" },
  ]);

  useEffect(() => {
    let streamingIndex = -1;
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role === "assistant" && messages[index].streaming && messages[index].fullContent) {
        streamingIndex = index;
        break;
      }
    }
    if (streamingIndex < 0) return;
    const message = messages[streamingIndex];
    const fullContent = message.fullContent ?? "";
    if (message.content.length >= fullContent.length) {
      setMessages((current) => current.map((item, index) => index === streamingIndex ? { ...item, streaming: false } : item));
      return;
    }
    const nextLength = Math.min(fullContent.length, message.content.length + (fullContent.length > 120 ? 3 : 2));
    const timer = window.setTimeout(() => {
      setMessages((current) => current.map((item, index) => index === streamingIndex ? { ...item, content: fullContent.slice(0, nextLength) } : item));
    }, 18);
    return () => window.clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    const messageBox = messageBoxRef.current;
    if (!messageBox) return;
    const frame = window.requestAnimationFrame(() => {
      messageBox.scrollTop = messageBox.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, loading]);

  const ask = async (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;
    setQuery("");
    setMessages((current) => [...current, { role: "user", content: cleanQuestion }]);
    setLoading(true);
    try {
      const history = messages.slice(-6).map((message) => ({
        role: message.role,
        content: message.fullContent ?? message.content,
      }));
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: cleanQuestion, history }),
      });
      const result = await response.json() as { answer?: string; sources?: string[]; steps?: string[]; plan?: TaskPlan; error?: string };
      setMessages((current) => [...current, {
        role: "assistant",
        content: "",
        fullContent: result.answer ?? result.error ?? "暂时无法回答这个问题，请换一种方式提问。",
        streaming: true,
        sources: result.sources,
        steps: result.steps,
        plan: result.plan,
      }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "暂时无法连接问答服务。你仍然可以通过页面下方的项目案例和 PDF 简历了解我的经历。" }]);
    } finally {
      setLoading(false);
    }
  };

  const appendAgentMessage = (content: string) => {
    setMessages((current) => [...current, { role: "assistant", content }]);
  };

  const startRecruiterRecord = () => {
    if (loading || recordSaving) return;
    setQuery("");
    setRecordPromptVisible(false);
    setRecordDraft(initialRecruiterDraft);
    setRecordError("");
    setRecordStep("companyName");
    appendAgentMessage("如果您愿意，我可以记录本次招聘沟通的公司与岗位信息，方便范文豪后续准备和跟进。信息仅用于招聘沟通记录，不会在网站公开展示。\n\n" + recordPrompts.companyName.question);
  };

  const advanceRecordFlow = (value: string) => {
    if (!recordStep || recordStep === "confirm") return;
    const cleanValue = value.trim();
    const currentPrompt = recordPrompts[recordStep];
    if (!cleanValue && !currentPrompt.optional) {
      setRecordError("这项信息需要填写后才能继续。");
      return;
    }
    if (isSkip(cleanValue) && !currentPrompt.optional) {
      setRecordError("公司名称和岗位名称需要填写，才能形成有效记录。");
      return;
    }
    const actualValue = isSkip(cleanValue) ? "" : cleanValue;
    const nextDraft = { ...recordDraft, [recordStep]: recordStep === "stage" && actualValue ? normalizeStage(actualValue) : actualValue };
    setRecordDraft(nextDraft);
    setRecordError("");
    setMessages((current) => [...current, { role: "user", content: actualValue || "跳过" }]);
    const currentIndex = recordOrder.indexOf(recordStep);
    const nextStep = recordOrder[currentIndex + 1];
    if (!nextStep) {
      setRecordStep("confirm");
      appendAgentMessage("信息已整理完成。请确认下方内容；确认后我会保存这条招聘沟通记录。您也可以选择重新填写或取消本次记录。");
      return;
    }
    setRecordStep(nextStep);
    appendAgentMessage(recordPrompts[nextStep].question);
  };

  const saveRecruiterRecord = async () => {
    if (recordSaving) return;
    setRecordSaving(true);
    setRecordError("");
    try {
      const response = await fetch("/api/recruiter-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...recordDraft, stage: ["已联系", "已约面", "面试中", "已结束"].includes(recordDraft.stage) ? recordDraft.stage : "已记录" }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "保存失败");
      appendAgentMessage("已保存，感谢您留下本次沟通信息。我会结合岗位重点提前准备；如需进一步沟通，也可以直接向我提问项目和技术能力。");
      setRecordStep(null);
      setRecordDraft(initialRecruiterDraft);
    } catch (error) {
      setRecordError(error instanceof Error ? error.message : "保存失败，请稍后再试。");
    } finally {
      setRecordSaving(false);
    }
  };

  const cancelRecruiterRecord = () => {
    setRecordStep(null);
    setRecordDraft(initialRecruiterDraft);
    setRecordError("");
    appendAgentMessage("好的，本次信息没有保存。您仍然可以继续了解我的项目经历和技术能力。");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (recordStep && recordStep !== "confirm") {
      advanceRecordFlow(query);
      setQuery("");
      return;
    }
    void ask(query);
  };

  return (
    <>
      <button className="agent-launcher" type="button" onClick={() => { setOpen(true); setRecordPromptVisible(true); }} aria-label="打开招聘问答助手">
        <span className="agent-launcher-spark">✦</span><span>问问我的 Agent</span><b>↗</b>
      </button>
      {open && <div className="agent-shell" role="dialog" aria-modal="true" aria-labelledby="agent-title">
        <button className="agent-backdrop" type="button" aria-label="关闭招聘问答助手" onClick={() => setOpen(false)} />
        <section className="agent-panel">
          <header className="agent-header"><div><span className="liquid-eyebrow"><i />招聘问答助手</span><h2 id="agent-title">了解我的工程能力</h2><p>基于项目资料回答，信息不足时会明确说明。</p></div><button type="button" className="agent-close" onClick={() => setOpen(false)} aria-label="关闭">×</button></header>
          {recordPromptVisible && <section className="agent-record-intro"><button type="button" className="agent-record-intro-close" aria-label="暂不登记" onClick={() => setRecordPromptVisible(false)}>×</button><span>招聘沟通记录</span><strong>如果您正在沟通岗位，也可以让我记录公司与岗位信息。</strong><p>信息确认后才保存，仅用于后续招聘沟通，不会公开展示。</p><div><button type="button" onClick={startRecruiterRecord}>开始登记 <b>↗</b></button><button type="button" onClick={() => setRecordPromptVisible(false)}>先了解项目</button></div></section>}
          <div className="agent-suggestions">{suggestedQuestions.map((question) => <button type="button" key={question} onClick={() => void ask(question)}>{question}</button>)}<button type="button" className="agent-record-trigger" onClick={startRecruiterRecord}>登记公司信息</button></div>
          <div className="agent-messages" ref={messageBoxRef} aria-live="polite">{messages.map((message, index) => <article className={`agent-message agent-message-${message.role}${message.streaming ? " agent-message-streaming" : ""}`} key={`${message.role}-${index}`}><span className="agent-message-label">{message.role === "assistant" ? "Agent" : "你"}</span>{message.role === "assistant" ? <div className="agent-answer">{renderAnswer(message.content)}</div> : <p>{message.content}</p>}{message.plan && !message.streaming && <div className="agent-plan"><div><span>任务目标</span><strong>{message.plan.goal}</strong></div><div className="agent-plan-actions"><span>执行计划</span>{message.plan.actions.map((action) => <b key={action}>{action}</b>)}</div><small>安全边界：{message.plan.boundary}</small></div>}{message.steps && message.steps.length > 0 && !message.streaming && <div className="agent-trace"><span>执行链路</span>{message.steps.slice(0, 5).map((step) => <b key={step}>{step}</b>)}</div>}{message.sources && message.sources.length > 0 && !message.streaming && <div className="agent-sources">资料：{message.sources.slice(0, 2).map((source) => <span key={source}>{source}</span>)}</div>}</article>)}{loading && <article className="agent-message agent-message-assistant"><span className="agent-message-label">Agent</span><p className="agent-thinking"><span>正在识别任务并选择工具</span><i /><i /><i /></p></article>}</div>
          {recordStep === "confirm" && <section className="agent-record-confirm" aria-label="确认招聘沟通记录"><div><span>招聘沟通记录</span><b>待确认</b></div><dl><div><dt>公司</dt><dd>{recordDraft.companyName}</dd></div><div><dt>岗位</dt><dd>{recordDraft.position}</dd></div>{recordDraft.location && <div><dt>地点 / 团队</dt><dd>{recordDraft.location}</dd></div>}{recordDraft.interviewAt && <div><dt>面试时间</dt><dd>{recordDraft.interviewAt}</dd></div>}{recordDraft.jobDescription && <div><dt>岗位重点</dt><dd>{recordDraft.jobDescription}</dd></div>}</dl>{recordError && <p className="agent-record-error">{recordError}</p>}<div className="agent-record-actions"><button type="button" onClick={cancelRecruiterRecord}>取消</button><button type="button" onClick={startRecruiterRecord}>重新填写</button><button type="button" className="agent-record-save" disabled={recordSaving} onClick={() => void saveRecruiterRecord()}>{recordSaving ? "保存中…" : "确认保存"}</button></div></section>}
          <form className="agent-form" onSubmit={submit}>{recordStep && recordStep !== "confirm" && recordPrompts[recordStep].multiline ? <textarea value={query} onChange={(event) => setQuery(event.target.value)} placeholder={recordPrompts[recordStep].hint} aria-label="输入招聘沟通信息" /> : <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={recordStep && recordStep !== "confirm" ? recordPrompts[recordStep].hint : "例如：NativeSphere 中我负责哪些模块？"} aria-label="输入问题" />}{recordStep !== "confirm" && <button type="submit" disabled={loading || !query.trim()}>发送 <span>↗</span></button>}</form>
          {recordStep && recordStep !== "confirm" && recordError && <p className="agent-record-inline-error">{recordError}</p>}
          <p className="agent-disclaimer">仅基于公开作品集资料回答；公司信息仅在确认后保存，用于后续招聘沟通。</p>
        </section>
      </div>}
    </>
  );
}
