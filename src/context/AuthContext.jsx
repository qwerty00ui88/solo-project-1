import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    useMemo,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { getData, postData } from '../api/server'

const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const login = (nickname, password) => {
        postData('/user/login', {
            nickname,
            password,
        }).then((res) => {
            if (res.result) {
                setUser(res.result)
                navigate('/')
            } else {
                navigate('/error')
            }
        })
    }

    const logout = () => {
        getData('/user/logout').then(() => {
            setUser(null)
        })
    }

    const checkLoginStatus = () => {
        getData('/user/checkLoginStatus').then((res) => {
            setUser(res.result)
        })
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    const contextValue = useMemo(
        () => ({
            user,
            userId: user && user.userId,
            login,
            logout,
        }),
        [user, login, logout]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}
