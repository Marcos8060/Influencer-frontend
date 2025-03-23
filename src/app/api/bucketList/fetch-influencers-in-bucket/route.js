import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";
import { API_URL } from "@/assets/api-endpoints";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bucketListId = searchParams.get("bucket_list_id")?.trim();

    if (!bucketListId) {
      return new Response(JSON.stringify({ error: "Missing bucket_list_id" }), { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), { status: 401 });
    }

    const response = await backendAxiosInstance.get(`${API_URL.FETCH_INFLUENCERS_IN_BUCKET}`, {
      headers: { Authorization: authHeader },
      params: { bucket_list_id: bucketListId },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Proxy error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
