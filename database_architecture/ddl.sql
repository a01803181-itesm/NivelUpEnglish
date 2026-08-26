CREATE TYPE english_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');
CREATE TYPE schedule_day AS ENUM ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');

CREATE TABLE groups (
	group_id SERIAL PRIMARY KEY,
	level english_level,
	schedule_time_start TIME,
	schedule_time_finish TIME,
	date_Start DATE,
	date_finish DATE
);

CREATE TABLE customers (
	jid VARCHAR(64) PRIMARY KEY,
	full_name TEXT NOT NULL,
	nickname VARCHAR(32),
	phone_number VARCHAR(15)
);

CREATE TABLE students (
	student_id SERIAL PRIMARY KEY,
	customer_jid VARCHAR(64),
	group_id INT,
	full_name TEXT NOT NULL,
	placement_test INT,
	sample_class BOOLEAN DEFAULT FALSE,
	
	CONSTRAINT fk_students_customer
		FOREIGN KEY (customer_jid)
		REFERENCES customers (jid)
		ON DELETE CASCADE,
		
	CONSTRAINT fk_students_group
		FOREIGN KEY (group_id)
		REFERENCES groups (group_id)
		ON DELETE SET NULL
);