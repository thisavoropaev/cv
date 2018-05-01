const name = 'andrei-varapayeu';

module.exports = {
  name: {
    html: 'index.html',
    htmlToPdf: name + '-cv-html-to-pdf.html',
    pdf: name + '-cv.pdf',
    letter: name + '-cover-letter.pdf' // need to place that file to /docs
  },
  pageSizes: { // custom sizes
    'width': '1320px',
    'height': '2350px'
  },
  base: './docs'
};
