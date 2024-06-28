from config import db, app
from models import User, Book

with app.app_context():
    print("Deleting all records")
    User.query.delete()
    Book.query.delete()

    print("Creating users")
    user1 = User(username="felixomondi", email="felixomosh7@gmail.com", role="admin")
    user1.set_password("1234")
    user2 = User(username="johndoe", email="johndoe@gmail.com")
    user2.set_password("1234")
    db.session.add_all([user1, user2])
    db.session.commit()

    print("Creating books")
    book1 = Book(
        title="The Great Gatsby",
        author="F. Scott Fitzgerald",
        genre="Classic Literature",
        user_id=1,
    )
    book2 = Book(
        title="1984",
        author="George Orwell",
        genre="Dystopian Fiction",
        user_id=2,
    )
    db.session.add_all([book1, book2])
    db.session.commit()

    print("Seeding database...")
    print("Seeding complete")
