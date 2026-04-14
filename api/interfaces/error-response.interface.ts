export interface ValidationErrors {
  [key: string]: string
}

export interface ErrorResponse {
  general?: string
  fields: ValidationErrors
  statusCode?: number
}
