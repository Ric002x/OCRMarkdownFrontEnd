import json
import sys
import asyncio
from docling.document_converter import DocumentConverter


async def ocr_files(file, export_file):
    converter = DocumentConverter()
    result = converter.convert(file)
    doc = result.document

    match export_file:
        case "md":
            texto = doc.export_to_markdown()
        case "html":
            texto = doc.export_to_html()
        case "txt":
            texto = doc._export_to_indented_text()
        case _:
            return (f"Argumento inválido para o tipo enviado: {export_file}")

    return texto


if __name__ == "__main__":
    try:
        args = json.loads(sys.argv[1])

        path = args.get("file")
        type = args.get("type", "md")

        # Run the async function properly
        result = asyncio.run(ocr_files(path, type))

        print(json.dumps({"status": "success", "data": result}))

    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
        sys.exit(1)
