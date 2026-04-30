from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, compliance, audit, tokenization, encryption, access, dashboard, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(compliance.router, prefix="/compliance", tags=["compliance"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(tokenization.router, prefix="/tokenization", tags=["tokenization"])
api_router.include_router(encryption.router, prefix="/encryption", tags=["encryption"])
api_router.include_router(access.router, prefix="/access", tags=["access"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
