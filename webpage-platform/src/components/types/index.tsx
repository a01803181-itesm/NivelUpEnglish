export type CourseLevel = "beginner" | "elementary" | "intermediate" | "upper-intermediate" | "advanced";

export interface UserData {
    full_name?: string;
    email?: string;
}

export interface CourseData {
    id: number | string;
    name: string;
    level: CourseLevel;
    image_url: string;
    instructor: string;
    description?: string;
    schedule_days?: string[];
    start_date?: string;
    duration_weeks?: number;
    start_time?: string;
    end_time?: string;
    timezone?: string;
}

export interface RecordingData {
  id: string | number;
  title: string;
  session_date: string;
  thumbnail_url: string;
  video_url: string;
  duration_minutes?: number;
}

export interface ResourceData {
  id: string | number;
  title: string;
  file_url: string;
  week_number?: number;
  description?: string;
}

export const levelLabels: Record<string, string> = {
    beginner: "Beginner",
    elementary: "Elementary",
    intermediate: "Intermediate",
    "upper-intermediate": "Upper-Intermediate",
    advanced: "Advanced",
};