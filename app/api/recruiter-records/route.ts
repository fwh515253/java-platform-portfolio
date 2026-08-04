import {
  createRecruiterRecord,
  deleteRecruiterRecord,
  isAdminSession,
  listRecruiterRecords,
  normalizeRecordInput,
  updateRecruiterRecord,
} from "../../../lib/recruiter-records";

function requireAdmin(request: Request) {
  return isAdminSession(request.headers.get("cookie"));
}

export async function GET(request: Request) {
  if (!requireAdmin(request)) return Response.json({ error: "未授权" }, { status: 401 });
  try {
    return Response.json({ records: listRecruiterRecords() });
  } catch {
    return Response.json({ error: "招聘沟通记录暂时不可用" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const input = normalizeRecordInput(body);
    if (!input) return Response.json({ error: "请至少填写公司名称和岗位名称" }, { status: 400 });
    const record = createRecruiterRecord(input);
    return Response.json({ record }, { status: 201 });
  } catch {
    return Response.json({ error: "保存失败，请稍后再试" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!requireAdmin(request)) return Response.json({ error: "未授权" }, { status: 401 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const id = Number(body.id);
    if (!Number.isInteger(id) || id < 1) return Response.json({ error: "记录不存在" }, { status: 400 });
    const record = updateRecruiterRecord(id, body);
    if (!record) return Response.json({ error: "记录不存在或内容不完整" }, { status: 404 });
    return Response.json({ record });
  } catch {
    return Response.json({ error: "更新失败，请稍后再试" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!requireAdmin(request)) return Response.json({ error: "未授权" }, { status: 401 });
  try {
    const body = await request.json() as { id?: unknown };
    const id = Number(body.id);
    if (!Number.isInteger(id) || id < 1) return Response.json({ error: "记录不存在" }, { status: 400 });
    return deleteRecruiterRecord(id) ? Response.json({ ok: true }) : Response.json({ error: "记录不存在" }, { status: 404 });
  } catch {
    return Response.json({ error: "删除失败，请稍后再试" }, { status: 500 });
  }
}
