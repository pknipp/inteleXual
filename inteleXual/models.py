from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(63), nullable=False, unique=True)
    email = db.Column(db.String(63), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def authenticate(cls, email, password):
        user = cls.query.filter(User.email == email).scalar()
        if user:
            return check_password_hash(user.hashed_password, password), user
        else:
            return False, None


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    assignments = db.relationship("Assignment", back_populates="user", cascade="all, delete-orphan")


class Project(db.Model, UserMixin):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(63), nullable=False, unique=True)
    proj_start_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.proj_start_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    files = db.relationship("File", back_populates="project", cascade="all, delete-orphan")
    assignments = db.relationship("Assignment", back_populates="project", cascade="all, delete-orphan")


class File(db.Model, UserMixin):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    name = db.Column(db.String(63), nullable=False, unique=True)
    file_type = db.Column(db.String(63), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    def to_dict(self):
        return {
            "id": self.id,
            "project_id": self.projet_id,
            "name": self.name,
            "file_type": self.file_type,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    project = db.relationship("Project", back_populates="files")


class Assignment(db.Model, UserMixin):
    __tablename__ = 'assignments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_id = db.Column(db.Integer,db.ForeignKey("projects.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "project_id": self.date_id,
            "created_at": self.created_at
        }
        
    user = db.relationship("User", back_populates="assignments")
    project = db.relationship("Project", back_populates="assignments")
