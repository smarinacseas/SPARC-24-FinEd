from flask import Flask, request, jsonify, flash
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from user import db, User
from flask_bcrypt import Bcrypt
import os

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
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password, module=-1)
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

    return jsonify({'message': 'Login successful'}), 200


#login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']       
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            session['user_id'] = user.user_id
            return redirect(url_for('dashboard'))
        else:
            error = 'Invalid username or password'
            return render_template('login.html', error=error)        
    return render_template('login.html')

#Register new user
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        age = request.form['age']
        occupation = request.form['occupation']

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            error = 'Username already exists. Please choose a different one.'
            return render_template('register.html', error=error)
        else:
            new_user = User(username=username, password=password, first_name=firstName, last_name=lastName, age=age, occupation=occupation)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('login'))


    return render_template('register.html')


@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return f'Welcome, {user.username}! This is your dashboard.'
    else:
        return redirect(url_for('login'))
    
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
