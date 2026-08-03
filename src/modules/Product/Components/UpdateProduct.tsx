import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import {
  useGetProductById,
  useUpdateProduct,
} from "../Hooks/productHooks";
import { useNavigate } from "@tanstack/react-router";
import { updateProductRoute } from "../../../routes/Products/productsRoutes";
import Swal from "sweetalert2";

function UpdateProduct() {
  const { productId } = updateProductRoute.useParams();

  const navigate = useNavigate();
  const updateProductMutation = useUpdateProduct();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductById(Number(productId));

  const form = useForm({
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      price: 0,
    },

    onSubmit: async ({ value }) => {
      const result = await Swal.fire({
        title: "¿Actualizar el producto?",
        text: "Los datos actuales serán reemplazados.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (!result.isConfirmed) {
        return;
      }

      try {
        await updateProductMutation.mutateAsync({
          id: Number(productId),
          data: {
            name: value.name,
            description: value.description,
            price: value.price,
          },
        });

        await Swal.fire({
          title: "¡Producto actualizado!",
          text: "Los cambios se guardaron correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        navigate({
          to: "/products",
        });
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el producto.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  useEffect(() => {
    if (!product) return;

    form.reset({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    });
  }, [product]);

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div
            className="spinner-border text-primary"
            role="status"
            aria-hidden="true"
          />

          <span>Cargando producto...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          No fue posible cargar el producto.
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate({ to: "/products" })}
        >
          <i className="bi bi-arrow-left me-2" />
          Volver a productos
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          No se encontró el producto solicitado.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h4 mb-0">Actualizar producto</h1>

                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={() => navigate({ to: "/products" })}
                >
                  <i className="bi bi-arrow-left me-2" />
                  Volver
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
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
                          : value.trim().length < 3
                            ? "El nombre debe tener al menos 3 caracteres"
                            : undefined,
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
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                        />

                        {field.state.meta.isTouched &&
                          !field.state.meta.isValid && (
                            <div className="invalid-feedback">
                              {field.state.meta.errors.join(", ")}
                            </div>
                          )}
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
                          : value.trim().length < 5
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
                          placeholder="Ingrese la descripción del producto"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                        />

                        {field.state.meta.isTouched &&
                          !field.state.meta.isValid && (
                            <div className="invalid-feedback">
                              {field.state.meta.errors.join(", ")}
                            </div>
                          )}
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
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(
                                Number(event.target.value)
                              )
                            }
                          />

                          {field.state.meta.isTouched &&
                            !field.state.meta.isValid && (
                              <div className="invalid-feedback">
                                {field.state.meta.errors.join(", ")}
                              </div>
                            )}
                        </div>
                      </>
                    )}
                  </form.Field>
                </div>

                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                    state.isDirty,
                  ]}
                >
                  {([canSubmit, isSubmitting, isDirty]) => (
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={isSubmitting}
                        onClick={() => {
                          form.reset({
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                          });
                        }}
                      >
                        <i className="bi bi-arrow-counterclockwise me-2" />
                        Restablecer
                      </button>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                          !canSubmit ||
                          !isDirty ||
                          isSubmitting ||
                          updateProductMutation.isPending
                        }
                      >
                        {isSubmitting ||
                        updateProductMutation.isPending ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            />
                            Actualizando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-save me-2" />
                            Guardar cambios
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

export default UpdateProduct;