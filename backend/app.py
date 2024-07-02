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

