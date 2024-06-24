import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './style/globalStyle'
import Error from './pages/Error'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Search from './pages/Search'
import Mypage from './pages/Mypage'
import ProtectedRoute from './pages/ProtectedRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Main /> },
            { path: '/login', element: <Login /> },
            { path: '/signup/:page', element: <SignUp /> },
            { path: '/search/:keyword', element: <Search /> },
            {
                path: '/mypage/:category',
                element: (
                    <ProtectedRoute>
                        <Mypage />
                    </ProtectedRoute>
                ),
            },
            { path: '/detail/:mediaType/:tmdbId', element: <Detail /> },
        ],
    },
])
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <GlobalStyle />
        <RouterProvider router={router} />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
