import chat
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

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = None

if 'linkedin_profile' not in st.session_state:
    st.session_state.linkedin_profile = None  

if 'ai_chat' not in st.session_state:
        st.session_state['ai_chat'] = []

if 'user_chat' not in st.session_state:
        st.session_state['user_chat'] = []  

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
                st.session_state.chat_history = FirestoreChatMessageHistory(firestore_client=st.session_state.db, collection_name="chat_histories", session_id = st.session_state.username , user_id=st.session_state.username)
                chat_history = db.collection("chat_histories").document(st.session_state.username).get().to_dict()

                for message in chat_history["messages"] :
                    if message["type"] == "human":
                        st.session_state.user_chat.append(message["data"]["content"])
                    else:
                        st.session_state.ai_chat.append(message["data"]["content"])

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