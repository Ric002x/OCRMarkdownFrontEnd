'use client';

import { cn } from "@/lib/utils"
import { useFileStore } from "@/src/lib/stores/file.store"
import { Upload } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import { toast } from "sonner"

export const FileInput = ({ classname }: { classname: string }) => {
    const { file, fileUrl, setFile, setFileUrl } = useFileStore()


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                toast.error("Arquivo grande demais")
                return
            }
            setFile(file)
            setFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        if (!file) return;

        if (!file?.type.startsWith("image/") && file?.type !== "application/pdf") {
            toast.error("Tipo de arquivo inválido")
            setFile(null)
            setFileUrl("")
            return
        }
    }, [file, fileUrl])

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            const item = (event as ClipboardEvent).clipboardData?.items[0]

            if (item?.type.indexOf("image") !== -1) {
                const blob = item?.getAsFile();
                if (blob) {
                    const file = new File([blob], "pasted-image.png", { type: blob.type });

                    if (!file?.type.startsWith("image/") && file?.type !== "application/pdf") {
                        toast.error("Tipo de arquivo inválido")
                        setFile(null)
                        setFileUrl("")
                        return
                    }

                    setFile(file);
                    setFileUrl(URL.createObjectURL(file));
                    toast.success("Imagem colada com sucesso!");
                }
            }
        }
        window.addEventListener("paste", handlePaste)

        return () => window.removeEventListener("paste", handlePaste)
    }, [])

    return (
        <section className={cn(`rounded-2xl bg-foreground min-h-100 max-w-100 flex flex-col overflow-hidden shadow-md border border-black/10 dark:border-white/10`, classname)}>
            <div className="flex p-4 justify-between items-center border-b">
                <div className="flex gap-2 items-center text-[12px]">
                    <div className="bg-primary size-2 rounded-full"></div>
                    <span className="text-black/60 dark:text-white/60">ARQUIVO ORIGINAL</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-200 text-end">{file?.name}</span>
            </div>

            <div className="bg-foreground p-8 flex flex-1">
                {fileUrl ?
                    <>
                        {
                            file?.type.startsWith("image/") ? <Image priority src={fileUrl}
                                alt="Documento enviado"
                                className="rounded-lg shadow-inner object-contain w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                                fill
                            /> :
                                <div className="flex flex-col items-center">
                                    <p>PDF selecionado</p>
                                </div>
                        }
                    </>
                    :
                    <>
                        <label htmlFor="send-file"
                            className="flex flex-1 flex-col bg-background hover:bg-primary/15 transform transition-all duration-50 rounded-xl border border-dashed border-black/10 dark:border-white/10 items-center justify-center cursor-pointer gap-4 p-2">
                            <span className="bg-black dark:bg-white p-2 rounded-md"><Upload size={20} className="stroke-white dark:stroke-black" /></span>
                            <input id="send-file" type="file" className="hidden" onChange={handleFileChange} />
                            <span className="max-w-40 text-[12px] text-center text-black/60 dark:text-white/60">
                                Selecione ou cole um arquivo de Imagem ou PDF
                            </span>
                        </label>

                    </>
                }
            </div>

            <div className="bg-primary/20 flex items-center justify-center p-4">
                <p className="text-primary text-[12px] text-center">Dica: Você pode dar Zoom na imagem para conferir detalhes durante a edicação</p>
            </div>
        </section>
    )
}