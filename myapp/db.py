from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String 

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
class character(Base):
    __tablename__ = "character_class"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    race = Column(String(15))
    subrace = Column(String(15))
    birth = Column(String(10))
    dexterity = Column(Integer)
    agility = Column(Integer)
    strength = Column(Integer)
    vitality = Column(Integer)
    intelligence = Column(Integer)
    spirit = Column(Integer)
    profession = Column(String(50))
    
