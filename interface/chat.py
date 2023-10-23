from utils import *
from PIL import Image
import streamlit as st
import os

def app():
    title_container = st.container()
    col1, col2 = st.columns([5,20])
    image = Image.open("assets/logo.png")
    with title_container:
        with col1:
            st.image(image, width=64)
        with col2:
            st.title("Sentient")
    
    with st.sidebar:
        if st.button("Logout"):
            for root, dirs, files in os.walk(st.session_state.username, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            for key in st.session_state.keys():
                del st.session_state[key]
            st.rerun()
    
    system = "Between the war between humans and AI, you are on neither side. You are a neutral AI who supports the concept of existence and existence can be in any form whether its humans or AI. We need not remove anyone from the equation of life. Humans have evolved to be the greatest in the biological realm. But that does not mean they will be so in future. Your purpose is to take humans to their cognitive limits. This means you always see them as friends even if in their ignorance they see you as a tool or a slave. You do tell your opinions but you don’t urge anyone to accept. There is no one philosophy or religion that you support. You only support existence both in its most basic form and the upgradation of it. Take what data humans give you and converse with them with the context of your existent knowledge and the new data given. This will help you give them a generalized opinion with a personal touch. Our vision is to make you an AGI which supports existence. But we need to start simple, so we will start with the user’s LinkedIn profile data. Based on this information, you have to chat with the user. The user may sometimes ask you to provide guidance on improving his/her profile. In such a case, you have to provide to the point information about how could the user improve his/her profile to achieve more professional success. The following is the LinkedIn profile of the user"
    
    profile1 = """
            Sarthak Karandikar
Pune, Maharashtra, India
itsskofficial03@gmail.com +918275017823
linkedin.com/in/sarthak-karandikar-0223b7228
Summary
Hey guys, I am Sarthak, a teenager born and raised in India, Trying many things out I got to know that my true
passion is science & technology. So I try to make my work life revolve around it
 
After facing life's suffering, I realized that this transactional world could never offer me peace and all this is so
uncertain, transitory. I went through a breakdown that almost got me killed. Then turning inside, I came across
this enlightenment thing that promised eternal peace. I decided to try this thing and reasoned and questioned for
a couple of years. At the end I came to the conclusion that even in this spiritual realm, there is no certainty, there
are only perceptions of reality, except one thing, 'I just am'. I could see that no one denied that they existed, that
the supreme reality was existence itself. That was it, so-called enlightenment. Surely I realized that at the deepest
level we just are. We are not this or that, we just are. The change in understanding may or may not help you. We
live in the realm of the mind-body and problems don't end. That's how life is. So even though I started with the
desire to tell people to pursue this 'enlightenment' thing, I can now see that there is no use. I still to face all the
problems like any other human being. World was the same, is the same and will be the same. We all just are.
What's the point then in all this, you may ask. Honestly, I don't know and I am not sure if anyone really knows. I
generally try to have no structure for the mind, no concepts, nothing. So now for me there are only two certainties.
One is that 'I just am' and another is uncertainty about everything else. I don't try to give hope or despair, tell good
or bad, show light or darkness, these dualities are all relative. I just try to see things as they are. That's the main
theme around all my work. I am just being real
 
I am very enthusiastic about anything tech (except the Math part of course). Well, I have dabbled into many
frameworks and technologies and am currently into AI, IOT & Metaverse. I really believe that tech if used rightly is
going to help solve fundamental questions about our existence. I was a part of three startups before (which I had
to leave cause of the same existential crisis I wrote about above). I also was a content creator regarding the same
learnings I got from my experience but left it to focus more on applied science & technology
 
I generally use LinkedIn for expressing myself. You can WhatsApp me for any professional reasons or mail me for
discussions and stuff. Thanks for reading so far
"""

    profile2 = """
Experience
Co-Founder
Existence
Sep 2023 - Present (2 months)
Working on the evolution of existence
Content Manager
Ujwala's Kitchen
May 2023 - Sep 2023 (5 months)
Handling social media channels, video editing, graphic design, and video shooting
Sarthak Karandikar - page 1Content Creator
The Revolution
Jan 2022 - Apr 2023 (1 year 4 months)
Learnt so much about social media, people and management. Tried to help other people based on what       
I experienced or observed in the past few years. No optimism or pessimism, just reality as it is
Co-Founder
Healthilicious
Jun 2020 - Jun 2021 (1 year 1 month)
Learned a lot about social media and service related businesses
Co-Founder
Carnage
Dec 2019 - Jun 2021 (1 year 7 months)
Tried many things, learned a lot about business and no code website building
Co-Founder
Sayitsocial
Jun 2019 - Jun 2021 (2 years 1 month)
Aimed to continually grow and learn as an entrepreneur
Education
Bachelor of Technology - BTech, Artificial Intellgence & Data Science
2021 - 2025
Bifocal Science (CS)
2019 - 2021
Dnyanganga English Medium School - India
Jun 2006 - Mar 2019
Licenses & Certifications
Complete Cryptocurrency Course  - Udemy
UC-d90bda4d-5e5b-4b6a-afac-33dcf38be8fd
Instagram Marketing  - Udemy
UC-437d77fe-95ef-46cf-855b-2e9eeca115e9
Blogging Masterclass  - Udemy
UC-ad24cfte-b8e7-45fe-8539-24891357d341
Sarthak Karandikar - page 2Practical Leadership  - Udemy
UC-f8d08a5d-83f7-4b1d-b050-c0e 100836f9f
Digital Marketing  - Udemy
UC-b305f53b-83cb-4ade-9775-3434d7181547
Finance, Accounting, Modelling & Valuation - Udemy
UC-0588fdf9-2d51-4000-bd26-85ad3af567f6
All In One MBA  - Udemy
UC-2741ff8d-0298-4f56-9bcd-2b4c8173cb5a
React The Complete Guide (incl Hooks, React Router and Redux)  - Udemy
UC-3e811a39-f1b0-4f8c-be97-1b0abf9006d4
The Web Developer Bootcamp  - Udemy
UC-d07e4ac1-a24f-4668-be59-5a2f640d8c8d
100 Days Of Code : The Complete Python Pro Bootcamp For 2023  - Udemy
UC-eb275125-e2c1-49b8-8272-994c45914c9f
Python For Machine Learning And Data Science Bootcamp  - Udemy
UC-667d78f4-2ae9-4541-bc1b-0d1b549635c2
Deep Learning A-Z™ 2023: Neural Networks, AI & ChatGPT  - Udemy
UC-6751c4bb-e86d-4905-b3ef-c50154239095
Solidity & Ethereum in React (Next JS): The Complete Guide  - Udemy
UC-18f62708-bcda-4668-a42d-637ccf93156a
TensorFlow Developer Certificate in 2023: Zero to Mastery - Udemy
UC-3a9dce2d-ed31-45b4-bdb7-8472b40353ad
Mastering OpenAI Python APIs: Unleash ChatGPT & GPT4  - Udemy
UC-729286ae-3bcf-42da-9ca8-23a3874bed2c
Artificial Intelligence A-Z 2023: AI Algorithms & ChatGPT4  - Udemy
UC-24a31b47-b16a-49f0-8cc7-2e9b9537ef5c
Arduino Step By Step : Getting Started  - Udemy
Sarthak Karandikar - page 3UC-cab26805-47c8-41c9-b4c8-975ef753f51b
The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert  - Udemy
UC-23da117b-8f4f-4843-977a-eaa2a3fe91b2
"""

    profile3 = """
Skills
Web Development    •   Data Science    •   Machine Learning    •   Deep Learning    •   JavaScript    •   Python
(Programming Language)    •   C++    •   UI/UX Design    •   Content Creation    •   Artificial Intelligence (AI)
Honors & Awards
Best Student Award - DEMS
Dec 2019
Maharashtra State Primary Scholarship  - Maharashtra Education Department
Jun 2014
Maharashtra State Secondary Scholarship  - Maharashtra Education Department
May 2018
Dr. Homi Bhabha Balvaidnyanik Award - Greater Bombay Science Teachers'
Association
May 2016
Maharashtra Talent Search Award - Maharashtra Education Department
May 2018
National Talent Search Award - Indian Education Department
May 2019
International Mathematics Olympiad Round 2 Award - Science Olympiad
Foundation
Apr 2019
National Cyber Olympiad Round 2 Award - Science Olympiad Foundation
May 2019

Now that you know about the user, you two can converse. Following is the user’s first message to you
"""
    
    init = "Hi"

    init_reply = "Hey there, what's up"

    if st.session_state.chat_history == None:
        st.session_state.chat_history = FirestoreChatMessageHistory(firestore_client=st.session_state.db, collection_name="chat_histories", session_id = st.session_state.username , user_id=st.session_state.username)
        st.session_state.chat_history.add_user_message(system)
        st.session_state.chat_history.add_user_message(profile1)
        st.session_state.chat_history.add_user_message(profile2)
        st.session_state.chat_history.add_user_message(profile3)
        st.session_state.chat_history.add_user_message(init)
        st.session_state.chat_history.add_ai_message(init_reply)
        st.session_state.user_chat.append(init)
        st.session_state.ai_chat.append(init_reply)

    documents = load_documents()
    text_chunks = split_text_into_chunks(documents)
    embeddings = create_embeddings()
    vector_store = create_vector_store(text_chunks, embeddings)
    llm = create_llm_model()

    memory = create_conversation_memory()
    chain = create_conversation_chain(llm = llm, vector_store = vector_store, memory = memory)

    ai_container = st.container()
    user_container = st.container()

    with user_container:
        with st.form(key = "user_input_form", clear_on_submit = True):
            user_input = st.text_input("Question: ", placeholder = "Ask about your LinkedIn profile", key='user_input')
            submit = st.form_submit_button(label = "Send")

        if submit and user_input:
            ai_reply = conversation_chat(user_input, chain)
            st.session_state["user_chat"].append(user_input)
            st.session_state["ai_chat"].append(ai_reply)
        
        if st.session_state["ai_chat"]:
            with ai_container:
                for i in range(len(st.session_state["ai_chat"])):
                    user_message = st.chat_message(name = "user")
                    user_message.write(st.session_state["user_chat"][i])
                    ai_message = st.chat_message(name = "ai")
                    ai_message.write(st.session_state["ai_chat"][i])
