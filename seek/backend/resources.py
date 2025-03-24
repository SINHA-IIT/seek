from flask import jsonify, request
from flask_restful import Api, Resource
from flask_security import auth_required, current_user
from model import db, Course, Role, roles_users

api = Api(prefix='/api')

def is_admin(user_id):
    role_mapping = db.session.execute(
        db.select(roles_users.c.role_id).where(roles_users.c.user_id == user_id)
    ).fetchone()

    if role_mapping:
        role_id = role_mapping[0]
        role = Role.query.filter_by(id=role_id).first()
        return role and role.name == "admin"

    return False

class CourseResource(Resource):
    @auth_required('token')
    def post(self):
        if not is_admin(current_user.user_id):
            return {"message": "You are not an admin and not allowed to do that."}, 403

        try:
            data = request.get_json()
            name = data.get("name")
            desc = data.get("desc")
            term_name = data.get("term_name")
            course_code = data.get("course_code")

            if not name or not term_name or not course_code:
                return {"message": "Invalid data."}, 400

            if Course.query.filter_by(course_code=course_code, term_name=term_name).first():
                return {"message": "Course already exists."}, 409

            new_course = Course(name=name, desc=desc, term_name=term_name, course_code=course_code)
            db.session.add(new_course)
            db.session.commit()

            return {"message": "Course added.", "course_id": new_course.course_id}, 201

        except:
            db.session.rollback()
            return {"message": "Something went wrong."}, 500

    @auth_required('token')
    def delete(self, course_id):
        if not is_admin(current_user.id):
            return {"message": "You are not an admin and not allowed to do that."}, 403

        course = Course.query.get(course_id)
        if not course:
            return {"message": "Course not found."}, 404

        db.session.delete(course)
        db.session.commit()

        return {"message": "Course deleted."}, 200

    @auth_required('token')
    def put(self, course_id):
        if not is_admin(current_user.id):
            return {"message": "You are not an admin and not allowed to do that."}, 403

        course = Course.query.get(course_id)
        if not course:
            return {"message": "Course not found."}, 404

        data = request.get_json()
        course.name = data.get("name", course.name)
        course.desc = data.get("desc", course.desc)
        course.term_name = data.get("term_name", course.term_name)
        course.course_code = data.get("course_code", course.course_code)

        db.session.commit()

        return {"message": "Course updated."}, 200

    def get(self, course_id):
        course = Course.query.get(course_id)
        if not course:
            return {"message": "Course not found."}, 404

        return {
            "course_id": course.course_id,
            "name": course.name,
            "desc": course.desc,
            "term_name": course.term_name,
            "course_code": course.course_code
        }, 200


# Add resource to API
api.add_resource(CourseResource, "/course", "/course/<int:course_id>")
