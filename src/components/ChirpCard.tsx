import React from 'react'
import { Card, Text, styled, Grid, Link, User } from '@nextui-org/react';
import { Chirp, ImageUrl } from '../types/types';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'

type Props = Chirp

const ChirpCard = ({ username, userImage, content, date, likes, rechirps }: Props) => {
    const CustomCard = styled(Card, {
        width: '100%',
        minHeight: '250px',
        padding: '$md'
        // '& *': {
        //     overflow: 'hidden'
        // }
    })

    return (
        <CustomCard  >
            <Card.Header>
                <User
                    css={{ paddingLeft: 0, cursor: 'pointer' }}
                    color='primary'
                    size='lg'
                    bordered
                    src={userImage}
                    name={username}

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
                }
            }}>

                <FaRegHeart size={20} />
                <FaRegComment size={20} />
            </Card.Footer>
        </CustomCard>
    )
}

export default ChirpCard