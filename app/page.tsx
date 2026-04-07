import { LeftPanel } from "@/components/login/left-panel"
import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col-reverse lg:flex-row">
      {/* Left Panel - Marketing Content */}
      <aside className="w-full bg-muted/30 lg:w-[42%]">
        <LeftPanel />
      </aside>

      {/* Right Panel - Login Form */}
      <section className="flex w-full flex-1 items-center justify-center bg-background lg:w-[58%]">
        <LoginForm />
      </section>
    </main>
  )
}
