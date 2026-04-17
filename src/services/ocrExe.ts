'use server';

import { spawn } from "child_process";
import path from "path";
import os from "os"
import fs from "fs/promises";
import { FileEntry } from "../types/Formats";

export const executeOCR = async (file: File, type: FileEntry) => {
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Create temp file
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `ocr_temp_${Date.now()}_${file.name}`);

    try {
        await fs.writeFile(tempFilePath, buffer);

        return new Promise((resolve, reject) => {
            const rootDir = process.cwd();
            const scriptPath = path.join(rootDir, "src", "services", "ocr_script.py");

            const pythonExe = process.platform === "win32"
                ? path.join(rootDir, "venv", "Scripts", "python.exe")
                : path.join(rootDir, "venv", "bin", "python");

            const payload = JSON.stringify({
                file: tempFilePath,
                type: type
            });

            const pythonProcess = spawn(pythonExe, [scriptPath, payload]);

            let dataBuffer = ""
            let errorBuffer = ""

            pythonProcess.stdout.on('data', (data) => {
                dataBuffer += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                errorBuffer += data.toString();
            });

            pythonProcess.on('close', async (code) => {
                try {
                    await fs.unlink(tempFilePath);
                } catch (e) {
                    console.error("Failed to delete temp file:", e);
                }

                if (code !== 0) {
                    reject(new Error(`Python error (Code ${code}): ${errorBuffer}`));
                    return;
                }

                try {
                    const resultado = JSON.parse(dataBuffer);
                    resolve(resultado);
                } catch (e) {
                    reject(new Error("Failed to parse Python output: " + dataBuffer));
                }
            });
        })
    } catch (error) {
        // Clean up temp file on error
        try {
            await fs.unlink(tempFilePath);
        } catch (e) {
            // Ignore cleanup errors
        }
        throw error;
    }
}