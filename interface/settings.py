import streamlit as st
import os
import casual_chat
import linkedin_chat
import requests
from pypdf import PdfReader, PdfWriter
from firebase_admin import auth
from streamlit_option_menu import option_menu

def app() :
    with st.sidebar:
        def on_page_change(key) :
            current_page = st.session_state[key]

            if current_page == "Chat" :
                st.session_state.runpage = casual_chat.app

            elif current_page == "LinkedIn Advice" :
                st.session_state.runpage = linkedin_chat.app

            else :
                pass

        menu = option_menu(None, ["Chat", "LinkedIn Advice", "Settings"], icons=["chat-fill", "linkedin", "gear"], menu_icon = "cast", default_index = 2, on_change = on_page_change, key = "menu")
        menu 

        if st.button("Logout") :
            for root, dirs, files in os.walk(f"interface/{st.session_state.username}", topdown = False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))

            os.rmdir(f"interface/{st.session_state.username}")
            requests.post(f"{st.session_state.url}/terminate")

            for key in st.session_state.keys():
                del st.session_state[key]    

            st.rerun()     

    st.title(st.session_state.username)
    user = auth.get_user(st.session_state.username)
    email = st.text_input("Change email :", placeholder = user.email)

    if st.button("Save"):
        auth.update_user(st.session_state.username, email = email)
        email.value = ""
        st.rerun()

    st.text("Your file details")
    linkedin_profile = st.session_state.linkedin_profile
    context = st.session_state.context
    st.text(linkedin_profile.name)
    st.text(linkedin_profile.updated if linkedin_profile.updated is not None else linkedin_profile.time_created)
    new_linkedin_profile = st.file_uploader("Change your LinkedIn profile", type = ["pdf"])

    if st.button("Submit"):
        try:
            profile_filepath = f"interface/{st.session_state.username}/linkedin_profile.pdf"

            with open(profile_filepath, "wb") as file:
                file.write(new_linkedin_profile.getbuffer())

            merger = PdfWriter()
            profile = PdfReader(new_linkedin_profile)
            for pdf in [profile]:
                merger.append(pdf)       

            context_filepath = f"interface/{st.session_state.username}/context.pdf"     
            merger.write(context_filepath) 

            linkedin_profile.upload_from_filename(profile_filepath)
            context.upload_from_filename(context_filepath)
            st.session_state.linkedin_profile = linkedin_profile
            st.session_state.context = context
            css = " .uploadedFiles {display: none;} "
            st.markdown(f'<style>{css}</style>', unsafe_allow_html = True)
            response = requests.post(f"{st.session_state.url}/initiate", json = {"username" : str(st.session_state.username)}, headers = {"Content-Type" : "application/json"})
            if response.status_code == 200:
                st.rerun()
            else:
                raise Exception("Can't update profile, right now, try again later")
        except Exception as e:
            st.warning(e)
    
    if st.button("Delete Account"):
        auth.delete_user(st.session_state.username)
        linkedin_profile.delete()
        context.delete()
        db = st.session_state.db

        db.collection("chat_histories").document(st.session_state.username).delete()
        for root, dirs, files in os.walk(f"interface/{st.session_state.username}", topdown = False):
            for name in files:
                os.remove(os.path.join(root, name))
            for name in dirs:
                os.rmdir(os.path.join(root, name))

        os.rmdir(f"interface/{st.session_state.username}")
        response = requests.post(f"{st.session_state.url}/terminate")

        for key in st.session_state.keys():
            del st.session_state[key]

        st.rerun()