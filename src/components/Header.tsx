import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import {
    fontLogo,
    largeSize,
    boldWeight,
    logoSize,
    semiboldWeight,
} from '../style/font'
import { ReactComponent as Sun } from '../assets/sun.svg'
import { ReactComponent as Moon } from '../assets/moon.svg'
import { ReactComponent as User } from '../assets/user.svg'
import Button from './commons/Button'
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
    const [cookies, , removeCookie] = useCookies(['JSESSIONID'])

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
            {cookies.JSESSIONID ? (
                <Menu>
                    <Link to="/mypage/favorite">
                        <User />
                    </Link>
                    <Button
                        name="로그아웃"
                        onClick={() => {
                            axios
                                .get('http://localhost/user/logout', {
                                    withCredentials: true,
                                })
                                .then(() => {
                                    removeCookie('JSESSIONID')
                                    window.location.href =
                                        'http://localhost:3000'
                                })
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
                    <LinkTo name="회원가입" to="signup/1" height="2.4rem" />
                </Menu>
            )}
        </HeaderWrapper>
    )
}
export default Header
