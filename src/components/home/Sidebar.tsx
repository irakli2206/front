import React, { useEffect, useMemo, useState } from 'react'
import { styled, Input, Tooltip, Textarea } from '@nextui-org/react'
import ChirpCard from '../ChirpCard'
import { FiRefreshCcw } from 'react-icons/fi'
import { Chirp, ChirpData, Coordinates, UserType } from '../../types/types'
import ActionModal from '../ActionModal'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

type Props = {
    posts: ChirpData[],
    updatePosts: (posts: ChirpData[]) => void
}

const Sidebar = ({ posts, updatePosts }: Props) => {
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [postInput, setPostInput] = useState<string>('')
    const [user, setUser] = useState<UserType>()
    const [currentCoords, setCurrentCoords] = useState<Coordinates>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        const loggedUser = localStorage.getItem('user')
        if (loggedUser) {
            let userObject = JSON.parse(loggedUser)
            setUser(userObject)
        }

    }, [])



    useEffect(() => {

        const onResize = () => {
            setWindowWidth(window.innerWidth)
        }

        onResize()

        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const createPost = async () => {

        if (user) {
            if (postInput.trim().length > 0) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const body = {
                        userId: user?._id,
                        content: postInput,
                        coordinates: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        }
                    }
                    const create = await fetch('http://localhost:3000/api/posts/create', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(body)
                    })
                    const createdPost = await create.json()
                    const newPostsData = [...posts, createdPost]
                    updatePosts(newPostsData)
                    setPostInput('')
                })
            }
        }
        else {
            setModalVisible(true)
        }


    }


    return (
        <>

            <ActionModal actionTitle='Log In' visible={modalVisible} closeHandler={() => { setModalVisible(false) }}
                actionHandler={() => {
                    navigate('/login')
                }}
                modalTitle='You need to log in to make a post'
            />
            {windowWidth > 900 ?
                <SidebarContainer>
                    {/* <RefreshIcon /> */}
                    <PostsContainer>
                        {posts.map((post) => {
                            return (
                                <ChirpCard
                                    key={post._id}
                                    {...post}
                                />
                            )
                        })}
                    </PostsContainer>
                    <InputContainer  >
                        <Textarea size='xl' placeholder='Post something...'
                            animated={false}
                            value={postInput}
                            onChange={(e) => setPostInput(e.target.value)}

                            maxLength={200}
                            css={{



                                // boxShadow: '0px 0px 50px 50px white',
                                background: '$white',
                                width: '100%'
                            }}
                        />
                        <RiSendPlaneFill size={32} onClick={createPost} />
                    </InputContainer>
                </SidebarContainer>
                :
                null
            }

        </>
    )
}

const PostsContainer = styled('div', {
    p: '$8',
    display: 'flex',
    flexDirection: 'column',
    gap: '$12',
})

const InputContainer = styled('div', {
    display: 'flex',
    position: 'sticky',
    bottom: 0,
    width: '100%',
    filter: 'drop-shadow(2px 4px 6px grey)',
    background: 'white',
    gap: '$6',
    p: '$8',
    '& svg': {
        color: '$primary',
        cursor: 'pointer'
    }
})

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
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',

    overflow: 'auto',
    flexShrink: '0',
    '&::-webkit-scrollbar': {
        width: 12,
    },
    '&::-webkit-scrollbar-track': {
        background: '$primaryLight'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '$primary',
        borderRadius: 8,

    },

})

export default Sidebar