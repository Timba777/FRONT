"use client"

import { useCallback, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type ParamsRecord = Record<string, string>

export interface QueryParamsHelpers {
  params: ParamsRecord
  getParam: (key: string) => string | null
  setParams: (updates: ParamsRecord) => void
  removeParam: (key: string) => void
}

/**
 * Read & update URL query parameters using Next.js App Router.
 *
 * Notes:
 * - Works only in Client Components ("use client")
 * - Uses `ReadonlyURLSearchParams.toString()` to safely read params
 * - set/remove preserve all other existing params
 * - Navigation uses `router.push` (no full page reload)
 *
 * Example usage:
 *  const { params, getParam, setParams, removeParam } = useQueryParams()
 *
 *  // Getting params
 *  const id = getParam("id") // string | null
 *  const page = getParam("page") // string | null
 *
 *  // Updating one param (preserves others)
 *  setParams({ page: "2" })
 *
 *  // Removing a param (preserves others)
 *  removeParam("id")
 *
 *  // All params as a plain object
 *  const all = Object.fromEntries(Object.entries(params))
 */
export function useQueryParams(): QueryParamsHelpers {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params: ParamsRecord = useMemo(() => {
    const raw = searchParams?.toString() ?? ""
    const usp = new URLSearchParams(raw)

    const out: ParamsRecord = {}
    for (const [key, value] of usp.entries()) {
      out[key] = value
    }
    return out
  }, [searchParams])

  const buildUrl = useCallback(
    (nextParams: URLSearchParams): string => {
      const qs = nextParams.toString()
      return qs ? `${pathname}?${qs}` : pathname
    },
    [pathname]
  )

  const getParam = useCallback(
    (key: string): string | null => {
      const value = searchParams.get(key)
      return value
    },
    [searchParams]
  )

  const setParams = useCallback(
    (updates: ParamsRecord): void => {
      const usp = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        usp.set(key, value)
      }
      router.push(buildUrl(usp))
    },
    [buildUrl, router, searchParams]
  )

  const removeParam = useCallback(
    (key: string): void => {
      const usp = new URLSearchParams(searchParams.toString())
      usp.delete(key)
      router.push(buildUrl(usp))
    },
    [buildUrl, router, searchParams]
  )

  return { params, getParam, setParams, removeParam }
}

