"use client"
import axios from "axios"
import { useState } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Menu,
  X,
  LayoutDashboard,
  History,
  Settings,
  UploadCloud,
  Sparkles,
  FileText,
  ArrowRight,
} from "lucide-react"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [selfDesc, setSelfDesc] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const handleGenerate = async () => {
  if (!file) {
    alert("Please upload resume")
    return
  }

  try {
    const formData = new FormData()

    formData.append("resume", file)
    formData.append("jobDescription", jobDesc)
    formData.append("selfDescription", selfDesc)

    

    const response = await axios.post(
      "http://localhost:3000/api/interview",
      formData,
      {
        headers: {
         
          "Content-Type": "multipart/form-data",
        },
         withCredentials: true,
      }
    )

    localStorage.setItem(
      "report",
      JSON.stringify(response.data.interviewReport)
    )

    router.push("/results")

  } catch (err: any) {
    console.log(err.response?.data)
    console.error(err)
    alert("Failed to generate report")
  }
}

  return (
    <div className="min-h-screen bg-[#f6f8f9] overflow-x-hidden">

      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[260px]
          bg-white border-r border-slate-200
          transition-transform duration-300
          flex flex-col justify-between
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        
        <div>

          
          <div className="flex items-center justify-between px-6 pt-7 pb-6 border-b border-slate-100">

            <div>
              <h1 className="text-[23px] font-semibold tracking-tight text-slate-900">
                ResumeCore
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                AI Interview Prep
              </p>
            </div>

            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-slate-600" />
            </button>

          </div>

          
          <div className="p-4 space-y-2">

            <SidebarItem
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Dashboard"
              active
            />

            <Link href="/history">
              <SidebarItem
                icon={<History className="w-5 h-5" />}
                label="History"
              />
            </Link>

            <Link href="/settings">
              <SidebarItem
                icon={<Settings className="w-5 h-5" />}
                label="Settings"
              />
            </Link>

          </div>

        </div>

        
        <div className="p-4 border-t border-slate-100">

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white font-semibold">
              S
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">
                {user?.username || "ResumeCore User"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email || "user@email.com"}
              </p>
            </div>

          </div>

        </div>

      </aside>

      
      <div className="min-h-screen">

        
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">

          <div className="h-[72px] px-5 md:px-10 flex items-center justify-between">

           
            <div className="flex items-center gap-4">

              
              <button onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition"
                >
                <Menu className="w-6 h-6 text-slate-700" />
              </button>

              <div>
                <h1 className="text-[24px] font-semibold tracking-tight text-slate-900">
                  Dashboard
                </h1>

                <p className="text-sm text-slate-500 -mt-0.5">
                  AI-powered interview preparation
                </p>
              </div>

            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">

              <Sparkles className="w-4 h-4 text-cyan-600" />

              Resume workspace

            </div>

          </div>

        </header>

        
        <main className="max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-10">

          
          <section >

            <div className="flex items-center gap-2 text-cyan-700 text-xs tracking-[0.22em] uppercase font-semibold mb-4">

              <div className="w-2 h-2 rounded-full bg-cyan-600" />

              Interview Workspace

            </div>

            <h2 className="text-[28px] md:text-[34px] leading-[1.1] tracking-tight font-semibold text-slate-900 max-w-3xl">
              Generate AI interview reports
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-slate-600 max-w-2xl">
              Upload your resume, add your target role,
              and receive technical questions,
              behavioral prep, skill analysis,
              and personalized preparation roadmaps.
            </p>

          </section>

          
          <div className="grid lg:grid-cols-[1fr_320px] gap-5 mt-5">

            
            <div className="space-y-5">

              
              <div className="bg-white border border-slate-200 rounded-[26px] p-5 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center">
                    <UploadCloud className="w-5 h-5 text-cyan-700" />
                  </div>

                  <div>
                    <h3 className="text-[21px] font-semibold tracking-tight">
                      Upload Resume
                    </h3>

                    <p className="text-sm text-slate-500">
                      PDF format recommended
                    </p>
                  </div>

                </div>

                <label className="group h-[170px] rounded-[22px] border-2 border-dashed border-slate-200 hover:border-cyan-400 bg-slate-50/70 flex flex-col items-center justify-center cursor-pointer transition">

                  <UploadCloud className="w-9 h-9 text-slate-300 group-hover:text-cyan-600 transition" />

                  <p className="mt-4 text-[15px] font-medium text-slate-700">
                    {file ? file.name : "Click to upload resume"}
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    PDF • Max 10MB
                  </p>

                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) =>
                      setFile(e.target.files?.[0] || null)
                    }
                  />
                </label>

              </div>

              
              <div className="bg-white border border-slate-200 rounded-[26px] p-5 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cyan-700" />
                  </div>

                  <div>
                    <h3 className="text-[21px] font-semibold tracking-tight">
                      Job Description
                    </h3>

                    <p className="text-sm text-slate-500">
                      Paste the target role description
                    </p>
                  </div>

                </div>

                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-[220px] resize-none rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 text-[15px] leading-7 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                />

              </div>

            </div>

            <div className="space-y-5">

              
              <div className="bg-white border border-slate-200 rounded-[26px] p-5 shadow-sm">

                <h3 className="text-[21px] font-semibold tracking-tight">
                  About You
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Tell AI about yourself
                </p>

                <textarea
                  value={selfDesc}
                  onChange={(e) => setSelfDesc(e.target.value)}
                  placeholder="Example: Full-stack developer skilled in React, Next.js, Node.js and MongoDB..."
                  className="mt-5 w-full h-[220px] resize-none rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 text-[15px] leading-7 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                />

              </div>

              
              <div className="bg-white border border-slate-200 rounded-[26px] p-5 shadow-sm">

                <h3 className="text-[21px] font-semibold tracking-tight">
                  Report Includes
                </h3>

                <div className="mt-5 space-y-4 text-[15px]">

                  {[
                    "Technical interview questions",
                    "Behavioral preparation guidance",
                    "Skill gap identification",
                    "7-day preparation roadmap",
                    "Role compatibility score",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />

                      {item}
                    </div>
                  ))}

                </div>

                <button 
                
                onClick={handleGenerate}
                className="group mt-7 w-full rounded-2xl bg-slate-900 text-white py-4 text-[15px] font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2">

                  Generate Report

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />

                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-2xl
        text-[15px] transition cursor-pointer
        ${
          active
            ? "bg-cyan-50 text-cyan-700 font-medium"
            : "text-slate-700 hover:bg-slate-100"
        }
      `}
    >
      {icon}
      {label}
    </div>
  )
}