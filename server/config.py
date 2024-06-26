from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.secret_key = b"\x99-\x9fVi\xf6\xbc$\xc6\x9a\xfd}eg\xb3\xe4"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///bookworm.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = b"\x12\xf6\x94\xe5\xe36\xea\xd9I\x86\x95\xb5ci\x19@"
app.json.compact = False

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)
db.init_app(app)
Migrate(app, db)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)
