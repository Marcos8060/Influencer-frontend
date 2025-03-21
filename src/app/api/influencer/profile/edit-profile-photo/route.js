import { backendAxiosInstance } from "@/assets/hooks/backend-axios-instance";
import { API_URL } from "@/assets/api-endpoints";

// For handling POST requests in Next.js 13+ using the app folder structure
export async function POST(req) {
  try {
    const body = await req.formData();

    const config = {
      headers: {
        Authorization: req.headers.get("authorization"),
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await backendAxiosInstance.post(`${API_URL.EDIT_PROFILE_PHOTO}`, body, config);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}