# from fastapi import FastAPI
# from app.database import check_db_connection

# app = FastAPI(title="Safety Compliance Backend")

# @app.on_event("startup")
# async def startup_event():
#     connected = await check_db_connection()
#     if connected:
#         print("✅ MongoDB Atlas connected successfully")
#     else:
#         print("❌ MongoDB Atlas connection failed")

# @app.get("/")
# def root():
#     return {"status": "Backend running"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import check_db_connection
from app.routes.company import router as company_router
from app.routes.auth import router as auth_router

# ✅ 1. CREATE APP FIRST
app = FastAPI(title="Safety Compliance Backend")

# ✅ 2. ADD CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # ⚠️ OK for dev/hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 3. STARTUP EVENT
@app.on_event("startup")
async def startup_event():
    connected = await check_db_connection()
    if connected:
        print("✅ MongoDB connected successfully")
    else:
        print("❌ MongoDB connection failed")

# ✅ 4. REGISTER ROUTERS (AFTER app IS CREATED)
app.include_router(company_router)
app.include_router(auth_router)

# ✅ 5. HEALTH CHECK
@app.get("/")
def root():
    return {"status": "Backend running"}
