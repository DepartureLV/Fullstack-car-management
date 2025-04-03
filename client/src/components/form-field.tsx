import { Input } from "./ui/input";

export interface FormFieldProps {
  label: string;
  type?: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  optional?: boolean;
}

export default function FormField({
  label,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  optional = false,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label htmlFor="brand" className="font-semibold">
          {label}
        </label>
        {optional && (
          <span className="text-slate-400 w-full flex-1 text-right">
            (optional)
          </span>
        )}
      </div>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
