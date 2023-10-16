from flask import Flask, request, make_response
from flask_cors import CORS
from utils import *

app = Flask(__name__)
CORS(app, resource={r"/*" : {"origins" : "*"}})

@app.route("/")
def home():
    return "This is the official Sentient MVP backend made with Flask"

@app.route("/linkedin-connect", methods=["POST"])
def linkedin_connect():
    try:
        file = request.files["file"]
        file.save("data/linkedin-profile.pdf")
        myResponse = make_response("Success")
        myResponse.status_code = 200
        return myResponse
    except Exception as e:
        myResponse = make_response(e)
        myResponse.status_code = 400
        return myResponse

# @app.route("/initiate", methods = ["POST"])
# def initiate():
#     try:
#         documents = load_documents()
#         text_chunks = split_text_into_chunks(documents)
#         embeddings = create_embeddings()
#         vector_store = create_vector_store(text_chunks, embeddings)
#         llm = create_llms_model()
#         memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
#         chain = ConversationalRetrievalChain.from_llm(llm=llm, chain_type='stuff',
#                                                     retriever=vector_store.as_retriever(search_kwargs={"k": 2}),
#                                                     memory=memory)
#     except:
        

if __name__ == "__main__":
    app.run(debug = True)