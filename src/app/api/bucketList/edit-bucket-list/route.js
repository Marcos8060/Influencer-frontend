import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";
import { API_URL } from "@/assets/api-endpoints";

export async function PATCH(req) {
    try {
      const token = req.headers.get("authorization");
      const { id, ...updateData } = await req.json(); // Extract `id` & update fields
  
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
  
      const response = await backendAxiosInstance.patch(
        `${API_URL.EDIT_BUCKETLIST}?bucket_list_id=${id}`, 
        updateData, 
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
  