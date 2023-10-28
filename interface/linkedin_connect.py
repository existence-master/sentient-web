import os
import chat
import requests
import streamlit as st
from pypdf import PdfReader, PdfWriter

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    with title_container:
        with col1:
            st.image("interface/assets/logo.png", width=64)
        with col2:
            st.title("Sentient")
    
    linkedin_profile = st.file_uploader("Upload your LinkedIn profile", type=["pdf"])

    if linkedin_profile is not None:
        merger = PdfWriter()
        system = PdfReader("interface/assets/context.pdf")
        profile = PdfReader(linkedin_profile)

        text = ""
        for page in profile.pages:
            text += page.extract_text()

        for pdf in [system]:
            merger.append(pdf)       

        try:
            os.mkdir(st.session_state.username)
        except:
            pass

        context_filepath = f"interface/{st.session_state.username}/context.pdf"     
        merger.write(context_filepath) 
        profile_filepath = f"interface/{st.session_state.username}/linkedin_profile.pdf"

        with open(profile_filepath, "wb") as file:
            file.write(linkedin_profile.getbuffer())    
    
    if st.button("Submit"):
        try:
            bucket = st.session_state.bucket
            profile_blob = bucket.blob(f"{st.session_state.username}/linkedin_profile.pdf")
            profile_blob.upload_from_filename(f"{st.session_state.username}/linkedin_profile.pdf")
            context_blob = bucket.blob(f"{st.session_state.username}/context.pdf")
            context_blob.upload_from_filename(f"{st.session_state.username}/context.pdf")
            st.session_state.linkedin_profile = profile_blob
            st.session_state.context = context_blob

            response = requests.post(
                f"{st.session_state.url}/initiate",
                data={"username" : st.session_state.username},
                headers = {"Content-Type" : "application/json"}
            )

            if response.status_code == 200:
                st.session_state.runpage = chat.app
                st.rerun()
            else:
                linkedin_profile = st.session_state.linkedin_profile
                context = st.session_state.context
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
                raise Exception("Can't signup, please try again")
                
        except Exception as e:
            st.warning(e)
