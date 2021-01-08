const fs = require('fs');
const htmlPdf = require('html-pdf');
const htmlSourceFile = fs.readFileSync('index.html', 'utf8');

htmlPdf
  .create(htmlSourceFile, {width: '980px', height: '1800px'})
  .toFile('andrei-varapayeu-cv.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(`PDF was created successfully: ${res.filename}`);
});