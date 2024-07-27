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
      <h2 className="text-2xl text-center font-extrabold tracking-tight">
        Something went wrong!
      </h2>
      <Button variant="destructive" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
