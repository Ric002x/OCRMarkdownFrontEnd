'use client';

import { FileInput } from "../components/Layouts/Transcription/FileInput"
import { Viewer } from "../components/Layouts/Transcription/Viewer"
import { TextTranscripted } from "../components/Layouts/Transcription/TextTranscripted"
import { useFileStore } from "../lib/stores/file.store";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const Page = () => {
    const { showViewer, file } = useFileStore()

    return (
        <div className={`flex h-full gap-10 ${!file ? "items-center min-[900px]:justify-center max-[900px]:flex-col-reverse" : "items-start flex-wrap justify-center"}`}>
            <FileInput classname="animate-fade-up" />
            {file ?
                <TextTranscripted classname="w-160 animate-fade-up" />
                :
                <div className="space-y-6 text-center md:text-left max-w-120 animate-fade-up">
                    <span className="inline-flex items-center text-[11px] uppercase text-primary gap-2">
                        <span className="block w-4.5 h-[1.5px] bg-primary rounded-[2px]"></span>
                        Powered by IA
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                        Sua imagem/PDF em <span className="text-emerald-500">texto</span> com um clique.
                    </h2>
                    <p className="text-lg text-black/40 dark:text-white/40">
                        Utilizamos inteligência artificial para transcrever textos de imagens e PDF.
                    </p>
                    <div className="flex gap-4 items-center">
                        <Button className="bg-black dark:bg-white hover:bg-black/60 dark:hover:bg-white/60 text-white dark:text-black rounded-full"><Upload size={20} className="stroke-white dark:stroke-black" /> Enviar arquivo</Button>
                        <p className="text-[12px] text-black/60 dark:text-white/60">suporta <span className="font-bold">PNG, JPG, PDF</span></p>
                    </div>
                </div>
            }
            {showViewer && <Viewer classname="w-160 animate-fade-up" />}
        </div>
    )
}

export default Page
