from flask import Flask, request, jsonify, flash, render_template
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from user import db, User
from flask_bcrypt import Bcrypt
import os
import json  # Import the json module
import openai


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

# migrate = Migrate(app, db)

# migrate = Migrate(app, db)

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

openai.api_key = os.getenv('OPENAI_API_KEY')
os.environ['OPENAI_API_KEY']=openai.api_key
def message(question, demo_ans):
    age = demo_ans['age']
    income = demo_ans['income_level']
    gender = demo_ans['gender']
    fin_res = demo_ans['financial_responsibilities']
    savings = demo_ans['savings_investments']
    debt_stat = demo_ans['debt_status']
    fin_goal = demo_ans['financial_goals']

    client = openai.OpenAI()
    system_message = {"role" : "system",
                       "content": "You are the chatbot AI for our financial app. I will provide demographic information about users, including age, \
                        income level, gender, education level, marital status, location, financial goals, and financial literacy level. Your primary role \
                        is to address financial questions and offer the best financial advice based on this demographic information. Please ensure your responses \
                        are short, clear, and concise, within 200 words. Focus on offering practical advice related to budgeting, investing, debt management, or other financial topics.\
                        If needed, incorporate relevant demographic details and financial number to tailor the advice. For example, if a user asks about saving for retirement and their demographic data\
                        indicates they are a young professional with a high income, your advice should reflect that context" }
    stream = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "This is the demographic informationn about user - Age: " + age + ", gender: " + gender + ", income: " + income + "financial responsibilities: " \
                + fin_res + ", savings: " + savings + ", debt status: " + debt_stat + ", financial goals: " + fin_goal + ". This is the topic you should give an advice: " + question \
                 + "Please give a response with few sentences."}],
    stream=True,
    max_tokens=250
)
    final_res = ""
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            final_res += chunk.choices[0].delta.content
    return final_res



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
    user.mod1_advice = message("Which type of credit card is best for my financial situation: rewards, cash back, or low interest?", demographic_answers)
    user.mod2_advice = message("Can you help me calculate my debt-to-income ratio and provide advice based on that calculation?", demographic_answers)
    user.mod3_advice = message("Can you recommend the best strategies for managing and allocating funds between my checking and savings accounts?", demographic_answers)
    user.mod4_advice = message("With my financial goals and health, can you shared me how should I allocate my assets into retirement and investment accounts", demographic_answers)
    user.mod5_advice = message("What investment strategy would be most suitable for my financial goals and risk tolerance?", demographic_answers)
    user.mod6_advice = message("What are the best practices for creating a realistic and effective budget based on my income and expenses?", demographic_answers)

    db.session.commit()

    return jsonify({'message': 'Demographic data saved successfully'}), 200

# Get an advice for user
@app.route('/getAdvice', methods=['GET'])
@csrf.exempt
def getAdivce():
    typeAdvice = request.args.get('advice')
    user_id = request.args.get('user_id')
    print(f"Received request for advice: typeAdvice={typeAdvice}, user_id={user_id}")
    if not user_id:
        return jsonify({'message': 'User ID is required'}), 400
    
    user = User.query.get(user_id)
    # user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    advice = getattr(user, typeAdvice, None)
    if advice:
        return jsonify({'advice' : advice}), 200
    else:
        return jsonify({'message': f'Advice type "{typeAdvice}" not found for user'}), 404

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