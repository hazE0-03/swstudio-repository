from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

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

@app.get("/editor")
async def editor(request: Request):
    return templates.TemplateResponse(
        "editor.html",
        {"request": request}
    )
