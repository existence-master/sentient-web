import os
from glob import glob
import casual_chat
import requests
import firebase_admin
import streamlit as st
import linkedin_connect
from firebase_admin import credentials, auth, firestore, storage
from langchain.memory.chat_message_histories.firestore import FirestoreChatMessageHistory

try:
    my_credentials = {
    "type": "service_account",
    "project_id": "mvp-development-401805",
    "private_key_id": st.secrets["PRIVATE_KEY_ID"],
    "private_key": st.secrets["PRIVATE_KEY"].replace("\\n", "\n"),
    "client_email": st.secrets["CLIENT_EMAIL"],
    "client_id": st.secrets["CLIENT_ID"],
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": st.secrets["AUTH_PROVIDER_X509_CERT_URL"],
    "client_x509_cert_url": st.secrets["CLIENT_X509_CERT_URL"],
    "universe_domain": "googleapis.com"
    }

    cred = credentials.Certificate(my_credentials)
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

if 'global_chat_history' not in st.session_state:
    st.session_state.global_chat_history = None 

if 'casual_chat_history' not in st.session_state:
    st.session_state.casual_chat_history = None 

if 'linked_chat_history' not in st.session_state:
    st.session_state.linkedin_chat_history = None 

if 'ai_chat' not in st.session_state:
    st.session_state.ai_chat = []

if 'user_chat' not in st.session_state:
    st.session_state.user_chat = [] 

if 'url' not in st.session_state:
    st.session_state.url = "https://helpful-boxer-wrongly.ngrok-free.app" 

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    with title_container:
        with col1:
            st.image("interface/assets/logo.png", width = 64)
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
                os.mkdir(f"interface/{st.session_state.username}")
                profile_filepath = f"interface/{st.session_state.username}/linkedin_profile.pdf"
                linkedin_profile = bucket.blob(f"{st.session_state.username}/linkedin_profile.pdf")
                linkedin_profile.reload()
                st.session_state.linkedin_profile = linkedin_profile
                linkedin_profile.download_to_filename(profile_filepath)

                context_filepath = f"interface/{st.session_state.username}/context.pdf"
                context = bucket.blob(f"{st.session_state.username}/context.pdf")
                st.session_state.context = context
                context.download_to_filename(context_filepath)

                st.session_state.casual_chat_history = FirestoreChatMessageHistory(firestore_client=st.session_state.db, collection_name="casual_chat_histories", session_id = st.session_state.username , user_id=st.session_state.username)
                casual_chat_history = db.collection("casual_chat_histories").document(st.session_state.username).get().to_dict()

                st.session_state.chat_history = FirestoreChatMessageHistory(firestore_client=st.session_state.db, collection_name="linkedin_chat_histories", session_id = st.session_state.username , user_id=st.session_state.username)
                chat_history = db.collection("linkedin_chat_histories").document(st.session_state.username).get().to_dict()
                
                if casual_chat_history["messages"]:
                    for message in chat_history["messages"] :
                        if message["type"] == "human":
                            st.session_state.user_chat.append(message["data"]["content"])
                        else:
                            st.session_state.ai_chat.append(message["data"]["content"])

                response = requests.post(f"{st.session_state.url}/initiate", json = {"username" : str(st.session_state.username)}, headers = {"Content-Type" : "application/json"})

                if response.status_code == 200:
                    st.session_state.runpage = chat.app
                    st.rerun()
                else:
                    for root, dirs, files in os.walk(f"interface/{st.session_state.username}", topdown = False):
                        for name in files:
                            os.remove(os.path.join(root, name))
                        for name in dirs:
                            os.rmdir(os.path.join(root, name))
                    os.rmdir(f"interface/{st.session_state.username}")
                    for key in st.session_state.keys():
                        del st.session_state[key]
                    raise Exception("Can't login, please try again")

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