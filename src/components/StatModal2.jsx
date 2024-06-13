import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from './commons/Button'
import DropDown from './commons/DropDown'
import Poster from './commons/Poster'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as Favorite } from '../assets/favorite.svg'

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`

const BottomSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    padding: 0 5rem;
`

const IconAndPoster = styled.div`
    width: 100%;
`

const FilterSection = styled.div`
    select {
        margin-right: 1rem;
    }
`

export default function StatModal2({ handlePage }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [region1, setRegion1] = useState('서울특별시')
    const [region2, setRegion2] = useState('강남구')
    const [gender, setGender] = useState('male')
    const [ageGroup, setAgeGroup] = useState('20')
    const [filteredData, setFilteredData] = useState({
        bestContent: { content: null, count: 0 },
        worstContent: { content: null, count: 0 },
        mostSelectedFavoriteContent: { content: null, count: 0 },
    })

    return (
        <>
            <TopSection>
                <FilterSection>
                    <DropDown
                        selectId="region1"
                        onChange={(e) => {
                            setRegion1(e.target.value)
                        }}
                        options={[
                            { value: '서울특별시', name: '서울특별시' },
                            { value: '경기도', name: '경기도' },
                        ]}
                    />
                    <DropDown
                        selectId="region2"
                        onChange={(e) => {
                            setRegion2(e.target.value)
                        }}
                        options={[
                            { value: '강남구', name: '강남구' },
                            { value: '화성시', name: '화성시' },
                        ]}
                    />
                    <DropDown
                        selectId="gender"
                        onChange={(e) => {
                            setGender(e.target.value)
                        }}
                        options={[
                            { value: 'male', name: '남성' },
                            { value: 'female', name: '여성' },
                        ]}
                    />
                    <DropDown
                        selectId="ageGroup"
                        onChange={(e) => {
                            setAgeGroup(e.target.value)
                        }}
                        options={[
                            { value: '10', name: '10대' },
                            { value: '20', name: '20대' },
                            { value: '30', name: '30대' },
                            { value: '40', name: '40대' },
                            { value: '50', name: '50대' },
                            { value: '60', name: '60대' },
                            { value: '70', name: '70대' },
                            { value: '80', name: '80대' },
                        ]}
                    />
                    <Button
                        name="검색"
                        onClick={() => {
                            axios
                                .get(
                                    `${serverUrl}/statistics/by-region-gender-ageGroup`,
                                    {
                                        params: {
                                            region: `${region1} ${region2}`,
                                            gender,
                                            ageGroup: Number(ageGroup),
                                        },
                                        withCredentials: true,
                                    }
                                )
                                .then((response) => {
                                    setFilteredData(response.data)
                                })
                        }}
                    />
                </FilterSection>
                <Button name="지도로 보기" onClick={handlePage} />
            </TopSection>
            <BottomSection>
                <IconAndPoster>
                    <Good fill="#019e74" />
                    <Poster
                        mediaType={
                            filteredData.bestContent.content?.mediaType || null
                        }
                        id={filteredData.bestContent.content?.id || null}
                        posterPath={
                            filteredData.bestContent.content?.poster_path ||
                            null
                        }
                    />
                </IconAndPoster>
                <IconAndPoster>
                    <Bad fill="rgb(229, 9, 20)" />
                    <Poster
                        mediaType={
                            filteredData.worstContent.content?.mediaType || null
                        }
                        id={filteredData.worstContent.content?.id || null}
                        posterPath={
                            filteredData.worstContent.content?.poster_path ||
                            null
                        }
                    />
                </IconAndPoster>
                <IconAndPoster>
                    <Favorite fill="#FFD700" />
                    <Poster
                        mediaType={
                            filteredData.mostSelectedFavoriteContent.content
                                ?.mediaType || null
                        }
                        id={
                            filteredData.mostSelectedFavoriteContent.content
                                ?.id || null
                        }
                        posterPath={
                            filteredData.mostSelectedFavoriteContent.content
                                ?.poster_path || null
                        }
                    />
                </IconAndPoster>
            </BottomSection>
        </>
    )
}
