import Container from '@/components/shared/Container';

export default function UserLayout({ children }: LayoutProps<'/'>) {
  return <Container className="max-w-[1400px]">{children}</Container>;
}
