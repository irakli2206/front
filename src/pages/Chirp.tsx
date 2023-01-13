import { Container, styled, User, Text, Divider, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { ChirpData, UserType } from '../types/types';
import Comment from '../components/Comment';
import { RiSendPlaneFill } from 'react-icons/ri'

const Chirp = () => {
    const [post, setPost] = useState<ChirpData>()
    const [author, setAuthor] = useState<UserType>()
    const [user, setUser] = useState<UserType>()
    const [comments, setComments] = useState<any[]>([])

    const [liked, setLiked] = useState<boolean>(false)

    const [likeCount, setLikeCount] = useState<number>(0)
    const [commentCount, setCommentCount] = useState<number>(0)

    const [commentInput, setCommentInput] = useState<string>('')

    let { postId } = useParams();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            //@ts-ignore
            const loggedUser = JSON.parse(localStorage.getItem('user'))
            setUser(loggedUser)
        }

    }, [])

    useEffect(() => {
        const getPostData = async () => {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`)
            const postData = await response.json()
            setLikeCount(postData.likes.length)
            setCommentCount(postData.comments.length)
            setPost(postData)
        }

        getPostData()

    }, [])

    useEffect(() => {
        const getAuthorData = async () => {
            if (post) {
                //@ts-ignore
                const response = await fetch(`http://localhost:3000/api/users/${post.userId!}`)
                const authorData = await response.json()
                setAuthor(authorData)
            }
        }
        getAuthorData()
    }, [post])

    useEffect(() => {
        const getCommentData = async () => {
            if (post && post.comments) {
                console.log(post.comments)
                setComments(post.comments.map(c => ({userHandle: 'test', username: 'test', content: c.content})))
            }

        }

        getCommentData()
    }, [post])


    const likePost = async () => {
        if (user) {
            let body = {
                userId: user._id,
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
                setLiked(false)
                setLikeCount(prev => --prev)
            }
            else {
                setLiked(true)
                setLikeCount(prev => ++prev)
            }
        }

    }

    const writeComment = async () => {
        //Checking user exists and input isn't empty
        if (user && commentInput.replace(' ', '').length > 0) {
            const body = {
                userId: user._id,
                content: commentInput
            }
            const res = await fetch(`http://localhost:3000/api/posts/${postId}/write-comment`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            })
            if (res.ok) {
                const data = await res.json()
                setPost(data.newPost)
            }
        }
        else console.log('NO USER LOGGED IN')

    }


    return (
        <>
            {(author && post) &&
                <CustomContainer sm>
                    <User
                        css={{
                            paddingLeft: 0, cursor: 'pointer',
                            '& *': {
                                fontSize: '$xl'
                            }
                        }}
                        color='primary'
                        size='xl'
                        bordered
                        src={author.userImage}
                        name={author.username}

                    >
                        <User.Link href="" css={{ pointerEvents: 'none', fontSize: '$md' }} >{`@${author.userHandle}`}</User.Link>
                    </User>

                    <Text size={'$xl'} css={{
                        height: '200px',
                        py: '$sm'
                    }}>
                        {post.content}
                    </Text>
                    <ReactionsContainer

                    >


                        <ReactionContainer>
                            {liked ?
                                <FaHeart size={24} onClick={likePost} />
                                : <FaRegHeart size={24} onClick={likePost} />}
                            {likeCount}
                        </ReactionContainer>
                        <ReactionContainer>
                            <FaRegComment size={24} />
                            {commentCount}
                        </ReactionContainer>
                    </ReactionsContainer>
                    <Divider />
                    <Input value={commentInput} onChange={(e) => setCommentInput(e.currentTarget.value)}
                        placeholder='Write a comment...'
                        contentRightStyling={false}
                        contentRight={
                            <RiSendPlaneFill onClick={writeComment} size={32} />
                        }
                        size='xl'
                        css={{
                            py: '$md',
                            width: '100%',
                            '& span': {
                                color: '$primary',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '0 10px',
                                cursor: 'pointer',

                            }
                        }}
                    />
                    <CommentsContainer>
                        {comments.map((comment, index) => {
                            console.log(comment)
                            return <Comment key={index} {...comment} />
                        })}
                    </CommentsContainer>
                </CustomContainer>}
        </>
    )
}


const CommentsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$12',
    py: '$8'
})

const ReactionsContainer = styled('div', {
    display: 'flex',
    gap: '$xl',
    padding: '$8',
    fontSize: '$lg',
    '& svg': {
        color: '$primary',
        cursor: 'pointer'
    }
})

const ReactionContainer = styled('div', {
    display: 'flex',
    gap: '$xs',
    alignItems: 'center',
    color: '$accents5'
})

const CustomContainer = styled(Container, {
    minHeight: '100vh',
    paddingBlock: '$16'
})

export default Chirp