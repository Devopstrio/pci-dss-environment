from fastapi import APIRouter
router = APIRouter()
@router.get('/logs')
def get_audit_logs():
    return []
