import { styled, User } from '@nextui-org/react'
import React from 'react'

type Props = {
    userImage: string
    username: string
    userHandle: string
    content: string
}

const Comment = ({ userImage, username, userHandle, content }: Props) => {
    return (
        <User
            css={{
                paddingLeft: 0, cursor: 'pointer',
                '& *': {
                    fontSize: '$xl'
                }
            }}
            color='primary'
            size='xl'
            src={userImage}
            name={username}
            description={content}
        />
    )
}



const CommentDiv = styled('div', {
    display: 'flex',
})

export default Comment