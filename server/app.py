from datetime import datetime, timezone, timedelta
from flask import make_response, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from config import app, db, jwt
from models import User, Book, TokenBlocklist
from functools import wraps
from werkzeug.exceptions import HTTPException
from sqlalchemy.exc import SQLAlchemyError


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    return token is not None


def role_required(required_role):
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorated_view(*args, **kwargs):
            current_user_id = get_jwt_identity()
            current_user = User.query.get(current_user_id)
            if current_user.role != required_role:
                return jsonify({"error": "Access denied"}), 403
            return fn(*args, **kwargs)

        return decorated_view

    return wrapper


@app.route("/", methods=["GET"])
def index():
    return make_response(jsonify({"message": "BookWorm API"}), 200)


@app.route("/users", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_users():
    try:
        users = [
            user.to_dict(rules=["-books", "-password_hash"])
            for user in User.query.all()
        ]
        return make_response(jsonify({"users": users}), 200)
    except SQLAlchemyError as e:
        return make_response(jsonify({"error": "Database Error: " + str(e)}), 500)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.route("/users", methods=["POST"])
def create_user():
    try:
        data = request.get_json()
        if not data:
            return make_response(jsonify({"error": "No input data provided"}), 400)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return make_response(
                jsonify({"error": "username, email, and password are required fields"}),
                400,
            )

        new_user = User(username=username, email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()
        return make_response(
            jsonify({"message": f"User '{username}' registered successfully"}),
            201,
        )
    except SQLAlchemyError as e:
        db.session.rollback()
        return make_response(jsonify({"error": "Database Error: " + str(e)}), 500)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.route("/users/<int:id>", methods=["GET", "PATCH", "DELETE"])
@jwt_required()
@role_required("admin")
def user_by_id(id):
    try:
        if request.method == "GET":
            user = User.query.get(id)
            if not user:
                return make_response(jsonify({"error": f"User '{id}' not found"}), 404)
            user_dict = user.to_dict(rules=["-password_hash", "-books"])
            return make_response(jsonify({"user": user_dict}), 200)
        elif request.method == "PATCH":
            user = User.query.get(id)
            if not user:
                return make_response(jsonify({"error": f"User '{id}' not found"}), 404)

            data = request.get_json()
            if not data:
                return make_response(jsonify({"error": "No input data provided"}), 400)

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
        elif request.method == "DELETE":
            user = User.query.get(id)
            if not user:
                return make_response(jsonify({"error": f"User '{id}' not found"}), 404)
            db.session.delete(user)
            db.session.commit()
            return make_response(
                jsonify({"message": f"User '{id}' deleted successfully"}), 200
            )
    except SQLAlchemyError as e:
        db.session.rollback()
        return make_response(jsonify({"error": "Database Error: " + str(e)}), 500)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.route("/books", methods=["GET", "POST"])
@jwt_required()
def books():
    try:
        if request.method == "GET":
            user_id = get_jwt_identity()
            books = [
                book.to_dict(rules=["-user"])
                for book in Book.query.filter_by(user_id=user_id).all()
            ]
            return make_response(jsonify({"books": books}), 200)
        elif request.method == "POST":

            @role_required("user")
            def create_book():
                data = request.get_json()
                user_id = get_jwt_identity()
                if not data:
                    return make_response(
                        jsonify({"error": "No input data provided"}), 400
                    )

                title = data.get("title")
                author = data.get("author")
                genre = data.get("genre")

                if not title or not author or not genre:
                    return make_response(
                        jsonify(
                            {"error": "title, author, and genre are required fields"}
                        ),
                        400,
                    )

                new_book = Book(
                    title=title, author=author, genre=genre, user_id=user_id
                )
                db.session.add(new_book)
                db.session.commit()
                return make_response(
                    jsonify({"message": f"Book '{title}' added successfully"}), 201
                )

            return create_book()
    except SQLAlchemyError as e:
        db.session.rollback()
        return make_response(jsonify({"error": "Database Error: " + str(e)}), 500)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.route("/books/<int:id>", methods=["GET", "PATCH", "DELETE"])
@jwt_required()
def book_by_id(id):
    try:
        if request.method == "GET":
            book = Book.query.filter(Book.id == id).first()
            if not book:
                return make_response(jsonify({"error": f"Book '{id}' not found"}), 404)
            book_dict = book.to_dict(rules=["-user"])
            return make_response(jsonify({"book": book_dict}), 200)
        elif request.method == "PATCH":

            @role_required("user")
            def update_book():
                book = Book.query.filter(Book.id == id).first()
                if not book:
                    return make_response(
                        jsonify({"error": f"Book '{id}' not found"}), 404
                    )

                data = request.get_json()
                if not data:
                    return make_response(
                        jsonify({"error": "No input data provided"}), 400
                    )

                title = data.get("title")
                author = data.get("author")
                genre = data.get("genre")
                status = data.get("status")

                if title is not None:
                    book.title = title
                if author is not None:
                    book.author = author
                if genre is not None:
                    book.genre = genre
                if status is not None:
                    book.status = status

                db.session.commit()
                return make_response(
                    jsonify({"message": f"Book '{id}' updated successfully"}), 200
                )

            return update_book()
        elif request.method == "DELETE":

            @role_required("user")
            def delete_book():
                book = Book.query.filter(Book.id == id).first()
                if not book:
                    return make_response(
                        jsonify({"error": f"Book '{id}' not found"}), 404
                    )
                db.session.delete(book)
                db.session.commit()
                return make_response(
                    jsonify({"message": f"Book '{id}' deleted successfully"}), 200
                )

            return delete_book()
    except SQLAlchemyError as e:
        db.session.rollback()
        return make_response(jsonify({"error": "Database Error: " + str(e)}), 500)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return make_response(jsonify({"error": "No input data provided"}), 400)

        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(password):
            return make_response(jsonify({"message": "Invalid credentials!"}), 401)

        # Create token with an expiration time of 1 hour
        token = user.get_token(expires_in=timedelta(hours=1))
        return make_response(jsonify({"token": token}), 200)
    except SQLAlchemyError as e:
        return make_response(jsonify({"error": "Database Error: " + str(e)}), 500)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    try:
        jti = get_jwt()["jti"]
        token_block = TokenBlocklist(jti=jti, created_at=datetime.now(timezone.utc))
        db.session.add(token_block)
        db.session.commit()
        return make_response(jsonify({"message": "Successfully logged out"}), 200)
    except SQLAlchemyError as e:
        db.session.rollback()
        return make_response(jsonify({"error": "Database Error: " + str(e)}), 500)
    except Exception as e:
        return make_response(
            jsonify({"error": "Internal Server Error: " + str(e)}), 500
        )


@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return make_response(jsonify({"error": e.description}), e.code)
    return make_response(jsonify({"error": "Internal Server Error"}), 500)


if __name__ == "__main__":
    app.run(debug=True)
