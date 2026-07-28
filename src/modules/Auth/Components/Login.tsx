import { AnyFieldApi, useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "../Hooks/authHooks";
import Swal from 'sweetalert2';

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validando...' : null}
    </>
  )
}

function Login() {
    const loginMutation = useLogin();
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
        email: '',
        password: ''
        },
        onSubmit: async ({ value }) => {
            try {
                await loginMutation.mutateAsync(value)
                navigate({ to: '/products' });
                Swal.fire({
                    title: "¡Acceso exitoso!",
                    icon: "success",
                    draggable: true
                });
                form.reset()
            } catch (error) {
                Swal.fire({
                    title: "¡Error al iniciciar sesión!",
                    icon: "error",
                    draggable: true
                })
            }
        },
    })

  return (
    <div>
      <div className="header-create-product">
        <h1>LOGIN</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'El email es requerido'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in name'
                )
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Email:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'La contraseña es requerida'
                    : value.length < 8
                    ? 'La contraseña debe tener mínimo 8 caracteres!'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in name'
                )
              },
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Contraseña:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <button 
                className="submit-button"
                type="submit" 
                disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Ingresar'}
              </button>
              <button
                className="delete-button"
                type="reset"
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault()
                  form.reset()
                }}
              >
                Reiniciar
              </button>
            </>
          )}
        />
      </form>
    </div>
  )
}

export default Login