"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";

  return (
    <div className="flex items-center justify-between">
      <Button
        className={cn(Number(page) <= 1 && "invisible")}
        variant={"ghost"}
        onClick={() =>
          router.push(
            `/admin/dashboard/?page=${Number(page) - 1}&per_page=${per_page}`,
          )
        }
      >
        <ArrowLeft size={16} />
        Previous
      </Button>
      <p className="font-semibold">
        Page {page} of {totalPages}
      </p>
      <Button
        className={cn(totalPages <= Number(page) && "invisible")}
        variant={"ghost"}
        onClick={() =>
          router.push(
            `/admin/dashboard/?page=${Number(page) + 1}&per_page=${per_page}`,
          )
        }
      >
        Next
        <ArrowRight size={16} />
      </Button>
    </div>
  );
}
