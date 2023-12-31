# controllers/search.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Course, Tutor
import transaction
import json
import spacy
import datetime


def sqlalchemy_to_json(sqlalchemy_objects):
    result = []
    for obj in sqlalchemy_objects:
        result.append(
            {column.name: getattr(obj, column.name) for column in obj.__table__.columns}
        )
    return result

def sqlalchemy_to_json_single(sqlalchemy_object):
    obj_dict = {}
    for column in sqlalchemy_object.__table__.columns:
        value = getattr(sqlalchemy_object, column.name)
        # Convert datetime objects to string
        if isinstance(value, datetime.datetime):
            obj_dict[column.name] = value.isoformat()
        # Add more type checks as needed (e.g., for date, decimal.Decimal, etc.)
        else:
            obj_dict[column.name] = value
    return obj_dict


def jaccard_similarity(query, document):
    intersection = list(set(query).intersection(set(document)))
    if(len(intersection) == 0):
        return -1
    return len(intersection)/(len(query) + len(document) - len(intersection))

  
class SearchController(TGController):
    @expose("json")
    def index(self, **kwargs):
        # if no query provided at all
        result = []
        if not kwargs:
            print("no query provided")
            session = DBSession()
            matching_courses = session.query(Course).limit(5).all()
            result = matching_courses
        else:
            print("========================")
            print(kwargs)
            print("========================")
            query = kwargs.get('q', '')
            priority = kwargs.get('pri', 'rel')
            if query == '':
                session = DBSession()
                matching_courses = session.query(Course).limit(5).all()
            else:
                nlp = spacy.load('en_core_web_sm')
                doc = nlp(query)
                lemma= [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
                print(set(lemma))

                session = DBSession()
                courses = session.query(Course).all()
                # generate similarity score for each course
                course_similarity = {}
                for course in courses:
                    course_lemma = course.lemmas
                    # check if the lemma has only one token
                    if course_lemma.find(' '):
                        course_lemma = course_lemma.split(' ')
                    course_similarity[course] = jaccard_similarity(lemma, course_lemma)

                # filter out courses with negative similarity score
                matching_courses = dict()
                for item in course_similarity.items():
                    if not item[1] < 0:
                        matching_courses[item[0]] = item[1]
                
                # matching_courses = [item[0] for item in course_similarity if not item[1] < 0]

                print("here")
                result = []
                if priority == 'rel': # sort by relevance
                    sorted_courses = sorted(matching_courses.items(), key=lambda x: x[1], reverse=True)
                    result = [item[0] for item in sorted_courses]
                    print(type(sorted_courses) == dict)
                elif priority == 'lat': # sort by latest
                    result = matching_courses.keys()
                elif priority == 'rat': # sort by rating
                    course_ratings = dict()
                    for course in matching_courses.keys():
                        # if the rating is None, then assign 0
                        if course.avg_rating:
                            course_ratings[course] = course.avg_rating
                        else:
                            course_ratings[course] = 0
                    sorted_courses = sorted(course_ratings.items(), key=lambda x: x[1], reverse=True)
                    result = [item[0] for item in sorted_courses]
                else: # invalid priority
                    return dict(error="invalid priority").json()
                
                print("there")

                for r in result:
                    print(r.name)
                    print(course_similarity[r])
                    print(r.avg_rating)
        
        print("========================")

        # adding tutor name to the result
        response = []
        for course in result:
            tutor = session.query(Tutor).filter_by(id = course.tutor_id).first()
            course_dict = sqlalchemy_to_json_single(course)
            course_dict['tutor_name'] = tutor.first_name + ' ' + tutor.last_name
            response.append(course_dict)
        return json.dumps(response)
            
        # response = json.dumps(sqlalchemy_to_json(result))
        # return response
  
