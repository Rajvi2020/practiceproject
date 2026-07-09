import json
import random
import os
from openai import OpenAI
from django.conf import settings

def evaluate_submission_ai(assignment_title, student_answer):
    """
    OpenAI API integration for grading submissions.
    """
    api_key = getattr(settings, 'OPENAI_API_KEY', None) or os.environ.get('OPENAI_API_KEY')
    
    if api_key and api_key != 'your-api-key':
        try:
            client = OpenAI(api_key=api_key)
            prompt = f"Evaluate a submission for assignment '{assignment_title}'. The student's answer is: '{student_answer}'. Provide a JSON response with 'score' (integer out of 100) and 'feedback' (string)."
            
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are an expert AI grader."},
                    {"role": "user", "content": prompt}
                ],
                response_format={ "type": "json_object" }
            )
            result = json.loads(response.choices[0].message.content)
            return {
                "assignment_title": assignment_title,
                "score": result.get("score", 0),
                "max_score": 100,
                "feedback": result.get("feedback", ""),
                "ai_suggestions": "Review chapter 4 for deeper insights on this topic.",
                "graded_via": "OpenAI GPT-4"
            }
        except Exception as e:
            print(f"OpenAI API failed: {e}. Falling back to mock data.")

    # Mock AI Grading Logic
    base_score = random.randint(60, 95)
    feedback_options = [
        "Good understanding of the core concepts, but lacks depth in the final section.",
        "Excellent analytical approach. The conclusion is very well justified.",
        "The submission meets the requirements, though formatting could be improved.",
        "Struggles with the main premise, but shows effort in the methodology."
    ]
    feedback = random.choice(feedback_options)
    
    evaluation = {
        "assignment_title": assignment_title,
        "score": base_score,
        "max_score": 100,
        "feedback": feedback,
        "ai_suggestions": "Review chapter 4 for deeper insights on this topic.",
        "graded_via": "OpenAI GPT-4 Mock"
    }
    
    return evaluation
