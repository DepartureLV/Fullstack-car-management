import FormField, { FormFieldProps } from "./form-field";
import { Button } from "./ui/button";

export default function Form({
  fields,
  handleSubmit,
}: {
  fields: FormFieldProps[];
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormField
          key={field.id}
          label={field.label}
          type={field.type}
          id={field.id}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
        />
      ))}

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
