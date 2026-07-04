import { isAdmin, getApplications } from '@/app/actions/admin'
import { AdminLogin } from '@/components/rede/admin-login'
import { AdminDashboard } from '@/components/rede/admin-dashboard'

export const metadata = {
  title: 'Admin — Stress Test Applications | REDE',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const authed = await isAdmin()

  if (!authed) {
    return <AdminLogin />
  }

  const applications = await getApplications()
  return <AdminDashboard applications={applications} />
}
