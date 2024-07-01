from dotenv import load_dotenv
from config import db, app
from models import User, Book

load_dotenv()

with app.app_context():
    print("Deleting all records")
    User.query.delete()
    Book.query.delete()

    print("Creating users")
    user1 = User(username="admin", email="admin@bookworm.com", role="admin")
    user1.set_password("Admin1234")
    user2 = User(username="johndoe", email="johndoe@gmail.com")
    user2.set_password("John1234")
    user3 = User(username="janedoe", email="janedoe@gmail.com")
    user3.set_password("Jane1234")
    db.session.add_all([user1, user2, user3])
    db.session.commit()

    # Debug: Print users after committing
    print("Users created:")
    for user in User.query.all():
        print(f"User ID: {user.id}, Username: {user.username}")

    print("Creating books")
    book1 = Book(
        title="The Great Gatsby",
        author="F. Scott Fitzgerald",
        genre="Classic Literature",
        user_id=user1.id,
    )
    book2 = Book(
        title="1984",
        author="George Orwell",
        genre="Dystopian Fiction",
        user_id=user1.id,
    )
    book3 = Book(
        title="The Art of War",
        author="Sun Tzu",
        genre="Military Strategy and Philosophy",
        user_id=user2.id,
    )
    book4 = Book(
        title="Kidagaa Kimemwozea",
        author="Ken Walibora",
        genre="Swahili Fiction",
        user_id=user3.id,
    )
    book5 = Book(
        title="The River and the Source",
        author="Margaret A. Ogola",
        genre="Fiction",
        user_id=user3.id,
    )
    book6 = Book(
        title="The Caucasian Chalk Circle",
        author="Bertolt Brecht",
        genre="Epic theatre",
        user_id=user2.id,
    )
    book7 = Book(
        title="The 48 Laws of Power",
        author="Robert Greene",
        genre="Self-help book",
        user_id=user2.id,
    )
    db.session.add_all([book1, book2, book3, book4, book5, book6, book7])
    db.session.commit()

    print("Seeding database complete")
