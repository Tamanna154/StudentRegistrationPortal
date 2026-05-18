DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;



CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    username VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role VARCHAR(50) DEFAULT 'STUDENT',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE students (

    student_id SERIAL PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    phone VARCHAR(15) NOT NULL,

    address TEXT NOT NULL,

    department VARCHAR(100) NOT NULL,

    semester INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE courses (

    course_id SERIAL PRIMARY KEY,

    course_name VARCHAR(150) NOT NULL,

    course_code VARCHAR(50) UNIQUE NOT NULL,

    credits INT NOT NULL
);



CREATE TABLE enrollments (

    enrollment_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student
    FOREIGN KEY(student_id)
    REFERENCES students(student_id)
    ON DELETE CASCADE,

    CONSTRAINT fk_course
    FOREIGN KEY(course_id)
    REFERENCES courses(course_id)
    ON DELETE CASCADE
);



INSERT INTO users
(username, email, password, role)

VALUES

('tamanna',
 'tamanna@gmail.com',
 '1234',
 'STUDENT'),

('rahul',
 'rahul@gmail.com',
 '1234',
 'STUDENT'),

('priya',
 'priya@gmail.com',
 '1234',
 'STUDENT'),

('aman',
 'aman@gmail.com',
 '1234',
 'STUDENT'),

('admin1',
 'admin@gmail.com',
 'admin123',
 'ADMIN');



INSERT INTO students
(full_name, phone, address, department, semester)

VALUES

('Tamanna Oza',
 '9999990001',
 'Ahmedabad',
 'Computer Engineering',
 5),

('Rahul Sharma',
 '9999990002',
 'Surat',
 'Information Technology',
 4),

('Priya Patel',
 '9999990003',
 'Rajkot',
 'Computer Engineering',
 6),

('Aman Verma',
 '9999990004',
 'Vadodara',
 'Mechanical Engineering',
 3),

('Admin User',
 '9999990005',
 'Ahmedabad',
 'Administration',
 1);



INSERT INTO courses
(course_name, course_code, credits)

VALUES

('Database Management System',
 'DBMS106',
 4),

('Operating System',
 'OS106',
 4),

('Data Structures',
 'DS103',
 3),

('Computer Networks',
 'CN104',
 4),

('Java Programming',
 'JAVA105',
 4);



INSERT INTO enrollments
(student_id, course_id)

VALUES

(1,1),

(1,3),

(2,2),

(3,1),

(4,5);



SELECT * FROM users;

SELECT * FROM students;

SELECT * FROM courses;

SELECT * FROM enrollments;



SELECT
    s.full_name,
    c.course_name

FROM enrollments e

JOIN students s
ON e.student_id = s.student_id

JOIN courses c
ON e.course_id = c.course_id;