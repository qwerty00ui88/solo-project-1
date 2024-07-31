import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useOptimisticUpdate() {
    const queryClient = useQueryClient()
    const optimisticUpdate = ({ mutationFn, queryKey, getNewData }) =>
        useMutation({
            mutationFn,
            onMutate: async (variables) => {
                await queryClient.cancelQueries({ queryKey })
                const oldData = queryClient.getQueryData(queryKey)
                queryClient.setQueryData(queryKey, () =>
                    getNewData(variables, oldData)
                )
                return { oldData }
            },
            onError: (context) => {
                alert('다시 시도해주세요.')
                queryClient.setQueryData(queryKey, context.old)
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey,
                })
            },
        })

    return { optimisticUpdate }
}
