import json

def analyze_student_risk(student_id, gpa, attendance_rate):
    """
    Mock AI function for analyzing a student's risk profile based on GPA and attendance.
    In production, this would call an LLM (e.g., OpenAI) with the student's full historical data.
    """
    try:
        # Mocking OpenAI response based on logic
        risk_level = "Low"
        factors = []
        recommendation = ""
        
        if attendance_rate < 75.0:
            risk_level = "High"
            factors.append("Critically low attendance")
            recommendation = "Immediate intervention required. Alert parents and schedule counseling."
        elif attendance_rate < 85.0:
            risk_level = "Medium"
            factors.append("Declining attendance trend")
            recommendation = "Send automated warning to student."
            
        if gpa < 2.5:
            risk_level = "High" if risk_level == "Medium" else risk_level
            factors.append("Low academic performance")
            recommendation += " Assign remedial classes."
            
        if risk_level == "Low":
            factors.append("Consistent attendance")
            factors.append("Good academic standing")
            recommendation = "Maintain current trajectory."

        response_data = {
            "student_id": student_id,
            "risk_level": risk_level,
            "risk_factors": factors,
            "ai_recommendation": recommendation.strip()
        }
        
        return response_data
    except Exception as e:
        return {"error": str(e)}
