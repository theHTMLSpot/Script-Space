"use client";

import { useState, useEffect } from "react";
import ProductComponent from "./Product";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string | number;
  currency: string;
  images: string[];
  url: string;
}

export default function ProductList({ initialProducts = [] }: { initialProducts?: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }
    
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data.json");
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();
        const productsArray: Product[] = Object.values(data);
        setProducts(productsArray);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [initialProducts]);

  if (loading) return <div role="status">Loading products...</div>;

  if (error)
    return (
      <div role="alert" className="text-red-600">
        {error}
      </div>
    );

  if (!products.length) return <div>No products available.</div>;

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-400 pt-20">
      <div
        className="relative w-screen h-screen flex flex-col justify-baseline-center items-baseline"
        style={{
          backgroundImage: "url(/images/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="z-10 max-w-4xl p-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            ScriptedSpaces
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 mb-8">
            The solution for well-organized work.
          </p>
          <a
            href="/templates"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-6 rounded shadow-md"
          >
            Browse Templates
          </a>
        </div>
      </div>

      <a
        href="/templates"
        className="text-4xl text-gray-200 font-bold m-14 cursor-pointer"
      >
        Templates
      </a>
      <main
        aria-label="Product listings"
        id="products"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5 w-full min-h-screen"
        style={{ gridAutoRows: "50vh" }}
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
  );
}

