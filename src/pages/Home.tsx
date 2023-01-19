import React, { useState, useEffect, useRef } from 'react'
import { styled } from '@nextui-org/react'
import Map, { useMap, ViewStateChangeEvent, MapProvider, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Sidebar from '../components/home/Sidebar';
import { Chirp, ChirpData } from '../types/types';
import { RiMapPinFill } from 'react-icons/ri'
import { useLocation, useSearchParams } from 'react-router-dom';
 
//@ts-ignore
const settings: Settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {}

const Home = () => {
    const [viewState, setViewState] = useState({
        latitude: 43,
        longitude: 43,
        zoom: 6
    });
    const [posts, setPosts] = useState<ChirpData[]>([])
    const { mainMap } = useMap()
    const [searchParams, setSearchParams] = useSearchParams();

    // const location = useLocation()

    useEffect(() => {

        const defaultViewState = {
            //@ts-ignore
            latitude: searchParams.get('lat') ? +searchParams.get('lat') : 43,
            //@ts-ignore
            longitude: searchParams.get('long') ? +searchParams.get('long') : 43,
            //@ts-ignore
            zoom: searchParams.get('z') ? +searchParams.get('z') : 6,
        }
        setViewState(defaultViewState)
    }, [])

    const onMove = (e: ViewStateChangeEvent) => {
        setViewState(e.viewState)
    }


    const getPosts = async () => {
        if (mainMap) {
            const mapBounds = mainMap.getBounds()
            setSearchParams(`lat=${viewState.latitude}&long=${viewState.longitude}&z=${viewState.zoom}`)
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
            let areaPosts = await response.json()
            console.log(areaPosts)
            setPosts(areaPosts)
        }
    }


    console.log(settings)
    const SidebarMemo = React.useMemo(() => <Sidebar posts={posts} updatePosts={setPosts} />, [posts])


    return (
        <HomeContainer>
            {SidebarMemo}
            <HomeMap
                {...viewState}
                onIdle={getPosts}
                onMove={onMove}
                id="mainMap"
                mapStyle={settings && settings.mapStyle == 'light' ? "mapbox://styles/mapbox/light-v9" : "mapbox://styles/mapbox/dark-v9"}
                mapboxAccessToken='pk.eyJ1IjoiaXJha2xpMjIwNiIsImEiOiJja3dkZzl3dDgwa2FyMnBwbjEybjd0dmxpIn0.-XNJzlRbWG0zH2Q1MRpmOA'
            >
                {posts.map((post, index) => {
                    return (
                        <Marker
                            key={index}
                            latitude={post.coordinates.latitude}
                            longitude={post.coordinates.longitude}
                        >
                            <ChirpPin size={24} />
                        </Marker>
                    )
                })}
            </HomeMap>
        </HomeContainer>
    )
}

const ChirpPin = styled(RiMapPinFill, {
    cursor: 'pointer'
})

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