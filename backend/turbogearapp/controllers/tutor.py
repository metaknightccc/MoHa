
from tg import expose, TGController, redirect
from turbogearapp.model.model import Tutor, Student, Course
from turbogearapp.model import DBSession
from faker import Faker

fake = Faker()

class TutorController(TGController):

    @expose('json')
    def insert_fake_data(self):

        try:
            # Create and insert 10 fake tutors
            new_tutors = []
            for _ in range(10):
                tutor = Tutor(
                    name=fake.name(),
                    account=fake.unique.random_number(digits=5, fix_len=True)
                )
                DBSession.add(tutor)
                new_tutors.append(tutor)

            # Create and insert 10 fake students
            new_students = []
            for _ in range(10):
                student = Student(
                    name=fake.name(),
                    account=fake.unique.random_number(digits=5, fix_len=True)
                )
                DBSession.add(student)
                new_students.append(student)

            # Create and insert 5 fake courses
            new_courses = []
            course_types = ["Math", "Science", "History", "Art", "PE"]
            for _ in range(5):
                course = Course(
                    name=fake.unique.first_name(),
                    type=fake.random.choice(course_types)
                )
                DBSession.add(course)
                new_courses.append(course)

            # Fetch the added data
            DBSession.flush()
            tutors_data = [{"id": tutor.id, "name": tutor.name, "account": tutor.account} for tutor in new_tutors]
            students_data = [{"id": student.id, "name": student.name, "account": student.account} for student in new_students]
            courses_data = [{"id": course.id, "name": course.name, "type": course.type} for course in new_courses]

            return {
                "tutors": tutors_data,
                "students": students_data,
                "courses": courses_data
            }

        except Exception as e:
            # Handle exceptions
            return {"message": "Error inserting data", "error": str(e)}

    # Add a single student
    @expose('json')
    def addStudent(self, id, name, accountNumber):
        student = Student(id=id, name=name, account=accountNumber)
        DBSession.add(student)
        DBSession.commit()
        return {"message": "Student added successfully"}

    # Similarly, create endpoints for addTutor and addCourse.
    @expose('json')
    def addTutor(self, id, name, accountNumber):
        tutor = Tutor(id=id, name=name, account=accountNumber)
        DBSession.add(tutor)
        DBSession.commit()
        return {"message": "Tutor added successfully"}

    @expose('json')
    def addCourse(self, id, name, type):
        course = Course(id=id, name=name, type=type)
        DBSession.add(course)
        DBSession.commit()
        return {"message": "Course added successfully"}

