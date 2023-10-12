import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, {
    ContentType,
    Contents,
    People,
    PersonType,
} from '../utils/useGet'
import ContentCard from '../components/ContentCard'
import PersonCard from '../components/PersonCard'

const ContentWrapper = styled.main``

const ContentList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 1.2rem;
`

const PeopleList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 1.2rem;
`

const Sort = styled.select`
    color: black;
`

const sortArr = [
    {
        id: 'popularity.desc',
        ko: '인기도 내림차순',
        en: 'Popularity Descending',
    },
    {
        id: 'popularity.asc',
        ko: '인기도 오름차순',
        en: 'Popularity Ascending',
    },
    {
        id: 'vote_average.desc',
        ko: '평점 내림차순',
        en: 'Rating Descending',
    },
    {
        id: 'vote_average.asc',
        ko: '평점 오름차순',
        en: 'Rating Ascending',
    },
    {
        id: 'release_date.desc',
        ko: '상영일 내림차순',
        en: 'Release Date Descending',
    },
    {
        id: 'release_date.asc',
        ko: '상영일 오름차순',
        en: 'Release Date Ascending',
    },
    { id: 'original_title.desc', ko: '제목 내림차순', en: 'Title (Z-A)' },
    { id: 'original_title.asc', ko: '제목 오름차순', en: 'Title (A-Z)' },
]

function Content() {
    const { menu, category } = useParams() as { menu: string; category: string }
    const [sort, setSort] = useState('popularity.desc')
    const [page, setPage] = useState(1)
    const [dataList, setdataList] = useState<ContentType[] | PersonType[]>([])
    const lastElement = useRef<HTMLLIElement | null>(null)
    const setRef = useCallback(
        (node: HTMLLIElement) => {
            const observer = new IntersectionObserver(
                (entries: IntersectionObserverEntry[]) => {
                    entries.forEach((el) => {
                        if (el.isIntersecting) {
                            setPage(page + 1)
                            observer.disconnect()
                        }
                    })
                },
                {
                    threshold: 0.5,
                }
            )

            if (node?.id === String(dataList.at(-10)?.id)) {
                lastElement.current = node
                observer.observe(lastElement.current)
            }
        },
        [dataList]
    )

    const commonParams = {
        include_adult: false,
        include_video: false,
        language: 'ko-KR',
        page,
        sort_by: sort,
    }

    const popularParams = {
        ...commonParams,
    }

    const nowPlayingParams = {
        ...commonParams,
        with_release_type: 2 || 3,
        'release_date.lte': new Date(`${new Date()}z`)
            .toISOString()
            .slice(0, 10),
    }

    const upcomingParams = {
        ...commonParams,
        with_release_type: 2 || 3,
        'release_date.gte': new Date(`${new Date()}z`)
            .toISOString()
            .slice(0, 10),
    }

    const topRatedParams = {
        ...commonParams,
        'vote_count.gte': 200,
    }

    const airingTodayParams = {
        ...commonParams,
        'air_date.lte': new Date(`${new Date()}z`).toISOString().slice(0, 10),
        'air_date.gte': new Date(`${new Date()}z`).toISOString().slice(0, 10),
    }

    const onTheAirParams = {
        ...commonParams,
        'air_date.gte': new Date(`${new Date()}z`).toISOString().slice(0, 10),
    }

    const { data } = useGet<Contents | People>(
        menu === 'person'
            ? `https://api.themoviedb.org/3/person/popular`
            : `https://api.themoviedb.org/3/discover/${menu}`,
        menu === 'person'
            ? { language: 'ko-KR', page }
            : (() => {
                  switch (category) {
                      case 'popular':
                          return popularParams
                      case 'now_playing':
                          return nowPlayingParams
                      case 'upcoming':
                          return upcomingParams
                      case 'top_rated':
                          return topRatedParams
                      case 'airing_today':
                          return airingTodayParams
                      case 'on_the_air':
                          return onTheAirParams
                      default:
                          return {}
                  }
              })()
    )

    useEffect(() => {
        if (data) {
            if (data.page === 1) {
                setdataList(data.results)
            } else {
                setdataList([
                    ...dataList,
                    ...data.results,
                ] as typeof data.results)
            }
        }
    }, [data])

    useEffect(() => {
        setPage(1)
        setdataList([])
    }, [menu, category, sort])

    return (
        dataList && (
            <ContentWrapper>
                {menu !== 'person' && (
                    <Sort
                        onChange={(e) => {
                            setSort(e.target.value)
                        }}
                    >
                        {sortArr.map((el) => {
                            return (
                                <option key={el.id} value={el.id}>
                                    {el.ko}
                                </option>
                            )
                        })}
                    </Sort>
                )}
                {menu === 'person' && (
                    <PeopleList>
                        {dataList.map((el) => {
                            return (
                                <PersonCard
                                    key={el.id}
                                    id={String(el.id)}
                                    data={el as PersonType}
                                    setRef={setRef}
                                />
                            )
                        })}
                    </PeopleList>
                )}
                {(menu === 'movie' || menu === 'tv') && (
                    <ContentList>
                        {dataList.map((el) => {
                            return (
                                <ContentCard
                                    key={el.id}
                                    id={String(el.id)}
                                    data={el as ContentType}
                                    mediaType={menu}
                                    setRef={setRef}
                                />
                            )
                        })}
                    </ContentList>
                )}
            </ContentWrapper>
        )
    )
}

export default Content
