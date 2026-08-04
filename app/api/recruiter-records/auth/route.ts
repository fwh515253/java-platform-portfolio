import { getAdminSessionValue, hasAdminToken, verifyAdminToken } from "../../../../lib/recruiter-records";

const sessionCookie = "recruiter_records_session";

function cookie(value: string, maxAge: number, request?: Request) {
  const forwardedProtocol = request?.headers.get("x-forwarded-proto");
  const secure = forwardedProtocol === "https" || request?.url.startsWith("https://") ? "; Secure" : "";
  return `${sessionCookie}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict${secure}`;
}

export async function POST(request: Request) {
  if (!hasAdminToken()) return Response.json({ error: "服务端尚未设置管理员口令" }, { status: 503 });
  try {
    const body = await request.json() as { token?: unknown };
    if (!verifyAdminToken(body.token)) return Response.json({ error: "管理员口令不正确" }, { status: 401 });
    return Response.json({ ok: true }, { headers: { "Set-Cookie": cookie(getAdminSessionValue(), 60 * 60 * 12, request) } });
  } catch {
    return Response.json({ error: "登录失败" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookie("", 0, request) } });
}
