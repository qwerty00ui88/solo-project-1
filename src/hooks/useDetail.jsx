import { useQuery } from '@tanstack/react-query'
import { deleteData, getData, postData, updateData } from '../api/server'
import { useAuthContext } from '../context/AuthContext'
import useOptimisticUpdate from './useOptimisticUpdate'

export default function useDetail({ mediaType, tmdbId }) {
    const { optimisticUpdate } = useOptimisticUpdate()
    const { userId, nickname } = useAuthContext()

    const detailQuery = useQuery({
        queryKey: ['detail', mediaType, tmdbId, userId],
        queryFn: () => getData(`/detail/${mediaType}/${tmdbId}`),
        staleTime: 60 * 1000,
    })

    const addComment = optimisticUpdate({
        mutationFn: async (newComment) => {
            await postData('/comment/create', {
                mediaType,
                tmdbId: Number(tmdbId),
                text: newComment,
            })
        },
        queryKey: ['detail', mediaType, tmdbId, userId],
        getNewData: (variables, oldData) => {
            const newComment = variables
            return {
                ...oldData,
                myComment: {
                    userId,
                    nickname,
                    comment: {
                        contentId: Math.random(),
                        createdAt: '2024-07-02T05:52:18Z',
                        id: Math.random(),
                        text: newComment,
                        updatedAt: '2024-07-02T05:52:18Z',
                        userId,
                    },
                    recommendStatus: oldData.recommendStatus,
                },
                commentViewList: [
                    {
                        userId,
                        nickname,
                        comment: {
                            contentId: Math.random(),
                            createdAt: '2024-07-02T05:52:18Z',
                            id: Math.random(),
                            text: newComment,
                            updatedAt: '2024-07-02T05:52:18Z',
                            userId,
                        },
                        recommendStatus: oldData.recommendStatus,
                    },
                    ...oldData.commentViewList,
                ],
            }
        },
    })

    const updateComment = optimisticUpdate({
        mutationFn: async ({ commentId, text }) => {
            await updateData('/comment/update', {
                commentId,
                text,
            })
        },
        queryKey: ['detail', mediaType, tmdbId, userId],
        getNewData: (variables, oldData) => {
            const { commentId, text } = variables
            return {
                ...oldData,
                myComment: {
                    // updatedAt도 변경
                    ...oldData.myComment,
                    text,
                },
                commentViewList: oldData.commentViewList.map((c) => {
                    if (c.comment.id === commentId) {
                        // updatedAt도 변경
                        return {
                            ...c,
                            comment: {
                                ...c.comment,
                                text,
                            },
                        }
                    }
                    return c
                }),
            }
        },
    })

    const deleteComment = optimisticUpdate({
        mutationFn: async (commentId) => {
            await deleteData('/comment/delete', {
                data: {
                    commentId,
                },
            })
        },
        queryKey: ['detail', mediaType, tmdbId, userId],
        getNewData: (variables, oldData) => {
            const commentId = variables
            return {
                ...oldData,
                myComment: null,
                commentViewList: oldData.commentViewList.filter(
                    (c) => c.comment.id !== commentId
                ),
            }
        },
    })

    const updateRecommend = optimisticUpdate({
        mutationFn: async (clickedStatus) => {
            await getData('/recommend', {
                params: {
                    mediaType,
                    tmdbId,
                    status: clickedStatus,
                },
            })
        },
        queryKey: ['detail', mediaType, tmdbId, userId],
        getNewData: (variables, oldData) => {
            const clickedStatus = variables
            return {
                ...oldData,
                recommendStatus:
                    oldData.recommendStatus === clickedStatus
                        ? null
                        : clickedStatus,
                commentViewList: oldData.commentViewList.map((c) => {
                    if (c.userId === userId) {
                        return {
                            ...c,
                            recommendStatus:
                                oldData.recommendStatus === clickedStatus
                                    ? null
                                    : clickedStatus,
                        }
                    }
                    return c
                }),
            }
        },
    })

    const updateFavorite = optimisticUpdate({
        mutationFn: async () => {
            await getData('/favorite/toggle', {
                params: {
                    mediaType,
                    tmdbId,
                },
            })
        },
        queryKey: ['detail', mediaType, tmdbId, userId],
        getNewData: (_, oldData) => {
            return {
                ...oldData,
                favorite: !oldData.favorite,
            }
        },
    })

    return {
        detailQuery,
        addComment,
        updateComment,
        deleteComment,
        updateRecommend,
        updateFavorite,
    }
}
