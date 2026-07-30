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

const suggestedQuestions = [
  "你最擅长哪些技术？",
  "NativeSphere 中你具体负责什么？",
  "你做过哪些 AI 项目？",
];

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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(query);
  };

  return (
    <>
      <button className="agent-launcher" type="button" onClick={() => setOpen(true)} aria-label="打开招聘问答助手">
        <span className="agent-launcher-spark">✦</span><span>问问我的 Agent</span><b>↗</b>
      </button>
      {open && <div className="agent-shell" role="dialog" aria-modal="true" aria-labelledby="agent-title">
        <button className="agent-backdrop" type="button" aria-label="关闭招聘问答助手" onClick={() => setOpen(false)} />
        <section className="agent-panel">
          <header className="agent-header"><div><span className="liquid-eyebrow"><i />招聘问答助手</span><h2 id="agent-title">了解我的工程能力</h2><p>基于项目资料回答，信息不足时会明确说明。</p></div><button type="button" className="agent-close" onClick={() => setOpen(false)} aria-label="关闭">×</button></header>
          <div className="agent-suggestions">{suggestedQuestions.map((question) => <button type="button" key={question} onClick={() => void ask(question)}>{question}</button>)}</div>
          <div className="agent-messages" ref={messageBoxRef} aria-live="polite">{messages.map((message, index) => <article className={`agent-message agent-message-${message.role}${message.streaming ? " agent-message-streaming" : ""}`} key={`${message.role}-${index}`}><span className="agent-message-label">{message.role === "assistant" ? "Agent" : "你"}</span>{message.role === "assistant" ? <div className="agent-answer">{renderAnswer(message.content)}</div> : <p>{message.content}</p>}{message.plan && !message.streaming && <div className="agent-plan"><div><span>任务目标</span><strong>{message.plan.goal}</strong></div><div className="agent-plan-actions"><span>执行计划</span>{message.plan.actions.map((action) => <b key={action}>{action}</b>)}</div><small>安全边界：{message.plan.boundary}</small></div>}{message.steps && message.steps.length > 0 && !message.streaming && <div className="agent-trace"><span>执行链路</span>{message.steps.slice(0, 5).map((step) => <b key={step}>{step}</b>)}</div>}{message.sources && message.sources.length > 0 && !message.streaming && <div className="agent-sources">资料：{message.sources.slice(0, 2).map((source) => <span key={source}>{source}</span>)}</div>}</article>)}{loading && <article className="agent-message agent-message-assistant"><span className="agent-message-label">Agent</span><p className="agent-thinking"><span>正在识别任务并选择工具</span><i /><i /><i /></p></article>}</div>
          <form className="agent-form" onSubmit={submit}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例如：NativeSphere 中我负责哪些模块？" aria-label="输入问题" /><button type="submit" disabled={loading || !query.trim()}>发送 <span>↗</span></button></form>
          <p className="agent-disclaimer">仅基于公开作品集资料回答，不替代正式简历或面试沟通。</p>
        </section>
      </div>}
    </>
  );
}
