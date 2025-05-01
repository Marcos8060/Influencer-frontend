import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";
import { API_URL } from "@/assets/api-endpoints";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const breakdown = searchParams.get("breakdown")?.trim();
    const metric = searchParams.get("metric")?.trim();
    const start_date = searchParams.get("start_date")?.trim();
    const end_date = searchParams.get("end_date")?.trim();
    const user_id = searchParams.get("user_id")?.trim();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), { status: 401 });
    }

    const response = await backendAxiosInstance.get(`${API_URL.INSTAGRAM_METRICS_LIFETIME}`, {
      headers: { Authorization: authHeader },
      params: { breakdown: breakdown, metric: metric, start_date: start_date, end_date: end_date, user_id: user_id },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify(e.response?.data || { error: "Unknown server error" }),
      { status: e.response?.status || 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
