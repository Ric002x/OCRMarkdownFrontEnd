export const Footer = () => {
    return (
        <footer className="border-t border-black/10 dark:border-white/10 pt-12 pb-8 min-h-footer animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-2">
                        <span className="text-lg font-bold">Transcreve.AI</span>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs">Facilitando transcrição através de reconhecimento de imagens e PDFs com inteligência artificial.</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Produto</h4>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                            <li><a href="#" className="hover:text-primary">Recursos</a></li>
                            <li><a href="#" className="hover:text-primary">Segurança</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Suporte</h4>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                            <li><a href="#" className="hover:text-primary">Ajuda</a></li>
                            <li><a href="#" className="hover:text-primary">Contato</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-black/10 dark:border-white/10 text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">&copy; 2026 Transcreve.AI - Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}