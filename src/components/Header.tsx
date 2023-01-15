import { Navbar, Button, Text } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { SiReactrouter } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/Logo.svg'
import { Settings, UserType } from '../types/types'
import ActionModal from './ActionModal'
import SettingsModal from './SettingsModal'

const Header = () => {
    const [user, setUser] = useState<UserType>()
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getLoggedUser = async () => {
            if (localStorage.getItem('userId')) {
                //@ts-ignore
                const loggedUserId = JSON.parse(localStorage.getItem('userId'))
                const loggedUserResponse = await fetch(`http://localhost:3000/api/users/${loggedUserId}`)
                const loggedUser = await loggedUserResponse.json()
                setUser(loggedUser)
            }
        }
        getLoggedUser()

    }, [])

    console.log(user)
    const logout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
    }

    const onLinkClick = (href: string) => {
        if (user) {
            console.log('reached')
            navigate(href)
        }
        else {
            setShowLoginModal(true)
        }
    }

    const modalAction = () => {
        navigate('/login')
        setShowLoginModal(false)
    }

    const settingsModalAction = (savedSettings: Settings) => {
        localStorage.setItem('settings', JSON.stringify(savedSettings))
        setShowSettingsModal(false)
    }

    return (
        <>
            <ActionModal actionTitle='Log In' actionHandler={modalAction}
                closeHandler={() => setShowLoginModal(false)} visible={showLoginModal}
                modalTitle='You need to log in to view the profile'
            />
            <SettingsModal visible={showSettingsModal} closeHandler={() => setShowSettingsModal(false)}
                actionHandler={settingsModalAction}
            />
            <Navbar variant='sticky'>
                <Navbar.Brand>
                    {/* <Logo width={60} height={60} /> */}
                    <SiReactrouter size={36} />

                </Navbar.Brand>
                <Navbar.Content hideIn="xs">
                    <Navbar.Link isActive href="/">Home</Navbar.Link>
                    <Navbar.Link onPress={() => onLinkClick(`/23123/profile`)} >Profile</Navbar.Link>
                    <Navbar.Link onPress={() => setShowSettingsModal(true)} >Settings</Navbar.Link>

                </Navbar.Content>


                <Navbar.Content>
                    {user ?
                        <>
                            <Navbar.Link href="/">
                                <Button auto flat shadow css={{ fontSize: '$md' }} onClick={logout} >
                                    Log Out
                                </Button>
                            </Navbar.Link>
                        </>
                        :
                        <>
                            <Navbar.Link color="inherit" href="/login">
                                Login
                            </Navbar.Link>
                            <Navbar.Link href="/signup">
                                <Button auto flat shadow css={{ fontSize: '$md' }} >
                                    Sign Up
                                </Button>
                            </Navbar.Link>
                        </>
                    }
                </Navbar.Content>




            </Navbar>
        </>
    )
}

export default Header