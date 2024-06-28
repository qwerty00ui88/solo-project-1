export default function commentReducer(commentList, action) {
    switch (action.type) {
        case 'initialize': {
            return action.init
        }
        case 'create': {
            const { userId, nickname, comment } = action
            return [
                {
                    userId,
                    nickname,
                    comment,
                    recommendStatus: 'good',
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
        default: {
            throw Error(`알수없는 액션 타입입니다: ${action.type}`)
        }
    }
}
