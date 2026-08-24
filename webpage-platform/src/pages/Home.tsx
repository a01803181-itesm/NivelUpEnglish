import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import CourseHeader from "../components/course/CourseHeader";
import ScheduleCard from "../components/course/ScheduleCard";
import RecordingsGrid from "../components/course/RecordingsGrid";
import ResourcesList from "../components/course/ResourcesList";
import BrowseCourses from "../components/course/BrowseCourses";
import { Loader2 } from "lucide-react";
import type { CourseData, RecordingData, ResourceData } from "../components/types";

const mockCourse: CourseData = {
  id: "1",
  name: "Advanced Business English",
  level: "advanced",
  image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  instructor: "Diego Gonzalez",
  description: "Lorem ipsum dolor sit amet consectetur adipiscing elit quis erat cras, fusce natoque eros fames est at iaculis tortor.",
  schedule_days: ["Monday", "Thursday"],
  start_time: "18:00",
  end_time: "19:30",
  start_date: "2026-08-25T00:00:00Z",
  duration_weeks: 12,
  timezone: "CST (Mexico City)"
};

const mockRecordings: RecordingData[] = [];
const mockResources: ResourceData[] = []

export default function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  const [course, setCourse] = useState<CourseData | null>(null);
  const [recordings, setRecordings] = useState<RecordingData[]>([]);
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const loadEnrolled = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return false;
  }, []);

  const loadBrowse = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setCourses([mockCourse]);
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      try {
        const isEnrolled = await loadEnrolled();
        if (!isEnrolled && isMounted) {
          await loadBrowse();
        }
      } catch (e) {
        console.error("Failed to load dashboard", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [loadEnrolled, loadBrowse]);

  const handleEnroll = async (courseId: string | number) => {
    setEnrolling(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setCourse(mockCourse);
      setRecordings(mockRecordings);
      setResources(mockResources);
    } catch (e) {
      console.error("Enrollment failed", e);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-32 flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      {course ? (
        <>
          <CourseHeader course={course} user={user || undefined} />
          <ScheduleCard course={course} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecordingsGrid recordings={recordings} />
            </div>
            <div className="space-y-6">
              <ResourcesList resources={resources} />
            </div>
          </div>
        </>
      ) : (
        <BrowseCourses
          courses={courses}
          onEnroll={handleEnroll}
          enrolling={enrolling}
          user={user || undefined}
        />
      )}
    </div>
  );
}