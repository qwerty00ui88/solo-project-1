import React, { useState } from 'react'
import styled from 'styled-components'
import { TrendingWrapper } from './Trending'
import StatModal1 from './StatModal1'
import { ReactComponent as Cancel } from '../assets/cancel.svg'
import StatModal2 from './StatModal2'
import IconButton from './commons/IconButton'

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

const CancelIconButton = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
`

function StatModal({ handleClose }: { handleClose: () => void }) {
    const [page, setPage] = useState(1)
    const [mapPosition] = useState([36.5, 128])

    const handlePage = () => {
        setPage(page === 1 ? 2 : 1)
    }

    return (
        <StatModalWrapper>
            <CancelIconButton>
                <IconButton onClick={handleClose}>
                    <Cancel />
                </IconButton>
            </CancelIconButton>
            {page === 1 ? (
                <StatModal1 mapPosition={mapPosition} handlePage={handlePage} />
            ) : (
                <StatModal2 handlePage={handlePage} />
            )}
        </StatModalWrapper>
    )
}
export default StatModal
