import streamlit as st
import os
import settings
import requests
import linkedin_chat
from streamlit_option_menu import option_menu

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    with title_container:
        with col1:
            st.image("interface/assets/logo.png", width=64)
        with col2:
            st.title("Sentient")
    
    st.markdown(
    """
    <style>
    [data-testid=stSidebar .sidebar-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    </style>
    """,
    unsafe_allow_html=True
    )
    
    with st.sidebar:
        def on_page_change(key) :
            current_page = st.session_state[key]
            if current_page == "LinkedIn Advice" :
                st.session_state.runpage = linkedin_chat.app

            elif current_page == "Settings" :
                st.session_state.runpage = settings.app

            elif current_page == "Logout" :
                for root, dirs, files in os.walk(f"interface/{st.session_state.username}", topdown = False):
                    for name in files:
                        os.remove(os.path.join(root, name))
                    for name in dirs:
                        os.rmdir(os.path.join(root, name))

                os.rmdir(f"interface/{st.session_state.username}")
                requests.post(f"{st.session_state.url}/terminate")

                for key in st.session_state.keys():
                    del st.session_state[key]

            else :
                pass
        
        st.title(f"Hello {st.session_state.username}")
        menu = option_menu(None, ["Chat", "LinkedIn Advice", "Settings", "Logout"], icons=["chat-fill", "linkedin", "gear", "box-arrow-in-left"], menu_icon = "cast", default_index = 0, on_change = on_page_change, key = "menu")
        menu      

       
    ai_container = st.container()
    user_container = st.container()

    with user_container:
        with st.form(key = "user_input_form", clear_on_submit = True):
            user_input = st.text_input("Message: ", placeholder = "Start typing...", key="user_input")
            submit = st.form_submit_button(label = "Send")

        if submit and user_input:
            try:
                response = requests.post(f"{st.session_state.url}/casual-chat", json = {"input": str(user_input)}, headers = {"Content-Type" : "application/json"})
                if response.status_code == 200:
                    ai_reply = response.text
                    st.session_state["casual_user_chat"].append(user_input)
                    st.session_state["casual_ai_chat"].append(ai_reply)
                else:
                    raise Exception("Something went wrong, try sending another message or if the problem persists, try again later")
            except Exception as e:
                st.warning(e)
        
        if st.session_state["casual_ai_chat"]:
            with ai_container:
                for i in range(len(st.session_state["casual_ai_chat"])):
                    user_message = st.chat_message(name = "user")
                    user_message.write(st.session_state["casual_user_chat"][i])
                    ai_message = st.chat_message(name = "ai")
                    ai_message.write(st.session_state["casual_ai_chat"][i])
