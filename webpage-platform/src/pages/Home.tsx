import CourseHeader from "../components/course/CourseHeader";
import ScheduleCard from "../components/course/ScheduleCard";
import RecordingsGrid from "../components/course/RecordingsGrid";
import ResourcesList from "../components/course/ResourcesList";
import type { CourseData, RecordingData, ResourceData, UserData } from "../components/types";

export default function Home() {
  const mockCourse: CourseData = {
    id: "1",
    name: "Advanced Business English",
    level: "advanced",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    instructor: "Diego Gonzalez",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit quis erat cras, fusce natoque eros fames est at iaculis tortor.",
    schedule_days: ["Monday - Thursday"],
    start_time: "18:00",
    end_time: "19:30",
    start_date: "2026-08-25T00:00:00Z",
    duration_weeks: 12,
    timezone: "CST (Mexico City)"
  };

  const mockUser: UserData = {
    email: "alexijia24@gmail.com",
    full_name: "Alexander Mejia Tovar"
  }

  const mockRecordings: RecordingData[] = [];
  const mockResources: ResourceData[] = [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      <CourseHeader course={mockCourse} user={mockUser}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecordingsGrid recordings={mockRecordings} />
        </div>
        <div className="space-y-8">
          <ScheduleCard course={mockCourse} />
          <ResourcesList resources={mockResources} />
        </div>
      </div>
    </div>
  );
}