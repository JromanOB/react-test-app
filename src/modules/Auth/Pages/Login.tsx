import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "../Hooks/authHooks";
import Swal from "sweetalert2";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid && (
        <div className="invalid-feedback d-block">
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

function Login() {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      try {
        await loginMutation.mutateAsync(value);
        
        navigate({
          to: "/products",
        });

        await Swal.fire({
          title: "¡Acceso exitoso!",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
          confirmButtonText: "Continuar",
        });

        form.reset();        
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "Error al iniciar sesión",
          text: "Verifique su correo electrónico y contraseña.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5">
          <div className="card border-0 shadow">
            <div className="card-header bg-primary text-white text-center py-3">
              <h1 className="h4 mb-0">
                Iniciar sesión
              </h1>
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
                    name="email"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value.trim()) {
                          return "El correo electrónico es obligatorio";
                        }

                        const emailRegex =
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (!emailRegex.test(value)) {
                          return "Ingrese un correo electrónico válido";
                        }

                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="form-label fw-semibold"
                        >
                          Correo electrónico
                        </label>

                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-envelope" />
                          </span>

                          <input
                            id={field.name}
                            name={field.name}
                            type="email"
                            autoComplete="email"
                            className={`form-control ${
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="usuario@correo.com"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                          />
                        </div>

                        <FieldInfo field={field} />
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="mb-4">
                  <form.Field
                    name="password"
                    validators={{
                      onChange: ({ value }) =>
                        !value
                          ? "La contraseña es obligatoria"
                          : value.length < 8
                            ? "La contraseña debe tener al menos 8 caracteres"
                            : undefined,
                    }}
                  >
                    {(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="form-label fw-semibold"
                        >
                          Contraseña
                        </label>

                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-lock" />
                          </span>

                          <input
                            id={field.name}
                            name={field.name}
                            type="password"
                            autoComplete="current-password"
                            className={`form-control ${
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Ingrese su contraseña"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
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
                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                          !canSubmit ||
                          isSubmitting ||
                          loginMutation.isPending
                        }
                      >
                        {isSubmitting || loginMutation.isPending ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            />
                            Ingresando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-box-arrow-in-right me-2" />
                            Ingresar
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={
                          isSubmitting || loginMutation.isPending
                        }
                        onClick={() => form.reset()}
                      >
                        <i className="bi bi-arrow-counterclockwise me-2" />
                        Reiniciar
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

export default Login;