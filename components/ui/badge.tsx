export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-[#0969ff] text-[10px] font-bold text-white">
      {children}
    </span>
  );
}
