import { site } from '@/lib/site'

export const metadata = { title: 'Customer Admin Login' }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; reason?: string }> }) {
  const { error, reason } = await searchParams
  return <main className="grid min-h-screen place-items-center bg-[#eef6fa] px-4 py-12"><section className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-xl"><p className="font-mono text-xs uppercase tracking-[.18em] text-primary">Customer console</p><h1 className="mt-4 text-3xl font-extrabold">Sign in</h1><p className="mt-3 text-sm text-muted-foreground">Manage {site.displayName} products, articles, inquiries and site settings.</p>{reason === 'unauthorized' ? <p className="mt-5 border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">Please sign in to access the admin console.</p> : null}{error ? <p role="alert" className="mt-5 border border-destructive/30 bg-red-50 p-3 text-sm text-destructive">{error}</p> : null}<form action="/api/auth/login" method="post" className="mt-7 grid gap-5"><label className="grid gap-2 text-sm font-medium">Email<input name="email" type="email" required autoComplete="username" className="h-12 border border-input px-3 text-base" /></label><label className="grid gap-2 text-sm font-medium">Password<input name="password" type="password" required autoComplete="current-password" className="h-12 border border-input px-3 text-base" /></label><button className="h-12 bg-primary px-5 font-bold text-white">Sign in</button></form></section></main>
}
