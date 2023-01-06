import React, { useEffect, useState } from 'react'
import { styled } from '@nextui-org/react'
import { chirps } from '../../data/chirps'
import ChirpCard from '../ChirpCard'

const Sidebar = () => {
    const [windowWidth, setWindowWidth] = useState<number>(0)

    useEffect(() => {
        const onResize = () => {
            setWindowWidth(window.innerHeight)
        }

        onResize()

        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])


    return (
        <>
            {windowWidth > 900 ?
                <SidebarContainer>
                    {chirps.map((chirp) => {
                        return (
                            <ChirpCard
                                {...chirp}

                            />
                        )
                    })}
                </SidebarContainer>
                :
                null
            }

        </>
    )
}

const SidebarContainer = styled('div', {
    width: 'clamp(400px, 45%, 700px)',
    background: '$white',
    height: '100%',
    dropShadow: '$md',
    position: 'relative',
    zIndex: 10,
    p: '$8',
    display: 'flex',
    flexDirection: 'column',
    gap: '$12',
    overflow: 'auto',
    flexShrink: '0'
})

export default Sidebar