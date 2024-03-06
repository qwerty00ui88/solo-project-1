import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from './Button'
import { Comment } from '../../pages/Detail'

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    background-color: skyblue;
    width: 50vw;
    height: 50vh;
    padding: 2.4vw 3vw;
`

const Textarea = styled.textarea`
    color: black;
    width: 100%;
    height: 80%;
`

function Modal({
    handleClose,
    mediaType,
    tmdbId,
    myComment,
}: {
    handleClose: () => void
    mediaType: string
    tmdbId: string
    myComment: Comment
}) {
    const [comment, setComment] = useState(myComment ? myComment.text : '')
    return (
        <ModalWrapper>
            <Textarea
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value)
                }}
            />
            <div>
                {myComment ? (
                    <>
                        <Button
                            name="수정"
                            onClick={() => {
                                axios
                                    .put(
                                        'http://localhost/comment/update',
                                        {
                                            commentId: myComment.id,
                                            text: comment,
                                        },
                                        { withCredentials: true }
                                    )
                                    .then((response) => {
                                        if (response.data.code === 200) {
                                            window.location.reload()
                                        }
                                    })
                            }}
                        />
                        <Button
                            name="삭제"
                            onClick={() => {
                                axios
                                    .delete('http://localhost/comment/delete', {
                                        data: {
                                            commentId: myComment.id,
                                        },
                                        withCredentials: true,
                                    })
                                    .then((response) => {
                                        if (response.data.code === 200) {
                                            window.location.reload()
                                        }
                                    })
                            }}
                        />
                    </>
                ) : (
                    <Button
                        name="저장"
                        onClick={() => {
                            axios
                                .post(
                                    'http://localhost/comment/create',
                                    {
                                        mediaType,
                                        tmdbId: Number(tmdbId),
                                        text: comment,
                                    },
                                    { withCredentials: true }
                                )
                                .then((response) => {
                                    if (response.data.code === 200) {
                                        window.location.reload()
                                    }
                                })
                        }}
                    />
                )}
                <Button name="취소" onClick={handleClose} />
            </div>
        </ModalWrapper>
    )
}

export default Modal
