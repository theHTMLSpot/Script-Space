'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductComponent({
  title,
  description,
  price,
  currency,
  images,
  url,
  buyUrl,
}: {
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  url: string
  buyUrl: string
}) {
  const [currentImage, setCurrentImage] = useState(0)
  const router = useRouter()

  const handleCardClick = () => {
    if (typeof url === 'string' && !url.startsWith('http')) {
      router.push(`/templates/${url}`) // ✅ FIXED path
    } else if (url.startsWith('http')) {
      window.open(url, '_blank')
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  return (
    <div
      onClick={handleCardClick}
      className="h-full w-full cursor-pointer rounded-xl border-2 border-gray-500 bg-gray-200 p-4 transition hover:shadow-lg"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick()
        }
      }}
      aria-label={`View details for ${title}`}
    >
      <div
        className="flex items-center justify-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <ChevronLeft
          className="h-6 w-6 cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={prevImage}
        />
        <Image
          src={images?.[currentImage] ?? '/placeholder.png'}
          alt={title}
          width={300}
          height={300}
          priority
          className="rounded-md"
        />
        <ChevronRight
          className="h-6 w-6 cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={nextImage}
        />
      </div>

      <h1 className="mt-4 text-xl font-semibold text-gray-900">{title}</h1>
      <p className="text-gray-500">{description}</p>
      <p className="mt-2 text-lg font-bold text-gray-900">
        {price} {currency}
      </p>

      <a
        href={buyUrl}
        className="mt-4 inline-block rounded bg-orange-400 px-4 py-2 text-white"
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Now
      </a>
    </div>
  )
}
