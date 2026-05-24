"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/features/auth/hooks/useAuth"

export default function UploadPage() {
  const router = useRouter()
  const { user } = useAuth()

  const [file, setFile] = useState<File | null>(null)
  const [selfDesc, setSelfDesc] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)

    // TODO: integrate with backend upload API
    setTimeout(() => {
      localStorage.setItem("reportData", "demo")
      router.push("/results")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-teal-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Upload Resume
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Upload your resume and provide context for AI analysis
          </p>
        </div>

        
        <label className="flex items-center justify-center bg-white border-2 border-dashed border-slate-300 rounded-2xl p-10 cursor-pointer hover:border-cyan-400 transition text-center">
          {file ? (
            <p className="text-green-600 font-medium">✓ {file.name}</p>
          ) : (
            <p className="text-slate-500">
              Click to upload your resume (PDF)
            </p>
          )}
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

       
        <textarea
          placeholder="Describe yourself briefly..."
          value={selfDesc}
          onChange={(e) => setSelfDesc(e.target.value)}
          rows={3}
          className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        />

        
        <textarea
          placeholder="Paste the job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows={4}
          className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        />

        
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:scale-[1.03] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

      </div>
    </div>
  )
}
