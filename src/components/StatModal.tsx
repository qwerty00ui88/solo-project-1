import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as Favorite } from '../assets/favorite.svg'
import Map from './Map'
import { TrendingWrapper } from './Trending'

const StatModalWrapper = styled(TrendingWrapper)`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    background-color: black;
    width: 95vw;
    height: 95vh;
    padding: 2.4vw 3vw;
    z-index: 3;
`

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

function StatModal({ handleClose }: { handleClose: () => void }) {
    const [mapPosition] = useState([37.5172, 127.0473])

    return (
        <StatModalWrapper>
            <div>
                <Good fill="#019e74" />
                <Bad fill="rgb(229, 9, 20)" />
                <Favorite fill="#FFD700" />
                <button type="button" onClick={handleClose}>
                    X
                </button>
            </div>
            <MapSection>
                <Map mapPosition={mapPosition} />
            </MapSection>
        </StatModalWrapper>
    )
}
export default StatModal
