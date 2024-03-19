from modules import app
from fastapi.templating import Jinja2Templates


@app.route('/')
async def index():
    pass