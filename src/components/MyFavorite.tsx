import React, { useEffect } from 'react'
import axios from 'axios'

function MyFavorite() {
    useEffect(() => {
        axios
            .get('http://localhost/favorite/my-list', { withCredentials: true })
            .then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data)
            })
    })
    return <div>인생 컨텐츠 탭입니다.</div>
}
export default MyFavorite
