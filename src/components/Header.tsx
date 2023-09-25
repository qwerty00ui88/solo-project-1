import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import {
    fontLogo,
    largeSize,
    boldWeight,
    logoSize,
    semiboldWeight,
} from '../style/font'
import { ReactComponent as Sun } from '../assets/sun.svg'
import { ReactComponent as Moon } from '../assets/moon.svg'
import { useAppDispatch, useAppSelector } from '../hooks'
import Button from './commons/Button'
import { logout } from '../reducers/userReducer'
import LinkTo from './commons/LinkTo'
import { smallRadius } from '../style/border'

const HeaderWrapper = styled.div`
    display: flex;
    margin: 0 10vw;
    & > * {
        display: flex;
        align-items: center;
    }
    height: 15vh;
    max-height: 120px;
`

const Logo = styled.h1`
    font-family: ${fontLogo};
    font-size: ${logoSize};
    font-weight: ${boldWeight};
    color: rgb(229, 9, 20);
    margin-right: 1vw;
`

const Nav = styled.ul`
    flex: 1;
    z-index: 1;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

const NavList = styled.li`
    padding: 1rem 2vw;
    white-space: nowrap;
    position: relative;
    &:hover {
        & > ul {
            visibility: visible;
        }
    }
`

const NavName = styled.div`
    font-size: ${largeSize};
    font-weight: ${semiboldWeight};
`

const SubNavList = styled.ul`
    visibility: hidden;
    border: 1px solid #e5e5e5;
    border-radius: ${smallRadius};
    margin-top: 0.5rem;
    padding: 0.5rem 0.7rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: black;
    & > li {
        padding: 0.3rem;
    }
`

const Menu = styled.div`
    column-gap: 10px;
    @media screen and (max-width: 768px) {
        flex: 1;
        justify-content: flex-end;
    }
`

function Header() {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector((state) => {
        return !!state.user.user
    })

    const nav = [
        {
            nav: { id: 'movie', nameKr: '영화', nameEn: 'Movie' },
            subNav: [
                { id: 'popular', nameKr: '인기', nameEn: 'Popular' },
                {
                    id: 'now_playing',
                    nameKr: '현재 상영 중',
                    nameEn: 'Now Playing',
                },
                { id: 'upcoming', nameKr: '개봉 예정', nameEn: 'Upcoming' },
                { id: 'top_rated', nameKr: '높은 평점', nameEn: 'Top Rated' },
            ],
        },
        {
            nav: { id: 'tv', nameKr: 'TV', nameEn: 'TV' },
            subNav: [
                { id: 'popular', nameKr: '인기', nameEn: 'Popular' },
                {
                    id: 'airing_today',
                    nameKr: '오늘 방영',
                    nameEn: 'Airing Today',
                },
                { id: 'on_the_air', nameKr: 'TV 방영 중', nameEn: 'On TV' },
                { id: 'top_rated', nameKr: '높은 평점', nameEn: 'Top Rated' },
            ],
        },
        {
            nav: { id: 'person', nameKr: '인물', nameEn: 'People' },
            subNav: [{ id: 'popular', nameKr: '인기', nameEn: 'Popular' }],
        },
    ]

    return (
        <HeaderWrapper>
            <Link to="/">
                <Logo>CUT</Logo>
            </Link>
            <Nav>
                {nav.map((list) => {
                    return (
                        <NavList key={list.nav.id}>
                            <NavName>{list.nav.nameKr}</NavName>
                            <SubNavList>
                                {list.subNav.map((el) => {
                                    return (
                                        <li key={el.id}>
                                            <Link
                                                to={`/${list.nav.id}/${el.id}`}
                                            >
                                                {el.nameKr}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </SubNavList>
                        </NavList>
                    )
                })}
            </Nav>
            {isLogin ? (
                <Menu>
                    <Button
                        name="로그아웃"
                        onClick={() => {
                            dispatch(logout())
                        }}
                        width="4.5rem"
                        height="2.4rem"
                    />
                </Menu>
            ) : (
                <Menu>
                    <Sun />
                    <Moon />
                    <LinkTo name="로그인" to="/login" height="2.4rem" />
                    <LinkTo name="회원가입" to="/signup" height="2.4rem" />
                </Menu>
            )}
        </HeaderWrapper>
    )
}
export default Header
