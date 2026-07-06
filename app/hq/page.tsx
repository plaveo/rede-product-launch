import { isAdmin } from "@/app/actions/admin"
import { getHqData } from "@/app/actions/hq"
import { AdminLogin } from "@/components/rede/admin-login"
import { CommandCenter } from "@/components/rede/command-center"

export const metadata = {
  title: "Command Center | REDE",
  robots: { index: false, follow: false },
}

// Always render fresh — this is a live monitor.
export const dynamic = "force-dynamic"

export default async function HqPage() {
  const authed = await isAdmin()
  if (!authed) {
    return <AdminLogin />
  }

  const initial = await getHqData()
  return <CommandCenter initial={initial} />
}
