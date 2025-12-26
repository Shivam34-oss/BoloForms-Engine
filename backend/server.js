const express = require('express');
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/sign-pdf', async (req, res) => {
    try {
        const { xPercent, yPercent, signatureImage } = req.body;

        // original pdf ko hash nikalana 
        const pdfPath = path.join(__dirname, 'sample.pdf'); 
        const existingPdfBytes = fs.readFileSync(pdfPath);
        
        //  Signing Hash ke baad
        const beforeHash = crypto.createHash('sha256').update(existingPdfBytes).digest('hex');

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

      
        const x = (xPercent / 100) * width;
       
        const y = height - ((yPercent / 100) * height) - 50; 

       
        const sigImage = await pdfDoc.embedPng(signatureImage.split(',')[1]);
        const dims = sigImage.scaleToFit(100, 50); 

        firstPage.drawImage(sigImage, {
            x: x,
            y: y,
            width: dims.width,
            height: dims.height,
        });

        //  Final Save aur After-Signing Hash
        const signedPdfBytes = await pdfDoc.save();
        const afterHash = crypto.createHash('sha256').update(signedPdfBytes).digest('hex');

        res.json({
            success: true,
            hash: afterHash,
            beforeHash: beforeHash,
            pdf: Buffer.from(signedPdfBytes).toString('base64')
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Backend Processing Error");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
