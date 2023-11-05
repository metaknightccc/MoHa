# controllers/search.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Course, Tutor
import transaction
import json
import spacy


def sqlalchemy_to_json(sqlalchemy_objects):
    result = []
    for obj in sqlalchemy_objects:
        result.append(
            {column.name: getattr(obj, column.name) for column in obj.__table__.columns}
        )
    return result

def jaccard_similarity(query, document):
    intersection = list(set(query).intersection(set(document)))
    if(len(intersection) == 0):
        return -1
    return len(intersection)/(len(query) + len(document) - len(intersection))



class SearchController(TGController):
    @expose("json")
    def index(self, **kwargs):
        print("========================")
        # if no query provided at all
        if not kwargs:
            session = DBSession()
            matching_courses = session.query(Course).limit(5).all()
        else:
            print("========================")
            print(kwargs)
            print("========================")
            query = kwargs.get('q', '')
            priority = kwargs.get('pri', 'rel')
            #subject_name, tutor_name, type = query.split('%20')
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
                course_similarity = {}
                for course in courses:
                    course_similarity[course] = jaccard_similarity(lemma, course.lemmas.split(' '))
                sorted_courses = sorted(course_similarity.items(), key=lambda x: x[1], reverse=True)
                matching_courses = [item[0] for item in sorted_courses]

                # add tutor_name
                for matching_course in matching_courses:
                    print(matching_course.name)
                    print(course_similarity[matching_course])



                # arr = query.split()
                # print(arr)
                # subject_name = arr[0]
                # tutor_name = arr[1]
                # type = arr[2]

                # session = DBSession()
                
                # tutor_id = session.query(Tutor).filter_by(first_name = tutor_name).first()
                # matching_courses = session.query(Course).filter(
                #     Course.subject_name == subject_name,
                #     Course.tutor_id == tutor_id,
                #     Course.type == type
                # ).all()
        
        print("========================")
        print("here")
        # for row in matching_courses:
        #     print(row.name + "\n")
        response = json.dumps(sqlalchemy_to_json(matching_courses))
        return response
