const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});




const interviewReportSchema = z.object({
    title: z.string(),

    matchScore: z.number(),

    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"])
    })),

    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    }))
});




async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


const prompt = `
You are an elite FAANG-level interview coach.

Analyze the candidate using:

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON.

STRICT FORMAT (DO NOT BREAK THIS):

{
  "title": "string",
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low | medium | high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": "string",
      "tasks": ["string"]
    }
  ]
}

Rules:
- Always return arrays of OBJECTS
- Never return plain strings like "question", "answer"
- Minimum:
  - 5 technical questions
  - 3 behavioral questions
  - 3 skill gaps
  - 7-day plan
`;



    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema),
            }
        });

        return JSON.parse(response.text);

    } catch (error) {
        console.error("AI ERROR:", error.message);

        
        return {

             title: "Full Stack Developer",
             matchScore: 80,
             technicalQuestions: [
             {
              question: "Explain closures in JavaScript",
              intention: "Check JS fundamentals",
              answer: "Closures allow access to outer scope variables",
            },
            ],
             behavioralQuestions: [
            {
             question: "Tell me about yourself",
             intention: "Communication",
             answer: "Give concise summary",
             },
            ],
            skillGaps: [
             { skill: "System Design", severity: "medium" },
             { skill: "Cloud Computing", severity: "high" },
             { skill: "Behavioral Interviewing", severity: "low" },
            ],
          preparationPlan: [
            {
             day: 1,
             focus: "DSA",
             tasks: ["Solve problems"],
          },
         ],
         };
        
    }
}




async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        return await page.pdf({
            format: "A4",
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });
    } finally {
        await browser.close();
    }
}




async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumeSchema = z.object({
        html: z.string()
    });

    const prompt = `
Create a PROFESSIONAL, ATS-FRIENDLY resume.

INPUT:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

RULES:
- Return ONLY JSON: { "html": "..." }
- Keep it clean and minimal
- No AI tone
- Highlight relevant skills
- Max 1–2 pages
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumeSchema),
        }
    });

    const parsed = JSON.parse(response.text);

    return await generatePdfFromHtml(parsed.html);
}


module.exports = {
    generateInterviewReport,
    generateResumePdf
};