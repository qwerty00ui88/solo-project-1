import React from 'react'
import { useParams } from 'react-router-dom'
import DetailPageTemplate from '../components/templates/DetailPageTemplate'

function Detail() {
    const { id } = useParams()
    return <DetailPageTemplate id={id as string} />
}

export default Detail
