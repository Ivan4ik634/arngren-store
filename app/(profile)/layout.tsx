import Container from '@/components/shared/Container';
import UserSideBar from '@/components/shared/User/SideBar';

export default function UserLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="">
      <Container className="max-w-[1600px]">
        <div className="flex min-w-0 flex-col gap-5 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-x-8 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-x-12">
        <UserSideBar />
        <main className="min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
