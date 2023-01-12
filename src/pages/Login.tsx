import { Container, Text, Input, Button } from '@nextui-org/react'
import React from 'react'

const Login = () => {
    return (
        <Container fluid>
            <Text h1
                size={60}
                css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold">Log In</Text>
        </Container>
    )
}

export default Login