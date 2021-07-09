from inteleXual.models import User, Project, File, FileType, Assignment
from inteleXual import app, db
from dotenv import load_dotenv
from datetime import date, datetime, timedelta
from faker import Faker
from random import randrange, seed, random
from werkzeug.security import generate_password_hash, check_password_hash

seed(1)
fake = Faker()
load_dotenv()

n_projects = 25
prob_assign = 0.5
n_files = 25
n_users = 30

# users = [("demo@aol.com", "Demo User"), ("jdoe@aol.com", "John Doe")]
file_types = ["xls", "doc", "pdf", "rtf", "jpg", "gif", "tiff", "png", "ppt", "eps", "mov", "html", "js", "py", "txt", "tex"]

with app.app_context():
    db.drop_all()
    db.create_all()
    for file_type in file_types:
        created_at = fake.date_time_between(start_date=datetime(2000, 1, 15))
        db.session.add(FileType(
            name=('.' + file_type),
            created_at=created_at,
            updated_at=fake.date_time_between(start_date=created_at)
        ))

    for i in range(n_users):
        f_n = fake.first_name()
        l_n = fake.last_name()
        name = f_n + " " + l_n
        f_n = f_n.lower()[:6]
        l_n = l_n.lower()[:6]
        f = f_n[:1]
        l = l_n[:1]
        email0 = [f_n+l_n,f_n+'.'+l_n,f+l_n,f+'.'+l_n,f_n+l,f_n+'.'+l,l_n+'.'+f_n,l_n+f,l_n+'.'+f,l+f_n][randrange(10)]
        email = email0 + "@" + fake.email().split("@")[1]
        created_at = fake.date_time_between(start_date=datetime(2000, 1, 15))
        db.session.add(User(
            email=email,
            name=name,
            created_at=created_at,
            updated_at=fake.date_time_between(start_date=created_at)
        ))

    for i in range(n_projects):
        created_at=fake.date_time_between(start_date='-10y', end_date='now')
        db.session.add(Project(
            name=fake.text(max_nb_chars=30)[:-1],
            proj_start_date=fake.date_between(start_date=created_at),
            created_at=created_at,
            updated_at=fake.date_time_between(start_date=created_at, end_date='now'),
        ))
        for j in range(n_files * 2):
            if random() < 0.5:
                file_created_at = fake.date_time_between(created_at)
                db.session.add(File(
                    project_id=(i + 1),
                    name=fake.text(max_nb_chars=30)[:-1],
                    file_type_id=(1 + randrange(len(file_types))),
                    created_at=file_created_at,
                    updated_at=fake.date_time_between(start_date=file_created_at)
                ))
        for j in range(n_users):
            if random() < prob_assign:
                db.session.add(Assignment(
                    project_id=(i + 1),
                    user_id=(j + 1),
                    created_at=fake.date_time_between(start_date=created_at)
                ))
    db.session.commit()
