import { Text } from '@nextui-org/react'
import React from 'react'

type Props = {
    children: string
}

const InputError = ({children}: Props) => {


  return (
    <Text color='error' css={{
        textAlign: 'end',
        width: 'clamp(250px, 80%, 400px)'
    }}>{children}</Text>
  )
}

export default InputError