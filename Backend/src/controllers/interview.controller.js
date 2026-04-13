const pdfExtractor = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

console.log("--- LOADED interview.controller.js ---");

async function generateInterviewReportController(req, res) {
    try {
        console.log("DEBUG: Calling extractor with buffer length:", req.file ? req.file.buffer.length : "NO FILE");

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: "No PDF file uploaded" });
        }

        const { selfDescription, jobDescription } = req.body;

        const pdfData = await pdfExtractor(req.file.buffer);
        const resumeText = pdfData.text;

        console.log("DEBUG: Extracted text length:", resumeText.length);

        const aiReport = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
        });


        res.status(200).json({
            message: "Report generated successfully",
            interviewReport: aiReport,
        });

    } catch (err) {
        console.error("CONTROLLER ERROR:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        return res.status(200).json({
            message: "DB disabled in mock mode",
            interviewReport: null
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        return res.status(200).json({
            message: "DB disabled in mock mode",
            interviewReports: []
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function generateResumePdfController(req, res) {
    try {
        return res.status(200).json({
            message: "PDF generation disabled in mock mode"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
};