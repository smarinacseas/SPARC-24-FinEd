from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

users = {}  # Temporary in-memory user store

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    if not first_name or not last_name or not email or not password:
        return jsonify({'message': 'All fields are required'}), 400

    if email in users:
        return jsonify({'message': 'User already exists'}), 400

    users[email] = {
        'first_name': first_name,
        'last_name': last_name,
        'password': password
    }

    print("Current users:", users);

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'All fields are required'}), 400


    user = users.get(email)
    if not user or user['password'] != password:
        return jsonify({'message': 'Invalid credentials'}), 401

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
    app.run(debug = True)
