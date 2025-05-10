from google import genai

client = genai.Client(api_key="AIzaSyAm9rUVgkqPg7xzqq4MRuItj4Ow5AOQzdE")

def aiscoregenerator(skills,hobbies,sleep_schedule,cgpa,leetcode,dept):
    prompt=f"""Assume you are the profile scorer of students studying in a university. Each student have separate skills, sleep schedules, academic performace etc. Based on all the details regarding the student provided below, generate an profile floating point score out of 100 for that particular student. Remember only return the score of the student
    Student details:
    - Skills: {skills}
    - Hobbies: {hobbies}
    - Sleep Schedule: {sleep_schedule}
    - CGPA: {cgpa}
    - Leetcode questions: {leetcode}
    - Department: {dept}
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    return response.text