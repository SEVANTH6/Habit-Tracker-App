from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Change for MySQL/PostgreSQL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Store registration date & time

# Helper function for error responses
def error_response(message, status_code):
    return jsonify({'error': message}), status_code

# Registration Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or not all(key in data for key in ['email', 'password']):
        return error_response("Missing email or password", 400)

    if User.query.filter_by(email=data['email']).first():
        return error_response("Email already exists. Please Login You Already Have an Account", 400)

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(email=data['email'], password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully', 'created_at': new_user.created_at}), 201

# User Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return error_response("Please provide both email and password.", 400)

    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return error_response("This email is not registered. Please sign up first.", 404)

    if not bcrypt.check_password_hash(user.password, data['password']):
        return error_response("Incorrect password. Please try again.", 401)

    return jsonify({'message': 'Login successful!', 'email': user.email, 'created_at': user.created_at}), 200

@app.route('/habits', methods=['POST'])
def habit():
    return "Hello Wait happening"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
