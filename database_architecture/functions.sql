CREATE OR REPLACE FUNCTION assert_valid_timezone(timezone_name TEXT)
RETURNS VOID AS $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_timezone_names WHERE name = timezone_name) THEN
		RAISE EXCEPTION 'Invalid IANA timezone name: %', timezone_name;
	END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_course_timezone()
RETURNS TRIGGER AS $$
BEGIN
	PERFORM assert_valid_timezone(NEW.timezone);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_student_local_time
(
	target_date DATE,
	course_time TIME,
	course_timezone TEXT,
	student_timezone TEXT
)
RETURNS TIMESTAMP WITHOUT TIME ZONE AS $$
BEGIN
	PERFORM assert_valid_timezone(course_timezone);
	PERFORM assert_valid_timezone(student_timezone);

	RETURN (target_date + course_time) AT TIME ZONE course_timezone AT TIME ZONE student_timezone;
END;
$$ LANGUAGE plpgsql;