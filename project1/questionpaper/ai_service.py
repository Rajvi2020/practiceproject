import json
import os
from openai import OpenAI
from django.conf import settings

def generate_question_paper_ai(subject, topic, difficulty, total_marks):
    """
    OpenAI API integration for generating question papers.
    Falls back to mock if OPENAI_API_KEY is not set.
    """
    api_key = getattr(settings, 'OPENAI_API_KEY', None) or os.environ.get('OPENAI_API_KEY')
    
    if api_key and api_key != 'your-api-key':
        try:
            client = OpenAI(api_key=api_key)
            prompt = f"Generate a {difficulty} question paper for {subject} on {topic} for {total_marks} marks. Return a JSON object with 'subject', 'topic', 'difficulty', 'total_marks', and 'questions' (a list of objects with 'q_number', 'text', and 'marks')."
            
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are an expert academic question paper generator."},
                    {"role": "user", "content": prompt}
                ],
                response_format={ "type": "json_object" }
            )
            result = json.loads(response.choices[0].message.content)
            result["generated_via"] = "OpenAI GPT-4"
            return json.dumps(result, indent=2)
        except Exception as e:
            print(f"OpenAI API failed: {e}. Falling back to mock data.")

    # Mocking the AI response for demonstration
    mock_paper_content = {
        "subject": subject,
        "topic": topic,
        "difficulty": difficulty,
        "total_marks": total_marks,
        "questions": [
            {
                "q_number": 1,
                "text": f"Explain the core concepts of {topic} in {subject}.",
                "marks": int(total_marks * 0.4)
            },
            {
                "q_number": 2,
                "text": f"What are the real-world applications of {topic}?",
                "marks": int(total_marks * 0.3)
            },
            {
                "q_number": 3,
                "text": f"Discuss the theoretical limitations of {topic} and propose solutions.",
                "marks": int(total_marks * 0.3)
            }
        ],
        "generated_via": "OpenAI GPT-4 Mock"
    }
    
    return json.dumps(mock_paper_content, indent=2)
