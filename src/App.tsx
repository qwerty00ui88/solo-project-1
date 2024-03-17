import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './pages/Content'
import Search from './pages/Search'
import Mypage from './pages/Mypage'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detail/:media/:id" element={<Detail />} />
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
