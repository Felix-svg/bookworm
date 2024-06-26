from config import db, bcrypt, jwt
from sqlalchemy_serializer import SerializerMixin
from flask_jwt_extended import create_access_token


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationship associating user to related books
    books = db.relationship("Book", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def get_token(self, expires_in=3600):
        return create_access_token(identity=self.id, expires_delta=expires_in)

    def __repr__(self) -> str:
        return f"<User {self.id}: {self.username}>"


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    status = db.Column(db.String, default="unread")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, onupdate=db.func.now(), server_default=db.func.now()
    )

    # Relationship to associate book with its user
    user = db.relationship("User", back_populates="books")

    def __repr__(self):
        return f"<Book {self.id}: {self.title} by {self.author}>"
