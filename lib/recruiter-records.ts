import { createHash, timingSafeEqual } from "node:crypto";
import { mkdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { dirname, join } from "node:path";

export const recordStages = ["已记录", "已联系", "已约面", "面试中", "已结束"] as const;
export type RecordStage = (typeof recordStages)[number];

export type RecruiterRecord = {
  id: number;
  companyName: string;
  position: string;
  location: string;
  stage: RecordStage;
  interviewAt: string;
  jobDescription: string;
  contactName: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type RecordInput = Omit<RecruiterRecord, "id" | "createdAt" | "updatedAt">;

const databaseFile = join(
  process.env.RECRUITER_RECORDS_DATA_DIR || join(process.cwd(), "data"),
  "recruiter-records.sqlite",
);

function openDatabase() {
  mkdirSync(dirname(databaseFile), { recursive: true });
  const database = new DatabaseSync(databaseFile);
  database.exec(`
    CREATE TABLE IF NOT EXISTS recruiter_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      position TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT '',
      stage TEXT NOT NULL DEFAULT '已记录',
      interview_at TEXT NOT NULL DEFAULT '',
      job_description TEXT NOT NULL DEFAULT '',
      contact_name TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_recruiter_records_updated_at
    ON recruiter_records(updated_at DESC);
  `);
  return database;
}

function toRecord(row: Record<string, unknown>): RecruiterRecord {
  return {
    id: Number(row.id),
    companyName: String(row.company_name),
    position: String(row.position),
    location: String(row.location),
    stage: recordStages.includes(row.stage as RecordStage) ? row.stage as RecordStage : "已记录",
    interviewAt: String(row.interview_at),
    jobDescription: String(row.job_description),
    contactName: String(row.contact_name),
    notes: String(row.notes),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function now() {
  return new Date().toISOString();
}

export function normalizeRecordInput(input: Partial<RecordInput>): RecordInput | null {
  const companyName = typeof input.companyName === "string" ? input.companyName.trim().slice(0, 120) : "";
  const position = typeof input.position === "string" ? input.position.trim().slice(0, 120) : "";
  if (!companyName || !position) return null;

  const stage = recordStages.includes(input.stage as RecordStage) ? input.stage as RecordStage : "已记录";
  return {
    companyName,
    position,
    location: typeof input.location === "string" ? input.location.trim().slice(0, 120) : "",
    stage,
    interviewAt: typeof input.interviewAt === "string" ? input.interviewAt.trim().slice(0, 80) : "",
    jobDescription: typeof input.jobDescription === "string" ? input.jobDescription.trim().slice(0, 4000) : "",
    contactName: typeof input.contactName === "string" ? input.contactName.trim().slice(0, 120) : "",
    notes: typeof input.notes === "string" ? input.notes.trim().slice(0, 4000) : "",
  };
}

export function createRecruiterRecord(input: RecordInput) {
  const database = openDatabase();
  try {
    const timestamp = now();
    const result = database.prepare(`
      INSERT INTO recruiter_records
        (company_name, position, location, stage, interview_at, job_description, contact_name, notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      input.companyName,
      input.position,
      input.location,
      input.stage,
      input.interviewAt,
      input.jobDescription,
      input.contactName,
      input.notes,
      timestamp,
      timestamp,
    );
    return getRecruiterRecord(Number(result.lastInsertRowid));
  } finally {
    database.close();
  }
}

export function getRecruiterRecord(id: number) {
  const database = openDatabase();
  try {
    const row = database.prepare("SELECT * FROM recruiter_records WHERE id = ?").get(id) as Record<string, unknown> | undefined;
    return row ? toRecord(row) : null;
  } finally {
    database.close();
  }
}

export function listRecruiterRecords() {
  const database = openDatabase();
  try {
    const rows = database.prepare("SELECT * FROM recruiter_records ORDER BY updated_at DESC, id DESC").all() as Record<string, unknown>[];
    return rows.map(toRecord);
  } finally {
    database.close();
  }
}

export function updateRecruiterRecord(id: number, input: Partial<RecordInput>) {
  const current = getRecruiterRecord(id);
  if (!current) return null;
  const normalized = normalizeRecordInput({ ...current, ...input });
  if (!normalized) return null;

  const database = openDatabase();
  try {
    database.prepare(`
      UPDATE recruiter_records
      SET company_name = ?, position = ?, location = ?, stage = ?, interview_at = ?,
          job_description = ?, contact_name = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `).run(
      normalized.companyName,
      normalized.position,
      normalized.location,
      normalized.stage,
      normalized.interviewAt,
      normalized.jobDescription,
      normalized.contactName,
      normalized.notes,
      now(),
      id,
    );
  } finally {
    database.close();
  }
  return getRecruiterRecord(id);
}

export function deleteRecruiterRecord(id: number) {
  const database = openDatabase();
  try {
    return database.prepare("DELETE FROM recruiter_records WHERE id = ?").run(id).changes > 0;
  } finally {
    database.close();
  }
}

export function hasAdminToken() {
  return Boolean(process.env.RECRUITER_RECORDS_ADMIN_TOKEN);
}

function tokenDigest(token: string) {
  return createHash("sha256").update(`recruiter-records:${token}`).digest("hex");
}

export function verifyAdminToken(token: unknown) {
  const configuredToken = process.env.RECRUITER_RECORDS_ADMIN_TOKEN;
  if (!configuredToken || typeof token !== "string") return false;
  const left = Buffer.from(tokenDigest(token));
  const right = Buffer.from(tokenDigest(configuredToken));
  return left.length === right.length && timingSafeEqual(left, right);
}

export function getAdminSessionValue() {
  const configuredToken = process.env.RECRUITER_RECORDS_ADMIN_TOKEN;
  return configuredToken ? tokenDigest(configuredToken) : "";
}

export function isAdminSession(cookieHeader: string | null) {
  const expected = getAdminSessionValue();
  if (!expected || !cookieHeader) return false;
  const session = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith("recruiter_records_session="))?.slice("recruiter_records_session=".length);
  if (!session) return false;
  const left = Buffer.from(session);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}
