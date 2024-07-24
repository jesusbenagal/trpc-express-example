import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { Product } from '@/components/product'

import { trpcProducts } from '@/utils/trpc'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpcProducts.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001/api/products'
        })
      ]
    })
  )

  return (
    <trpcProducts.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1>Products</h1>
          <Product />
        </div>
      </QueryClientProvider>
    </trpcProducts.Provider>
  )
}

export default App
