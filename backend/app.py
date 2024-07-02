from flask import Flask, render_template, request, redirect, url_for, session
from config import Config
from user import db, User

#from dotenv import load_dotenv
import os

# Load env vars
#load_dotenv()

app = Flask(__name__, template_folder='../frontend/templates')
app.config.from_object(Config)
db.init_app(app)

# Access env vars
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

#To test that back end is working
@app.route('/')
def hello():
    return "Backend running!"

@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return 'Welcome to the Dashboard'

if __name__ == '__main__':
    app.run(debug = True)

