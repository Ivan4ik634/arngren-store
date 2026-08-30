export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[400px] translate-x-[-50%] translate-y-[-50%]">
      {children}
    </div>
  );
}
