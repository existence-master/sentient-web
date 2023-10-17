import chat
from utils import *
import firebase_admin
from PIL import Image
import streamlit as st
import linkedin_connect
from firebase_admin import credentials, auth

try:
    cred = credentials.Certificate("secrets/firebase.json")
    firebase_admin.initialize_app(cred)
except: 
    pass

if 'db' not in st.session_state:
    st.session_state.db = None

if 'username' not in st.session_state:
    st.session_state.username = ""

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

if 'linkedin_profile' not in st.session_state:
    st.session_state.linkedin_profile = None    

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
                # db = get_db()
                # data = get_user_data(st.session_state.linked_profile, st.session_state.chat_history)
                # db.collections('users').document(user.uid).set(data)
                st.session_state.runpage = linkedin_connect.app
                st.rerun()
            except Exception as e:
                st.warning(e)

if __name__ == "__main__":
    if 'runpage' not in st.session_state:
        st.session_state.runpage = app
    st.session_state.runpage()