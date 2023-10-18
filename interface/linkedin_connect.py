import os
import chat
from firebase_admin import storage
import streamlit as st
from PIL import Image
from utils import *

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
        st.session_state.linkedin_profile = linkedin_profile
        try:
            os.mkdir(st.session_state.username)
        except FileExistsError as e:
            pass

        filepath = os.path.join(st.session_state.username, "linkedin-profile.pdf")
        with open(filepath,"wb") as f: 
            f.write(linkedin_profile.getbuffer())     
    
    if st.button("Submit"):
        try:
            bucket = st.session_state.bucket
            blob = bucket.blob(filepath)
            blob.upload_from_filename(filepath)
            st.session_state.runpage = chat.app
            st.rerun()
        except Exception as e:
            st.warning(e)
