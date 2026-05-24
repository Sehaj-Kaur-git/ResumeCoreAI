"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronDown,
  ChevronUp,
  Code2,
  Brain,
  Target,
  Map,
  ArrowLeft,
} from "lucide-react"



export default function ResultPage() {
  const [report, setReport] = useState<any>(null)
  const router = useRouter()
  const [openTech, setOpenTech] = useState<number | null>(0)
  const [openBehavioral, setOpenBehavioral] = useState<number | null>(0)
  const [openRoadmap, setOpenRoadmap] = useState<number | null>(0)

  useEffect(() => {
    const stored = localStorage.getItem("report")

    if (stored) {
  setReport(JSON.parse(stored))
}
  }, [])

  if (!report) return null

  return (
    <div className="min-h-screen bg-[#f5f8f8] text-slate-900 px-4 md:px-8 py-6 md:py-10">

      <div className="max-w-7xl mx-auto">

        

        <div className="flex items-center justify-between mb-6 md:mb-8">

          <div className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 text-slate-700" />

            <h1 className="text-lg md:text-2xl font-semibold tracking-tight">
              Interview Report
            </h1>
          </div>

          <button 
            onClick={() => router.push("/dashboard")}
            className="bg-[#0f766e] hover:bg-[#115e59] transition text-white text-sm px-4 py-2 rounded-xl"
          >
            New Analysis
          </button>
        </div>

       

        <div className="bg-[#f8fcfc] border border-slate-200 rounded-[28px] p-6 md:p-10 flex flex-col lg:flex-row justify-between gap-10 mb-8">

          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.18em] text-[#0f766e] mb-4">
              AI Generated Report
            </p>

            <h2 className="text-3xl md:text-5xl leading-[1.05] tracking-[-0.04em] font-semibold mb-5">
              {report.title}
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
              Personalized interview preparation roadmap based on your
              resume, job role and skills.
            </p>

          </div>

          

          <div className="flex items-center justify-center">

            <div className="w-[220px] h-[220px] rounded-full border-[10px] border-[#138a7c] border-t-[#88c5c0] flex flex-col items-center justify-center bg-white">

              <h3 className="text-5xl font-semibold tracking-tight">
                {report.matchScore}
                <span className="text-2xl">%</span>
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Match Score
              </p>

              <p className="text-[#0f766e] text-sm mt-1">
                Great Match!
              </p>
            </div>
          </div>
        </div>

        

        <SectionWrapper
          icon={<Code2 className="w-5 h-5" />}
          title="Technical Questions"
          subtitle="Key technical questions you might encounter in your interview."
          count={`${report.technicalQuestions.length} Questions`}
        >

          {report.technicalQuestions.map((item: any, index: number) => {
            const isOpen = openTech === index

            return (
              <Accordion
                key={index}
                index={index}
                title={item.question}
                isOpen={isOpen}
                onClick={() =>
                  setOpenTech(isOpen ? null : index)
                }
              >

                <AccordionContent
                  heading="Why interviewer asks this"
                  content={item.intention}
                />

                <AccordionContent
                  heading="Answer strategy"
                  content={item.answer}
                />

              </Accordion>
            )
          })}
        </SectionWrapper>

        

        <SectionWrapper
          icon={<Brain className="w-5 h-5" />}
          title="Behavioral Questions"
          subtitle="Behavioral questions to help you prepare your responses."
          count={`${report.behavioralQuestions.length} Questions`}
        >

          {report.behavioralQuestions.map(
            (item: any, index: number) => {
              const isOpen = openBehavioral === index

              return (
                <Accordion
                  key={index}
                  index={index}
                  title={item.question}
                  isOpen={isOpen}
                  onClick={() =>
                    setOpenBehavioral(
                      isOpen ? null : index
                    )
                  }
                >

                  <AccordionContent
                    heading="Why interviewer asks this"
                    content={item.intention}
                  />

                  <AccordionContent
                    heading="Answer strategy"
                    content={item.answer}
                  />

                </Accordion>
              )
            }
          )}
        </SectionWrapper>

        

        <SectionWrapper
          icon={<Target className="w-5 h-5" />}
          title="Skill Gaps"
          subtitle="Areas where you can focus more to strengthen your profile."
          count={`${report.skillGaps.length} Skills Identified`}
        >

          <div className="flex flex-wrap gap-3 pt-2">

            {report.skillGaps.map((item: any, index: number) => {

              const severityStyles = {
                high: "bg-red-50 text-red-600 border-red-200",
                medium:
                  "bg-yellow-50 text-yellow-700 border-yellow-200",
                low: "bg-green-50 text-green-700 border-green-200",
              }

              return (
                <div
                  key={index}
                  className={`px-4 py-3 rounded-2xl border text-sm flex items-center gap-3 ${severityStyles[item.severity as keyof typeof severityStyles]}`}
                >
                  <span>{item.skill}</span>

                  <span className="text-xs font-medium capitalize">
                    • {item.severity}
                  </span>
                </div>
              )
            })}
          </div>
        </SectionWrapper>

        

        <SectionWrapper
          icon={<Map className="w-5 h-5" />}
          title="Preparation Roadmap"
          subtitle="Your 7-day personalized preparation plan."
        >

          <div className="relative ml-3">

            <div className="absolute left-[9px] top-0 bottom-0 w-[2px] bg-[#8fd5cd]" />

            <div className="space-y-4">

              {report.preparationPlan.map(
                (item: any, index: number) => {

                  const isOpen = openRoadmap === index

                  return (
                    <div
                      key={index}
                      className="relative pl-10"
                    >

                      <div className="absolute left-0 top-6 w-5 h-5 rounded-full bg-[#0f766e]" />

                      <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">

                        <button
                          onClick={() =>
                            setOpenRoadmap(
                              isOpen ? null : index
                            )
                          }
                          className="w-full flex items-center justify-between px-5 py-4 text-left"
                        >

                          <div className="flex items-center gap-4 flex-wrap">

                            <span className="bg-[#d8f1ee] text-[#0f766e] text-sm px-3 py-1 rounded-full font-medium">
                              Day {item.day}
                            </span>

                            <h3 className="text-sm md:text-base font-medium">
                              {item.focus}
                            </h3>
                          </div>

                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5">

                            <div className="space-y-3">

                              {item.tasks.map(
                                (
                                  task: string,
                                  taskIndex: number
                                ) => (
                                  <div
                                    key={taskIndex}
                                    className="flex gap-3 text-sm text-slate-600 leading-relaxed"
                                  >

                                    <div className="w-2 h-2 rounded-full bg-[#0f766e] mt-2" />

                                    <p>{task}</p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  )
}



function SectionWrapper({
  icon,
  title,
  subtitle,
  count,
  children,
}: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-[28px] p-5 md:p-8 mb-8 shadow-sm">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div className="flex items-start gap-4">

          <div className="w-11 h-11 rounded-2xl bg-[#e6f6f3] flex items-center justify-center text-[#0f766e] shrink-0">
            {icon}
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              {title}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          </div>
        </div>

        {count && (
          <p className="text-sm text-[#0f766e] font-medium">
            {count}
          </p>
        )}
      </div>

      {children}
    </div>
  )
}

function Accordion({
  index,
  title,
  children,
  isOpen,
  onClick,
}: any) {
  return (
    <div className="border-t border-slate-200">

      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >

        <div className="flex gap-4 items-start">

          <p className="text-[#0f766e] text-sm font-semibold pt-1 min-w-[32px]">
            {String(index + 1).padStart(2, "0")}
          </p>

          <h3 className="text-sm md:text-base font-medium leading-relaxed">
            {title}
          </h3>
        </div>

        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="pb-6 pl-12 space-y-6">
          {children}
        </div>
      )}
    </div>
  )
}

function AccordionContent({
  heading,
  content,
}: any) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.14em] text-[#0f766e] font-semibold mb-3">
        {heading}
      </h4>

      <p className="text-sm text-slate-600 leading-7">
        {content}
      </p>
    </div>
  )
}