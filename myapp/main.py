from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from random import randint

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    characters = [
        {"image_url": "画像1-png",
         "name": "トルト・リスベール",
         "update_time": "2024-3-18"},
        {"image_url": "画像2-png",
         "name": "レブン・マクマエリ",
         "update_time": "2024-3-19"},
    ]
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "characters": characters}
    )

@app.get("/create")
async def create(request: Request):
    return templates.TemplateResponse(
    race_features = {"人間":"[剣の加護／運命変転]",
    "エルフ": "[暗視][剣の加護／優しき水]",
    "ドワーフ":"[暗視][剣の加護／炎身]"}
        "create.html",
        {"request": request, "race_features":race_features}
    )

# @app.post("/create")
# async def create(request: Request):
#     return templates.TemplateResponse(
#         "create.html",
#         {"request": request}
#     )
