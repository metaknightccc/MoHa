import psycopg2


conn = psycopg2.connect(host="localhost", port=5432, dbname="moha", user="postgres", password="123456", sslmode="prefer", connect_timeout=10)

cur=conn.cursor()

cur.execute("SELECT COUNT(*) FROM Tutor;")
tutor_count = cur.fetchone()[0]

print(tutor_count)

