import React, { useEffect, useMemo, useState } from 'react'
import { styled, Input } from '@nextui-org/react'
import ChirpCard from '../ChirpCard'
import { FiRefreshCcw } from 'react-icons/fi'
import { Chirp, ChirpData } from '../../types/types'

type Props = {
    posts: ChirpData[]
}

const Sidebar = ({ posts }: Props) => {
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [postInput, setPostInput] = useState<string>('')
    const [expandedPostId, setExpandedPostId] = useState<string>('')

    const expandPost = (postId: string) => {
        setExpandedPostId(postId)
    }

    useEffect(() => {
        const onResize = () => {
            setWindowWidth(window.innerWidth)
        }

        onResize()

        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    console.log(posts)

    return (
        <>
            {windowWidth > 900 ?
                <SidebarContainer>
                    {/* <RefreshIcon /> */}
                    {posts.map((post) => {
                        return (
                            <ChirpCard
                                {...post}
                            />
                        )
                    })}
                    <Input size='xl' placeholder='Post something...'
                        animated={false}
                        value={postInput}
                        onChange={(e) => setPostInput(e.target.value)}
                        css={{
                            border: '2px solid $primary',
                            position: 'sticky',
                            bottom: 0,
                            // boxShadow: '0px 0px 50px 50px white',
                            background: '$white'
                        }}
                    />
                </SidebarContainer>
                :
                null
            }

        </>
    )
}

const RefreshIcon = styled(FiRefreshCcw, {
    position: 'fixed',
    height: 30,
    width: 30,
    top: 20,
    right: 20,
    zIndex: 20,
    color: '$primary',
    dropShadow: '$lg',
    cursor: 'pointer'
})

const CustomInput = styled(Input, {

})

const SidebarContainer = styled('div', {
    width: 'clamp(400px, 45%, 700px)',
    background: '$white',
    minHeight: '100%',
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