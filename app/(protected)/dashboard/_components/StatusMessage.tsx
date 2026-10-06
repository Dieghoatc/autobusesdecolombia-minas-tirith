import { cn } from "@/lib/utils";

export interface Status {
  type: "success" | "error" | "info";
  message: string;
}

const STYLES: Record<Status["type"], string> = {
  success: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  error: "text-red-300 bg-red-500/10 border-red-500/20",
  info: "text-zinc-300 bg-white/[0.04] border-white/[0.08]",
};

export function StatusMessage({ status }: { status: Status | null }) {
  if (!status) return null;
  return (
    <p
      role={status.type === "error" ? "alert" : "status"}
      className={cn("text-sm border rounded-xl px-3 py-2", STYLES[status.type])}
    >
      {status.message}
    </p>
  );
}
