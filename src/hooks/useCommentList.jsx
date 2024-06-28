import { useReducer } from 'react'
import { deleteData, postData, updateData } from '../api/server'
import commentReducer from '../reducer/comment-reducer'

export default function useCommentList(mediaType, tmdbId, userId, nickname) {
    const [state, dispatch] = useReducer(commentReducer, [])

    const handleInitialize = (init) => {
        dispatch({ type: 'initialize', init })
    }

    const handleCreate = (text) => {
        postData('/comment/create', {
            mediaType,
            tmdbId: Number(tmdbId),
            text,
        }).then((res) => {
            if (res.code === 200) {
                const { result: comment } = res
                dispatch({ type: 'create', userId, nickname, comment })
            }
        })
    }

    const handleUpdate = (commentId, text) => {
        updateData('/comment/update', {
            commentId,
            text,
        }).then((res) => {
            if (res.code === 200) {
                dispatch({ type: 'update', commentId, text })
            }
        })
    }

    const handleDelete = (commentId) => {
        deleteData('/comment/delete', {
            data: {
                commentId,
            },
        }).then((res) => {
            if (res.code === 200) {
                dispatch({ type: 'delete', commentId })
                // 코멘트 아이콘 색 회색으로 변경
            }
        })
    }

    return { state, handleInitialize, handleCreate, handleUpdate, handleDelete }
}
