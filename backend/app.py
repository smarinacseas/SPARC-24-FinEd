from flask import Flask, request, jsonify, flash, render_template
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from user import db, User
from flask_bcrypt import Bcrypt
import os
import json  # Import the json module


#for Debug
#import logging
#logging.basicConfig(level=logging.DEBUG)

# Load env vars from .env file
load_dotenv()

# Initialize Flask app with Bcrypt for password hashing
app = Flask(__name__)

# Set secret key (session management + CSRF protection)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Enable CSRF protection to ensure requests are from authenticated users
csrf = CSRFProtect(app)

# Initialize Bcrypt for password hashing
bcrypt = Bcrypt(app)

# Set up database from env vars
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# db.init_app(app) --> change to initialize SQLAlchemy (suitable for smaller scale project)
#db = SQLAlchemy(app)
db.init_app(app)

# Enable CORS for all routes
#CORS(app)
CORS(app, supports_credentials=True) 

#CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "OPTIONS"]}})
#CORS(app, resources={r"/api/*": {"origins": "*"}}) 
#CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}}) #for Debug

migrate = Migrate(app, db)

# Endpoint for registering a new user
@app.route('/register', methods=['POST'])
@csrf.exempt
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

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new user and add to database
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password, module=1, module1=0, module2=0, module3=0, module4=0, module5=0, module6=0, module7=0)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

# Endpoint for logging in an existing user
@app.route('/login', methods=['POST'])
@csrf.exempt
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Check if email and password are both provided
    if not email or not password:
        return jsonify({'message': 'All fields are required'}), 400


    # Retrieve existing user from database
    cur_user = User.query.filter_by(email=email).first()
    
    # Check login credential validity
    if not cur_user or not bcrypt.check_password_hash(cur_user.password, password):
        return jsonify({'message': 'The username or password is not correct. Please try again'}), 401

    return jsonify({'message': 'Login successful', 'user_id': cur_user.id, 'demographicsCompleted': cur_user.demographics_completed}), 200


# Endpoint for demographics info
@app.route('/info', methods=['POST'])
@csrf.exempt
def demographics():
    data = request.json
    user_id = data.get('user_id')
    demographic_answers = data.get('answers')  # Assume this is a dictionary of answers

    # Find the user
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Save the answers to the database (You might need to create a separate table or columns)
    # For simplicity, assuming you store it as a JSON string
    #  in the user model
    user.demographic_data = json.dumps(demographic_answers)
    user.demographics_completed = True
    db.session.commit()

    return jsonify({'message': 'Demographic data saved successfully'}), 200

# Endpoint for quiz page
@app.route('/quiz', methods=['GET'])
def quiz():
    questions = [
            {
                "question": "What is Quiz Question 1:",
                "options": ["One", "Two", "Three", "Four"],
                "answer": "One"
            },
            {
                "question": "What is Quiz Question 2:",
                "options": ["One", "Two", "Three", "Four"],
                "answer": "One"
            },
            {
                "question": "What is Quiz Question 3:",
                "options": ["One", "Two", "Three", "Four"],
                "answer": "One"
            },
            {
                "question": "What is Quiz Question 4:",
                "options": ["One", "Two", "Three", "Four"],
                "answer": "One"
            },
            {
                "question": "What is Quiz Question 5:",
                "options": ["One", "Two", "Three", "Four", "Five"],
                "answer": "One"
            },
            {
                "question": "What is Quiz Question 6:",
                "options": ["One", "Two", "Three", "Four"],
                "answer": "One"
            }
        ]
    return jsonify(questions)


#@app.after_request
#def after_request(response):
#    response.headers['X-CSRFToken'] = generate_csrf()
#    return response

#@app.route('/api/get-csrf-token', methods=['GET'])
#def get_csrf_token():
#    return jsonify({'csrfToken': generate_csrf()})


#route to update progress
#@app.route('/api/update-progress', methods=['POST', 'OPTIONS'])
    #if request.method == 'OPTIONS':
        # Handle CORS preflight requests
    #    response = jsonify({'status': 'success'})
    #    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    #    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    #    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    #    return response
    
    # Your logic for handling the request

    
# Endpoint for logging in an existing user
@app.route('/update-progress', methods=['POST'])
@csrf.exempt
def update_progress():
    data = request.json
    email = data.get('email')
    module = data.get('module')
    progress = data.get('progress')

    user = User.query.filter_by(email=email).first()
    if user:
        if module == "module1":
           user.module1 = progress
        elif module == "module2":
            user.module2 = progress
        elif module == "module3":
            user.module3 = progress
        elif module == "module4":
            user.module4 = progress
        elif module == "module5":
            user.module5 = progress
        elif module == "module6":
            user.module6 = progress
        elif module == "module7":
            user.module7 = progress

        db.session.commit()
        return jsonify({"message": "Progress updated successfully."}), 200
    else:
        return jsonify({"message": "User not found."}), 404


#@app.route('/get-progress', methods=['POST'])
@app.route('/get-progress', methods=['GET'])
@csrf.exempt
def get_progress():
    email = request.args.get('email')

    if not email:
        return jsonify({"message": "Email parameter is missing."}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        module_progress = {
            "module1": user.module1,
            "module2": user.module2,
            "module3": user.module3,
            "module4": user.module4,
            "module5": user.module5,
            "module6": user.module6,
            "module7": user.module7
        }

        print('Sending progress data:', module_progress)
        return jsonify(module_progress), 200
    else:
        return jsonify({"message": "User not found."}), 404


if __name__ == '__main__':
    app.run(debug=True)