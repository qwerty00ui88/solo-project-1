import React, { useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

function MyFavorite() {
    const [cookies] = useCookies(['userId'])

    useEffect(() => {
        axios
            .post('http://localhost/mypage/favorite', {
                userId: cookies.userId,
            })
            .then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data)
            })
    })
    return <div>인생 컨텐츠 탭입니다.</div>
}
export default MyFavorite
