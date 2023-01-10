import React, { useState, useEffect, useRef } from 'react'
import { styled } from '@nextui-org/react'
import Map, { useMap, ViewStateChangeEvent, MapProvider, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Sidebar from '../components/home/Sidebar';
import { Chirp, ChirpData } from '../types/types';

const Home = () => {
    const [viewState, setViewState] = useState({
        longitude: 43,
        latitude: 43,
        zoom: 6
    });
    const [posts, setPosts] = useState<ChirpData[]>([])
    const { mainMap } = useMap()



    const onMove = (e: ViewStateChangeEvent) => {
        setViewState(e.viewState)
    }

    const getPosts = async () => {
        if (mainMap) {
            const mapBounds = mainMap.getBounds()
            const coordData = {
                minLat: mapBounds.getSouth(),
                maxLat: mapBounds.getNorth(),
                minLong: mapBounds.getWest(),
                maxLong: mapBounds.getEast()
            }
            let response = await fetch('http://localhost:3000/api/posts', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(coordData),

            })
            console.log(JSON.stringify(coordData))
            let areaPosts = await response.json()
            console.log(areaPosts)
            setPosts(areaPosts)
        }
    }



    const SidebarMemo = React.useMemo(() => <Sidebar posts={posts} />, [posts])


    return (
        <HomeContainer>
            {SidebarMemo}
            {/* <Sidebar /> */}
            <HomeMap
                {...viewState}
                onIdle={getPosts}
                onMove={onMove}
                id="mainMap"
                mapStyle="mapbox://styles/mapbox/light-v9"
                mapboxAccessToken='pk.eyJ1IjoiaXJha2xpMjIwNiIsImEiOiJja3dkZzl3dDgwa2FyMnBwbjEybjd0dmxpIn0.-XNJzlRbWG0zH2Q1MRpmOA'
            >
                {posts.map((post, index) => {
                    return (
                        <Marker
                            latitude={post.coordinates.latitude}
                            longitude={post.coordinates.longitude}
                        >
                            <div>{post.coordinates.latitude + ''}</div>
                        </Marker>
                    )
                })}
            </HomeMap>
        </HomeContainer>
    )
}

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

export default Home