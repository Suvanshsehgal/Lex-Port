import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generatePDFLocally = async (data) => {
  const { DocumentType } = data;

  if (!DocumentType) {
    throw new Error("DocumentType is required for PDF generation.");
  }

  let templateFile;
  let fileName;

  switch (DocumentType) {
    case "RentAgreement":
      templateFile = "rentAggrement.template.ejs";
      fileName = `rent-agreement-${uuidv4()}.pdf`;
      break;
    case "NdaAgreement":
      templateFile = "ndaAggrement.template.ejs";
      fileName = `nda-${uuidv4()}.pdf`;
      break;
    case "FreelanceAgreement":
      templateFile = "freelanceAgreement.template.ejs";
      fileName = `freelance-aggrement-${uuidv4()}.pdf`;
      break;
    case "PartnershipAgreement":
      templateFile = "partnershipAgreement.template.ejs";
      fileName = `partnership-aggrement-${uuidv4()}.pdf`;
      break;
    default:
      throw new Error(`Unsupported DocumentType: ${DocumentType}`);
  }

  const templatePath = path.join(__dirname, `../templates/${templateFile}`);
  const html = await ejs.renderFile(templatePath, data);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const outputPath = path.join(__dirname, `../public/temp/${fileName}`);
  await page.pdf({ path: outputPath, format: "A4", printBackground: true });

  await browser.close();
  
  return outputPath;
};
