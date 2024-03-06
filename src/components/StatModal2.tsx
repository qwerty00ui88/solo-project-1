import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from './commons/Button'
import DropDown from './commons/DropDown'

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`

const FilterSection = styled.div`
    select {
        margin-right: 1rem;
    }
`

function StatModal2({ handlePage }: { handlePage: () => void }) {
    const [region1, setRegion1] = useState<string>('서울특별시')
    const [region2, setRegion2] = useState<string>('강남구')
    const [gender, setGender] = useState<string>('male')
    const [ageGroup, setAgeGroup] = useState<string>('20')

    useEffect(() => {}, [])

    return (
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
                        // eslint-disable-next-line no-console
                        console.log(e.target.value)
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
                                'http://localhost/statistics/by-region-gender-ageGroup',
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
                                // eslint-disable-next-line no-console
                                console.log(response)
                            })
                    }}
                />
            </FilterSection>
            <Button name="지도로 보기" onClick={handlePage} />
        </TopSection>
    )
}
export default StatModal2
