from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = "customer_db"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer)
    occupation = db.Column(db.String(50))
    #module = db.Column(db.Integer)
    module = db.Column(db.Integer) 
    demographics_completed= db.Column(db.Boolean, default=False)
    module1 = db.Column(db.Integer, default=0)
    module2 = db.Column(db.Integer, default=0)
    module3 = db.Column(db.Integer, default=0)
    module4 = db.Column(db.Integer, default=0)
    module5 = db.Column(db.Integer, default=0)
    module6 = db.Column(db.Integer, default=0)
    module7 = db.Column(db.Integer, default=0)
    demographic_data = db.Column(db.Text)

    def __repr__(self):
        return f'<User {self.email}>'
    
