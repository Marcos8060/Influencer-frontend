import { API_URL } from "@/assets/api-endpoints";
import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";

export async function POST(req) {
  try {
    const body = await req.json();

    const payload = { ...body };

    const config = {
      headers: {
        Authorization: req.headers.get("authorization"),
      },
    };

    const response = await backendAxiosInstance.post(`${API_URL.REGISTER_BRAND}`, payload, config);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {

    // If the backend returns a structured error, pass it back
    return new Response(
      JSON.stringify(e.response?.data || { error: "Unknown server error" }),
      { status: e.response?.status || 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
