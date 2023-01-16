import { Container, styled, User, Text, Divider, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ChirpData, UserType } from '../types/types';
import Comment from '../components/Comment';
import { RiSendPlaneFill } from 'react-icons/ri'
import ActionModal from '../components/ActionModal';

const Chirp = () => {
    const [post, setPost] = useState<ChirpData>()
    const [author, setAuthor] = useState<UserType>()
    const [user, setUser] = useState<UserType>()
    const [comments, setComments] = useState<any[]>([])
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

    const [liked, setLiked] = useState<boolean>(false)

    const [likeCount, setLikeCount] = useState<number>(0)
    const [commentCount, setCommentCount] = useState<number>(0)

    const [commentInput, setCommentInput] = useState<string>('')

    let { postId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const getLoggedUser = async () => {
            if (localStorage.getItem('userId')) {
                //have to refresh the user any time this gets rerendered
                //@ts-ignore
                const loggedUserId = JSON.parse(localStorage.getItem('userId'))
                const loggedUserResponse = await fetch(`http://localhost:3000/api/users/${loggedUserId}`)
                const loggedUser = await loggedUserResponse.json()
                setUser(loggedUser)
                //if user has this post liked, show that in UI
                if (user && post?.likes.includes(user._id)) {
                    setLiked(true)
                    console.log('jdkajdksj')
                }

            }
        }
        getLoggedUser()

    }, [post])

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
                Promise.all(post.comments.map(async (comment) => {
                    let commentAuthorResponse = await fetch(`http://localhost:3000/api/users/${comment.userId}`)
                    let commentAuthor = await commentAuthorResponse.json()
                    return { ...commentAuthor, content: comment.content }
                })).then(commentsData => {
                    console.log(commentsData)
                    setComments(commentsData)
                }
                )
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
                setCommentCount(prev => prev + 1)
                setCommentInput('')
            }
        }
        else {
            setShowLoginModal(true)
        }

    }

    const modalAction = () => {
        navigate('/login')
        setShowLoginModal(false)
    }


    return (
        <>
            <ActionModal actionTitle='Log In' actionHandler={modalAction}
                closeHandler={() => setShowLoginModal(false)} visible={showLoginModal}
                modalTitle='You need to log in to view the profile'
            />
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
                    <form action="">
                        <Input value={commentInput} onChange={(e) => setCommentInput(e.currentTarget.value)}
                            placeholder='Write a comment...'
                            contentRightStyling={false}
                            contentRight={
                                <RiSendPlaneFill type='submit' onClick={writeComment} size={32} />
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
                    </form>
                    <CommentsContainer>
                        {comments.map((comment, index) => {
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
    height: 'calc(100vh - 76px)',
    maxHeight: 'calc(100vh - 76px)',
    paddingBlock: '$16'
})

export default Chirp