"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductComponent({
  title,
  key,
  description,
  price,
  currency,
  images,
  url,
}: {
  title: string;
  key: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  url: string;
}) {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(url);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer h-[100%] w-[100%] bg-gray-200 border-2 border-gray-500 p-4 rounded-xl hover:shadow-lg transition"
      role="button"
      key={key}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick();
        }
      }}
      aria-label={`View details for ${title}`}
    >
      <div
        className="flex gap-2 justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/backarrow.svg"
          alt="Previous image"
          width={50}
          height={50}
          onClick={prevImage}
          className="cursor-pointer w-3 h-3"
        />
        <Image
          src={images?.[currentImage] ?? "/placeholder.png"}
          alt={title}
          width={300}
          height={300}
          priority
        />
        <Image
          src="/frontarrow.svg"
          alt="Next image"
          width={50}
          height={50}
          onClick={nextImage}
          className="cursor-pointer w-3 h-3"
        />
      </div>

      <h1 className="text-xl text-gray-900 font-semibold mt-4">{title}</h1>
      <p className="text-gray-500">{description}</p>
      <p className="text-lg text-gray-900 font-bold mt-2">
        {price} {currency}
      </p>

      <a
        href={url}
        className="bg-orange-400 text-white py-2 px-4 rounded mt-4 inline-block"
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Now
      </a>
    </div>
  );
}
