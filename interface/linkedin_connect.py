import os
import chat
import requests
import streamlit as st
from PIL import Image
from pypdf import PdfReader, PdfWriter

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    with title_container:
        with col1:
            st.image("logo.png", width=64)
        with col2:
            st.title("Sentient")
    
    linkedin_profile = st.file_uploader("Upload your LinkedIn profile", type=["pdf"])

    if linkedin_profile is not None:
        merger = PdfWriter()
        system = PdfReader("assets/context.pdf")
        profile = PdfReader(linkedin_profile)

        text = ""
        for page in profile.pages:
            text += page.extract_text()

        for pdf in [system, profile]:
            merger.append(pdf)       

        try:
            os.mkdir(st.session_state.username)
        except:
            pass

        context_filepath = f"{st.session_state.username}/context.pdf"     
        merger.write(context_filepath) 
        profile_filepath = f"{st.session_state.username}/linkedin_profile.pdf"

        with open(profile_filepath, "wb") as file:
            file.write(linkedin_profile.getbuffer())    
    
    if st.button("Submit"):
        try:
            bucket = st.session_state.bucket
            profile_blob = bucket.blob(profile_filepath)
            profile_blob.upload_from_filename(profile_filepath)
            context_blob = bucket.blob(context_filepath)
            context_blob.upload_from_filename(context_filepath)
            st.session_state.linkedin_profile = profile_blob
            st.session_state.context = context_blob

            response = requests.post(
                f"{st.session_state.url}/initiate",
                data={"username" : st.session_state.username},
                headers = {"Content-Type" : "application/json"}
            )

            if response.status_code == 200:
                print("POST request was successful!")
                print("Response:", response.text)
            else:
                print("POST request failed with status code:", response.status_code)

            st.session_state.runpage = chat.app
            st.rerun()
        except Exception as e:
            st.warning(e)
