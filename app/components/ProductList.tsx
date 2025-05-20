'use client'

import { useState, useEffect } from 'react'
import ProductComponent from './Product'

interface Product {
  id: string
  name: string
  description: string
  price: string | number
  currency: string
  images: string[]
  url: string
}

export default function ProductList({
  initialProducts = [],
}: {
  initialProducts?: Product[]
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(initialProducts.length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts)
      setLoading(false)
      return
    }

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
  }, [initialProducts])

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
      <div
        className="justify-baseline-center relative flex h-screen w-screen flex-col items-baseline"
        style={{
          backgroundImage: 'url(/images/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="z-10 max-w-4xl p-10">
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Script Space
          </h1>
          <p className="mb-8 mt-4 text-xl text-gray-300 md:text-2xl">
            The solution for well-organized work.
          </p>
          <a
            href="/templates"
            className="inline-block rounded bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
          >
            Browse Templates
          </a>
        </div>
      </div>

      <main
        aria-label="Product listings"
        id="products"
        className="grid min-h-screen w-full grid-cols-1 gap-5 p-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
        <a
          href="/templates"
          className="cursor-pointer text-4xl font-bold text-gray-200"
        >
          Templates
        </a>
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
