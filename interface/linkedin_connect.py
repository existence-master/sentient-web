import os
from firebase_admin import storage
import streamlit as st
from PIL import Image
from utils import *

def app():
    # if st.session_state.db == None:
    #     get_db()

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
        os.mkdir(st.session_state.username)
        filepath = os.path.join(st.session_state.username, "linkedin-profile.pdf")
        with open(filepath,"wb") as f: 
            f.write(linkedin_profile.getbuffer())     
    
    if st.button("Submit"):
        try:
            bucket = storage.bucket("gs://mvp-development-401805.appspot.com/")
            blob = bucket.blob(filepath)
            blob.upload_from_filename(filepath)
        except Exception as e:
            st.warning(e)
