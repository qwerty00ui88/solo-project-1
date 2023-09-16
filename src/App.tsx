import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { setUser } from './reducers/userReducer'
import { useAppDispatch } from './hooks'
import { setUi } from './reducers/uiReducer'
import Loading from './pages/Loading'

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
        dispatch(setUi('AUTH_LOADING'))
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // eslint-disable-next-line no-console
                console.log('🌈 로그인 중', { user })
                dispatch(setUi('AUTH_SUCCESS'))
                dispatch(
                    setUser({
                        email: user.email,
                        uid: user.uid,
                    })
                )
            } else {
                dispatch(setUi('AUTH_FAIL'))
                dispatch(
                    setUser({
                        email: null,
                        uid: null,
                    })
                )
                // eslint-disable-next-line no-console
                console.log('🌈 로그인 중 아님', { user })
            }
        })
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/loading" element={<Loading />} />
        </Routes>
    )
}

export default App
