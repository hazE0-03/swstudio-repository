from fastapi import FastAPI, Request, Response, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.security import APIKeyCookie
from fastapi.staticfiles import StaticFiles
from passlib.hash import sha256_crypt
from sqlalchemy import desc
from sqlalchemy.orm import Session
from datetime import datetime
import pytz
from db import db_session, Character, User


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

def get_current_time():
    current_datetime = datetime.now(pytz.timezone('Asia/Tokyo'))
    current_date = current_datetime.date
    current_time = current_datetime.time
    return current_date, current_time

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    if request.cookies.get("user_id") != None :
        login_status = True
        username = request.cookies.get("username")
        user_id = int(request.cookies.get("user_id"))
        characters = db_session.query(Character).filter(Character.user_id == user_id).order_by(desc(Character.update_time)).all()
        return templates.TemplateResponse(
            "index.html",
            {"request": request, "characters": characters, "username": username, "login_status": login_status}
        )
    else :
        return RedirectResponse("/login")

@app.get("/signup", response_class=HTMLResponse)
async def signup(request: Request):
    return templates.TemplateResponse(
        "signup.html",
        {"request": request}
    )

@app.post("/signup")
async def signup(request: Request):
    form = await request.form()
    username = form["username"]
    password = form["password"]

    existing_user = db_session.query(User).filter(User.username == username).first()
    if existing_user:
        return {"message": "Username already exists. Please choose a different username."}

    hashed_password = sha256_crypt.hash(password)
    user = User(username=username, password=hashed_password)
    
    db_session.add(user)
    db_session.commit()

    user_id = user.id
    username = user.username
    response = RedirectResponse("/", status_code=303) 
    response.set_cookie(key="user_id", value=str(user_id))
    response.set_cookie(key="username", value=username)
    return response

@app.get("/login", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse(
        "login.html",
        {"request": request}
    )

@app.post("/login")
async def login(request: Request):
    form = await request.form()
    username = form["username"]
    password = form["password"]

    user = db_session.query(User).filter(User.username == username).first()
    if user and sha256_crypt.verify(password, user.password):
        user_id = user.id

        response = RedirectResponse("/", status_code=303) 
        response.set_cookie(key="user_id", value=str(user_id))
        response.set_cookie(key="username", value=username)
        return response
    else:
        return RedirectResponse("/login", status_code=303)

@app.get("/logout")
async def logout(request: Request):
    response = RedirectResponse("/", status_code=303)
    response.delete_cookie("user_id")
    return response

@app.get("/create")
async def create(request: Request):
    if request.cookies.get("user_id") == None :
        return RedirectResponse("/login", status_code=303)
    else :
        login_status = True
        username = request.cookies.get("username")
        return templates.TemplateResponse(
            "create.html",
            {"request": request, "username": username, "login_status": login_status}
        )

@app.post("/create")
async def create(request: Request):
    form = await request.form()
    update_time = datetime.now(pytz.timezone('Asia/Tokyo')).replace(microsecond = 0)
    name = form["name"]
    impurity = form["impurity"]
    dexterity = form["dexterity"]
    agility = form["agility"]
    strength = form["strength"]
    vitality = form["vitality"]
    intelligence = form["intelligence"]
    spirit = form["spirit"]
    memo = form["memo"]
    user_id = int(request.cookies.get("user_id"))


    character = Character(name=name, impurity=impurity, dexterity=dexterity, agility=agility, strength=strength, vitality=vitality, intelligence=intelligence, spirit=spirit, memo=memo, update_time=update_time, user_id=user_id)

    db_session.add(character)
    db_session.commit()
    return RedirectResponse("/", status_code=303)

@app.get("/{id:int}/update")
async def update(request: Request, id: int):
    character = db_session.query(Character).get(id)
    if request.cookies.get("user_id") != None :
        username = request.cookies.get("username")
        login_status = True
        return templates.TemplateResponse(
            "update.html",
            {"request": request, "character": character, "username": username, "login_status": login_status}
        )
    else :
        login_status = False
        return templates.TemplateResponse(
            "update.html",
            {"request": request, "character": character, "login_status": login_status}
        )

@app.post("/{id:int}/update")
async def update(request: Request, id: int):
    character = db_session.query(Character).get(id)
    if request.cookies.get("user_id") == str(character.user_id) :
        form = await request.form()
        character.update_time = datetime.now(pytz.timezone('Asia/Tokyo')).replace(microsecond = 0)
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
    else:
        return RedirectResponse("/login")

@app.get("/{id:int}/delete")
async def delete(request: Request, id: int):
    character = db_session.query(Character).get(id)
    db_session.delete(character)
    db_session.commit()
    return RedirectResponse("/", status_code=303)

@app.get("/help", response_class=HTMLResponse)
async def help(request: Request):
    if request.cookies.get("user_id") != None :
        username = request.cookies.get("username")
        login_status = True
        return templates.TemplateResponse(
            "help.html",
            {"request": request, "username": username, "login_status": login_status}
        )
    else :
        login_status = False
        return templates.TemplateResponse(
            "help.html",
            {"request": request, "login_status": login_status}
        )