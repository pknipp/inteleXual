from flask import Blueprint, request, redirect
from inteleXual.models import db, Project, User, File, Assignment, FileType
# from datetime import datetime
# from flask_login import login_required, logout_user, login_user, current_user
# from sqlalchemy import or_

projects = Blueprint('projects', __name__)


@projects.route('', methods=['GET'])
def all():
    if request.method == 'GET':
        response = Project.query.all()
        return {"projects": [project.to_dict() for project in response]}

@projects.route('/<id>', methods=['GET'])
def one(id):
    if request.method == 'GET':
        project = Project.query.get(int(id))
        file_list = list()
        files = File.query.filter(File.project_id == id)
        for file in files:
            file = file.to_dict()
            file["file_type"] = FileType.query.get(file["file_type_id"]).name
            file_list.append(file)
        assignments = Assignment.query.filter(Assignment.project_id == id)
        users = list()
        for assignment in assignments:
            users.append(User.query.get(assignment.user_id).to_dict())
        return {"project": project.to_dict(), "files": file_list, "users": users}
