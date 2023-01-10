import { Navbar, Button } from '@nextui-org/react'
import React from 'react'
import { SiReactrouter } from 'react-icons/si'
import {ReactComponent as Logo} from '../assets/Logo.svg'

const Header = () => {


    return (
        <Navbar variant='sticky'>
            <Navbar.Brand>
                {/* <Logo width={60} height={60} /> */}
                <SiReactrouter size={36} />

            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link isActive href="/">Home</Navbar.Link>
                <Navbar.Link href="#">Profile</Navbar.Link>
                <Navbar.Link href="#">Settings</Navbar.Link>

            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="/login">
                    Login
                </Navbar.Link>
                <Navbar.Link href="/signup">
                    <Button auto flat shadow css={{ fontSize: '$md' }} >
                        Sign Up
                    </Button>
                </Navbar.Link>
            </Navbar.Content>
        </Navbar>
    )
}

export default Header