const API_BASE_URL = "http://localhost:3000/api";

export async function apiRequest(endpoint, method = "GET", data = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    credentials: "include",
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Ha ocurrido un error");
    }

    return responseData;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
}