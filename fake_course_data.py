import psycopg2
import random


conn = psycopg2.connect(host="localhost", port=5432, dbname="moha", user="postgres", password="123456", sslmode="prefer", connect_timeout=10)

cur=conn.cursor()

cur.execute("SELECT COUNT(*) FROM Tutor;")
tutor_count = cur.fetchone()[0]

print(tutor_count)

test_subject = ('test_subject', 'test_major', True)

cur.execute("INSERT INTO subject (subject_name, major, academic) VALUES (%s, %s, %s)", test_subject)

for i in range(1,101):
    rtid = random.randint(1, tutor_count)
    name = 'test_course_' + str(i)
    type = 'test_type'
    price = random.randint(1, 100)
    cur.execute("INSERT INTO course (id, tutor_id, name, subject_name, type, price) VALUES (%s, %s, %s, %s, %s, %s)", (i, rtid, name, 'test_subject', type, price))

conn.commit()
cur.close()
conn.close()