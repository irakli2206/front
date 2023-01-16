import { Avatar, Button, Card, styled, Text } from '@nextui-org/react'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'

type Props = {
    username: string
    userHandle: string
    userImage?: string
    bio: string

    isVisitorOwner: boolean
}

const ProfileUser = ({ username, userHandle, bio, userImage = "https://nextui.org/images/card-example-4.jpeg", isVisitorOwner }: Props) => {
    console.log(bio)

    return (
        <Card
            // css={{
            //     height: 'auto',
            // }}
        >
            <Card.Header>

                <Header>
                    <Avatar
                        src={"https://nextui.org/images/card-example-4.jpeg"}

                        alt=''
                        rounded

                        css={{

                            minWidth: 100,
                            minHeight: 100,
                            width: 100,
                            height: 100

                        }}

                    />
                    <NamesContainer>
                        <Text h2 css={{ m: 0 }}>Test</Text>
                        <Text h3 color='primary'>@{userHandle}</Text>

                    </NamesContainer>
                    {isVisitorOwner && <Button
                        auto
                        css={{
                            boxShadow: '$sm',
                            position: 'absolute',
                            right: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            background: '$accents4',
                            borderRadius: '50%',
                            '& span': {
                                width: '100%',
                                height: '100%',
                                padding: 0
                            }
                        }}
                        icon={<FiEdit3 size={24} />} />}
                </Header>
            </Card.Header>
            <Card.Body>
                <Text size={20}>
                    {bio }
                </Text>


            </Card.Body>
        </Card >
    )
}

const Header = styled('div', {
    display: 'flex',
    justifyContent: 'space-between'
})

const NamesContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    px: '$12'

})

export default ProfileUser