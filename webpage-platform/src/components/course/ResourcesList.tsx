import { FileText, Download } from "lucide-react";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import type { ResourceData } from "../types";
import { cn } from "../../lib/utils";

export interface ResourcesListProps {
  resources: ResourceData[];
}

export default function ResourcesList({ resources }: ResourcesListProps) {
  const sorted = [...resources].sort(
    (a, b) => (a.week_number || 0) - (b.week_number || 0)
  );

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
          <FileText className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-display font-bold text-lg text-foreground leading-tight">Class material</h2>
          <p className="text-xs text-muted-foreground">PDF resources for your course</p>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No materials uploaded yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {sorted.map((r) => (
            <li
              key={r.id}
              className="flex items-center gap-3 rounded-2xl border border-border p-3 hover:bg-secondary/50 transition-colors"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-destructive/10 text-destructive shrink-0">
                <FileText className="w-5 h-5" />
              </span>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-foreground truncate">{r.title}</h3>
                  {r.week_number && (
                    <Badge variant="outline" className="shrink-0">
                      W{r.week_number}
                    </Badge>
                  )}
                </div>
                {r.description && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{r.description}</p>
                )}
              </div>

              <a 
                href={r.file_url} 
                target="_blank" 
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
              >
                <Download className="w-4 h-4" />
                Open
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}