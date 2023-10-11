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

cur.execute("INSERT INTO person (id, name, age, gender) VALUES (1, 'John', 30, 'M')")
cur.execute("INSERT INTO person (id, name, age, gender) VALUES (2, 'Alice', 25, 'F')")
conn.commit()  # Commit the changes

# Select and print data from the 'person' table
cur.execute("SELECT * FROM person")
rows = cur.fetchall()
for row in rows:
    print(row)


cur.close()
conn.close()
