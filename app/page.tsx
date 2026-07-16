import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="relative min-h-svh p-6">
      <div className="absolute right-6 top-6 flex items-center gap-4">
        <OrganizationSwitcher />

        <UserButton />
      </div>
    </div>
  )
}
