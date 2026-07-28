import { AnyFieldApi, useForm } from "@tanstack/react-form"
import { useCreateProduct } from "../Hooks/productHooks";
import { useNavigate } from "@tanstack/react-router";

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

function CreateProduct() {
    const createProductMutation = useCreateProduct();
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
        name: '',
        description: '',
        price: 0
        },
        onSubmit: async ({ value }) => {
            try {
                await createProductMutation.mutateAsync(value)
                alert('Product created successfully!')
                form.reset()
            } catch (error) {
                alert('Error creating product!')
            }
        },
    })

  return (
    <div>
      <div className="header-create-product">
        <button
          className="update-button"
          type="button"
          onClick={() => navigate({ to: '/' })}
        >
          Volver
        </button>
        <h1>Crear Producto</h1>
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
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A name is required'
                  : value.length < 3
                    ? 'Name must be at least 3 characters'
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
                  <label htmlFor={field.name}>Nombre:</label>
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
            name="description"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Descripción:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="price"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Precio:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
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
                {isSubmitting ? '...' : 'Enviar'}
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

export default CreateProduct