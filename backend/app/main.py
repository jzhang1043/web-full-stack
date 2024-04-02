from fastapi import FastAPI
from os import environ as env

app = FastAPI()

@app.get("/")
def index():
    return {"index": f"Hello, World! Secret = {env['SECRET_KEY']}"}