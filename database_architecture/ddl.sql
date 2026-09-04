CREATE TYPE english_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');
CREATE TYPE schedule_day AS ENUM ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');

CREATE TABLE courses (
	course_id SERIAL PRIMARY KEY,
	level english_level,
	schedule_time_start TIME,
	schedule_time_end TIME,
	schedule_days schedule_day[],
	course_date_begin DATE,
	course_date_end DATE
);

CREATE TABLE students (
	student_id VARCHAR(64) PRIMARY KEY,
	course_id INT,
	name TEXT,
	email TEXT,
	phone_number VARCHAR(15) NULL,
	CONSTRAINT fk_students_course
		FOREIGN KEY (course_id)
		REFERENCES courses (course_id)
		ON DELETE SET NULL
);