from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habits.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Habit Model
class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True, index=True)  # Index for faster lookups
    water = db.Column(db.Integer, default=0)
    sleep_time = db.Column(db.String(10))
    wake_time = db.Column(db.String(10))
    workout = db.Column(db.Integer, default=0)

# 🚀 Register & Login (Optional if using token-based authentication)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or "email" not in data or "password" not in data:
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({'message': 'Login successful!', 'email': user.email}), 200

# ✅ **Update Habit Data (Only for Logged-in User)**
@app.route('/update-habit', methods=['POST'])
def update_habit():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Check if the habit entry exists
    habit = Habit.query.filter_by(email=email).first()

    if not habit:
        # Create a new entry if not found
        habit = Habit(email=email, water=data['water'], sleep_time=data['sleep']['sleepTime'], wake_time=data['sleep']['wakeTime'], workout=data['workout'])
        db.session.add(habit)
    else:
        # Update existing habit entry
        habit.water = data['water']
        habit.sleep_time = data['sleep']['sleepTime']
        habit.wake_time = data['sleep']['wakeTime']
        habit.workout = data['workout']

    db.session.commit()
    return jsonify({'message': 'Habit updated successfully'}), 200

# ✅ **Get User's Habit Data**
@app.route('/get-habit/<email>', methods=['GET'])
def get_habit(email):
    habit = Habit.query.filter_by(email=email).first()
    if not habit:
        return jsonify({'error': 'No habit data found for this user'}), 404

    return jsonify({
        'email': habit.email,
        'water': habit.water,
        'sleep': {'sleepTime': habit.sleep_time, 'wakeTime': habit.wake_time},
        'workout': habit.workout
    }), 200

# Run Flask App
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
