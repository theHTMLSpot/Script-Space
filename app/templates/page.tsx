'use client'

import { useEffect, useState } from 'react'
import ProductComponent from '../components/Product'

interface Product {
  id: string // assuming your data has a unique ID
  name: string
  description: string
  price: string | number
  currency: string
  images: string[]
  url: string
}

export default function Templates() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/data.json')
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`)
        }
        const data = await res.json()
        const productsArray: Product[] = Object.values(data)
        setProducts(productsArray)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div role="status">Loading products...</div>

  if (error)
    return (
      <div role="alert" className="text-red-600">
        {error}
      </div>
    )

  if (!products.length) return <div>No products available.</div>

  return (
    <div className="min-h-[100vh] w-[100vw] bg-gray-400 pt-20">
      <h1 className="mb-6 text-center text-4xl font-bold">Templates</h1>
      <main
        aria-label="Product listings"
        id="products"
        className="grid min-h-screen w-full grid-cols-1 gap-5 p-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
        {products.map((product) => (
          <ProductComponent
            key={product.id}
            title={product.name}
            description={product.description}
            price={Number(product.price)}
            currency={product.currency}
            images={product.images}
            url={product.url}
          />
        ))}
      </main>
    </div>
  )
}
