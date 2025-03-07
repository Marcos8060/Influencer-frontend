import { API_URL } from "../../../../assets/api-endpoints/index";
import { backendAxiosInstance } from "../../../../assets/hooks/backend-axios-instance";

export async function DELETE(req) {
  const token = req.headers.get("authorization");
  console.log("Authorization Header:", token);
  try {
    const config = {
      headers: {
        Authorization: req.headers.get("authorization"),
      },
    };

    const { id } = await req.json();

    const response = await backendAxiosInstance.delete(
      `${API_URL.DELETE_BUCKETLIST}/?bucket_list_id=${id}`,
      config
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: e.response?.status ?? 500,
    });
  }
}