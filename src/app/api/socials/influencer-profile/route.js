import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";
import { API_URL } from "@/assets/api-endpoints";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page")?.trim();

    if (!page) {
      return new Response(JSON.stringify({ error: "Missing page parameter" }), { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), { status: 401 });
    }

    const response = await backendAxiosInstance.get(`${API_URL.FETCH_INFLUENCER_PROFILE}`, {
      headers: { Authorization: authHeader },
      params: { page: page },
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
