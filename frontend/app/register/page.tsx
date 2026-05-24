"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"

export default function RegisterPage() {
  const { handleRegister } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const formRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!formRef.current) return

    gsap.fromTo(
      formRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    )
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setError("")
    setSubmitting(true)

    const success = await handleRegister({
      username,
      email,
      password,
    })

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Registration failed. Please try again.")
    }

    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#f8fbfb] relative overflow-hidden flex items-center justify-center px-5">

      
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-100/40 blur-3xl rounded-full pointer-events-none" />

    

      
      <div
        ref={formRef}
        className="relative z-10 w-full max-w-[460px]"
      >

        
        <div className="mb-8">

          <div className="flex items-center gap-2 mb-4">

            <div className="w-2 h-2 rounded-full bg-cyan-600" />

            <p className="text-xs tracking-[0.25em] uppercase text-cyan-700 font-medium">
              Create Account
            </p>

          </div>

          <h2 className="text-[34px] leading-[1.1] font-semibold tracking-tight text-slate-900">
            Start your interview preparation journey
          </h2>

          <p className="text-slate-500 text-[15px] mt-4 leading-7">
            Analyze resumes, identify skill gaps,
            and generate AI-powered interview reports
            tailored to your target role.
          </p>

        </div>

        
        <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-[30px] p-7 shadow-[0_4px_30px_rgba(15,23,42,0.03)]">

          
          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Username
              </label>

              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full h-12 rounded-xl border border-slate-200 bg-[#fcfdfd] px-4 text-[15px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

           
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full h-12 rounded-xl border border-slate-200 bg-[#fcfdfd] px-4 text-[15px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full h-12 rounded-xl border border-slate-200 bg-[#fcfdfd] px-4 text-[15px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 text-white font-medium text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                "Creating account..."
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          
          <div className="mt-7 pt-6 border-t border-slate-100 text-center">

            <p className="text-sm text-slate-500">
              Already have an account?{" "}

              <span
                onClick={() =>
                  router.push("/login")
                }
                className="text-cyan-700 font-medium cursor-pointer hover:text-cyan-800 transition"
              >
                Sign in
              </span>

            </p>

          </div>

        </div>

      </div>
    </div>
  )
}