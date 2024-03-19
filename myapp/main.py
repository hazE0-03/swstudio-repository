from modules import app
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


templates = Jinja2Templates(directory="templates")
@app.get("/", response_class=HTMLResponse)
async def index():
    return templates.TemplateResponse("index.html")