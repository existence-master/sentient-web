import streamlit as st
import os
import requests
from pypdf import PdfReader, PdfWriter
from firebase_admin import  auth

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    with title_container:
        with col1:
            st.image("interface/assets/logo.png", width=64)
        with col2:
            st.title("Sentient")
    
    with st.sidebar:
        

        if st.button("Logout"):
            for root, dirs, files in os.walk(f"interface/{st.session_state.username}", topdown = False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            os.rmdir(f"interface/{st.session_state.username}")
            response = requests.post(f"{st.session_state.url}/terminate")
            for key in st.session_state.keys():
                del st.session_state[key]
            
            st.rerun()
        
        if st.button("Delete Account"):
            auth.delete_user(st.session_state.username)
            linkedin_profile.delete()
            context.delete()
            db = st.session_state.db

            db.collection("chat_histories").document(st.session_state.username).delete()
            for root, dirs, files in os.walk(f"interface/{st.session_state.username}", topdown = False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))

            os.rmdir(f"interface/{st.session_state.username}")
            response = requests.post(f"{st.session_state.url}/terminate")

            for key in st.session_state.keys():
                del st.session_state[key]

            st.rerun()

    ai_container = st.container()
    user_container = st.container()

    with user_container:
        with st.form(key = "user_input_form", clear_on_submit = True):
            user_input = st.text_input("Question: ", placeholder = "Start typing...", key='user_input')
            submit = st.form_submit_button(label = "Send")

        if submit and user_input:
            try:
                response = requests.post(f"{st.session_state.url}/chat", json = {"input": str(user_input)}, headers = {"Content-Type" : "application/json"})
                if response.status_code == 200:
                    ai_reply = response.text
                    st.session_state["user_chat"].append(user_input)
                    st.session_state["ai_chat"].append(ai_reply)
                else:
                    raise Exception("Something went wrong, try sending another message or if the problem persists, try again later")
            except Exception as e:
                st.warning(e)
        
        if st.session_state["ai_chat"]:
            with ai_container:
                for i in range(len(st.session_state["ai_chat"])):
                    user_message = st.chat_message(name = "user")
                    user_message.write(st.session_state["user_chat"][i])
                    ai_message = st.chat_message(name = "ai")
                    ai_message.write(st.session_state["ai_chat"][i])