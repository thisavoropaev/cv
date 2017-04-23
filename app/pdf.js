const fs = require('fs');
const path = require('path');
const htmlPdf = require('html-pdf');
const pdfConfig = require('../pdf.config');

const htmlSourceUrl = path.join(pdfConfig.base, pdfConfig.filename.html);
const htmlSourceFile = fs.readFileSync(htmlSourceUrl, 'utf8');

htmlPdf.create(htmlSourceFile, pdfConfig.page).toFile(path.join(pdfConfig.base, pdfConfig.filename.pdf), function(err, res) {
  if (err) return console.log(err);

	fs.unlink(htmlSourceUrl);
  console.log(`PDF was created successfully: ${res.filename}`);
});
