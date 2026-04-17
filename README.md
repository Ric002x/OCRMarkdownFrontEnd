# 📝 OCR Markdown

Uma ferramenta web para extrair texto de imagens e PDFs, convertendo para **Markdown**, **HTML** ou **Plain Text**.


## 🚀 Sobre o Projeto

Este projeto nasceu da necessidade de transformar documentos estáticos em formatos editáveis e leves de forma rápida e simples. O foco da aplicação é a **recuperação estruturada de texto**, filtrando ruídos visuais e ignorando conteúdos sem valor textual para entregar um resultado limpo e pronto para uso em editores de notas ou documentações.

### Principais Diferenciais:
* **Privacidade Total:** Nenhum arquivo é salvo no servidor ou em banco de dados.
* **Foco em Estrutura:** Conversão inteligente para Markdown usando a biblioteca Docling.
* **Edição em Tempo Real:** Redija ou ajuste o texto extraído diretamente na interface antes de exportar.

---

## 🛠️ Tecnologias Utilizadas

### Frontend & API
* **Next.js 15+** (App Router)
* **TypeScript**
* **Tailwind CSS** & **Shadcn/UI** (Interface moderna e responsiva)

### Engine de OCR
* **Python 3.14.3**
* **Docling v2.73.1** (Processamento avançado de documentos)

---

## ⚙️ Como Funciona a Arquitetura

O projeto utiliza uma abordagem integrada:
1.  O **Frontend (Next.js)** recebe o arquivo e chama o **Script Python** localmente através da biblioteca `os`.
2.  O **Script Python** é executado dentro do ambiente virtual (`.venv`) do projeto.
3.  O **Docling** processa o arquivo e retorna a string formatada.
4.  O usuário recebe o texto e pode escolher o formato de saída (MD, HTML, TXT).

---

## 🔧 Instalação e Configuração

### Pré-requisitos
* Node.js (LTS)
* Python 3.14.3
* Gerenciador de pacotes (NPM, PNPM ou Yarn)

### 1. Preparando o ambiente Python
Recomendamos o uso de um ambiente virtual:

* instale os pacotes presente no arquivo requirements.txt
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
.\venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

### 2. Configurando o Frontend
```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## 📖 Como Usar

1.  Faça o upload de uma imagem ou arquivo PDF.
2.  Aguarde o processamento (o script Python fará a extração).
3.  Visualize o texto gerado no editor integrado.
4.  Alterne entre as abas **Markdown**, **HTML** ou **Texto Simples**.
5.  Clique em **Download** para baixar o arquivo final.

---

## 🛡️ Segurança e Dados

Este projeto foi construído com foco em segurança:
* **Stateless:** A aplicação não possui banco de dados.
* **Volátil:** Os arquivos processados permanecem apenas na memória temporária durante o processamento e são descartados imediatamente após a resposta.

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas!

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Você é livre para usar, modificar e distribuir este software, desde que a licença e aviso de copyright sejam inclusos.