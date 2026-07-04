import { isAdmin, getSurveys } from '@/app/actions/admin'
import { AdminLogin } from '@/components/rede/admin-login'
import { FounderDashboard } from '@/components/rede/founder-dashboard'

export const metadata = {
  title: 'Founder Dashboard — Stress Test Survey | REDE',
  robots: { index: false, follow: false },
}

export default async function SurveyAdminPage() {
  const authed = await isAdmin()

  if (!authed) {
    return <AdminLogin />
  }

  const surveys = await getSurveys()
  return <FounderDashboard surveys={surveys} />
}
