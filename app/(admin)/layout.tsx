import AdminSideBar from '@/components/shared/Admin/AdminSideBar';
import Container from '@/components/shared/Container';

export default function AdminLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="">
      <Container className="grid  grid-cols-[300px_1fr] gap-x-15 max-w-[1600px]">
        <AdminSideBar />
        {children}
      </Container>
    </div>
  );
}
