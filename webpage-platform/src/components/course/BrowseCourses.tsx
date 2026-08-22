import { Image } from "../ui/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User as UserIcon, CalendarDays, ArrowUpRight, Sparkles, Loader2 } from "lucide-react";
import type { CourseData, UserData } from "../types";

export interface BrowseCoursesProps {
  courses: CourseData[];
  onEnroll: (courseId: string | number) => void;
  enrolling: boolean;
  user?: UserData;
}

const levelLabels: Record<string, string> = {
  beginner: "Beginner",
  elementary: "Elementary",
  intermediate: "Intermediate",
  "upper-intermediate": "Upper-Intermediate",
  advanced: "Advanced",
};

export default function BrowseCourses({ courses, onEnroll, enrolling, user }: BrowseCoursesProps) {
  const rawName = user?.full_name || user?.email || "there";
  const firstName = rawName.split(" ")[0].split("@")[0];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 sm:p-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Welcome to NivelUp English
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-foreground leading-tight">
          Hi {firstName}, you're not enrolled yet
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Choose a course below to enroll. You can be enrolled in one course at a time — your
          schedule, recordings and materials will appear right here on your dashboard.
        </p>
      </div>

      <div>
        <h2 className="font-display font-bold text-lg text-foreground mb-4">Available courses</h2>
        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No courses available right now. Please check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((c) => (
              <div
                key={c.id}
                className="group rounded-3xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="relative aspect-[16/10] bg-secondary">
                  <Image src={c.image_url} alt={c.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-foreground hover:bg-white/90 border-transparent">
                      {levelLabels[c.level] || c.level}
                    </Badge>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-foreground leading-tight">{c.name}</h3>
                  {c.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <UserIcon className="w-3.5 h-3.5" />
                      {c.instructor}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {(c.schedule_days || []).length} days/week
                    </span>
                  </div>
                  <Button className="mt-5 w-full" onClick={() => onEnroll(c.id)} disabled={enrolling}>
                    {enrolling ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        Enroll now
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}