import React, { useEffect } from 'react'
import styled from 'styled-components'
import sido from '../data/sido.json'

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        kakao: any
    }
}

const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
`

function Map({ mapPosition }: { mapPosition: number[] }) {
    useEffect(() => {
        const container = document.getElementById('map')
        const options = {
            center: new window.kakao.maps.LatLng(...mapPosition),
            level: 12,
        }

        const map = new window.kakao.maps.Map(container, options) // 지도 생성

        // const content =
        //     '<div class="overlaybox">' +
        //     '    <img src="https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg">' +
        //     '    </img>' +
        //     '</div>'

        // const position = new window.kakao.maps.LatLng(...mapPosition) // 지도 초기 렌더링 위치

        // const customOverlay = new window.kakao.maps.CustomOverlay({
        //     position,
        //     content,
        //     xAnchor: 0.3,
        //     yAnchor: 0.91,
        // })

        // customOverlay.setMap(map)

        // sido.features.forEach((el) => {
        //     // 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다
        //     el.geometry.coordinates.forEach((el2) => {
        //         const polygonPath = el2.map((el3) => {
        //             return new window.kakao.maps.LatLng(...el3)
        //         })
        //         // eslint-disable-next-line no-console
        //         console.log(polygonPath, el.properties.SIG_KOR_NM)

        //         // 지도에 표시할 다각형을 생성합니다
        //         const polygon = new window.kakao.maps.Polygon({
        //             path: polygonPath, // 그려질 다각형의 좌표 배열입니다
        //             strokeWeight: 3, // 선의 두께입니다
        //             strokeColor: '#ff0000', // 선의 색깔입니다
        //             strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //             strokeStyle: 'longdash', // 선의 스타일입니다
        //             fillColor: '#A2FF99', // 채우기 색깔입니다
        //             fillOpacity: 0.7, // 채우기 불투명도 입니다
        //         })

        //         // 지도에 다각형을 표시합니다
        //         polygon.setMap(map)
        //     })
        // })

        const addPolygons = () => {
            sido.features.forEach((el) => {
                el.geometry.coordinates.forEach((el2) => {
                    const polygonPath = el2.map((el3) => {
                        return new window.kakao.maps.LatLng(el3[1], el3[0])
                    })
                    const polygon = new window.kakao.maps.Polygon({
                        path: polygonPath,
                        strokeWeight: 1.5,
                        strokeColor: 'red',
                        strokeOpacity: 0.8,
                        strokeStyle: 'longdash',
                        fillColor: '#00000080',
                        fillOpacity: 0.7,
                    })
                    polygon.setMap(map)
                })
            })
        }

        addPolygons()
    }, [])

    return <MapWrapper id="map" />
}
export default Map
