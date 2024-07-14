"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex h-[50vh] max-w-5xl flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Something went wrong!
      </h2>
      <Button variant="destructive" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
