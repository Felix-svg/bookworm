from flask import Flask, session, make_response, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import app, db
from models import User, Book


# Routes
@app.route("/", methods=["GET"])
def index():
    return make_response(jsonify({"message": "BookWorm API"}), 200)


@app.route("/users", methods=["GET", "POST"])
def users():
    try:
        if request.method == "GET":
            try:
                users = [
                    user.to_dict(rules=["-books", "-password_hash"])
                    for user in User.query.all()
                ]
                return make_response(jsonify({"users": users}), 200)
            except Exception as e:
                return make_response(jsonify({"error": str(e)}), 400)
        elif request.method == "POST":
            try:
                data = request.get_json()

                if not data:
                    return make_response(
                        jsonify({"error": "No input data provided"}), 400
                    )

                username = data.get("username")
                email = data.get("email")
                password = data.get("password")

                if not username or not email or not password:
                    return make_response(
                        jsonify(
                            {
                                "error": "username, email, and password are required fields"
                            }
                        ),
                        400,
                    )

                new_user = User(username=username, email=email)
                new_user.set_password(password)

                db.session.add(new_user)
                db.session.commit()
                return make_response(
                    jsonify({"message": f"User '{username}' created successfully"}), 201
                )
            except Exception as e:
                db.session.rollback()
                return make_response(jsonify({"error": str(e)}), 400)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.route("/users/<int:id>", methods=["GET", "PATCH", "DELETE"])
def user_by_id(id):
    try:
        if request.method == "GET":
            try:
                user = User.query.get(id)
                if not user:
                    return make_response(
                        jsonify({"error": f"User '{id}' not found"}), 404
                    )
                user_dict = user.to_dict(rules=["-password_hash", "-books"])
                return make_response(jsonify({"user": user_dict}), 200)
            except Exception as e:
                return make_response(jsonify({"error": str(e)}), 400)
        elif request.method == "PATCH":
            try:
                user = User.query.get(id)
                if not user:
                    return make_response(
                        jsonify({"error": f"User '{id}' not found"}), 404
                    )

                data = request.get_json()
                if not data:
                    return make_response(
                        jsonify({"error": "No input data provided"}), 400
                    )

                username = data.get("username")
                email = data.get("email")
                password = data.get("password")

                if username is not None:
                    user.username = username
                if email is not None:
                    user.email = email
                if password is not None:
                    user.set_password(password)

                db.session.commit()
                return make_response(
                    jsonify({"message": f"User '{id}' updated successfully"}), 200
                )
            except Exception as e:
                db.session.rollback()
                return make_response(jsonify({"error": str(e)}), 400)
        elif request.method == "DELETE":
            try:
                user = User.query.get(id)
                if not user:
                    return make_response(
                        jsonify({"error": f"User '{id}' not found"}), 404
                    )
                db.session.delete(user)
                db.session.commit()
                return make_response(
                    jsonify({"message": f"User '{id}' deleted successfully"}), 200
                )
            except Exception as e:
                db.session.rollback()
                return make_response(jsonify({"error": str(e)}), 400)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


if __name__ == "__main__":
    app.run(debug=True)
