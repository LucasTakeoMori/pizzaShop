import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-700/10 dark:bg-slate-200/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
