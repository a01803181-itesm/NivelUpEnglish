CREATE TYPE proficiency_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');

CREATE TABLE customers (
    jid VARCHAR(64) PRIMARY KEY,
    phone_number VARCHAR(10),
    nickname VARCHAR(64),
    full_name VARCHAR(128)
);

CREATE TABLE groups (
    group_id INT PRIMARY KEY,
    schedule VARCHAR,
    level proficiency_level,
    start DATE,
    finish DATE
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    customer_jid VARCHAR(64),
    group_id INT,
    full_name VARCHAR(128),
    placement_test INT,
    sample_class BOOLEAN,
    FOREIGN KEY (customer_jid) REFERENCES customers (jid),
    FOREIGN KEY (group_id) REFERENCES groups (group_id)
);