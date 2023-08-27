import React from 'react'
import { styled } from 'styled-components'

const Div = styled.div`
    height: 100%;
    /* background-color: #5d4ffe; */
    margin: 0 64px;
    display: flex;
    & > div {
        border: 1px solid;
    }
`

const Logo = styled.div`
    flex: 1.1;
`

const Nav = styled.ul`
    flex: 3;
`

const Menu = styled.div`
    flex: 0.8;
`

function Header() {
    return (
        <Div>
            <Logo>logo</Logo>
            <Nav>
                <li>fsdf</li>
                <li>fsdf</li>
                <li>fsdf</li>
                <li>fsdf</li>
            </Nav>
            <Menu>메뉴2</Menu>
        </Div>
    )
}
export default Header
