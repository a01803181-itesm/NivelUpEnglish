from fastapi import APIRouter, Depends, HTTPException
from app.core.firebase.security import verify_firebase_token
from app.core.database import DBSession
from app.crud import students, courses

router = APIRouter()

@router.get("/")
async def get_dashboard_data(
    db: DBSession,
    token_data: dict = Depends(verify_firebase_token),
):
    firebase_uid = token_data.get("uid", "")
    google_name = token_data.get("name", "")
    google_email = token_data.get("email", "")

    success = await students.upsert_student(db, firebase_uid, google_name, google_email)

    if not success:
        raise HTTPException(status_code=500, detail="Database synchronization failed")

    await db.commit()
    
    course_data = await courses.get_student_course(db, firebase_uid)
    
    if not course_data:
        return {"status": "unenrolled", "message": "Go to Browse Courses"}
        
    return {"status": "enrolled", "course": course_data}