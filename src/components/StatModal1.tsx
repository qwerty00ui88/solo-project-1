import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as Favorite } from '../assets/favorite.svg'
import Map from './Map'
import Button from './commons/Button'
import IconButton from './commons/IconButton'

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        kakao: any
    }
}

const MapSection = styled.div`
    width: 100%;
    flex: 1;

    .overlaybox {
        background-color: black;
    }
`

const IconButtonSection = styled.div`
    display: flex;
    gap: 1rem;
`

const ButtonSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`

function StatModal1({
    mapPosition,
    handlePage,
}: {
    mapPosition: number[]
    handlePage: () => void
}) {
    return (
        <>
            <ButtonSection>
                <IconButtonSection>
                    <IconButton onClick={() => {}}>
                        <Good fill="#019e74" />
                    </IconButton>
                    <IconButton onClick={() => {}}>
                        <Bad fill="rgb(229, 9, 20)" />
                    </IconButton>
                    <IconButton onClick={() => {}}>
                        <Favorite fill="#FFD700" />
                    </IconButton>
                </IconButtonSection>
                <Button name="필터로 검색하기" onClick={handlePage} />
            </ButtonSection>
            <MapSection>
                <Map mapPosition={mapPosition} />
            </MapSection>
        </>
    )
}
export default StatModal1
