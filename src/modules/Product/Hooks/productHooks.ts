import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAll, getAllProducts, getProductById, updateProduct } from "../Services/productSv";
import { Product, UpdateProduct } from "../Models/product";

export const useGetAllProducts = () => {
    const {data: data, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: () => getAllProducts()
    });

    return { data, isLoading, error };
}

export const useGetAll = () => {
    const {data: data, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: () => getAll()
    });

    return { data, isLoading, error };
}

export const useCreateProduct = () => {
  const qc = useQueryClient();

  const mutation = useMutation({
      mutationFn: createProduct,
      onSuccess: (res) =>{
          console.log('Created product', res);
          qc.invalidateQueries({queryKey: ['products']});
      },
      onError: (err) =>{
          console.error("Error creating product", err)
      }
  })
  return mutation;
};

export const useGetProductById = (id: number) => {
    const {data: data, isLoading, error} = useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductById(id)
    });

    return { data, isLoading, error };
}

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, Error, { id: number; data: UpdateProduct }>({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};