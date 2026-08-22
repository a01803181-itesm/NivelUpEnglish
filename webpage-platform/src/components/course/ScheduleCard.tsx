import React from "react";
import { CalendarDays, Clock, Globe, CalendarRange, PlayCircle, type LucideIcon } from "lucide-react";
import type { CourseData } from "../types";

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface MetaProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

function Meta({ icon: Icon, label, value }: MetaProps) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

export interface ScheduleCardProps {
  course: CourseData;
}

export default function ScheduleCard({ course }: ScheduleCardProps) {
  const days = (course.schedule_days || [])
    .slice()
    .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
          <CalendarDays className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-display font-bold text-lg text-foreground leading-tight">Class schedule</h2>
          <p className="text-xs text-muted-foreground">Live sessions with {course.instructor}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {days.length === 0 && <span className="text-sm text-muted-foreground">Schedule to be announced.</span>}
        {days.map((d) => (
          <span
            key={d}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Meta icon={Clock} label="Time" value={`${course.start_time || "—"} – ${course.end_time || ""}`} />
        <Meta icon={Globe} label="Timezone" value={course.timezone || "—"} />
        <Meta
          icon={CalendarRange}
          label="Starts"
          value={
            course.start_date
              ? new Date(course.start_date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"
          }
        />
        <Meta icon={PlayCircle} label="Duration" value={course.duration_weeks ? `${course.duration_weeks} weeks` : "—"} />
      </div>
    </section>
  );
}