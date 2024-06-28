import React from 'react'
import styled from 'styled-components'
import Button from '../commons/Button'
import { xlargeRadius } from '../../style/border'
import useTextInput from '../../hooks/useTextInput'

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    padding: 1rem;
`

const Buttons = styled.div`
    display: flex;
    justify-content: end;
    gap: 0.5rem;
`

export default function CommentModal({
    handleClose,
    myComment,
    handleCreate,
    handleUpdate,
    handleDelete,
}) {
    const { value, onChange } = useTextInput(myComment ? myComment.text : '')

    return (
        <ModalWrapper>
            <Textarea value={value} onChange={onChange} />
            <Buttons>
                {myComment ? (
                    <>
                        <Button
                            name="수정"
                            onClick={() => {
                                handleUpdate(myComment.id, value)
                                handleClose()
                            }}
                        />
                        <Button
                            name="삭제"
                            onClick={() => {
                                handleDelete(myComment.id)
                                handleClose()
                            }}
                        />
                    </>
                ) : (
                    <Button
                        name="저장"
                        onClick={() => {
                            handleCreate(value)
                            handleClose()
                        }}
                    />
                )}
                <Button name="취소" onClick={handleClose} />
            </Buttons>
        </ModalWrapper>
    )
}
