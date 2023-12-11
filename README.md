# MoHa
MoHa: An Online Tutor App\
<br />
The way of teaching has undergone a huge transformation in the last few years. The
learning materials have been enriched by supplemental videos, images, and even virtual reality
besides traditional books. Meanwhile, the recent pandemic has accelerated the trend toward
online learning, and students' teaching tools have evolved from pen and paper to laptops and
tablets. This has made knowledge more accessible, allowing students to learn lessons taught by
instructors worldwide through their computers.\
<br />
Although online learning platforms are able to provide many high-quality courses, some
courses, coming with reasonable fees, require instructors with a higher level of knowledge and
stronger educational background. Still, when it comes to the course for beginners: primary
school, and high school students, the fee for those courses should be more affordable.
To solve the inequality, our project aims at helping all users by providing a platform and
opportunities for tutor-seeking functionality. With the assistance of our project, users shall be
able to tutor or find tutors for their needs and achieve academic success without attending official
academic programs to achieve equal access to academic resources.
# Project Setup Instruction
### Environment Preparation
Python, https://www.python.org
Node.js, https://nodejs.org
PostgreSQL, https://www.postgresql.org
### React(Frontend)
 * Add react app dependency
```
cd react-app
npm install
```
### Turbogear(Backend)
1. In **/backend/development.ini**, setup your Postgres URL in the format below
```
sqlalchemy.url=postgresql+psycopg2://[username]:[password]@[hostname]/[database_name]
```
2. Added dependencies in **python virutal environment / local python directory**
  * dependencies required for turbogear framework
```
cd backend
python setup.py
```
  * other dependencies required for backend implementation
```
pip install hashlib
pip install sqlalchemy
pip install json
pip install PIL
pip install spacy
python -m spacy download en
pip install base64
pip install io
pip install datetime
pip install transaction
pip install jwt
pip install faker
```
or
```
pip install -r requirements.txt
python -m spacy download en
```
### Postgres(Database)
1. Setup: Create a postgres database with your desired **username, password, hostname, and database**
2. Create Classes by the setup schema with command below
```
cd backend
gearbox setup-app
```
### Additional
Under the **backend/turbogearapp/public/assets**, create two subfolders named **course_pic** and **user_pic**. Then, copy the **default.png** into both folders. 
# Project Run Instruction
### 1. Start React App(Frontend)
```
cd react-app
npm start
```
### 2. Start Turbogear App(Backend)
```
cd backend
gearbox serve --reload --debug // (--reload --debug) is optional
```
