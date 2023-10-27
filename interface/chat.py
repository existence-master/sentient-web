import json
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
        st.title(st.session_state.username)
        user = auth.get_user(st.session_state.username)
        email = st.text_input("Change email :", placeholder = user.email)

        if st.button("Save"):
            auth.update_user(st.session_state.username, email = email)
            email.value = ""
            st.rerun()

        st.text("Your file details")
        linkedin_profile = st.session_state.linkedin_profile
        context = st.session_state.context
        st.text(linkedin_profile.name)
        st.text(linkedin_profile.updated if linkedin_profile.updated is not None else linkedin_profile.time_created)
        new_linkedin_profile = st.file_uploader("Change your LinkedIn profile", type = ["pdf"])

        if st.button("Submit"):
            profile_filepath = f"{st.session_state.username}/linkedin_profile.pdf"
            with open(profile_filepath, "wb") as file:
                file.write(new_linkedin_profile.getbuffer())

            merger = PdfWriter()
            profile = PdfReader(new_linkedin_profile)
            for pdf in [profile]:
                merger.append(pdf)       

            context_filepath = f"{st.session_state.username}/context.pdf"     
            merger.write(context_filepath) 

            linkedin_profile.upload_from_filename(profile_filepath)
            context.upload_from_filename(context_filepath)
            st.session_state.linkedin_profile = linkedin_profile
            st.session_state.context = context
            css = " .uploadedFiles {display: none;} "
            st.markdown(f'<style>{css}</style>', unsafe_allow_html=True)
            st.rerun()

        if st.button("Logout"):
            for root, dirs, files in os.walk(st.session_state.username, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            os.rmdir(st.session_state.username)
            for key in st.session_state.keys():
                del st.session_state[key]
            st.rerun()
        
        if st.button("Delete Account"):
            auth.delete_user(st.session_state.username)
            linkedin_profile.delete()
            context.delete()
            db = st.session_state.db
            db.collection("chat_histories").document(st.session_state.username).delete()
            for root, dirs, files in os.walk(st.session_state.username, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            os.rmdir(st.session_state.username)
            os.rmdir(f"data/{st.session_state.username}")
            for key in st.session_state.keys():
                del st.session_state[key]
            st.rerun()

    ai_container = st.container()
    user_container = st.container()

    with user_container:
        with st.form(key = "user_input_form", clear_on_submit = True):
            user_input = st.text_input("Question: ", placeholder = "Ask about your LinkedIn profile", key='user_input')
            submit = st.form_submit_button(label = "Send")

        if submit and user_input:
            response = requests.post(f"{st.session_state.url}/chat", json = {"input": str(user_input)}, headers = {"Content-Type" : "application/json"})
            if response.status_code == 200:
                print("POST request was successful!")
                print("Response:", response.text)
                ai_reply = response.json()
                st.session_state["user_chat"].append(user_input)
                st.session_state["ai_chat"].append(ai_reply)
            else:
                print("Request failed with status code:", response.status_code)
           
        
        if st.session_state["ai_chat"]:
            with ai_container:
                for i in range(len(st.session_state["ai_chat"])):
                    user_message = st.chat_message(name = "user")
                    user_message.write(st.session_state["user_chat"][i])
                    ai_message = st.chat_message(name = "ai")
                    ai_message.write(st.session_state["ai_chat"][i])
