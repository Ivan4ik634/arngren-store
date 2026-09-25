import AdminSideBar from '@/components/shared/Admin/AdminSideBar';
import Container from '@/components/shared/Container';

export default function AdminLayout({ children }: LayoutProps<'/'>) {
  return (
    <div>
      <div className="mx-4 my-8 rounded-xl border border-zinc-200 bg-white px-5 py-8 text-center shadow-sm md:hidden">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M8 9h8M8 13h5" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-zinc-900">Admin dashboard</h1>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-600">
          Admin dashboard is available on desktop only.
        </p>
      </div>
      <div className="hidden md:block">
        <Container className="max-w-[1600px]">
          <div className="grid min-w-0 grid-cols-[200px_minmax(0,1fr)] gap-x-8 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-x-15">
            <AdminSideBar />
            <main className="min-w-0">{children}</main>
          </div>
        </Container>
      </div>
    </div>
  );
}
