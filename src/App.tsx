import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { login } from './reducers/userReducer'
import { useAppDispatch } from './hooks'

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

    useEffect(() => {
        initializeApp(firebaseConfig)
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(login({ email: user.email, uid: user.uid }))
                // eslint-disable-next-line no-console
                console.log('로그인 상태입니다.')
            } else {
                // eslint-disable-next-line no-console
                console.log('비로그인 상태입니다.')
            }
        })
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default App
