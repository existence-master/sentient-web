


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