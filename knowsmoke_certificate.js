'use strict';

const puppeteer = require('puppeteer');   
const fs = require('fs'); 
const express = require('express');
/*const app = express();
app.use(express.static('/Users/xiangyikong/Documents/Knowsmoke/knowsmoke certificate/assets/images'))
app.listen(3000);*/

const app = express();
const port = 8899;
app.use(express.static('/Users/xiangyikong/Documents/Knowsmoke/knowsmoke certificate/assets/images'));

var server = app.listen(port, function(err){
  if (err) console.log('Error in Webserver setup')
  console.log(`Webserver listening at http://localhost:${port}`);
});

(async() => {    
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();  

/*var contentHtml = fs.readFileSync('/Users/xiangyikong/Documents/Knowsmoke/knowsmoke certificate/2T2AZMAA4LC168142_certificate.html', 'utf8');
await page.setContent(contentHtml, { waitUntil: 'networkidle0' });*/
await page.goto('file:/Users/xiangyikong/Documents/Knowsmoke/knowsmoke certificate/2T2AZMAA4LC168142_certificate.html', { waitUntil: 'networkidle0' });
/*await page.addStyleTag({path:"/Users/xiangyikong/Documents/Knowsmoke/knowsmoke certificate/style.css"})*/
await page.pdf({
  path: 'knowsmoke certificate/2T2AZMAA4LC168142_certificate.pdf',
  format: 'Letter',
  printBackground: true,
  margin: {
        top: "20px",
        left: "20px",
        right: "20px",
        bottom: "20px"
  }    
});    
await browser.close();

await server.close(function(){
  console.log('Stopping webserver.')
});
})(server);


/*const htmlPdf = require("html-pdf");
const fs = require("fs");


function GeneratePdf(typeOfFile, filePath, fileName, toBeGeneratedFileName) 
{
  try {
    let HTMLFilePath = '.${filePath}${fileName}';
    if (!fs.existsSync(HTMLFilePath)) {
      console.log('File does not exist');
      return;
    }

    typeOfFile === "PNG"?
      toBeGeneratedFileName += ".png": toBeGeneratedFileName += ".pdf";
    const htmlContent = fs.readFileSync(HTMLFilePath, "utf8");
    const htmlToPdfOptions = {
      "type" : typeOfFile,
      "height": "650px",
      "width": "850px",
      "renderDelay": 2000,
  };
  htmlPdf.create(htmlContent, htmlToPdfOptions)
  .toFile(toBeGeneratedFileName, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })} catch (err) {
    console.log("error while converting html to pdf", err);
  }
}
/Users/xiangyikong/Documents/Knowsmoke/knowsmoke certificate/2T2AZMAA4LC168142_certificate.html
GeneratePdf("PDF", "knowsmoke certificate/", "2T2AZMAA4LC168142_certificate.html", "certificate_pdf_example");*/