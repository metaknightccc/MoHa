import psycopg2
import random
import faker
import spacy


conn = psycopg2.connect(host="localhost", port=5432, dbname="moha", user="postgres", password="123456", sslmode="prefer", connect_timeout=10)

cur=conn.cursor()

cur.execute("SELECT COUNT(*) FROM Tutor;")
tutor_count = cur.fetchone()[0]

print(tutor_count)

# check if test subject exists
cur.execute("SELECT COUNT(*) FROM subject WHERE subject_name = 'test_subject';")
if cur.fetchone()[0] == 0:
    test_subject = ('test_subject', 'test_major', True)
    cur.execute("INSERT INTO subject (subject_name, major, academic) VALUES (%s, %s, %s)", test_subject)



nlp = spacy.load('en_core_web_sm')

fake = faker.Faker()

for i in range(1,101):
    rtid = random.randint(1, tutor_count)
    name = 'test_course_' + str(i)
    type = 'test_type'
    price = random.randint(1, 100)
    description = fake.text(max_nb_chars=200, ext_word_list=None)
    doc = nlp(' '.join([name, type, description]))
    lemmas = ' '.join([token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and not token.text == '\n'])
    print(lemmas)
    avg_rating = random.randint(1, 5)
    cur.execute("INSERT INTO course (id, tutor_id, name, subject_name, type, price, description, lemmas, avg_rating) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                (i, rtid, name, 'test_subject', type, price, description, lemmas, avg_rating))

conn.commit()
cur.close()
conn.close()