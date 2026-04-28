'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFileStore } from "@/src/lib/stores/file.store";
import { FilePen, NotebookPen, RefreshCcw, Triangle } from "lucide-react";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { generatePDF } from "@/src/services/convertPDF";
import { createWorker } from "tesseract.js";
import { FileEntry } from "@/src/types/Formats";
import { useTheme } from "next-themes";
import { useEffect } from "react";



export const TextTranscripted = ({ classname }: { classname: string }) => {
    const {
        file, fileUrl, transcription, lastEdit, isTranscripted, isLoading, transcriptTo,
        setIsLoading, setFile, setFileUrl, setTranscription, setLastEdit, setIsTranscripted, setShowViewer, setTranscriptTo
    } = useFileStore()
    const { theme } = useTheme()

    const handleCancelTranscription = () => {
        setFile(null)
        setFileUrl("")
        setTranscription("")
        setLastEdit(null)
        setIsTranscripted(false)
        setShowViewer(false)
        setIsLoading(false)

        window.scrollTo({ top: 0 })
    }

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTranscription(e.target.value)
        setLastEdit(new Date())
    }

    const handleExecTranscription = async (transcriptTo: FileEntry) => {
        if (!file) return;
        setIsLoading(true)

        if (transcriptTo === "txt") {
            const worker = await createWorker(["eng", "por"]);
            const ret = await worker.recognize(fileUrl)
            await worker.terminate()

            setTranscription(ret.data.text)
            setIsLoading(false)
            setShowViewer(false)
            setIsTranscripted(true)
        } else {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch('ocrmarkdownbackend-production.up.railway.app/ocr', {
                    method: "POST",
                    body: formData
                })

                if (!response.ok) {
                    toast.error('Erro ao enviar arquivo. ' + "Erro: " + response.status);
                }

                const data = await response.json()
                setTranscription(data.content);
                setIsTranscripted(true)
                setLastEdit(new Date())
                setShowViewer(true)
            } catch (err) {

            } finally {
                setIsLoading(false);
            }
        }
        setTranscriptTo(transcriptTo)
    }

    const handleDownload = async (downloadIn: "html" | "pdf" | "md") => {
        if (transcriptTo === "txt") return;
        setIsLoading(true);

        try {
            if (downloadIn === "pdf") {
                const result = await generatePDF(transcription, transcriptTo);
                if (!result.success || !result.data) {
                    toast.error("Erro ao gerar PDF");
                    return;
                }
                const blob = new Blob([new Uint8Array(result.data)], { type: 'application/pdf' });
                downloadFile(blob, `transcricao-${Date.now()}.pdf`);
            } else {
                const type = downloadIn === "html" ? "text/html" : "text/markdown"
                const blob = new Blob([transcription], { type });
                downloadFile(blob, `transcricao-${Date.now()}.${downloadIn}`);
            }
        } catch (error) {
            toast.error(`Erro ao gerar arquivo: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadFile = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <section className={cn("bg-foreground h-150 flex flex-col shadow-md border border-black/10 dark:border-white/10", classname)}>
            <div className="p-4 flex justify-between items-center">
                <h2 className="font-semibold flex items-center gap-2">
                    <FilePen size={18} className="text-primary" />
                    Editor de Texto
                </h2>
                <span className="text-[11px] dark:text-slate-300 text-slate-600">Última alteração: {lastEdit?.toLocaleTimeString('pt-br')}</span>
            </div>

            <div className="bg-chat flex flex-1">
                {isLoading ?
                    <div className="w-full flex items-center justify-center"><div className="loader w-12 h-12"></div></div> :
                    <textarea
                        className={`grow w-full p-8 bg-text text-slate-800 dark:text-slate-300 leading-relaxed resize-none focus:outline-none focus:ring-0 text-lg max-[600px]:text-[14px] font-light ${!isTranscripted && "cursor-not-allowed"}`}
                        placeholder="O texto transcrito aparecerá aqui."
                        onChange={handleChangeText}
                        value={transcription}
                        disabled={!isTranscripted}
                    ></textarea>
                }

            </div>

            <div className="p-4 flex flex-wrap gap-4 items-center justify-between">

                <div className="flex gap-4 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="font-bold text-[14px]" variant="default">Transcrever <Triangle fill={theme === "dark" ? "#000" : "#fff"} color={theme === "dark" ? "#000" : "#fff"} className="rotate-180 size-3" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-primary font-bold">Trascrever para:</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleExecTranscription("md")}>Markdown</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExecTranscription("html")}>HTML</DropdownMenuItem>
                                {file?.type.startsWith("image/") && <DropdownMenuItem onClick={() => handleExecTranscription("txt")}>Text</DropdownMenuItem>}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Button onClick={handleCancelTranscription} variant={"default"} className="px-4 py-2 text-xs font-bold bg-transparent text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                        Resetar
                    </Button>
                </div>

                {isTranscripted ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="font-bold text-[14px] bg-[#141415] hover:bg-[#313134] dark:bg-[#F8FAFC] dark:hover:bg-[#d2d7dc]" variant="default">Download
                                <Triangle fill={theme === "dark" ? "#000" : "#fff"} color={theme === "dark" ? "#000" : "#fff"} className="rotate-180 size-3" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-primary font-bold">Baixar em:</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleDownload("md")}>Markdown</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload("html")}>HTML</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload("pdf")}>PDF</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    : ""}
            </div>
        </section>
    )
}