import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generatePDFLocally = async (data) => {
  const templatePath = path.join(__dirname, "../templates/rentAggrement.template.ejs");
  const html = await ejs.renderFile(templatePath, data);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const fileName = `rent-agreement-${uuidv4()}.pdf`;
  const outputPath = path.join(__dirname, `../public/temp/${fileName}`);

  await page.pdf({ path: outputPath, format: "A4", printBackground: true });
  await browser.close();

  return outputPath; // return local path to use later
};