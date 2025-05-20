import { promises as fs } from 'fs'
import path from 'path'
import ProductList from './components/ProductList'

interface Product {
  id: string
  name: string
  description: string
  price: string | number
  currency: string
  images: string[]
  url: string
}

export default async function Home() {
  let products: Product[] = []

  try {
    // Server-side data fetching
    const dataDirectory = path.join(process.cwd(), 'public')
    const fileContents = await fs.readFile(dataDirectory + '/data.json', 'utf8')
    const data = JSON.parse(fileContents)
    products = Object.values(data)
  } catch (error) {
    console.error('Failed to load product data:', error)
    // Error handling will be done in the client component
  }

  return <ProductList initialProducts={products} />
}
