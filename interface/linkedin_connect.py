import os
import chat
import streamlit as st
from PIL import Image
from utils import *
from pypdf import PdfReader, PdfWriter

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    image = Image.open("assets/logo.png")
    with title_container:
        with col1:
            st.image(image, width=64)
        with col2:
            st.title("Sentient")
    
    linkedin_profile = st.file_uploader("Upload your LinkedIn profile", type=["pdf"])

    if linkedin_profile is not None:
        profile_filepath = f"{st.session_state.username}/linkedin_profile.pdf"

        with open(profile_filepath, "wb") as file:
            file.write(linkedin_profile.getbuffer())

        merger = PdfWriter()
        system = PdfReader("assets/context.pdf")
        profile = PdfReader(linkedin_profile)
        for pdf in [profile]:
            merger.append(pdf)       

        try:
            os.mkdir(st.session_state.username)
        except FileExistsError as e:
            pass

        context_filepath = f"{st.session_state.username}/context.pdf"     
        merger.write(context_filepath)     
    
    if st.button("Submit"):
        try:
            bucket = st.session_state.bucket
            profile_blob = bucket.blob(profile_filepath)
            profile_blob.upload_from_filename(profile_filepath)
            context_blob = bucket.blob(context_filepath)
            context_blob.upload_from_filename(context_filepath)
            st.session_state.linkedin_profile = profile_blob
            st.session_state.context = context_blob
            st.session_state.runpage = chat.app
            st.rerun()

        except Exception as e:
            st.warning(e)
