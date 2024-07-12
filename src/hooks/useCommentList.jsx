// import { useReducer } from 'react'
// import { deleteData, postData, updateData } from '../api/server'
// import commentReducer from '../reducer/comment-reducer'
// import { useAuthContext } from '../context/AuthContext'

// export default function useCommentList({ mediaType, tmdbId }) {
//     const { userId, nickname } = useAuthContext()
//     const [state, dispatch] = useReducer(commentReducer, [])

//     const initializeCommentList = (init) => {
//         dispatch({ type: 'initialize', init })
//     }

//     const handleCreate = (text, recommend) => {
//         postData('/comment/create', {
//             mediaType,
//             tmdbId: Number(tmdbId),
//             text,
//         }).then((res) => {
//             if (res.code === 200) {
//                 const { result: comment } = res
//                 dispatch({
//                     type: 'create',
//                     userId,
//                     nickname,
//                     comment,
//                     recommend,
//                 })
//             }
//         })
//     }

//     const handleUpdate = (commentId, text) => {
//         updateData('/comment/update', {
//             commentId,
//             text,
//         }).then((res) => {
//             if (res.code === 200) {
//                 dispatch({ type: 'update', commentId, text })
//             }
//         })
//     }

//     const handleDelete = (commentId) => {
//         deleteData('/comment/delete', {
//             data: {
//                 commentId,
//             },
//         }).then((res) => {
//             if (res.code === 200) {
//                 dispatch({ type: 'delete', commentId })
//             }
//         })
//     }

//     const commentRecommendUpdate = (recommend) => {
//         dispatch({
//             type: 'recommendUpdate',
//             userId,
//             recommend,
//         })
//     }

//     return {
//         state,
//         initializeCommentList,
//         handleCreate,
//         handleUpdate,
//         handleDelete,
//         commentRecommendUpdate,
//     }
// }
