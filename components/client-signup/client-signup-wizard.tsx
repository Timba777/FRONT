"use client"

import { useState, useCallback, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { SocialLoginButton } from "@/components/login/social-login-button"
import { Stepper } from "@/components/freelancer-signup/stepper"
import { EmailConfirmationDialog } from "@/components/auth/email-confirmation-dialog"
import { UserAlreadyExistsModal } from "@/components/auth/user-already-exists-modal"
import { isUserAlreadyExistsError } from "@/api/helpers/is-user-already-exists-error"
import { isProfileAlreadyExistsError } from "@/api/helpers/is-profile-already-exists-error"
import { buildCreateFullCustomerProfileAfterClientSignup } from "@/api/integration/post-register-customer-profile"
import { login, register } from "@/services/auth"
import { createFullCustomerProfile } from "@/services/profile"
import { UserRole } from "@/types/user-role.enum"
import { AccountStep } from "./steps/account-step"
import { ProfileStep } from "./steps/profile-step"
import { SettingsStep, type SettingsData } from "./steps/settings-step"

const steps = [
  { id: 1, label: "Аккаунт" },
  { id: 2, label: "Профиль" },
  { id: 3, label: "Настройки" },
]

interface AccountData {
  fullName: string
  email: string
  password: string
  agreeToTerms: boolean
}

interface ProfileData {
  companyName: string
  companySize: string
  industry: string
  freelancerTypes: string[]
  howHeard: string
}

export function ClientSignupWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [showUserExistsModal, setShowUserExistsModal] = useState(false)
  const [isAccountRegistered, setIsAccountRegistered] = useState(false)
  const [isProfileCreated, setIsProfileCreated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const contentRef = useRef<HTMLDivElement>(null)
  const isFinalProfileRequestInFlight = useRef(false)

  // Account Step State
  const [accountData, setAccountData] = useState<AccountData>({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })
  const [accountErrors, setAccountErrors] = useState<Partial<Record<keyof AccountData, string>>>({})
  const [accountTouched, setAccountTouched] = useState<Partial<Record<keyof AccountData, boolean>>>({})

  // Profile Step State
  const [profileData, setProfileData] = useState<ProfileData>({
    companyName: "",
    companySize: "",
    industry: "",
    freelancerTypes: [],
    howHeard: "",
  })
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileData, string>>>({})
  const [profileTouched, setProfileTouched] = useState<Partial<Record<keyof ProfileData, boolean>>>({})

  // Settings Step State
  const [settingsData, setSettingsData] = useState<SettingsData>({
    budgetRange: [20, 100],
    hiringFrequency: "",
    experienceLevel: "intermediate",
    notifyTopMatches: true,
    sendWeeklySummary: true,
    autoInviteHighMatches: true,
  })
  const [settingsErrors, setSettingsErrors] = useState<Partial<Record<keyof SettingsData, string>>>({})
  const [settingsTouched, setSettingsTouched] = useState<Partial<Record<keyof SettingsData, boolean>>>({})

  // Validation Functions
  const validateAccount = useCallback(() => {
    const errors: Partial<Record<keyof AccountData, string>> = {}

    if (!accountData.fullName.trim()) {
      errors.fullName = "Имя обязательно"
    }
    if (!accountData.email.trim()) {
      errors.email = "Email обязателен"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountData.email)) {
      errors.email = "Неверный формат email"
    }
    if (!accountData.password) {
      errors.password = "Пароль обязателен"
    } else if (accountData.password.length < 8) {
      errors.password = "Пароль должен быть не менее 8 символов"
    }
    if (!accountData.agreeToTerms) {
      errors.agreeToTerms = "Необходимо принять условия"
    }

    return errors
  }, [accountData])

  const validateProfile = useCallback(() => {
    const errors: Partial<Record<keyof ProfileData, string>> = {}

    if (!profileData.industry) {
      errors.industry = "Выберите индустрию"
    }
    if (profileData.freelancerTypes.length === 0) {
      errors.freelancerTypes = "Выберите хотя бы один тип фрилансеров"
    }

    return errors
  }, [profileData])

  const validateSettings = useCallback(() => {
    const errors: Partial<Record<keyof SettingsData, string>> = {}

    if (!settingsData.hiringFrequency) {
      errors.hiringFrequency = "Выберите частоту найма"
    }
    if (!settingsData.experienceLevel) {
      errors.experienceLevel = "Выберите уровень опыта"
    }

    return errors
  }, [settingsData])

  const handleAccountBlur = (field: keyof AccountData) => {
    setAccountTouched((prev) => ({ ...prev, [field]: true }))
    const errors = validateAccount()
    setAccountErrors((prev) => ({ ...prev, [field]: errors[field] }))
  }

  const handleProfileBlur = (field: keyof ProfileData) => {
    setProfileTouched((prev) => ({ ...prev, [field]: true }))
    const errors = validateProfile()
    setProfileErrors((prev) => ({ ...prev, [field]: errors[field] }))
  }

  const handleSettingsBlur = (field: keyof SettingsData) => {
    setSettingsTouched((prev) => ({ ...prev, [field]: true }))
    const errors = validateSettings()
    setSettingsErrors((prev) => ({ ...prev, [field]: errors[field] }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        const accountErrors = validateAccount()
        return Object.keys(accountErrors).length === 0
      case 2:
        const profileErrors = validateProfile()
        return Object.keys(profileErrors).length === 0
      case 3:
        const settingsErrors = validateSettings()
        return Object.keys(settingsErrors).length === 0
      default:
        return false
    }
  }

  const animateTransition = (direction: "left" | "right", callback: () => void) => {
    setIsAnimating(true)
    setSlideDirection(direction)

    // Trigger exit animation
    if (contentRef.current) {
      contentRef.current.style.opacity = "0"
      contentRef.current.style.transform = direction === "right" ? "translateX(-16px)" : "translateX(16px)"
    }

    setTimeout(() => {
      callback()

      // Reset and trigger enter animation
      if (contentRef.current) {
        contentRef.current.style.transform = direction === "right" ? "translateX(16px)" : "translateX(-16px)"

        requestAnimationFrame(() => {
          if (contentRef.current) {
            contentRef.current.style.opacity = "1"
            contentRef.current.style.transform = "translateX(0)"
          }
        })
      }

      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 200)
  }

  const handleNext = async () => {
    if (currentStep === 1) {
      const errors = validateAccount()
      if (Object.keys(errors).length > 0) {
        setAccountErrors(errors)
        setAccountTouched({
          fullName: true,
          email: true,
          password: true,
          agreeToTerms: true,
        })
        return
      }

      if (!isAccountRegistered) {
        setSubmitError("")
        setShowUserExistsModal(false)
        setIsSubmitting(true)

        try {
          const normalizedName = accountData.fullName.trim()
          const normalizedEmail = accountData.email.trim()

          await register({
            firstName: normalizedName,
            name: normalizedName,
            email: normalizedEmail,
            password: accountData.password,
            passwordRepeat: accountData.password,
            passwordReapeat: accountData.password,
            role: UserRole.CUSTOMER,
          })

          try {
            await login(normalizedEmail, accountData.password)
          } catch (loginError) {

            console.warn()

          }

          setIsAccountRegistered(true)
          setRegisteredEmail(normalizedEmail)
        } catch (error: unknown) {
          if (isUserAlreadyExistsError(error)) {
            setShowUserExistsModal(true)
            return
          }

          const message =
            error instanceof Error
              ? error.message
              : "Не удалось завершить регистрацию. Попробуйте позже."
          setSubmitError(message)
          return
        } finally {
          setIsSubmitting(false)
        }
      }
    }

    if (currentStep === 2) {
      const errors = validateProfile()
      if (Object.keys(errors).length > 0) {
        setProfileErrors(errors)
        setProfileTouched({
          industry: true,
          freelancerTypes: true,
        })
        return
      }
    }

    animateTransition("right", () => {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    })
  }

  const handleBack = () => {
    animateTransition("left", () => {
      setCurrentStep((prev) => Math.max(prev - 1, 1))
    })
  }

  const handleEditEmail = () => {
    setIsConfirmationDialogOpen(false)
    setCurrentStep(1)
  }

  const handleSubmit = async () => {
    const errors = validateSettings()
    if (Object.keys(errors).length > 0) {
      setSettingsErrors(errors)
      setSettingsTouched({
        hiringFrequency: true,
        experienceLevel: true,
      })
      return
    }

    if (!isAccountRegistered) {
      setSubmitError("Сначала завершите шаг создания аккаунта.")
      return
    }

    if (isProfileCreated) {
      setSubmitError("")
      setIsConfirmationDialogOpen(true)
      return
    }

    if (isFinalProfileRequestInFlight.current) {
      return
    }

    setSubmitError("")
    isFinalProfileRequestInFlight.current = true
    setIsSubmitting(true)
    try {
      const profilePayload = buildCreateFullCustomerProfileAfterClientSignup(
        { fullName: accountData.fullName },
        profileData,
        settingsData
      )
      await createFullCustomerProfile(profilePayload)
      setIsProfileCreated(true)
      setIsConfirmationDialogOpen(true)
    } catch (error: unknown) {
      if (isProfileAlreadyExistsError(error)) {
        setIsProfileCreated(true)
        setIsConfirmationDialogOpen(true)
      } else {
        const message =
          error instanceof Error
            ? error.message
            : "Не удалось сохранить профиль. Попробуйте позже."
        setSubmitError(message)
      }
    } finally {
      setIsSubmitting(false)
      isFinalProfileRequestInFlight.current = false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountStep
            data={accountData}
            onChange={setAccountData}
            errors={accountErrors}
            touched={accountTouched}
            onBlur={handleAccountBlur}
          />
        )
      case 2:
        return (
          <ProfileStep
            data={profileData}
            onChange={setProfileData}
            errors={profileErrors}
            touched={profileTouched}
            onBlur={handleProfileBlur}
          />
        )
      case 3:
        return (
          <SettingsStep
            data={settingsData}
            onChange={setSettingsData}
            errors={settingsErrors}
            touched={settingsTouched}
            onBlur={handleSettingsBlur}
          />
        )
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Создайте аккаунт клиента"
      case 2:
        return "Расскажите о вашем бизнесе"
      case 3:
        return "Настройте предпочтения по найму"
      default:
        return ""
    }
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "Присоединяйтесь к тысячам компаний, нанимающих на Light"
      case 2:
        return "Это помогает нам найти подходящих фрилансеров для вас"
      case 3:
        return "Наш ИИ использует их для поиска идеальных совпадений"
      default:
        return ""
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-xl">
        {/* Brand - matching login page */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold text-foreground">Light</span>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Header - matching login page style */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {getStepTitle()}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {getStepSubtitle()}
          </p>
        </div>

        {/* Step Content with smooth transitions */}
        <div
          ref={contentRef}
          className="transition-all duration-300 ease-out"
          style={{ opacity: 1, transform: "translateX(0)" }}
        >
          {renderStep()}
        </div>

        {/* Navigation Buttons - matching login page button style */}
        <div className="mt-8 flex gap-3">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="h-12 flex-1 rounded-lg text-base font-medium"
              disabled={isSubmitting || isAnimating}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={() => void handleNext()}
              className="h-12 flex-1 rounded-lg text-base font-medium"
              disabled={!isStepValid() || isAnimating}
            >
              Продолжить
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                void handleSubmit()
              }}
              className="h-12 flex-1 rounded-lg text-base font-medium"
              disabled={isSubmitting || isAnimating || !isStepValid()}
            >
              {isSubmitting ? (
                <Spinner className="h-5 w-5" />
              ) : (
                "Завершить регистрацию"
              )}
            </Button>
          )}
        </div>

        {currentStep === 3 && submitError ? (
          <p className="mt-3 text-center text-sm text-destructive" role="alert">
            {submitError}
          </p>
        ) : null}

        {/* Social Login - Only on first step */}
        {currentStep === 1 && (
          <>
            {/* Divider - matching login page */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground">или</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              <SocialLoginButton
                icon={
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
                provider="Google"
                disabled = {true}
              />
              <SocialLoginButton
                icon={
                  <svg className="h-5 w-5" fill="#0A66C2" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
                provider="LinkedIn"
                disabled = {true}
              />
            </div>
          </>
        )}

        {/* Footer - matching login page */}
        <div className="mt-8 space-y-3 text-center">
          <div>
            <span className="text-sm text-muted-foreground">Уже есть аккаунт? </span>
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Войти
            </Link>
          </div>
          {currentStep === 1 && (
            <div>
              <Link
                href="/register"
                className="text-sm text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded transition-colors"
              >
                Вернуться к выбору роли
              </Link>
            </div>
          )}
        </div>
      </div>
      <EmailConfirmationDialog
        open={isConfirmationDialogOpen}
        email={registeredEmail}
        onClose={() => setIsConfirmationDialogOpen(false)}
        onEditEmail={handleEditEmail}
      />
      <UserAlreadyExistsModal
        open={showUserExistsModal}
        onClose={() => setShowUserExistsModal(false)}
      />
    </main>
  )
}
