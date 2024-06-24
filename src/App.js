import React from 'react'
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Header from './components/commons/Header'
import Footer from './components/commons/Footer'
import AuthContextProvider from './context/AuthContext'

const queryClient = new QueryClient()
function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <Header />
                    <Outlet />
                    <ReactQueryDevtools initialIsOpen={false} />
                </AuthContextProvider>
            </QueryClientProvider>
            <Footer />
        </>
    )
}

export default App
