from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.chrome.service import Service
from linkedin_scraper import Person, actions
from selenium import webdriver

def validate_data(data) :
    if data is None or type(data) is WebElement:
        return 'no data found'
    elif type(data) is list:
        return data
    else :
        return data.strip()

def get_experience(experience) :
    full_experience_data = ""
    for i in range(len(experience)) :
        experience_data = f"""\n{i + 1}. {validate_data(experience[i].position_title)} at {validate_data(experience[i].institution_name)}\nWork duration is from {validate_data(experience[i].from_date)} to {validate_data(experience[i].to_date)}, a total of {validate_data(experience[i].duration)} at {validate_data(experience[i].location)}.\n\nI like to describe the job as follows :\n{validate_data(experience[i].description)}\n
        """
        full_experience_data += experience_data
    return full_experience_data

def get_education(education) :
    full_education_data = ""
    for i in range(len(education)) :
        education_data = f"""\n{i + 1}. {validate_data(education[i].degree)} at {validate_data(education[i].institution_name)}\n\nLearning duration is from {validate_data(education[i].from_date)} to {validate_data(education[i].to_date)}.\n\nI like to describe the experience as follows :\n\n{validate_data(education[i].description)}\n
        """
        full_education_data += education_data
    return full_education_data

def get_work_status(open_to_work) :
    if open_to_work :
        return 'open to work'
    else :
        return 'not open to work'

def get_name(name) :
    only_name = name.split('\n')[0]
    return only_name.strip()

def create_prompt(name, location, about, experience, education, interests, accomplishments, job_title, company, open_to_work) :
    prompt = f"""Hey, I am {get_name(name)} from {validate_data(location)}. I am currently a {validate_data(job_title)} at {validate_data(company)} and I am {get_work_status(open_to_work)} currently.
    \nI like to introduce myself as follows : \n\n{about}.
    \nMy work experience is as follows :\n{get_experience(experience)}
    \nMy education details are as follows :\n{get_education(education)}
    """
    return prompt

profiles = ["https://uk.linkedin.com/in/joshuasrowe/",
            "https://www.linkedin.com/in/pratik-ghadge-7b5056210/",
            "https://www.linkedin.com/in/ojaswini-prabhune-9ba11422b/",
            "https://www.linkedin.com/in/sara-shaikh/",
            "https://www.linkedin.com/in/abhishek-chaudhari13/"
            ]

service = Service('C:\\Users\\SURYAWANSHI SACHIN\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe')
driver = webdriver.Chrome(service = service)

accounts = [
    {
        "linkedin_username": "abhijeetsuryawanshi128@gmail.com",
        "linkedin_password": "abhijeet@12"
    },
    {
        "linkedin_username": "itsskofficial03@gmail.com",
        "linkedin_password": "skconnects@200803"
    },
    {
        "linkedin_username": "prabhuneojaswini@gmail.com",
        "linkedin_password": "Patankar@2003"
    },
    {
        "linkedin_username": "suryawanshiashish15@gmail.com",
        "linkedin_password": "MH12vlogs"
    }
]

actions.login(driver, email = accounts[3]["linkedin_username"], password = accounts[3]["linkedin_password"])

for profile in profiles:
    try:
        person = Person(linkedin_url = profile, driver = driver, close_on_complete=False)

        prompt = create_prompt(person.name, person.location, person.about, person.experiences, person.educations, person.interests, person.accomplishments, person.job_title, person.company, person.open_to_work).strip()

        with open(f"C:/Users/SURYAWANSHI SACHIN/Desktop/Sentient/Development/Sentient Web/model/data/raw/{get_name(person.name)}.txt", "w", encoding="utf-8") as file:
            file.write(prompt)
    except:
        continue