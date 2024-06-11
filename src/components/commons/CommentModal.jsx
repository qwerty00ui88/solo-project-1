import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { xlargeRadius } from '../../style/border'
import { deleteData, postData, updateData } from '../../api/server'

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

export default function Modal({ handleClose, mediaType, tmdbId, myComment }) {
    const [comment, setComment] = useState(myComment ? myComment.text : '')

    const handleCreate = () => {
        postData('/comment/create', {
            mediaType,
            tmdbId: Number(tmdbId),
            text: comment,
        }).then((res) => {
            if (res.code === 200) {
                window.location.reload()
            }
        })
    }

    const handleEdit = () => {
        updateData('/comment/update', {
            commentId: myComment.id,
            text: comment,
        }).then((res) => {
            if (res.code === 200) {
                window.location.reload()
            }
        })
    }

    const handleDelete = () => {
        deleteData('/comment/delete', {
            data: {
                commentId: myComment.id,
            },
        }).then((res) => {
            if (res.code === 200) {
                window.location.reload()
            }
        })
    }

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
                        <Button name="수정" onClick={handleEdit} />
                        <Button name="삭제" onClick={handleDelete} />
                    </>
                ) : (
                    <Button name="저장" onClick={handleCreate} />
                )}
                <Button name="취소" onClick={handleClose} />
            </Buttons>
        </ModalWrapper>
    )
}
