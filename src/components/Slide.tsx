import React from 'react'
import styled from 'styled-components'
import { xlargeRadius } from '../style/border'
import { ContentType } from '../utils/useGet'

const SlideWrapper = styled.div<{ ref: React.ForwardedRef<HTMLDivElement> }>`
    flex: 0 0 calc(100% + 30vw);
    width: calc(100% + 30vw);
    display: flex;
    &::after {
        content: '';
        display: block;
        width: 30vw;
        flex: 0 0 30vw;
    }
`

const CardContainer = styled.div`
    flex: 0 0 calc(100% - 30vw);
    column-gap: 20px;
    justify-content: space-between;
    width: calc(100% - 30vw);
    display: flex;
`

const Card = styled.div`
    flex: 1;
    width: 18%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(0.95);
    }
`

const Img = styled.img`
    flex: 1 0; // 세로
    border-radius: ${xlargeRadius};
`

interface SlideProps {
    data: ContentType[]
    slideRef: React.ForwardedRef<HTMLDivElement>
}

function Slide({ data, slideRef }: SlideProps) {
    return (
        <SlideWrapper ref={slideRef}>
            <CardContainer>
                {data.map((el) => {
                    return (
                        <Card key={el.id}>
                            <Img
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${el?.poster_path}`}
                            />
                        </Card>
                    )
                })}
            </CardContainer>
        </SlideWrapper>
    )
}
export default Slide
