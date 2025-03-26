from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Session Configuration
app.config['SECRET_KEY'] = "your_secret_key_here"  # 🔒 Change this!
app.config['SESSION_TYPE'] = 'filesystem'  # Store sessions in files
Session(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not all(key in data for key in ['email', 'password']):
        return error_response("Missing email or password", 400)

    if User.query.filter_by(email=data['email']).first():

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(email=data['email'], password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
