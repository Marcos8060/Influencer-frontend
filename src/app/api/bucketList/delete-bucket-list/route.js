import { API_URL } from "../../../../assets/api-endpoints/index";
import { backendAxiosInstance } from "../../../../assets/hooks/backend-axios-instance";

export async function DELETE(req) {
  const token = req.headers.get("authorization");
  console.log("Authorization Header:", token);

  try {
    const { id } = await req.json();

    const response = await backendAxiosInstance.delete(API_URL.DELETE_BUCKETLIST, {
      headers: {
        Authorization: token, 
      },
      params: { bucket_list_id: id },
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
