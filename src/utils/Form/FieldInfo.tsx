import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  const firstError = field.state.meta.errors[0];

  if (!field.state.meta.isTouched || !firstError) {
    return null;
  }

  const message =
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError
      ? String(firstError.message)
      : String(firstError);

  return (
    <div className="invalid-feedback d-block" role="alert">
      {message}
    </div>
  );
}