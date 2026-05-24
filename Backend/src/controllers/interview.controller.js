const pdfExtractor = require("pdf-parse");
const {
    generateInterviewReport,
    generateResumePdf
} = require("../services/ai.service");

const interviewReportModel = require("../models/interviewReport.model");

console.log("--- LOADED interview.controller.js ---");




async function generateInterviewReportController(req, res) {
    try {

        console.log(
            "DEBUG: Calling extractor with buffer length:",
            req.file ? req.file.buffer.length : "NO FILE"
        );

        
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                message: "No PDF file uploaded"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        
        const pdfData = await pdfExtractor(req.file.buffer);

        const resumeText = pdfData.text;

        console.log(
            "DEBUG: Extracted text length:",
            resumeText.length
        );

        
        const aiReport = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
        });

        const savedReport = await interviewReportModel.create({
            user: req.user._id,

            title: aiReport.title,
            matchScore: aiReport.matchScore,

            technicalQuestions: aiReport.technicalQuestions,
            behavioralQuestions: aiReport.behavioralQuestions,

            skillGaps: aiReport.skillGaps,
            preparationPlan: aiReport.preparationPlan,

            jobDescription,
            selfDescription,
            resume: resumeText,
        });

        
        res.status(200).json({
            message: "Report generated successfully",
            interviewReport: savedReport,
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

        const reportId = req.params.id;

        const report = await interviewReportModel.findById(reportId);

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }

        return res.status(200).json({
            message: "Report fetched successfully",
            interviewReport: report
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
}



async function getAllInterviewReportsController(req, res) {
    try {

        const reports = await interviewReportModel
            .find({
                user: req.user._id
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Reports fetched successfully",
            interviewReports: reports
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
}




async function generateResumePdfController(req, res) {
    try {

        const pdfBuffer = await generateResumePdf(req.body);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=resume.pdf",
        });

        return res.send(pdfBuffer);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
}




module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
};