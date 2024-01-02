const pdfKit = require('pdfkit');
const fs = require('fs');
var path = require('path');

const pdfMaker = (data, res) => {
  let companyLogo = path.resolve(appRoot, 'public', 'logo', 'CompanyLogo.jpeg');
  let fileName = path.resolve(appRoot, 'pdfs', 'sample.pdf');
  let fontNormal = 'Helvetica';
  let fontBold = 'Helvetica-Bold';

  let sellerInfo = {
    companyName: 'INDIAN ROBOTICS SOLUTION PRIVATE LIMITED',
    address: 'G 36 3rd Floor Sector 3 Nearest Metro',
    city: 'Noida',
    state: 'Uttarpradesh',
    pincode: '201301',
    country: 'India',
    contactNo: '+910000000600',
  };

  let footer = 'Thank You for using IRS Services';

  try {
    let pdfDoc = new pdfKit({ bufferPages: true });
    let buffers = [];

    //////
    pdfDoc.on('data', buffers.push.bind(buffers));
    pdfDoc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=test.pdf',
        })
        .end(pdfData);
    });

    pdfDoc.image(companyLogo, 10, 10, { width: 200, height: 120 });

    pdfDoc
      .font(fontNormal)
      .text(sellerInfo.companyName, 225, 40, { width: 350 });
    pdfDoc.text(sellerInfo.address, 225, 60, { width: 320 });
    pdfDoc.text(sellerInfo.city + ' ' + sellerInfo.pincode, 225, 80, {
      width: 250,
    });
    pdfDoc.text(sellerInfo.state + ' ' + sellerInfo.country, 225, 100, {
      width: 250,
    });
    pdfDoc
      .fontSize(15)
      .text(`Date ${JSON.stringify(data.createdAt).slice(1, 11)}`, 10, 170, {
        width: 320,
      });

    pdfDoc
      .font(fontBold)
      .fontSize(20)
      .text(`Ticket-Id : ${data.TicketId}`, 200, 180, { width: 320 });

    pdfDoc
      .font(fontNormal)
      .fontSize(15)
      .text(
        `Dear ${data.CustomerName} Your service request for model ${data.DroneModel} request has been registered with the following details :-`,
        10,
        220,
        { width: 400 }
      );
    pdfDoc.text(`Email`, 10, 280, { width: 50 });
    pdfDoc.text(`${data.Email}`, 170, 280, { width: 320 });
    pdfDoc.text(`-`, 115, 280, { width: 5 });
    pdfDoc.text(`-`, 115, 300, { width: 5 });
    pdfDoc.text(`-`, 115, 320, { width: 5 });
    pdfDoc.text(`-`, 115, 340, { width: 5 });
    pdfDoc.text(`-`, 115, 360, { width: 5 });
    pdfDoc.text(`-`, 115, 380, { width: 5 });
    pdfDoc.text(`-`, 115, 400, { width: 5 });

    pdfDoc.text(`Mobile                            ${data.Mobile}`, 10, 300, {
      width: 320,
    });
    pdfDoc.text(`Pincode                          ${data.Pincode}`, 10, 320, {
      width: 320,
    });
    pdfDoc.text(`Address`, 10, 340, { width: 100 });
    pdfDoc.text(`${data.Address}`, 170, 340, { width: 400 });
    pdfDoc.text(
      `District                            ${data.District}`,
      10,
      360,
      { width: 320 }
    );
    pdfDoc.text(`State                               ${data.State}`, 10, 380, {
      width: 320,
    });
    pdfDoc.text(`Whatsapp                       ${data.Whatsapp}`, 10, 400, {
      width: 320,
    });
    pdfDoc.text(`HardwareIssue`, 10, 440, { width: 120 });
    pdfDoc.text(`${data.HardwareIssue}`, 150, 440, { width: 450 });
    pdfDoc.text(`SoftwareIssue`, 10, 520, { width: 120 });
    pdfDoc.text(`${data.SoftwareIssue}`, 150, 520, { width: 320 });
    pdfDoc.fontSize(20).font(fontBold).text(footer, 160, 600, { width: 320 });

    pdfDoc.end();
    console.log('pdf generate successfully');
  } catch (error) {
    console.log('Error occurred', error);
  }
};
