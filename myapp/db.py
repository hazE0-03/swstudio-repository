from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime
import pytz

engine = create_engine("sqlite:///database.db", echo=True)
db_session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )
)
Base = declarative_base()
Base.query = db_session.query_property()
Base.metadata.create_all(bind=engine)

class Character(Base):
    __tablename__ = "character_class"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    impurity = Column(Integer)
    # race = Column(String(15))
    # subrace = Column(String(15))
    # birth = Column(String(10))
    dexterity = Column(Integer)
    agility = Column(Integer)
    strength = Column(Integer)
    vitality = Column(Integer)
    intelligence = Column(Integer)
    spirit = Column(Integer)
    # fighter = Column(Integer)
    # grappler = Column(Integer)
    # fencer = Column(Integer)
    # shooter = Column(Integer)
    # battledancer = Column(Integer)
    # sorcerer = Column(Integer)
    # conjurer = Column(Integer)
    # priest = Column(Integer)
    # fairytamer = Column(Integer)
    # magitech = Column(Integer)
    # demonruler = Column(Integer)
    # druid = Column(Integer)
    # scout = Column(Integer)
    # ranger = Column(Integer)
    # enhancer = Column(Integer)
    # bird = Column(Integer)
    # rider = Column(Integer)
    # alchemist = Column(Integer)
    # warleader = Column(Integer)
    # geomancer = Column(Integer)
    memo = Column(String)
    update_time = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="characters")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(30), unique=True)
    password = Column(String(12))
    characters = relationship("Character", back_populates="user")

if not inspect(engine).has_table("character_class"):
    Base.metadata.create_all(bind=engine, tables=[Character.__table__])
if not inspect(engine).has_table("users"):
    Base.metadata.create_all(bind=engine, tables=[User.__table__])