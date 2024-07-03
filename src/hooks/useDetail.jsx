import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteData, getData, postData, updateData } from '../api/server'
import { useAuthContext } from '../context/AuthContext'

export default function useDetail({ mediaType, tmdbId }) {
    const queryClient = useQueryClient()
    const { userId, nickname } = useAuthContext()

    const detailQuery = useQuery({
        queryKey: ['detail', mediaType, tmdbId, userId],
        queryFn: () => getData(`/detail/${mediaType}/${tmdbId}`),
    })

    const addComment = useMutation({
        mutationFn: async (newComment) => {
            await postData('/comment/create', {
                mediaType,
                tmdbId: Number(tmdbId),
                text: newComment,
            })
        },
        onMutate: async (newComment) => {
            await queryClient.cancelQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
            const previousDetail = queryClient.getQueryData([
                'detail',
                mediaType,
                tmdbId,
                userId,
            ])
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                (old) => {
                    return {
                        ...old,
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
                            recommendStatus: old.recommendStatus,
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
                                recommendStatus: old.recommendStatus,
                            },
                            ...old.commentViewList,
                        ],
                    }
                }
            )
            return { previousDetail }
        },
        onError: (context) => {
            alert('다시 시도해주세요.')
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                context.previousDetail
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
        },
    })

    const updateComment = useMutation({
        mutationFn: async ({ commentId, text }) => {
            await updateData('/comment/update', {
                commentId,
                text,
            })
        },
        onMutate: async ({ commentId, text }) => {
            await queryClient.cancelQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
            const previousDetail = queryClient.getQueryData([
                'detail',
                mediaType,
                tmdbId,
                userId,
            ])
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                (old) => {
                    return {
                        ...old,
                        myComment: {
                            // updatedAt도 변경
                            ...old.myComment,
                            text,
                        },
                        commentViewList: old.commentViewList.map((c) => {
                            if (c.comment.commentId === commentId) {
                                // updatedAt도 변경
                                return { ...c, comment: { ...c.comment, text } }
                            }
                            return c
                        }),
                    }
                }
            )
            return { previousDetail }
        },
        onError: (context) => {
            alert('다시 시도해주세요.')
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                context.previousDetail
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
        },
    })

    const deleteComment = useMutation({
        mutationFn: async (commentId) => {
            await deleteData('/comment/delete', {
                data: {
                    commentId,
                },
            })
        },
        onMutate: async (commentId) => {
            await queryClient.cancelQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
            const previousDetail = queryClient.getQueryData([
                'detail',
                mediaType,
                tmdbId,
                userId,
            ])
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                (old) => {
                    return {
                        ...old,
                        myComment: null,
                        commentViewList: old.commentViewList.filter(
                            (c) => c.comment.commentId !== commentId
                        ),
                    }
                }
            )
            return { previousDetail }
        },
        onError: (context) => {
            alert('다시 시도해주세요.')
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                context.previousDetail
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
        },
    })

    const updateRecommend = useMutation({
        mutationFn: async (clickedStatus) => {
            await getData('/recommend', {
                params: {
                    mediaType,
                    tmdbId,
                    status: clickedStatus,
                },
            })
        },
        onMutate: async (clickedStatus) => {
            await queryClient.cancelQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
            const previousDetail = queryClient.getQueryData([
                'detail',
                mediaType,
                tmdbId,
                userId,
            ])
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                (old) => {
                    return {
                        ...old,
                        recommendStatus: old.recommendStatus && clickedStatus,
                        commentViewList: old.commentViewList.map((c) => {
                            if (c.userId === userId) {
                                return {
                                    ...c,
                                    recommendStatus:
                                        old.recommendStatus && clickedStatus,
                                }
                            }
                            return c
                        }),
                    }
                }
            )
            return { previousDetail }
        },
        onError: (context) => {
            alert('다시 시도해주세요.')
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                context.previousDetail
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
        },
    })

    const updateFavorite = useMutation({
        mutationFn: async () => {
            await getData('/favorite/toggle', {
                params: {
                    mediaType,
                    tmdbId,
                },
            })
        },
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
            const previousDetail = queryClient.getQueryData([
                'detail',
                mediaType,
                tmdbId,
                userId,
            ])
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                (old) => {
                    return {
                        ...old,
                        isFavorite: !old.isFavorite,
                    }
                }
            )
            return { previousDetail }
        },
        onError: (context) => {
            alert('다시 시도해주세요.')
            queryClient.setQueryData(
                ['detail', mediaType, tmdbId, userId],
                context.previousDetail
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['detail', mediaType, tmdbId, userId],
            })
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
