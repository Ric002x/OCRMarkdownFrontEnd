'use client';
import 'github-markdown-css/github-markdown-dark.css';

import { cn } from "@/lib/utils";
import { useFileStore } from "@/src/lib/stores/file.store";
import { Code, FileText } from "lucide-react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const Viewer = ({ classname }: { classname: string }) => {
    const { transcription, transcriptTo } = useFileStore()
    const { theme } = useTheme()


    return (
        <section className={cn("lg:col-span-6 flex flex-col h-150 shadow-md border border-black/10 dark:border-white/10", classname)}>
            <div className="bg-foreground p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                    {
                        transcriptTo === "md" ?
                            <>
                                <FileText size={18} color='#3E6F7A' />
                                <span className='text-[#3E6F7A] dark:text-[#92BEC8]'>Markdown</span>
                            </> :

                            <>
                                <Code size={18} color='#C32F27' />
                                <span className='text-[#C32F27]'>HTML</span>
                            </>
                    }
                </h2>
            </div>

            {transcriptTo === "md" && <div className="p-8 markdown-body overflow-y-auto flex-1" style={{ background: `${theme === "dark" ? "#222222cb" : "#dedcdc"}`, fontSize: "14px", color: `${theme === "dark" ? "#ffffff" : "#000000"}` }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{transcription}</ReactMarkdown>
            </div>}

            {transcriptTo === "html" && <iframe
                srcDoc={transcription}
                style={{ width: "100%", border: "none", overflowY: "auto", flex: 1, background: `${theme === "dark" ? "#222222cb" : "#dedcdc"}`, color: `${theme === "dark" ? "#ffffff" : "#000000"}` }}
            />}
        </section>
    )
}