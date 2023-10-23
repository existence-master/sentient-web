from pypdf import PdfReader
reader = PdfReader("sjdajejek/context.pdf")
text = ""
for page in reader.pages:
    text = text + page.extract_text()

print(text)