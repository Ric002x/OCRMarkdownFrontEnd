'use server';

import { marked } from "marked";
import puppeteer from "puppeteer"

export const generatePDF = async (content: string, format: "html" | "md") => {
    try {
        const html = format === "html" ? content : await marked(content)

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" })

        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: '20mm',
                bottom: '20mm',
                left: '20mm',
                right: '20mm'
            },
            printBackground: true
        })

        await browser.close();

        return {
            success: true,
            data: Array.from(pdfBuffer)
        };

    } catch (err) {
        return {
            success: false,
            message: err instanceof Error ? err.message : 'Erro ao gerar PDF'
        }
    }
}
