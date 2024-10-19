from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Faltan datos."}), 400

    new_user = User(email=data['email'], password=data['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "Usuario creado exitosamente."}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:  # Aquí deberías usar un método de hash en lugar de comparar la contraseña directamente
        return jsonify({"message": "Login successful", "user": user.serialize()}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401