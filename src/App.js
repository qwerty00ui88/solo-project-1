import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './pages/Content'
import Search from './pages/Search'
import Mypage from './pages/Mypage'
import { login, logout } from './reducers/userReducer'

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
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detail/:mediaType/:tmdbId" element={<Detail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup/:page" element={<SignUp />} />
                <Route path="/:menu/:category" element={<Content />} />
                <Route path="/search/:word" element={<Search />} />
                <Route path="/mypage/:category" element={<Mypage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
