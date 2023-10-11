#postgre liability test
import psycopg2

conn = psycopg2.connect(host="localhost", port=5432, dbname="moha", user="postgres", password="doudou8", sslmode="prefer", connect_timeout=10)

cur=conn.cursor()
cur.execute("""CREATE TABLE IF NOT EXISTS person (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    gender CHAR
    )
    
""")
conn.commit()
cur.close()
conn.close()
