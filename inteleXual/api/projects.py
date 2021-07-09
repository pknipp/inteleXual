from flask import Blueprint, request, redirect
from inteleXual.models import db, Project, User, File, Assignment
# from datetime import datetime
# from flask_login import login_required, logout_user, login_user, current_user
# from sqlalchemy import or_

projects = Blueprint('projects', __name__)


@projects.route('', methods=['GET'])
def index():
    if request.method == 'GET':
        response = Project.query.all()
        return {"projects": [project.to_dict() for project in response]}

@projects.route('/<id>', methods=['GET'])
def one(id):
    if request.method == 'GET':
        project = Project.query.get(int(id))
        files = [file.to_dict() for file in File.query.filter(File.project_id == id)]
        assignments = Assignment.query.filter(Assignment.project_id == id)
        users = list()
        for assignment in assignments:
            users.append(User.query.get(assignment.user_id).to_dict())
        return {"project": project.to_dict(), "files": files, "users": users}
