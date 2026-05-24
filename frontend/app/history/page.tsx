"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Clock3,
  Sparkles,
  Menu,
  X,
  LayoutDashboard,
  History,
  Settings,
} from "lucide-react"

import { useAuth } from "@/features/auth/hooks/useAuth"

const demoReports = [
  {
    _id: "1",
    title: "Frontend Engineer Interview Prep",
    matchScore: 87,
    createdAt: "2 hours ago",
    skillGaps: ["System Design", "Testing"],
  },
  {
    _id: "2",
    title: "MERN Stack Developer Analysis",
    matchScore: 81,
    createdAt: "Yesterday",
    skillGaps: ["Docker", "CI/CD"],
  },
  {
    _id: "3",
    title: "React Internship Preparation",
    matchScore: 92,
    createdAt: "3 days ago",
    skillGaps: ["TypeScript"],
  },
  {
    _id: "4",
    title: "Backend Developer Interview Report",
    matchScore: 76,
    createdAt: "Last week",
    skillGaps: ["Redis", "Microservices"],
  },
]

export default function HistoryPage() {
  const router = useRouter()
  const { user } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const initial =
    user?.username?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U"

  return (
    <div className="min-h-screen bg-[#f6fafa] relative overflow-x-hidden">

    

      
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[260px]
          bg-white border-r border-slate-200
          transition-all duration-300
          flex flex-col justify-between
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

       
        <div>

          
          <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">

            <div>
              <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
                ResumeCore
              </h1>

              <p className="text-xs text-slate-400 mt-1">
                AI Interview Preparation
              </p>
            </div>

            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          
          <div className="p-4 space-y-2">

            <SidebarItem
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard"
              onClick={() => router.push("/dashboard")}
            />

            <SidebarItem
              active
              icon={<History className="w-4 h-4" />}
              label="History"
            />

            <SidebarItem
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
              onClick={() => router.push("/settings")}
            />

          </div>

        </div>

        
        <div className="p-4 border-t border-slate-100">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center text-white font-semibold">
              {initial}
            </div>

            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-800 truncate">
                {user?.username || "ResumeCore User"}
              </p>

              <p className="text-xs text-slate-400 truncate">
                {user?.email || "user@email.com"}
              </p>
            </div>

          </div>

        </div>

      </aside>

      
      <header className="sticky top-0 z-20 h-20 border-b border-slate-200 bg-white/80 backdrop-blur">

        <div className="max-w-6xl mx-auto h-full px-5 md:px-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>

            
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                History
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Previously generated interview reports
              </p>
            </div>

          </div>

        </div>

      </header>

      
      <main className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-10">

        
        <div className="mb-10">

          <div className="flex items-center gap-2 mb-4">

            <div className="w-2 h-2 rounded-full bg-cyan-600" />

            <p className="text-xs uppercase tracking-[0.25em] text-cyan-700 font-medium">
              Report Feed
            </p>

          </div>

          <h2 className="text-3xl md:text-[38px] leading-[1.1] tracking-tight font-semibold text-slate-900 max-w-3xl">
            Revisit your previous interview preparation reports.
          </h2>

          <p className="text-slate-500 text-[15px] leading-7 mt-5 max-w-2xl">
            Access previous analyses, review skill gaps,
            and continue improving your interview preparation.
          </p>

        </div>

        
        <div className="space-y-5">

          {demoReports.map((report, index) => (
            <div
              key={report._id}
              className="group bg-white/90 backdrop-blur border border-slate-200 rounded-[28px] p-6 md:p-7 shadow-[0_4px_30px_rgba(15,23,42,0.03)] hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-300"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                
                <div className="flex gap-5">

                  
                  <div className="hidden md:flex w-12 h-12 rounded-2xl bg-cyan-50 items-center justify-center text-cyan-700 font-semibold shrink-0">
                    0{index + 1}
                  </div>

                  
                  <div>

                    
                    <div className="flex flex-wrap items-center gap-3 mb-4">

                      <div className="flex items-center gap-2 text-xs font-medium text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-full">

                        <Sparkles className="w-3.5 h-3.5" />

                        AI Generated

                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">

                        <Clock3 className="w-3.5 h-3.5" />

                        {report.createdAt}

                      </div>

                    </div>

                    
                    <h3 className="text-[22px] leading-tight font-semibold tracking-tight text-slate-900">
                      {report.title}
                    </h3>

                    
                    <div className="flex items-center gap-3 mt-4">

                      <div className="h-2 w-28 rounded-full bg-slate-100 overflow-hidden">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-teal-500"
                          style={{
                            width: `${report.matchScore}%`,
                          }}
                        />

                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {report.matchScore}% Match
                      </span>

                    </div>

                    
                    <div className="flex flex-wrap gap-2 mt-5">

                      {report.skillGaps.map((skill) => (
                        <div
                          key={skill}
                          className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                        >
                          {skill}
                        </div>
                      ))}

                    </div>

                  </div>

                </div>

               
                <div className="flex items-center">

                  <button
                    onClick={() => router.push("/results")}
                    className="group/button flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-cyan-700 transition"
                  >
                    View Report

                    <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  )
}



function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
        ${
          active
            ? "bg-cyan-50 text-cyan-700 font-medium"
            : "text-slate-600 hover:bg-slate-100"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}