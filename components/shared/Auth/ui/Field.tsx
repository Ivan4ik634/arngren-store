import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FieldProps = {
  error?: string;
  type?: string;
  icon: ReactNode;
  inputProps: UseFormRegisterReturn;
  placeholder: string;
  trailingIcon?: ReactNode;
};

export function Field({ icon, type, trailingIcon, placeholder, error, inputProps }: FieldProps) {
  return (
    <div>
      <label className="relative block">
        <span className="sr-only">{placeholder}</span>
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#647796]">
          {icon}
        </span>
        <Input
          {...inputProps}
          type={type}
          placeholder={placeholder}
          className=" rounded-2xl border-[#dce5f2] bg-[#fbfcff] px-14 py-7 text-base text-[#0c1427] shadow-none placeholder:text-[#7182a0] focus-visible:border-[#1474f5] focus-visible:ring-4 focus-visible:ring-[#1474f5]/10 sm:text-lg"
        />
        {trailingIcon && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#647796]">
            {trailingIcon}
          </span>
        )}
      </label>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
