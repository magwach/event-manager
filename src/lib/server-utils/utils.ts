"use server";

import path from "path";
import puppeteer from "puppeteer";
import cloudinary from "../cloudinary";
import fs from "fs";
import Handlebars from "handlebars";
import QRCode from "qrcode";


export async function generateReceipt(
  booking: any,
  user: any,
  event: any,
  totalPaid: number,
) {
  Handlebars.registerHelper("formatDate", (date: Date) =>
    new Date(date).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  );
  Handlebars.registerHelper("formatAmount", (n: number) =>
    n.toLocaleString("en-KE"),
  );

  // Generate barcode bars (decorative)
  const barcodeBars = Array.from({ length: 40 }, () => ({
    w: Math.random() > 0.5 ? 3 : 2,
    h: 16 + Math.floor(Math.random() * 24),
  }));

  const source = fs.readFileSync(
    path.join(process.cwd(), "src/lib/templates/receipt.hbs"),
    "utf-8",
  );
  const template = Handlebars.compile(source);
  const qrDataUrl = await QRCode.toDataURL(booking.receiptId, {
    width: 200,
    margin: 1,
    color: {
      dark: "#0f0f11",
      light: "#ffffff",
    },
  });
  const html = template({
    booking,
    user,
    event,
    totalPaid,
    barcodeBars,
    qrDataUrl,
  });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  const filePath = path.join(
    process.cwd(),
    `src/lib/templates/receipt-${booking.receiptId}`,
  );

  fs.writeFileSync(filePath, pdf);

  const uploadResponse = await cloudinary.uploader.upload(filePath, {
    folder: "event-manager/receipts",
    resource_type: "raw",
    type: "upload",
    access_mode: "public",
    public_id: `receipt_${booking.receiptId}`,
    overwrite: true,
  });

  fs.unlinkSync(filePath);
  return uploadResponse.secure_url;
}
