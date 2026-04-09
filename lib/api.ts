import axios from "axios"

// Use explicit backend origin to keep cookie auth stable with CORS (frontend runs on http://localhost:3000).
export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.code === "ERR_NETWORK") {
      console.warn("Backend is not reachable. Check if server is running on http://localhost:4000")
    }

    if (error?.response?.status === 401 && typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        window.location.href = "/"
      }
    }

    return Promise.reject(error)
  }
)
