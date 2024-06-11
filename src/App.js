import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Header from './components/Header'
import Footer from './components/Footer'
import { login, logout } from './reducers/userReducer'

const queryClient = new QueryClient()

function App() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get(`${serverUrl}/user/checkLoginStatus`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.data.result) {
                    dispatch(login())
                } else {
                    dispatch(logout())
                }
            })
    }, [navigate])

    return (
        <>
            <Header />
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <Footer />
        </>
    )
}

export default App
