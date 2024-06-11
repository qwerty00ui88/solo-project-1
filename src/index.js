import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import App from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './style/globalStyle'
import { store } from './store'
import NotFound from './pages/NotFound'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Content from './pages/Content'
import Search from './pages/Search'
import Mypage from './pages/Mypage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Main /> },
            { path: '/login', element: <Login /> },
            { path: '/signup/:page', element: <SignUp /> },
            { path: '/search/:keyword', element: <Search /> },
            { path: '/mypage/:category', element: <Mypage /> },
            { path: '/:menu/:category', element: <Content /> },
            { path: '/detail/:mediaType/:tmdbId', element: <Detail /> },
        ],
    },
])
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <GlobalStyle />
        <Provider store={store}>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <RouterProvider router={router} />
            </CookiesProvider>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
