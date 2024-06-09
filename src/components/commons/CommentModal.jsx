import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from './Button'
import { xlargeRadius } from '../../style/border'

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    background-color: black;
    width: 50vw;
    height: 50vh;
    padding: 2.4vw 3vw;
    border-radius: ${xlargeRadius};
    border: 1px solid rgba(255, 255, 255, 0.534);
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.36);
`

const Textarea = styled.textarea`
    color: black;
    width: 100%;
    height: 80%;
`

const Buttons = styled.div`
    display: flex;
    justify-content: end;
`

function Modal({ handleClose, mediaType, tmdbId, myComment }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [comment, setComment] = useState(myComment ? myComment.text : '')
    return (
        <ModalWrapper>
            <Textarea
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value)
                }}
            />
            <Buttons>
                {myComment ? (
                    <>
                        <Button
                            name="수정"
                            onClick={() => {
                                axios
                                    .put(
                                        `${serverUrl}/comment/update`,
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
                                    .delete(`${serverUrl}/comment/delete`, {
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
                                    `${serverUrl}/comment/create`,
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
            </Buttons>
        </ModalWrapper>
    )
}

export default Modal
