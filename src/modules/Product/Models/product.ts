export interface Product {
  id: number,
  name: string,
  description: string,
  price: number
}

export interface ProductsResponse {
  data: Product[]
  links: Links
  meta: Meta
}

export interface Links {
  first: string
  last: string
  prev: any
  next: any
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  page?: number
  active: boolean
}

export interface NewProduct {
  name: string,
  description: string | null,
  price: number
}

export interface UpdateProduct extends Partial<NewProduct> {}