from utils import *
from PIL import Image
import streamlit as st
import os

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    image = Image.open("assets/logo.png")
    with title_container:
        with col1:
            st.image(image, width=64)
        with col2:
            st.title("Sentient")
    
    with st.sidebar:
        if st.button("Logout"):
            for root, dirs, files in os.walk(st.session_state.username, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            for key in st.session_state.keys():
                del st.session_state[key]
            st.rerun()
    
    def split_text(text, n):
        return [text[i:i+n] for i in range(0, len(text), n)]

    documents = load_documents()
    text_chunks = split_text_into_chunks(documents)
    embeddings = create_embeddings()
    vector_store = create_vector_store(text_chunks, embeddings)
    llm = create_llm_model()

    memory = create_conversation_memory()
    chain = create_conversation_chain(llm = llm, vector_store = vector_store, memory = memory)

    ai_container = st.container()
    user_container = st.container()

    with user_container:
        with st.form(key = "user_input_form", clear_on_submit = True):
            user_input = st.text_input("Question: ", placeholder = "Ask about your LinkedIn profile", key='user_input')
            submit = st.form_submit_button(label = "Send")

        if submit and user_input:
            ai_reply = conversation_chat(user_input, chain)
            st.session_state["user_chat"].append(user_input)
            st.session_state["ai_chat"].append(ai_reply)
        
        if st.session_state["ai_chat"]:
            with ai_container:
                for i in range(len(st.session_state["ai_chat"])):
                    user_message = st.chat_message(name = "user")
                    user_message.write(st.session_state["user_chat"][i])
                    ai_message = st.chat_message(name = "ai")
                    ai_message.write(st.session_state["ai_chat"][i])
