from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
import pytz

engine = create_engine("sqlite3:///database.db", echo=True)
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
    race = Column(String(15))
    subrace = Column(String(15))
    birth = Column(String(10))
    dexterity = Column(Integer)
    agility = Column(Integer)
    strength = Column(Integer)
    vitality = Column(Integer)
    intelligence = Column(Integer)
    spirit = Column(Integer)
    fighter = Column(Integer)
    grappler = Column(Integer)
    fencer = Column(Integer)
    shooter = Column(Integer)
    battledancer = Column(Integer)
    sorcerer = Column(Integer)
    conjurer = Column(Integer)
    priest = Column(Integer)
    fairytamer = Column(Integer)
    magitech = Column(Integer)
    demonruler = Column(Integer)
    druid = Column(Integer)
    scout = Column(Integer)
    ranger = Column(Integer)
    enhancer = Column(Integer)
    bird = Column(Integer)
    rider = Column(Integer)
    alchemist = Column(Integer)
    warleader = Column(Integer)
    geomancer = Column(Integer)
    memo = Column(String)
    user_name = Column(String(50))
    update_time = Column(DateTime, default=datetime.now(pytz.timezone('Asia/Tokyo')), onupdate=datetime.now(pytz.timezone('Asia/Tokyo')), nullable=False)

