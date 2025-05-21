'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: string | number
  currency: string
  images: string[]
  url: string
}

export default function SingleProductPage() {
  const params = useParams()
  const id = params?.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/data.json')
        if (!res.ok) throw new Error('Failed to fetch product data')
        const data: Product[] = Object.values(await res.json())
        const index = parseInt(id, 10)
        if (isNaN(index) || index < 0 || index >= data.length) {
          throw new Error('Product not found')
        }
        setProduct(data[index])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!product) return
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    )
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!product) return
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  if (loading)
    return <div className="mt-10 text-center">Loading product...</div>
  if (error)
    return <div className="mt-10 text-center text-red-600">{error}</div>
  if (!product)
    return <div className="mt-10 text-center">No product found.</div>

  return (
    <div className="min-h-screen bg-gray-100 px-8 pt-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center gap-10 lg:flex-row">
        {/* LEFT: Image Section */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="relative flex h-[400px] w-full items-center justify-center">
            <ChevronLeft
              className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer text-gray-700 hover:text-gray-900"
              onClick={prevImage}
            />
            <Image
              src={product.images[currentImage] ?? '/placeholder.png'}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-md object-contain"
            />
            <ChevronRight
              className="absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer text-gray-700 hover:text-gray-900"
              onClick={nextImage}
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-6 flex w-full flex-wrap justify-center gap-3">
            {product.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${product.name} thumbnail ${i + 1}`}
                width={80}
                height={80}
                className={`cursor-pointer rounded-md border transition duration-200 ${
                  i === currentImage
                    ? 'border-gray-900 opacity-75'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
                onClick={() => setCurrentImage(i)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="mb-4 text-3xl font-bold text-black">{product.name}</h1>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <p className="mb-6 text-2xl font-bold text-black">
            {product.price} {product.currency}
          </p>
          <button
            onClick={() => window.open(product.url, '_blank')}
            className="rounded-md bg-orange-500 px-6 py-3 text-white transition duration-200 hover:bg-orange-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
