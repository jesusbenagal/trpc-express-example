import { trpcProducts } from '../utils/trpc'

export const Product = () => {
  const { data, isLoading, error } = trpcProducts.getAll.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
