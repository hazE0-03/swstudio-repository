from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from random import randint
from db import db_session, Character
from datetime import datetime
import pytz

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    characters = db_session.query(Character).all()
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "characters": characters}
    )

@app.get("/create")
async def create(request: Request):
    return templates.TemplateResponse(
        "create.html",
        {"request": request}
    )

@app.post("/create")
async def create(request: Request):
    form = await request.form()
    current_time = datetime.now(pytz.timezone('Asia/Tokyo'))
    update_time = current_time
    name = form["name"]
    impurity = form["impurity"]
    dexterity = form["dexterity"]
    agility = form["agility"]
    strength = form["strength"]
    vitality = form["vitality"]
    intelligence = form["intelligence"]
    spirit = form["spirit"]
    memo = form["memo"]


    character = Character(name=name, impurity=impurity, dexterity=dexterity, agility=agility, strength=strength, vitality=vitality, intelligence=intelligence, spirit=spirit, memo=memo, update_time=update_time)

    db_session.add(character)
    db_session.commit()
    return RedirectResponse("/", status_code=303)

@app.get("/{id:int}/update")
async def update(request: Request, id: int):
    character = Character.query.get(id)
    return templates.TemplateResponse(
        "update.html",
        {"request": request, "character": character}
    )

@app.post("/{id:int}/update")
async def update(request: Request, id: int):
    character = Character.query.get(id)
    form = await request.form()
    current_time = datetime.now(pytz.timezone('Asia/Tokyo'))
    character.update_time = current_time
    character.name = form["name"]
    character.impurity = form["impurity"]
    character.dexterity = form["dexterity"]
    character.agility = form["agility"]
    character.strength = form["strength"]
    character.vitality = form["vitality"]
    character.intelligence = form["intelligence"]
    character.spirit = form["spirit"]
    character.memo = form["memo"]

    db_session.commit()
    return RedirectResponse("/", status_code=303)

@app.get("/{id:int}/delete")
async def delete(request: Request, id: int):
    character = Character.query.get(id)
    db_session.delete(character)
    db_session.commit()
    return RedirectResponse("/", status_code=303)