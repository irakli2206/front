import { Navbar, Button } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { SiReactrouter } from 'react-icons/si'
import { ReactComponent as Logo } from '../assets/Logo.svg'
import { UserType } from '../types/types'

const Header = () => {
    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            //@ts-ignore
            const loggedUser = JSON.parse(localStorage.getItem('user'))
            setUser(loggedUser)
        }
    }, [])

    console.log(user)
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

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
            {user ?
                <Navbar.Content>
                    <Navbar.Link href="/">
                        <Button  auto flat shadow css={{ fontSize: '$md' }} onClick={logout} >
                            Log Out
                        </Button>
                    </Navbar.Link>
                </Navbar.Content>
                :
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="/login">
                        Login
                    </Navbar.Link>
                    <Navbar.Link href="/signup">
                        <Button  auto flat shadow css={{ fontSize: '$md' }} >
                            Sign Up
                        </Button>
                    </Navbar.Link>
                </Navbar.Content>
            }

        </Navbar>
    )
}

export default Header