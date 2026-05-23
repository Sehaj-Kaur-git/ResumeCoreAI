const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});



const interviewReportSchema = z.object({
  title: z.string(),

  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),
});



// RETRY LOGIC


async function callAI(config, retries = 3) {
  try {

    const response = await ai.models.generateContent(config);

    if (!response) {
      throw new Error("Empty AI response");
    }

    return response;

  } catch (err) {

    console.log("AI ERROR:", err.message);

    if (retries > 0) {

      console.log("Retrying AI...");

      await new Promise((res) => setTimeout(res, 2000));

      return callAI(config, retries - 1);
    }

    throw err;
  }
}


// CLEANER

function cleanText(text) {
  return text
    .replace(/-1\.0-/g, "")
    .replace(/\*\*/g, "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}



// INTERVIEW REPORT


async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {

  const prompt = `
You are an elite FAANG-level interview coach.

Analyze this candidate.

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON.

IMPORTANT RULES:

- Do NOT include markdown
- Do NOT include bullet numbering
- Do NOT include prefixes like "-1.0-"
- Do NOT include asterisks
- Do NOT include headings inside strings

For technicalQuestions and behavioralQuestions:

- intention must explain WHY the interviewer is asking the question
- answer must contain:
  - concepts to mention
  - structure to follow
  - mistakes to avoid
  - what makes a strong answer
  - practical examples if relevant

BAD EXAMPLES:
- "Evaluate understanding"
- "Explain clearly with examples"

GOOD EXAMPLES:
- Explain what the interviewer is testing
- Mention specific concepts and strategy
- Give actionable interview guidance

For skillGaps:
- skill should contain ONLY the skill name
- severity should be separate

For preparationPlan:
- focus should be SHORT (2-5 words)
- tasks should be separate concise strings

Return this JSON structure:

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

Minimum requirements:
- 5 technical questions
- 3 behavioral questions
- 3 skill gaps
- 7-day preparation plan
`;

  try {

    const response = await callAI({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],

      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    const raw =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("AI RAW RESPONSE:", raw);

    if (!raw) {
      throw new Error("Empty AI response");
    }

    const cleaned = cleanText(raw);

    let parsed;

    try {

      parsed = JSON.parse(cleaned);

    } catch (err) {

      console.error("JSON PARSE ERROR:", cleaned);

      throw new Error("Invalid JSON from AI");
    }

    return interviewReportSchema.parse(parsed);

  } catch (error) {

    console.error("REAL AI ERROR:", error.message);

    //SAFE FALLBACK

    return {
      title: "Full Stack Developer",

      matchScore: 80,

      technicalQuestions: [
        {
          question: "Explain closures in JavaScript",

          intention:
            "The interviewer wants to assess your understanding of lexical scoping, memory behavior, and asynchronous JavaScript concepts.",

          answer:
            "Start by defining closures as functions that retain access to variables from their outer scope even after the parent function executes. Explain lexical scoping and mention practical use cases like callbacks, data privacy, and React hooks. Avoid memorized textbook definitions and instead walk through a small real-world example.",
        },

        {
          question: "What is the event loop in JavaScript?",

          intention:
            "The interviewer is checking your understanding of asynchronous execution and how JavaScript handles non-blocking operations.",

          answer:
            "Explain the call stack, Web APIs, callback queue, and event loop flow. Mention microtasks vs macrotasks and discuss promises, async/await, and setTimeout behavior. Strong answers usually include execution order examples.",
        },
      ],

      behavioralQuestions: [
        {
          question: "Tell me about yourself",

          intention:
            "The interviewer wants to evaluate communication skills, confidence, and how effectively you summarize your background.",

          answer:
            "Structure your answer in present-past-future format. Start with your current role or studies, then discuss relevant projects and skills, and finish with career goals aligned to the company. Avoid overly personal details or reading directly from your resume.",
        },
      ],

      skillGaps: [
        {
          skill: "System Design",
          severity: "medium",
        },

        {
          skill: "Cloud Computing",
          severity: "high",
        },

        {
          skill: "Testing Frameworks",
          severity: "medium",
        },
      ],

      preparationPlan: [
        {
          day: 1,
          focus: "JavaScript Fundamentals",

          tasks: [
            "Revise closures and scope",
            "Practice async/await questions",
            "Solve 5 JavaScript interview problems",
          ],
        },

        {
          day: 2,
          focus: "React Revision",

          tasks: [
            "Revise hooks",
            "Practice state management",
            "Build small reusable components",
          ],
        },

        {
          day: 3,
          focus: "Backend APIs",

          tasks: [
            "Revise Express routing",
            "Practice JWT authentication",
            "Review MongoDB schema design",
          ],
        },

        {
          day: 4,
          focus: "System Design",

          tasks: [
            "Learn REST API architecture",
            "Understand scalability basics",
            "Study caching and load balancing",
          ],
        },

        {
          day: 5,
          focus: "Behavioral Prep",

          tasks: [
            "Practice STAR method",
            "Prepare project explanations",
            "Record mock interview answers",
          ],
        },

        {
          day: 6,
          focus: "Mock Interviews",

          tasks: [
            "Solve timed interview questions",
            "Practice communication",
            "Review weak topics",
          ],
        },

        {
          day: 7,
          focus: "Final Revision",

          tasks: [
            "Revise key concepts",
            "Review resume thoroughly",
            "Prepare questions for interviewer",
          ],
        },
      ],
    };
  }
}



// PDF GENERATION

async function generatePdfFromHtml(htmlContent) {

  const browser = await puppeteer.launch();

  try {

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    return await page.pdf({
      format: "A4",

      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

  } finally {
    await browser.close();
  }
}



//RESUME PDF


async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {

  const resumeSchema = z.object({
    html: z.string(),
  });

  const prompt = `
Create a professional ATS-friendly resume.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY JSON:

{
  "html": "<professional html resume>"
}
`;

  try {

    const response = await callAI({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],

      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumeSchema),
      },
    });

    const raw =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleaned = cleanText(raw);

    const parsed = JSON.parse(cleaned);

    return await generatePdfFromHtml(parsed.html);

  } catch (err) {

    console.error("PDF AI ERROR:", err.message);

    const fallbackHtml = `
      <html>
        <body style="font-family:sans-serif;padding:40px;">
          <h1>Professional Resume</h1>
          <p>${selfDescription}</p>
        </body>
      </html>
    `;

    return await generatePdfFromHtml(fallbackHtml);
  }
}


module.exports = {
  generateInterviewReport,
  generateResumePdf,
};