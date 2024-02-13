import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { setUser } from './reducers/userReducer'
import { useAppDispatch, useAppSelector } from './hooks'
import { setUi } from './reducers/uiReducer'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './pages/Loading'
import Error from './pages/Error'
import Content from './pages/Content'
import Search from './pages/Search'
import Mypage from './pages/Mypage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => {
        if (/(_LOADING$)/.test(state.ui.status)) return 'LOADING'
        if (/(_ERROR$)/.test(state.ui.status)) return 'ERROR'
        return 'NORMAL'
    })
    // eslint-disable-next-line no-console
    console.log(`⭐️${status}`)
    useEffect(() => {
        dispatch(setUi('AUTH_LOADING'))
        initializeApp(firebaseConfig)
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUi('AUTH_SUCCESS'))
                // eslint-disable-next-line no-console
                console.log('🌈 로그인 중', { user })
                dispatch(
                    setUser({
                        uid: user.uid,
                    })
                )
            } else {
                dispatch(setUi('AUTH_FAIL'))
                dispatch(setUser(null))
                // eslint-disable-next-line no-console
                console.log('🌈 로그인 중 아님', { user })
            }
        })
    }, [])

    return (
        <>
            {status === 'LOADING' && <Loading />}
            {status === 'ERROR' && <Error />}
            {status === 'NORMAL' && (
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
            )}
        </>
    )
}

export default App
