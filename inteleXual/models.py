from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(63), nullable=False, unique=True)
    email = db.Column(db.String(63), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

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
            "proj_start_date": self.proj_start_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    files = db.relationship("File", back_populates="project", cascade="all, delete-orphan")
    assignments = db.relationship("Assignment", back_populates="project", cascade="all, delete-orphan")


class File(db.Model, UserMixin):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    file_type_id = db.Column(db.Integer, db.ForeignKey("file_types.id"), nullable=False)
    name = db.Column(db.String(63), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    def to_dict(self):
        return {
            "id": self.id,
            "project_id": self.project_id,
            "file_type_id": self.file_type_id,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    project = db.relationship("Project", back_populates="files")
    file_type = db.relationship("FileType", back_populates="files")


class FileType(db.Model, UserMixin):
    __tablename__ = 'file_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(63), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    files = db.relationship("File", back_populates="file_type", cascade="all, delete-orphan")


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
