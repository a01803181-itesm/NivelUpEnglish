import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import CourseHeader from "../components/course/CourseHeader";
import ScheduleCard from "../components/course/ScheduleCard";
import BrowseCourses from "../components/course/BrowseCourses";
import { Loader2 } from "lucide-react";
import type { CourseData } from "../components/types";
import { StudentAPI } from "../api/students";

export default function Home() {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard () {
      setLoading(true);
      try {
        const data = await StudentAPI.getDashboardData();
        if (isMounted) {
          if (data.status === 'enrolled' && data.course) {
            setCourse(data.course);
          } else {
            setCourse(null);
          }
        }
      } catch (err: any) {
        console.error("Dashboard error", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (user) {
      loadDashboard();
    }

    return () => { isMounted = false; };
  }, [user]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-32 flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-destructive py-8">Error: {error}</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      {course ? (
        <>
          <CourseHeader course={course} user={user || undefined} />
          <ScheduleCard course={course} />
        </>
      ) : (
        <BrowseCourses
          courses={[]}
          onEnroll={() => {}}
          enrolling={false}
          user={user || undefined}
        />
      )}
    </div>
  );
}