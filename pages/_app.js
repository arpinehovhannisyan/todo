import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from "react-query";
import TodoListProvider from '@/providers/TodoListProvider';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoListProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </TodoListProvider>
    </QueryClientProvider>
  )
}
