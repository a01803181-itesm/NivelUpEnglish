CREATE TRIGGER check_timezone_before_insert_or_update
BEFORE INSERT ON courses
FOR EACH ROW
EXECUTE FUNCTION validate_course_timezone();