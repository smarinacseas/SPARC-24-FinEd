from flask import Flask, request, jsonify, flash
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from user import db, User

import os

load_dotenv()
app = Flask(__name__)

# Set up database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Welcome1@financial-app-db.c92cqe6w64ar.us-east-2.rds.amazonaws.com:5432/initial_fin_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

CORS(app)  # Enable CORS for all routes

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    # Check if all fields are filled in correctly
    if not first_name or not last_name or not email or not password:
        return jsonify({'message': 'All fields are required'}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User Email already exists'}), 400

    new_user = User(first_name=first_name, last_name=last_name, email=email, password=password, module=-1)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'All fields are required'}), 400

    cur_user = User.query.filter_by(email=email).first()
    
    if not cur_user or cur_user.password != password:
        return jsonify({'message': 'The username or password is not correct. Please try again'}), 401

    return jsonify({'message': 'Login successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)