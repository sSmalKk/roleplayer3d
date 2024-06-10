# index.py
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure key in production
jwt = JWTManager(app)

# Dummy database for demonstration purposes
users = [
    {'username': 'admin', 'password': 'admin', 'role': 'adm'},
    {'username': 'client1', 'password': 'password1', 'role': 'client'},
    {'username': 'client2', 'password': 'password2', 'role': 'client'}
]

universes = [
    {'id': 1, 'name': 'Universe 1'},
    {'id': 2, 'name': 'Universe 2'}
]

# Authentication endpoint
@app.route('/api/login', methods=['POST'])
def login():
    auth = request.get_json()
    user = next((u for u in users if u['username'] == auth['username'] and u['password'] == auth['password']), None)
    if user:
        access_token = create_access_token(identity=user)
        return jsonify({'access_token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# Dummy endpoint accessible without authentication
@app.route('/api/python')
def hello_world():
    return "<p>Hello, World!</p>"

# Protected endpoint example
@app.route('/api/protected')
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
