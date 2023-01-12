import { Container, styled, User, Text, Divider, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { ChirpData, MongoDBUser } from '../types/types';
import Comment from '../components/Comment';

const Chirp = () => {
    const [post, setPost] = useState<ChirpData>()
    const [user, setUser] = useState<MongoDBUser>()
    const [comments, setComments] = useState<any[]>([])

    const [liked, setLiked] = useState<boolean>(false)

    const [likeCount, setLikeCount] = useState<number>(0)
    const [commentCount, setCommentCount] = useState<number>(0)

    const [commentInput ,setCommentInput] = useState<string>('')

    let { postId } = useParams();
    console.log(postId)

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
        const getUserData = async () => {
            if (post) {
                //@ts-ignore
                const response = await fetch(`http://localhost:3000/api/users/${post.userId!}`)
                const userData = await response.json()
                setLiked(post.likes.includes(userData._id))
                setUser(userData)
            }
        }
        getUserData()
    }, [post])

    useEffect(() => {
        const getCommentData = async () => {
            post?.comments.forEach(async (comment, index) => {
                const commentAuthor = await fetch(`http://localhost:3000/api/users/${comment.userId!}`)
                const authorData = await commentAuthor.json()
                const currentComments = [...comments]
                if (currentComments.length < post.comments.length) {
                    currentComments.push({
                        ...authorData,
                        content: comment.content
                    })
                }

                setComments(currentComments)
                console.log(authorData)
            })
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

    return (
        <>
            {(user && post) &&
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
                        src={user.userImage}
                        name={user.username}

                    >
                        <User.Link href="" css={{ pointerEvents: 'none', fontSize: '$md' }} >{`@${user.userHandle}`}</User.Link>
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
                    <Input  value={commentInput} onChange={(e) => setCommentInput(e.currentTarget.value)} 
                    placeholder='Write a comment...'
                    
                    size='xl'
                        css={{
                            py: '$md',
                            width: '100%',

                        }}
                    />
                    <CommentsContainer>
                        {comments.map(comment => {
                            console.log(comment)
                            return <Comment {...comment} />
                        })}
                    </CommentsContainer>
                </CustomContainer>}
        </>
    )
}


const CommentsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$8',
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