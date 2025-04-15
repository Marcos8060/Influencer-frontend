import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";
import { API_URL } from "@/assets/api-endpoints";

export async function POST(req) {
  try {
    const body = await req.json();
    const { campaign_id } = body;

    if (!campaign_id) {
      return new Response(JSON.stringify({ error: "Campaign ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const config = {
      headers: {
        Authorization: req.headers.get("authorization"),
      },
    };

    console.log("Proxy is applying to campaign ID:", campaign_id);

    const response = await backendAxiosInstance.post(
      `${API_URL.APPLY_CAMPAIGN}?campaign_id=${campaign_id}`,
      {}, // no body
      config
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
