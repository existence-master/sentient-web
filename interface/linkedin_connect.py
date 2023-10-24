import os
import chat
from firebase_admin import storage
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
        merger = PdfWriter()
        system = PdfReader("assets/system.pdf")
        profile = PdfReader(linkedin_profile)
        for pdf in [system, profile]:
            merger.append(pdf)       

        try:
            os.mkdir(st.session_state.username)
        except FileExistsError as e:
            pass

        filepath = os.path.join(st.session_state.username, "context.pdf")     
        merger.write(filepath)     
    
    if st.button("Submit"):
        try:
            bucket = st.session_state.bucket
            blob = bucket.blob(filepath)
            blob.upload_from_filename(filepath)
            st.session_state.runpage = chat.app
            st.rerun()
        except Exception as e:
            st.warning(e)
