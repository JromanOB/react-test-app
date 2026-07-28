import apiAxios from "../../../api/apiConfig";
import { NewProduct, Product, ProductsResponse, UpdateProduct } from "../Models/product";

const BASE = "/products";

export async function createProduct(product: NewProduct): Promise<Product> {
  try{
    const { data } = await apiAxios.post(`${BASE}`, product);
    return data;
  }catch(err){
    console.error('Error creating product', err);
    return Promise.reject(err);
  }
}

export async function getAllProducts(): Promise<ProductsResponse> {
  try{
    const res = await apiAxios.get<ProductsResponse>(`${BASE}`);
    return res.data;
  }catch(err){
    console.error('Error fetching products', err);
    return Promise.reject(err);
  }
}

export async function getAll(): Promise<Product[]> {
  try{
    const res = await apiAxios.get<Product[]>(`${BASE}/all`);
    return res.data;
  }catch(err){
    console.error('Error fetching products', err);
    return Promise.reject(err);
  }
}

export async function getProductById(id: number): Promise<Product> {
  try{
    const res = await apiAxios.get<Product>(`${BASE}/${id}`);
    return res.data;
  }catch(err){
    console.error('Error fetching product by ID', err);
    return Promise.reject(err);
  }
}

export async function updateProduct(id: number, product: UpdateProduct): Promise<Product> {
  try{
    const res = await apiAxios.put<Product>(`${BASE}/${id}`, product);
    return res.data;
  }catch(err){
    console.error('Error updating product', err);
    return Promise.reject(err);
  }
}

export async function deleteProduct(id: number) {
  try{
    const res = await apiAxios.delete(`${BASE}/${id}`);
    return res.data;
  }catch(err){
    console.error('Error deleting product', err);
    return Promise.reject(err);
  }
}