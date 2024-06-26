from config import db, app
from models import User, Book

with app.app_context():
    print("Deleting all records")
    User.query.delete()
    Book.query.delete()

    print("Creating users")
    user1 = User(username="johndoe", email="johndoe@gmail.com")
    user1.set_password("1234")
    db.session.add(user1)
    db.session.commit()

    print("Creating books")
    book1 = Book(
        title="The Great Gatsby",
        author="F. Scott Fitzgerald",
        genre="Classic Literature",
        user_id=1,
    )
    db.session.add(book1)
    db.session.commit()

    print("Seeding database...")
    print("Seeding complete")
