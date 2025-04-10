import { API_URL } from "@/assets/api-endpoints";
import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";


export async function GET(req) {
  try {
    const config = {
      headers: {
        Authorization: req.headers.get("authorization"),
      },
    };

  
    const response = await backendAxiosInstance.get(`${API_URL.INSTAGRAM_PROFILE_DETAILS}`,config);

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