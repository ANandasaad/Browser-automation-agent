export default function TestPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Test Page</h1>
        <p className="mt-2 text-muted-foreground">
          This is a protected route. Only signed-in users can see this.
        </p>
      </div>
    </div>
  )
}
