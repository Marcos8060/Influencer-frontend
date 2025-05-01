import { API_URL } from "@/assets/api-endpoints";
import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";

export async function PATCH(req) {
  const token = req.headers.get("authorization");
  try {
    const { ...payload } = await req.json();

    const response = await backendAxiosInstance.patch(
      API_URL.UPDATE_INFLUENCER_PROFILE, 
      payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );

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
