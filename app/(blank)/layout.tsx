export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="flex min-h-[calc(100dvh-70px)] w-full items-center justify-center ">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
