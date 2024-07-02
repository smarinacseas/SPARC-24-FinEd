import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://postgres:Welcome1@financial-app-db.c92cqe6w64ar.us-east-2.rds.amazonaws.com:5432/initial_fin_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False 