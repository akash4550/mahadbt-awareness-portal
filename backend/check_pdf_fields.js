const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

async function getPdfFields() {
    try {
        const templatePath = path.join(__dirname, './assets/consent-form-template.pdf');
        const pdfBytes = await fs.readFile(templatePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        console.log('--- Found PDF Form Fields ---');
        fields.forEach(field => {
            const type = field.constructor.name;
            const name = field.getName();
            console.log(`${type}: '${name}'`);
        });
        console.log('-----------------------------');
        console.log("Copy the exact field name for 'Name' and paste it into routes/form.js");

    } catch (err) {
        console.error('Error checking PDF fields:', err.message);
    }
}

getPdfFields();