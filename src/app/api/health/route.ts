/** Health check para App Platform / load balancers (sin i18n). */
export function GET() {
  return Response.json({ ok: true }, { status: 200 });
}
