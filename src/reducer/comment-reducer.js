export default function commentReducer(commentList, action) {
    switch (action.type) {
        case 'initialize': {
            return action.init
        }
        case 'create': {
            const { userId, nickname, comment, recommend } = action
            return [
                {
                    userId,
                    nickname,
                    comment,
                    recommendStatus: recommend,
                },
                ...commentList,
            ]
        }
        case 'update': {
            const { commentId, text } = action
            return commentList.map((c) => {
                if (c.comment.id === commentId) {
                    return { ...c, comment: { ...c.comment, text } }
                }
                return c
            })
        }
        case 'delete': {
            const { commentId } = action
            return commentList.filter((c) => c.comment.id !== commentId)
        }
        case 'recommendUpdate': {
            const { userId, recommend } = action
            return commentList.map((c) => {
                if (c.userId === userId) {
                    return { ...c, recommendStatus: recommend }
                }
                return c
            })
        }
        default: {
            throw Error(`알수없는 액션 타입입니다: ${action.type}`)
        }
    }
}
