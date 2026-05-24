"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  Trash2,
  Shield,
  ChevronRight,
} from "lucide-react"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    
    console.log("logout")
  }

  const handleDeleteHistory = () => {
   
    console.log("delete history")
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
              <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
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

            <Link href="/dashboard">
              <SidebarItem
                icon={<LayoutDashboard className="w-5 h-5" />}
                label="Dashboard"
              />
            </Link>

            <Link href="/history">
              <SidebarItem
                icon={<History className="w-5 h-5" />}
                label="History"
              />
            </Link>

            <SidebarItem
              icon={<Settings className="w-5 h-5" />}
              label="Settings"
              active
            />

          </div>

        </div>

        
        <div className="p-4 border-t border-slate-100">

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white font-semibold">
              S
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">
                Sehaj
              </p>

              <p className="text-xs text-slate-500">
                sehaj@email.com
              </p>
            </div>

          </div>

        </div>

      </aside>

      
      <div className="min-h-screen">

        
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">

          <div className="h-[88px] px-5 md:px-10 flex items-center justify-between">

           
            <div className="flex items-center gap-4">

              <button
                onClick={() => setSidebarOpen(true)}
                className="w-11 h-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition"
              >
                <Menu className="w-6 h-6 text-slate-700" />
              </button>

              <div>
                <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
                  Settings
                </h1>

                <p className="text-sm text-slate-500 mt-0.5">
                  Manage your account
                </p>
              </div>

            </div>

          </div>

        </header>

        
        <main className="max-w-4xl mx-auto px-5 md:px-8 py-10">

          
          <section className="max-w-2xl">

            <div className="flex items-center gap-2 text-cyan-700 text-xs tracking-[0.22em] uppercase font-semibold mb-4">

              <div className="w-2 h-2 rounded-full bg-cyan-600" />

              Account Settings

            </div>

            <h2 className="text-[24px] md:text-[30px] leading-[1.1] tracking-tight font-semibold text-slate-900">
              Manage your ResumeCore account
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              View your account details, clear saved reports,
              and securely logout from your account.
            </p>

          </section>

          
          <div className="space-y-5 mt-10">

           
            <div className="bg-white border border-slate-200 rounded-[26px] p-5 shadow-sm">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-700" />
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold tracking-tight">
                    Account
                  </h3>

                  <p className="text-sm text-slate-500">
                    Your account information
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <SettingRow
                  title="Username"
                  value="Sehaj"
                />

                <SettingRow
                  title="Email"
                  value="sehaj@email.com"
                />

              </div>

            </div>

            
            <div className="bg-white border border-slate-200 rounded-[26px] p-5 shadow-sm">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold tracking-tight">
                    Actions
                  </h3>

                  <p className="text-sm text-slate-500">
                    Manage your saved data
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                
                <button
                  onClick={handleDeleteHistory}
                  className="w-full flex items-center justify-between rounded-2xl border border-slate-200 hover:border-red-200 hover:bg-red-50/40 px-5 py-4 transition"
                >

                  <div className="text-left">
                    <p className="text-[15px] font-medium text-slate-800">
                      Delete Interview History
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Remove all saved interview reports
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400" />

                </button>

                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between rounded-2xl border border-slate-200 hover:bg-slate-50 px-5 py-4 transition"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-slate-700" />
                    </div>

                    <div className="text-left">
                      <p className="text-[15px] font-medium text-slate-800">
                        Logout
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Sign out from your account
                      </p>
                    </div>

                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400" />

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

function SettingRow({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border border-slate-200 rounded-2xl px-5 py-4">

      <p className="text-[15px] text-slate-600">
        {title}
      </p>

      <p className="text-[15px] font-medium text-slate-800">
        {value}
      </p>

    </div>
  )
}