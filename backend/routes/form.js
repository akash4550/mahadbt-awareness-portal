const express = require('express');
const router = express.Router();
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/generate', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');
        
        const templatePath = path.join(__dirname, '../assets/consent-form-template.pdf');
        const pdfBytes = await fs.readFile(templatePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        const page = pdfDoc.getPages()[0];
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        
        
        
        const filledPdfBytes = await pdfDoc.save();
        
        user.progress.hasGeneratedForm = true;
        await user.save();
        
        res.setHeader('Content-Disposition', 'attachment; filename="filled-consent-form.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(Buffer.from(filledPdfBytes));
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;