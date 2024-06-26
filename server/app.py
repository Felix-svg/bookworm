from flask import session, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import app, db
from models import User, Book


# routes
@app.route("/", methods=["GET"])
def index():
    return make_response({"message": "BookWorm API"}, 200)


if __name__ == "__main__":
    app.run(debug=True)
