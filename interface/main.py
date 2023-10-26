import os
import chat
import requests
from utils import *
import firebase_admin
from PIL import Image
import streamlit as st
import linkedin_connect
from firebase_admin import credentials, auth, firestore, storage

try:
    cred = credentials.Certificate("secrets/firebase.json")
    firebase_admin.initialize_app(cred)
except: 
    pass

if 'db' not in st.session_state:
    db = firestore.client()
    st.session_state.db = db

if 'bucket' not in st.session_state:
    st.session_state.bucket = storage.bucket("mvp-development-401805.appspot.com")

if 'username' not in st.session_state:
    st.session_state.username = ""

if 'linkedin_profile' not in st.session_state:
    st.session_state.linkedin_profile = {"file": None, "lastModified" : None}

if 'context' not in st.session_state:
    st.session_state.context = None

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = None 

if 'ai_chat' not in st.session_state:
    st.session_state.ai_chat = []

if 'user_chat' not in st.session_state:
    st.session_state.user_chat = [] 

if 'url' not in st.session_state:
    st.session_state.url = "https://helpful-boxer-wrongly.ngrok-free.app" 

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    image = Image.open("assets/logo.png")
    with title_container:
        with col1:
            st.image(image, width=64)
        with col2:
            st.title("Sentient")

    choice = st.selectbox("Login/Signup", ["Login", "Signup"])
    if choice == "Login" :
        email = st.text_input("Email :")
        password = st.text_input("Password :", type = "password")
        if st.button("Login"):
            try:
                user = auth.get_user_by_email(email = email)
                st.success("Login successful")
                st.session_state.username = user.uid
                db = st.session_state.db
                bucket = st.session_state.bucket
                os.mkdir(st.session_state.username)
                profile_filepath = f"{st.session_state.username}/linkedin_profile.pdf"
                linkedin_profile = bucket.blob(profile_filepath)
                linkedin_profile.reload()
                st.session_state.linkedin_profile = linkedin_profile
                linkedin_profile.download_to_filename(profile_filepath)

                context_filepath = f"{st.session_state.username}/context.pdf"
                context = bucket.blob(context_filepath)
                st.session_state.context = context
                context.download_to_filename(context_filepath)

                st.session_state.chat_history = FirestoreChatMessageHistory(firestore_client=st.session_state.db, collection_name="chat_histories", session_id = st.session_state.username , user_id=st.session_state.username)
                chat_history = db.collection("chat_histories").document(st.session_state.username).get().to_dict()

                for message in chat_history["messages"] :
                    if message["type"] == "human":
                        st.session_state.user_chat.append(message["data"]["content"])
                    else:
                        st.session_state.ai_chat.append(message["data"]["content"])

                response = requests.post(f"{st.session_state.url}/initiate",data={"username" : st.session_state.username},headers = {"Content-Type" : "application/json"})

                if response.status_code == 200:
                    print("POST request was successful!")
                    print("Response:", response.text)
                else:
                    print("Request failed with status code:", response.status_code)

                st.session_state.runpage = chat.app
                st.rerun()
            except Exception as e:
                st.warning(e)
    else :
        username = st.text_input("Username : ")
        email = st.text_input("Email :")
        password = st.text_input("Password :", type = "password")
        if st.button("Signup") :
            try:
                user = auth.create_user(email = email, password = password, uid = username)
                st.success("Account created successfully")
                st.session_state.username = user.uid
                st.session_state.runpage = linkedin_connect.app
                st.rerun()
            except Exception as e:
                st.warning(e)

if __name__ == "__main__":
    if 'runpage' not in st.session_state:
        st.session_state.runpage = app
    st.session_state.runpage()