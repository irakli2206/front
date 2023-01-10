import React, { useEffect, useState } from 'react'
import { Card, Text, styled, Grid, Link, User } from '@nextui-org/react';
import { Chirp, ChirpData, ImageUrl } from '../types/types';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'

type Props = ChirpData

const ChirpCard = ({ userId, content, coordinates, likes, comments }: Props) => {
    const [liked, setLiked] = useState<boolean>(false)
    const [user, setUser] = useState<any>({})
    
    const CustomCard = styled(Card, {
        width: '100%',
        minHeight: '250px',
        padding: '$md'
        // '& *': {
        //     overflow: 'hidden'
        // }
    })

    useEffect(() => {
        const getUserData = async() => {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`)
            const userData = await response.json()
            setUser(userData)
        }
        getUserData()
    }, [])

    return (
        <CustomCard  >
            <Card.Header>
                <User
                    css={{ paddingLeft: 0, cursor: 'pointer' }}
                    color='primary'
                    size='lg'
                    bordered
                    src={user.userImage}
                    name={user.username}

                >
                    <User.Link href="" css={{ pointerEvents: 'none', fontSize: '$sm' }} >@unique_name</User.Link>
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
                    {liked ? <FaHeart size={20} onClick={() => setLiked(false)} /> : <FaRegHeart size={20} onClick={() => setLiked(true)} />}
                    {likes.length}
                </ReactionContainer>
                <ReactionContainer>
                    <FaRegComment size={20} />
                    {true}
                </ReactionContainer>
            </Card.Footer>
        </CustomCard>
    )
}

const ReactionContainer = styled('div', {
    display: 'flex',
    gap: '$xs',
    alignItems: 'center',
    color: '$accents5'
})

export default ChirpCard