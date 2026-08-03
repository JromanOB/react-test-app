import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { useCreateProduct } from "../Hooks/productHooks";
import { useNavigate } from "@tanstack/react-router";
import Swal from "sweetalert2";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid && (
        <div className="text-danger small mt-1">
          {field.state.meta.errors.join(", ")}
        </div>
      )}

      {field.state.meta.isValidating && (
        <div className="text-secondary small mt-1">
          Validando...
        </div>
      )}
    </>
  );
}

function CreateProduct() {
  const createProductMutation = useCreateProduct();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },

    onSubmit: async ({ value }) => {
      try {
        await createProductMutation.mutateAsync(value);

        await Swal.fire({
          title: "¡Producto creado!",
          text: "El producto se ha creado exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        form.reset();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error al crear el producto.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h4 mb-0">Crear producto</h1>

                <button
                  className="btn btn-light btn-sm"
                  type="button"
                  onClick={() => navigate({ to: "/products" })}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <div className="mb-3">
                  <form.Field
                    name="name"
                    validators={{
                      onChange: ({ value }) =>
                        !value.trim()
                          ? "El nombre es obligatorio"
                          : value.length < 3
                            ? "El nombre debe tener al menos 3 caracteres"
                            : undefined,

                      onChangeAsyncDebounceMs: 500,

                      onChangeAsync: async ({ value }) => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );

                        return value.toLowerCase().includes("error")
                          ? 'El nombre no puede contener la palabra "error"'
                          : undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="form-label fw-semibold"
                        >
                          Nombre
                        </label>

                        <input
                          id={field.name}
                          name={field.name}
                          type="text"
                          className={`form-control ${
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Ingrese el nombre del producto"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />

                        <FieldInfo field={field} />
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="mb-3">
                  <form.Field
                    name="description"
                    validators={{
                      onChange: ({ value }) =>
                        !value.trim()
                          ? "La descripción es obligatoria"
                          : value.length < 5
                            ? "La descripción debe tener al menos 5 caracteres"
                            : undefined,
                    }}
                  >
                    {(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="form-label fw-semibold"
                        >
                          Descripción
                        </label>

                        <textarea
                          id={field.name}
                          name={field.name}
                          className={`form-control ${
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                              ? "is-invalid"
                              : ""
                          }`}
                          rows={4}
                          placeholder="Ingrese una descripción"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />

                        <FieldInfo field={field} />
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="mb-4">
                  <form.Field
                    name="price"
                    validators={{
                      onChange: ({ value }) =>
                        value <= 0
                          ? "El precio debe ser mayor que cero"
                          : undefined,
                    }}
                  >
                    {(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="form-label fw-semibold"
                        >
                          Precio
                        </label>

                        <div className="input-group">
                          <span className="input-group-text">₡</span>

                          <input
                            id={field.name}
                            name={field.name}
                            type="number"
                            min="1"
                            step="1"
                            className={`form-control ${
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="0"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(
                                Number(e.target.value)
                              )
                            }
                          />
                        </div>

                        <FieldInfo field={field} />
                      </>
                    )}
                  </form.Field>
                </div>

                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                  ]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => form.reset()}
                        disabled={isSubmitting}
                      >
                        <i className="bi bi-arrow-counterclockwise me-2"></i>
                        Reiniciar
                      </button>

                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            ></span>
                            Guardando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-save me-2"></i>
                            Guardar producto
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form.Subscribe>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;