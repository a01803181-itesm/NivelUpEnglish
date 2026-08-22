import { Play, Clock, Calendar, Video } from "lucide-react";
import { Image } from "../ui/image";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import type { RecordingData } from "../types";
import { useState } from "react";

export interface RecordingsGridProps {
  recordings: RecordingData[];
}

export default function RecordingsGrid({ recordings }: RecordingsGridProps) {
  const [active, setActive] = useState<RecordingData | null>(null);

  const sorted = [...recordings].sort(
    (a, b) => new Date(b.session_date).getTime() - new Date(a.session_date).getTime()
  );

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
            <Video className="w-5 h-5" />
          </span>
          <div>
            <h2 className="font-display font-bold text-lg text-foreground leading-tight">Class recordings</h2>
            <p className="text-xs text-muted-foreground">Replay your previous live sessions</p>
          </div>
        </div>
        <Badge variant="secondary">{recordings.length} sessions</Badge>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No recordings yet. Check back after your first live session.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {sorted.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              className="group text-left rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="relative aspect-video bg-secondary">
                <Image src={r.thumbnail_url} alt={r.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/90 text-primary shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5" />
                  </span>
                </div>
                {r.duration_minutes && (
                  <span className="absolute bottom-2 right-2 text-xs font-medium text-white bg-black/70 px-2 py-0.5 rounded-md">
                    {r.duration_minutes} min
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1">{r.title}</h3>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(r.session_date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {r.duration_minutes && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {r.duration_minutes} min
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0">
          <DialogHeader className="p-5 pb-3">
            <DialogTitle>{active?.title}</DialogTitle>
            <DialogDescription>
              {active &&
                new Date(active.session_date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
            {active && (
              <video
                src={active.video_url}
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}