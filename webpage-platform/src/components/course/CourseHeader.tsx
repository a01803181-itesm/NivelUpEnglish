import { Image } from "../ui/image";
import { Badge } from "../ui/badge";
import { User as UserIcon, Signal, CalendarDays } from "lucide-react"; 
import { levelLabels, type CourseData, type UserData } from "../types";

export interface CourseHeaderProps {
  course: CourseData;
  user?: UserData;
}

export default function CourseHeader({ course, user }: CourseHeaderProps) {
  const rawName = user?.full_name || user?.email || "there";
  const firstName = rawName.split(" ")[0].split("@")[0];
  const days = (course.schedule_days || []).join(" · ");

  let weekInfo: string | null = null;
  if (course.start_date && course.duration_weeks) {
    const start = new Date(course.start_date);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const week = Math.max(1, Math.min(diff + 1, course.duration_weeks));
    weekInfo = `Week ${week} of ${course.duration_weeks}`;
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-3 p-7 sm:p-10 flex flex-col justify-between order-2 md:order-1">
          <div>
            <p className="text-sm text-muted-foreground">
              Welcome back, <span className="font-semibold text-foreground">{firstName}</span>
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-transparent">
                {levelLabels[course.level] || course.level}
              </Badge>
              {weekInfo && <Badge variant="outline">{weekInfo}</Badge>}
            </div>
            <h1 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-foreground mt-3 leading-[1.1]">
              {course.name}
            </h1>
            {course.description && (
              <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">{course.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <UserIcon className="w-4 h-4" />
                {course.instructor}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                {days || "Schedule TBA"}
              </span>
              {course.start_time && (
                <span className="inline-flex items-center gap-1.5">
                  <Signal className="w-4 h-4" />
                  {course.start_time}–{course.end_time}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 relative min-h-[180px] md:min-h-0 order-1 md:order-2">
          <Image
            src={course.image_url}
            alt={course.name}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/20 to-transparent md:from-card/70 md:via-card/10" />
        </div>
      </div>
    </section>
  );
}