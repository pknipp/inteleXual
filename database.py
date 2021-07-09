from inteleXual.models import User, Project, File, Assignment
from inteleXual import app, db
from dotenv import load_dotenv
from datetime import date, datetime, timedelta
from faker import Faker
from random import randrange, seed, random
from werkzeug.security import generate_password_hash, check_password_hash

seed(1)
fake = Faker()
load_dotenv()

n_projects = 10
prob_assign = 0.7
n_files = 10
n_users = 10

# users = [("demo@aol.com", "Demo User"), ("jdoe@aol.com", "John Doe")]

with app.app_context():
    db.drop_all()
    db.create_all()
    # for user in users:
    for i in range(n_users):
        f_n = fake.first_name()
        l_n = fake.last_name()
        name = f_n + " " + l_n
        f_n = f_n.lower()[:6]
        l_n = l_n.lower()[:6]
        f = f_n[:1]
        l = l_n[:1]
        email0 = [f_n + l_n, f_n + '.' + l_n, f + l_n, f + '.' + l_n, f_n + l, f_n + '.' + l][randrange(6)]
        email = email0 + "@" + fake.email().split("@")[1]
        created_at = fake.date_time_between(start_date=datetime(2000, 1, 15))
        db.session.add(User(
            # email = fake.email
            email=email,
            name=name,
            created_at=created_at,
            updated_at=fake.date_time_between(start_date=created_at)
        ))
    db.session.commit()

with app.app_context():
    for i in range(n_projects):
        created_at=fake.date_time_between(start_date='-10y', end_date='now')
        db.session.add(Project(
            name=fake.text(max_nb_chars=20),
            proj_start_date=fake.date_between(start_date=created_at),
            created_at=created_at,
            updated_at=fake.date_time_between(start_date=created_at, end_date='now'),
        ))
        for j in range(n_files * 2):
            if random() < 0.5:
                file_created_at = fake.date_time_between(created_at)
                db.session.add(File(
                    project_id=(i + 1),
                    name=fake.text(max_nb_chars=20),
                    file_type=fake.text(max_nb_chars=5),
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
