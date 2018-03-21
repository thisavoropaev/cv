const fs = require('fs');
const path = require('path');
const htmlPdf = require('html-pdf');
const cvConfig = require('../cv.config');

const htmlSourceUrl = path.join(cvConfig.base, cvConfig.name.htmlToPdf);
const htmlResultUrl = path.join(cvConfig.base, 'index.html');
const htmlSourceFile = fs.readFileSync(htmlSourceUrl, 'utf8');

htmlPdf
  .create(htmlSourceFile, cvConfig.pageSizes)
  .toFile(path.join(cvConfig.base, cvConfig.name.pdf), function(err, res) {
    if (err) return console.log(err);

    fs.unlink(htmlSourceUrl, function (err) {
      if (err) console.log('ERROR: ' + err);
    });

    console.log(`PDF was created successfully: ${res.filename}`);
});
