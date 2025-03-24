from flask_security import hash_password
from model import *

def seed_initial_data(datastore):
    """
    Function to initialize default roles and users inside the app context.
    """
    # Create roles
    datastore.find_or_create_role(name='admin', desc='superuser')
    datastore.find_or_create_role(name='instructor', desc='teaches courses')
    datastore.find_or_create_role(name='student', desc='enrolled in courses')

    # Create admin user if not exists
    if not datastore.find_user(email='admin@seek.ai'):
        datastore.create_user(email='admin@seek.ai',fs_uniquifier='admin@seek.ai', password=hash_password('pass'), roles=['admin'], type = 'users')
    
    if not datastore.find_user(email='instructor@seek.ai'):
        datastore.create_user(email='instructor@seek.ai', fs_uniquifier='instructor@seek.ai',password=hash_password('pass'), roles=['instructor'], type = 'instructor')
    
    if not datastore.find_user(email='student@seek.ai'):
        datastore.create_user(email='student@seek.ai', fs_uniquifier='student@seek.ai', password=hash_password('pass'), roles=['student'], type = 'student')

    db.session.commit()
