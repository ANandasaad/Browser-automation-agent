import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="rounded-2xl border bg-background p-8 shadow-sm text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Workflow not found
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          404
        </h1>
        <Link
          href="/"
          className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
