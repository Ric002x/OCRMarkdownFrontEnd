import { FileEntry, FileOut } from '@/src/types/Formats';
import { create } from 'zustand';

export type FileState = {
    file: File | null,
    fileUrl: string,
    transcription: string,
    saveOption: FileOut,
    lastEdit: Date | null,
    isTranscripted: boolean,
    showViewer: boolean,
    isLoading: boolean,
    transcriptTo: FileEntry,
}

export type FileActions = {
    setFile: (file: File | null) => void,
    setFileUrl: (fileUrl: string) => void,
    setTranscription: (transcription: string) => void,
    setSaveOption: (option: FileOut) => void,
    setLastEdit: (date: Date | null) => void,
    setIsTranscripted: (value: boolean) => void,
    setShowViewer: (value: boolean) => void,
    setIsLoading: (value: boolean) => void,
    setTranscriptTo: (option: FileEntry) => void,
}

export type FileStore = FileState & FileActions


export const useFileStore = create<FileStore>((set) => ({
    file: null,
    fileUrl: "",
    transcription: "",
    saveOption: "pdf",
    lastEdit: null,
    isTranscripted: false,
    showViewer: false,
    isLoading: false,
    transcriptTo: "md",
    setFile: (file) => set({ file }),
    setFileUrl: (fileUrl) => set({ fileUrl }),
    setTranscription: (transcription) => set({ transcription }),
    setSaveOption: (option) => ({ fileOption: option }),
    setLastEdit: (date) => set({ lastEdit: date }),
    setIsTranscripted: (value) => set({ isTranscripted: value }),
    setShowViewer: (value) => set({ showViewer: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    setTranscriptTo: (option) => set({ transcriptTo: option })
}))