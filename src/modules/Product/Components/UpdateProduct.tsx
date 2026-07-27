import { useEffect } from "react";
import { useForm } from "@tanstack/react-form"
import { useGetProductById, useUpdateProduct } from "../Hooks/productHooks";
import { updateProductRoute } from "../../../routes/Products/productsRoutes";
import { useNavigate } from "@tanstack/react-router";

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
            id: product?.id,
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0
        },
        onSubmit: async ({ value }) => {
            try {
                console.log('Submitting update for product:', value);
                await updateProductMutation.mutateAsync({ id: productId, 
                    data: { 
                        name: value.name, 
                        description: value.description, 
                        price: value.price 
                    } })
                alert('Product updated successfully!');
                goHome();
                form.reset()
            } catch (error) {
                alert('Error updating product!')
            }
        },
    })

    // Cargar datos del producto cuando se obtienen
    // useEffect(() => {
    //     if (product) {
    //         form.reset({
    //             id: product.id,
    //             name: product.name,
    //             description: product.description,
    //             price: product.price
    //         })
    //     }
    // }, [product])

  return (
    <div>
      <div className="header-create-product">
        <button
          className="update-button"
          type="button"
          onClick={() => navigate({ to: '/' })}
        >
          Go Back
        </button>
        <h1>Update Product</h1>
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
                  <label htmlFor={field.name}>Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {/* <FieldInfo field={field} /> */}
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
                <label htmlFor={field.name}>Description:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* <FieldInfo field={field} /> */} 
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="price"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Price:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {/* <FieldInfo field={field} /> */}
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
                {isSubmitting ? '...' : 'Submit'}
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
                Reset
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