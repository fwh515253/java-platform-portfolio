"use client";

import { FormEvent, useEffect, useState } from "react";

type RecordStage = "已记录" | "已联系" | "已约面" | "面试中" | "已结束";
type RecruiterRecord = { id: number; companyName: string; position: string; location: string; stage: RecordStage; interviewAt: string; jobDescription: string; contactName: string; notes: string; createdAt: string; updatedAt: string };

const stages: RecordStage[] = ["已记录", "已联系", "已约面", "面试中", "已结束"];
const formatTime = (value: string) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString("zh-CN", { hour12: false }); };

export default function RecruiterRecordsPage() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [records, setRecords] = useState<RecruiterRecord[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const selected = records.find((record) => record.id === selectedId) ?? records[0] ?? null;

  const loadRecords = async () => {
    const response = await fetch("/api/recruiter-records", { cache: "no-store" });
    if (response.status === 401) { setAuthenticated(false); return; }
    const result = await response.json() as { records?: RecruiterRecord[]; error?: string };
    if (!response.ok) throw new Error(result.error || "读取记录失败");
    setAuthenticated(true);
    setRecords(result.records ?? []);
    setSelectedId((current) => current ?? result.records?.[0]?.id ?? null);
  };
  useEffect(() => { void loadRecords().catch(() => undefined); }, []);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMessage("");
    const response = await fetch("/api/recruiter-records/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
    const result = await response.json() as { error?: string };
    if (!response.ok) { setMessage(result.error || "登录失败"); return; }
    setToken(""); setAuthenticated(true); await loadRecords();
  };
  const updateSelected = (field: keyof RecruiterRecord, value: string) => { if (selected) setRecords((current) => current.map((record) => record.id === selected.id ? { ...record, [field]: value } : record)); };
  const saveSelected = async () => {
    if (!selected || saving) return; setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/recruiter-records", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(selected) });
      const result = await response.json() as { record?: RecruiterRecord; error?: string };
      if (!response.ok || !result.record) throw new Error(result.error || "保存失败");
      setRecords((current) => current.map((record) => record.id === selected.id ? result.record! : record)); setMessage("已保存修改。");
    } catch (error) { setMessage(error instanceof Error ? error.message : "保存失败"); } finally { setSaving(false); }
  };
  const removeSelected = async () => {
    if (!selected || !window.confirm(`确定删除「${selected.companyName} · ${selected.position}」这条记录吗？`)) return;
    setMessage(""); const response = await fetch("/api/recruiter-records", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: selected.id }) }); const result = await response.json() as { error?: string };
    if (!response.ok) { setMessage(result.error || "删除失败"); return; }
    setRecords((current) => current.filter((record) => record.id !== selected.id)); setSelectedId(null); setMessage("记录已删除。");
  };
  const logout = async () => { await fetch("/api/recruiter-records/auth", { method: "DELETE" }); setAuthenticated(false); setRecords([]); setSelectedId(null); };

  if (!authenticated) return <main className="records-login-page"><section className="records-login-card"><span>PRIVATE / RECRUITER NOTES</span><h1>招聘沟通记录</h1><p>此页面不在个人网站公开导航中，仅用于查看 Agent 收集并确认保存的公司与岗位信息。</p><form onSubmit={(event) => void login(event)}><input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="输入管理员口令" autoComplete="current-password" /><button type="submit" disabled={!token.trim()}>进入记录台</button></form>{message && <small>{message}</small>}</section></main>;

  return <main className="records-page"><header className="records-topbar"><div><span>PRIVATE / RECRUITER NOTES</span><h1>招聘沟通记录</h1></div><div><button type="button" onClick={() => void loadRecords()}>刷新</button><button type="button" onClick={() => void logout()}>退出</button></div></header><section className="records-workspace"><aside className="records-list"><div className="records-list-heading"><span>全部记录</span><b>{records.length}</b></div>{records.length === 0 ? <p className="records-empty">暂时没有记录。访客在个人 Agent 中确认保存后，会出现在这里。</p> : records.map((record) => <button type="button" key={record.id} className={selected?.id === record.id ? "active" : ""} onClick={() => { setSelectedId(record.id); setMessage(""); }}><span>{record.stage}</span><strong>{record.companyName}</strong><small>{record.position}</small><em>{formatTime(record.updatedAt)}</em></button>)}</aside><section className="records-editor">{selected ? <><div className="records-editor-heading"><div><span>沟通详情</span><h2>{selected.companyName}</h2></div><button type="button" className="records-delete" onClick={() => void removeSelected()}>删除记录</button></div><div className="records-fields"><label>公司名称<input value={selected.companyName} onChange={(event) => updateSelected("companyName", event.target.value)} /></label><label>岗位名称<input value={selected.position} onChange={(event) => updateSelected("position", event.target.value)} /></label><label>地点 / 团队<input value={selected.location} onChange={(event) => updateSelected("location", event.target.value)} placeholder="未填写" /></label><label>当前阶段<select value={selected.stage} onChange={(event) => updateSelected("stage", event.target.value)}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label><label>面试时间<input value={selected.interviewAt} onChange={(event) => updateSelected("interviewAt", event.target.value)} placeholder="未填写" /></label><label>联系人<input value={selected.contactName} onChange={(event) => updateSelected("contactName", event.target.value)} placeholder="未填写" /></label><label className="records-field-wide">岗位重点 / JD<textarea value={selected.jobDescription} onChange={(event) => updateSelected("jobDescription", event.target.value)} placeholder="未填写" /></label><label className="records-field-wide">我的跟进备注<textarea value={selected.notes} onChange={(event) => updateSelected("notes", event.target.value)} placeholder="仅自己可见" /></label></div><footer><small>创建于 {formatTime(selected.createdAt)} · 最近更新 {formatTime(selected.updatedAt)}</small><div>{message && <span>{message}</span>}<button type="button" className="records-save" disabled={saving} onClick={() => void saveSelected()}>{saving ? "保存中…" : "保存修改"}</button></div></footer></> : <div className="records-empty-editor">选择一条记录查看详情。</div>}</section></section></main>;
}
