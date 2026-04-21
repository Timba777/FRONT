import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  type RawAxiosRequestHeaders,
} from "axios"
import { API_CONFIG } from "@/api/client/api-config"
import { parseServerError } from "@/api/helpers/error-processing"
import type { ApiError } from "@/api/interfaces/api-error.interface"
import type { ErrorResponse } from "@/api/interfaces/error-response.interface"

function createApiError(
  message: string,
  init: {
    parsed: ErrorResponse
    originalError: unknown
    statusCode?: number
    code?: string
  }
): ApiError {
  const err = new Error(message) as ApiError & Error
  err.name = "ApiError"
  Object.defineProperty(err, "parsed", { value: init.parsed, enumerable: true })
  Object.defineProperty(err, "originalError", {
    value: init.originalError,
    enumerable: true,
  })
  if (init.statusCode !== undefined) {
    Object.defineProperty(err, "statusCode", {
      value: init.statusCode,
      enumerable: true,
    })
  }
  if (init.code !== undefined) {
    Object.defineProperty(err, "code", { value: init.code, enumerable: true })
  }
  return err as ApiError
}

export function isApiError(error: unknown): error is ApiError {
  if (!(error instanceof Error) || error.name !== "ApiError") return false
  const e = error as Error & { parsed?: unknown; originalError?: unknown }
  return (
    e.parsed !== undefined &&
    typeof e.parsed === "object" &&
    e.parsed !== null &&
    "originalError" in e
  )
}

class ApiClient {
  public readonly instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers,
      withCredentials: API_CONFIG.withCredentials,
    })

    this.setupInterceptors()
  }

  private buildRequestUrl(config: InternalAxiosRequestConfig): string {
    try {
      return this.instance.getUri(config)
    } catch {
      const base = (config.baseURL ?? this.instance.defaults.baseURL ?? "").replace(/\/$/, "")
      const path = config.url ?? ""
      if (!base) return path || ""
      if (!path) return base
      return path.startsWith("http") ? path : `${base}/${path.replace(/^\//, "")}`
    }
  }

  private normalizeFailure(error: unknown): ApiError {
    if (isApiError(error)) {
      return error
    }

    if (!axios.isAxiosError(error)) {
      const parsed = parseServerError(error)
      const message = parsed.general || "Произошла неизвестная ошибка"
      return createApiError(message, {
        parsed,
        originalError: error,
        statusCode: parsed.statusCode,
      })
    }

    const axiosError = error as AxiosError
    let parsed = parseServerError(axiosError)

    if (axiosError.code === "ECONNABORTED") {
      parsed = {
        ...parsed,
        general: "Превышено время ожидания ответа сервера",
        fields: parsed.fields,
        statusCode: parsed.statusCode,
      }
    }

    if (axiosError.code === "ERR_NETWORK") {
      parsed = {
        ...parsed,
        general:
          parsed.general ||
          "Сервер недоступен. Проверьте подключение и что backend запущен на http://localhost:4000",
        fields: parsed.fields,
        statusCode: parsed.statusCode,
      }
    }

    const message =
      parsed.general || axiosError.message || "Произошла неизвестная ошибка"

    return createApiError(message, {
      parsed,
      originalError: axiosError,
      statusCode: axiosError.response?.status ?? parsed.statusCode,
      code: axiosError.code,
    })
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (process.env.NODE_ENV !== "production") {
          const uri = this.buildRequestUrl(config)
          console.log(`📡 ${config.method?.toUpperCase() ?? "GET"} ${uri}`)
        }

        return config
      },
      (error: unknown) => Promise.reject(this.normalizeFailure(error))
    )

    this.instance.interceptors.response.use(
      (response) => response,
      (error: unknown) => Promise.reject(this.normalizeFailure(error))
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config)
    return response.data
  }

  async post<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.instance.post(
      url,
      data,
      config
    )
    return response.data
  }

  async put<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.instance.put(
      url,
      data,
      config
    )
    return response.data
  }

  async patch<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.instance.patch(
      url,
      data,
      config
    )
    return response.data
  }

  /**
   * PATCH with `multipart/form-data`. Do not pass JSON — use `FormData` only.
   * Strips default JSON `Content-Type` so the runtime can set the multipart boundary.
   */
  async patchFormData<TResponse>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const mergedHeaders: RawAxiosRequestHeaders = {
      ...(config?.headers as RawAxiosRequestHeaders | undefined),
    }
    delete mergedHeaders["Content-Type"]
    delete mergedHeaders["content-type"]

    const response: AxiosResponse<TResponse> = await this.instance.patch(
      url,
      formData,
      {
        ...config,
        headers: mergedHeaders,
      }
    )
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()
