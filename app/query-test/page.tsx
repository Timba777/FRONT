"use client";

export const dynamic = 'force-dynamic';

import { Suspense } from "react"
import { useQueryParams } from "@/api/helpers/use-query-params"

function QueryTestContent() {
  const { params, getParam, setParams, removeParam } = useQueryParams()

  return (
    <div style={{ padding: 20 }}>
      <h1>Query Test</h1>

      <div>id: {getParam("55") ?? "null"}</div>
      <div>page: {getParam("1") ?? "null"}</div>
      <div>name: {getParam("alex") ?? "null"}</div>

      <pre>{JSON.stringify(params, null, 2)}</pre>

      <button onClick={() => setParams({ page: "2" })}>
        Set page=2
      </button>

      <br /><br />

      <button onClick={() => setParams({ name: "tim", id: "123" })}>
        Set name + id
      </button>

      <br /><br />

      <button onClick={() => removeParam("id")}>
        Remove id
      </button>
    </div>
  )
}

export default function QueryTestPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <QueryTestContent />
    </Suspense>
  )
}