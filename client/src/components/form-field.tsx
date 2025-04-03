import { Input } from "./ui/input";

export interface FormFieldProps {
  label: string;
  type?: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  label,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="brand">{label}</label>
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
