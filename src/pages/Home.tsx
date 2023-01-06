import React from 'react'
import { styled } from '@nextui-org/react'
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Sidebar from '../components/home/Sidebar';

const Home = () => {
    const HomeContainer = styled('div', {
        width: '100%',
        height: 'calc(100% - 76px)',
        position: 'relative',
        display: 'flex'
    })

    const HomeMap = styled(Map, {
        width: '100%',
        height: '100%',
        position: 'absolute',
    })

    return (
        <HomeContainer>
            <Sidebar />
            <HomeMap
                initialViewState={{
                    longitude: 42.4,
                    latitude: 42.8,
                    zoom: 14
                }}
                mapStyle="mapbox://styles/mapbox/light-v9"
                mapboxAccessToken='pk.eyJ1IjoiaXJha2xpMjIwNiIsImEiOiJja3dkZzl3dDgwa2FyMnBwbjEybjd0dmxpIn0.-XNJzlRbWG0zH2Q1MRpmOA'
            />
        </HomeContainer>
    )
}

export default Home