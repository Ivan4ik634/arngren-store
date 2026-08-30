import Container from '@/components/shared/Container';
import UserSideBar from '@/components/shared/User/SideBar';

export default function UserLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="">
      <Container className="grid  grid-cols-[300px_1fr] gap-x-15 max-w-[1600px]">
        <UserSideBar />
        {children}
      </Container>
    </div>
  );
}
