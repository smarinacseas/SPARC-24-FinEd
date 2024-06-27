from flask import Flask
from dotenv import load_dotenv
import os

# Load env vars
load_dotenv()

app = Flask(__name__)

# Access env vars
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

@app.route('/')
def hello():
    return "Backend running! v1"

if __name__ == '__main__':
    app.run(debug = True)