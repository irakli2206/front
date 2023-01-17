import { Avatar, Button, Card, styled, Text } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { BASE_URL } from '../../env'
import ChirpCard from '../ChirpCard'

type Props = {
    posts: any[]
    likedPosts: any[]

}

type DataState = {
    created: any[],
    liked: any[]
}

const ProfilePosts = ({ posts, likedPosts }: Props) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [data, setData] = useState<DataState>({
        created: [],
        liked: []
    })


    const tabs = ['Posts', 'Liked Posts']

    useEffect(() => {
        const getPosts = async () => {
            const body = { postIds: posts }
            const postsDataResponse = await fetch(`${BASE_URL}/api/posts/filtered`, {
                method: 'POST',
                headers: {
                    'CONTENT-TYPE': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const postsData = await postsDataResponse.json()
            setData(prev => ({ ...prev, created: postsData }))
        }
        getPosts()

        const getLikedPosts = async () => {
            const body = { postIds: likedPosts }
            const likedPostsDataResponse = await fetch(`${BASE_URL}/api/posts/filtered`, {
                method: 'POST',
                headers: {
                    'CONTENT-TYPE': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const likedPostsData = await likedPostsDataResponse.json()
            setData(prev => ({ ...prev, liked: likedPostsData }))
        }
        getLikedPosts()


    }, [])





    return (
        <Card
        // css={{
        //     height: 'auto',
        // }}
        >
            <Card.Header>
                {data.created && data.liked && <InnerContainer>
                    <Tabs >
                        {tabs.map((tab, index) => {
                            const isSelected = index == selectedTab
                            return (
                                <Tab key={tab} css={{
                                    position: 'relative',
                                    '&:after': {
                                        content: '',
                                        width: '100%',
                                        height: 3,
                                        background: '$primary',
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        display: isSelected ? 'block' : 'none',
                                        my: '$4'

                                    }
                                }} onClick={() => setSelectedTab(index)}>{tab}</Tab>
                            )
                        })}
                    </Tabs>
                    <TabPanels>
                        {tabs.map((tab, index) => {
                            const postArray = tab == 'Posts' ? data.created : data.liked
                             
                             
                            return postArray.map(p => {
                                return (
                                    <TabPanel>
                                        <ChirpCard  {...p} />
                                    </TabPanel>
                                )
                            })

                        })}
                    </TabPanels>
                </InnerContainer>}
            </Card.Header>

        </Card >
    )
}

const TabPanel = styled('div', {

})

const TabPanels = styled('div', {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '$12',
    py: '$8'
})

const InnerContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
})

const Tabs = styled('div', {
    display: 'flex'
})

const Tab = styled('button', {
    flex: 1,
    background: 'transparent',
    outline: 'none',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '$lg'
})



export default ProfilePosts