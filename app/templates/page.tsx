'use client'

import { useEffect, useState } from 'react'
import ProductComponent from '../components/Product'

interface Product {
  id: string
  name: string
  description: string
  price: string | number
  currency: string
  images: string[]
  url: string
}

export default function TemplatesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/data.json')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        const productsArray: Product[] = Object.values(data)
        setProducts(productsArray)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!products.length) return <div>No products found.</div>

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-6 text-center text-4xl font-bold text-black">
        Templates
      </h1>
      <main className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductComponent
            key={product.id}
            title={product.name}
            description={product.description}
            price={Number(product.price)}
            currency={product.currency}
            images={product.images}
            url={product.id !== undefined ? product.id.toString() : ''}
            buyUrl={product.url}
          />
        ))}
      </main>
    </div>
  )
}
