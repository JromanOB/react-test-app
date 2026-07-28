import { useEffect } from "react";
import { useForm } from "@tanstack/react-form"
import { useGetProductById, useUpdateProduct } from "../Hooks/productHooks";
import { useNavigate } from "@tanstack/react-router";
import { updateProductRoute } from "../../../routes/Products/productsRoutes";
import Swal from 'sweetalert2';

function UpdateProduct() {
    const { productId } = updateProductRoute.useParams();
    const updateProductMutation = useUpdateProduct();
    const { data: product, isLoading, error } = useGetProductById(Number(productId));

    const navigate = useNavigate();

    const goHome = () => {
        navigate({ to: '/' });
    }

    const form = useForm({
        defaultValues: {
            id: 0,
            name: '',
            description: '',
            price: 0
        },
        onSubmit: async ({ value }) => {
          try {
            Swal.fire({
              title: "¿Estás seguro de actualizar el producto?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Guardar",
              denyButtonText: `No guardar`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed){
                updateProductMutation.mutateAsync({ id: Number(productId), 
                  data: { 
                    name: value.name, 
                    description: value.description, 
                    price: value.price 
                  } 
                })
                Swal.fire("¡Guardado!", "", "success");
              } 
              else if (result.isDenied) Swal.fire("Los cambios no se han guardado", "", "info");
            });
            form.reset()
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Hubo un error al actualizar el producto.",
              icon: "error"
            })
          }
        },
    })

    useEffect(() => {
      if (!product) return;

      form.reset({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
      });
    }, [product]);

  return (
    <div>
      <div className="header-create-product">
        <button
          className="update-button"
          type="button"
          onClick={() => navigate({ to: '/' })}
        >
          Volver al Inicio
        </button>
        <h1>Actualizar Producto</h1>
      </div>
      {isLoading && <p>Cargando producto...</p>}
      {error && <p style={{color: 'red'}}>Error cargando el producto</p>}
      {product && (
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
      )}
    </div>
  )
}

export default UpdateProduct