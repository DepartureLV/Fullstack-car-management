import FormField, { FormFieldProps } from "./form-field";

export default function Form({
  id,
  fields,
  handleSubmit,
}: {
  id: string;
  fields: FormFieldProps[];
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      id={id}
      className="flex flex-col gap-4 text-left"
      onSubmit={handleSubmit}
    >
      {fields.map((field) => (
        <FormField
          key={field.id}
          label={field.label}
          type={field.type}
          id={field.id}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
          optional={field.optional}
        />
      ))}
    </form>
  );
}
