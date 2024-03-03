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
            level: 13,
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
