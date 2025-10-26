"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/50 loading-shimmer",
        className
      )}
      {...props}
    />
  );
}

interface LoadingCardProps {
  className?: string;
  lines?: number;
}

export function LoadingCard({ className, lines = 3 }: LoadingCardProps) {
  return (
    <div className={cn("space-y-3 p-4", className)}>
      <Skeleton className="h-4 w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3",
            i === lines - 1 ? "w-1/2" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

interface LoadingChartProps {
  className?: string;
}

export function LoadingChart({ className }: LoadingChartProps) {
  return (
    <div className={cn("space-y-4 p-4", className)}>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface LoadingTableProps {
  className?: string;
  rows?: number;
  columns?: number;
}

export function LoadingTable({ 
  className, 
  rows = 5, 
  columns = 4 
}: LoadingTableProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className={cn(
                "h-3 flex-1",
                colIndex === 0 && "w-8" // First column is usually narrower
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ 
  className, 
  size = "md" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingDotsProps {
  className?: string;
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-current animate-bounce"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.6s"
          }}
        />
      ))}
    </div>
  );
}

interface LoadingProgressProps {
  className?: string;
  progress?: number;
  animated?: boolean;
}

export function LoadingProgress({ 
  className, 
  progress = 0,
  animated = false 
}: LoadingProgressProps) {
  return (
    <div className={cn("w-full bg-muted/50 rounded-full h-2", className)}>
      <div
        className={cn(
          "h-2 rounded-full bg-primary transition-all duration-500 ease-out",
          animated && "animate-progress"
        )}
        style={{
          width: animated ? "100%" : `${progress}%`
        }}
      />
    </div>
  );
}

interface LoadingOverlayProps {
  className?: string;
  children?: React.ReactNode;
}

export function LoadingOverlay({ className, children }: LoadingOverlayProps) {
  return (
    <div className={cn(
      "absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50",
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        {children && (
          <div className="text-sm text-muted-foreground animate-fade-in-up">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
