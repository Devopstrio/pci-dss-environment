from fastapi import APIRouter
router = APIRouter()
@router.post('/tokenize')
def tokenize_data():
    return {'status': 'tokenized'}
