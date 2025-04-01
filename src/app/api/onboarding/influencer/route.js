import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";
import { API_URL } from "@/assets/api-endpoints";

// For handling POST requests in Next.js 13+ using the app folder structure
export async function POST(req) {
  try {
    const body = await req.json();

    const payload = {
      ...body,
    };

    const config = {
      headers: {
        Authorization: req.headers.get("authorization"),
      },
    };

    const response = await backendAxiosInstance.post(`${API_URL.ONBOARD_INFLUENCER}`, payload, config);

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