import React, { useEffect, useState } from 'react'
import { Card, Text, styled, Grid, Link, User } from '@nextui-org/react';
import { Chirp, ChirpData, ImageUrl, UserType, UserHandle } from '../types/types';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

type Props = ChirpData & {

}

const ChirpCard = ({ _id: postId, userId, content, coordinates, likes, comments }: Props) => {
    const [liked, setLiked] = useState<boolean>(false)
    const [author, setAuthor] = useState<UserType>()
    const [user, setUser] = useState<UserType>()

    const [likeCount, setLikeCount] = useState<number>(likes.length)
    const [commentCount, setCommentCount] = useState<number>(comments.length)

    const navigate = useNavigate()

    useEffect(() => {
        const loggedUser = localStorage.getItem('user')
        if (loggedUser) {
            let userObject = JSON.parse(loggedUser)
            setUser(userObject)
        }

        const isLiked: boolean = likes.some(l => user?.likedPosts.includes(l))
        if (isLiked) setLiked(true)

        const getAuthorData = async () => {
            console.log(userId)
            const response = await fetch(`http://localhost:3000/api/users/${userId}`)
            const userData = await response.json()
            console.log(userData)
            setAuthor(userData)
        }
        getAuthorData()
    }, [])

    const likePost = async () => {
        let body = {
            user: user?._id,
            postId
        }
        const res = await fetch('http://localhost:3000/api/posts/like', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        if (liked) {
            console.log('reached')
            setLiked(false)
            setLikeCount(prev => --prev)
        }
        else {
            setLiked(true)
            setLikeCount(prev => ++prev)
        }

    }

    return (
        <>
            {author && <CardWrapper
            // onClick={() => {
            //     navigate(`posts/${postId}`)
            // }}
            >
                <CustomCard >
                    <Card.Header >
                        <User
                            css={{ paddingLeft: 0, cursor: 'pointer' }}
                            color='primary'
                            size='lg'
                            bordered
                            src={author.userImage}
                            name={author.username}

                        >
                            <User.Link href="" css={{ pointerEvents: 'none', fontSize: '$sm' }} >@{author.userHandle}</User.Link>
                        </User>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                        <Text>
                            {content}
                        </Text>
                    </Card.Body>
                    <Card.Footer css={{
                        gap: '$xl',
                        padding: '$8',

                        '& svg': {
                            color: '$primary',
                            cursor: 'pointer'
                        }
                    }}>
                        <ReactionContainer>
                            {liked ?
                                <FaHeart size={20} onClick={likePost} />
                                : <FaRegHeart size={20} onClick={likePost} />}
                            {likeCount}
                        </ReactionContainer>
                        <ReactionContainer>
                            <FaRegComment size={20} onClick={() => {
                                navigate(`posts/${postId}`)
                            }
                            } />
                            {commentCount}
                        </ReactionContainer>
                    </Card.Footer>
                </CustomCard>
            </CardWrapper>}
        </>
    )
}

const CardWrapper = styled('div', {
    cursor: 'pointer'
})

const CustomCard = styled(Card, {
    width: '100%',
    minHeight: '250px',
    padding: '$md',
    // '& *': {
    //     overflow: 'hidden'
    // }
})

const ReactionContainer = styled('div', {
    display: 'flex',
    gap: '$xs',
    alignItems: 'center',
    color: '$accents5'
})

export default ChirpCard