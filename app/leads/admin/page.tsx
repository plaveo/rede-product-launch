import { isAdmin } from '@/app/actions/admin'
import { getLeads } from '@/app/actions/leads'
import { AdminLogin } from '@/components/rede/admin-login'
import { LeadsDashboard } from '@/components/rede/leads-dashboard'

export const metadata = {
  title: 'Admin — Leads | REDE',
  robots: { index: false, follow: false },
}

export default async function LeadsAdminPage() {
  const authed = await isAdmin()

  if (!authed) {
    return <AdminLogin />
  }

  const leads = await getLeads()
  return <LeadsDashboard leads={leads} />
}
