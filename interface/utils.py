import streamlit as st
from langchain.llms import CTransformers
from langchain.vectorstores import Chroma
from langchain.memory import ConversationBufferMemory
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.memory.chat_message_histories.firestore import FirestoreChatMessageHistory

def load_documents():
    loader = DirectoryLoader("assets", glob="*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()
    return documents

def split_text_into_chunks(documents):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    text_chunks = text_splitter.split_documents(documents)
    return text_chunks

def create_embeddings():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2", model_kwargs={'device': "cpu"})
    return embeddings

def get_vector_store(persist_directory, embeddings):
    vector_store = Chroma(persist_directory = persist_directory, embedding_function = embeddings)
    return vector_store

def create_vector_store(text_chunks, embeddings, persist_directory):
    vector_store = Chroma.from_documents(documents=text_chunks, embedding=embeddings, persist_directory = persist_directory)
    vector_store.persist()
    vector_store = None
    vector_store = Chroma(persist_directory = persist_directory, embedding_function = embeddings)
    return vector_store

def create_llm_model():
    llm = CTransformers(model="models/mistral-7b-instruct-v0.1.Q4_K_M.gguf", config={'max_new_tokens': 128, 'temperature': 0.01})
    return llm

def create_conversation_memory():
    if st.session_state.chat_history == None:
        st.session_state.chat_history = FirestoreChatMessageHistory(firestore_client=st.session_state.db, collection_name="chat_histories", session_id = st.session_state.username , user_id=st.session_state.username)
    memory = ConversationBufferMemory(memory_key="chat_history", chat_memory = st.session_state.chat_history.messages, return_messages=True)
    return memory

def create_conversation_chain(llm, vector_store, memory):
    chain = ConversationalRetrievalChain.from_llm(llm=llm, chain_type='stuff', retriever=vector_store.as_retriever(search_kwargs={"k": 3}), memory=memory)
    return chain

def conversation_chat(user_input, chain):
    ai_reply = chain({"question": user_input, "chat_history": st.session_state.chat_history})["answer"]
    return ai_reply