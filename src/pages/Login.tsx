import { Container, Text, Input, Button, styled, Spacer } from '@nextui-org/react'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import InputError from '../components/InputError'

type FormData = {
    userHandle: string
    password: string
}

const Login = () => {
    const schema = Yup.object().shape({
        userHandle: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    })

    const navigate = useNavigate()

    const login = async (formData: FormData) => {
        try {
            let res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userhandle: formData.userHandle,
                    password: formData.password,

                })
            })

            if (res.ok) {
                const data = await res?.json()
                //@ts-ignore
                const loggedUser = { ...data.user }
                console.log(loggedUser)
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('userId', JSON.stringify(loggedUser._id))
                localStorage.setItem('userhandle', JSON.stringify(loggedUser.userHandle))
                navigate('/')
                window.location.reload()
            }
            else {
                const data = await res?.json()
                console.log(data)
                throw data
            }

        } catch (e) {
            throw e
        }
    }

    return (
        <Container fluid css={{
            height: 'calc(100% - 76px)'
        }}>
            <InnerContainer>
                <Text h1
                    size={60}

                    css={{
                        textGradient: "45deg, $green600 -20%, $green400 50%",
                        fontFamily: 'Josefin Sans',
                        m: '0'
                    }}>Log In</Text>
                <Formik initialValues={{
                    userHandle: '',
                    password: '',

                }}
                    validationSchema={schema}
                    onSubmit={async (vals, actions) => {
                        await login(vals).catch(e => {
                            if (e.message == 'You have entered a wrong username or password') {
                                actions.setFieldError('password', e.message)
                            }
                        })
                    }}>
                    {({ errors, touched }) => (
                        <Form
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Spacer y={2} />
                            <Field as={Input} size='xl' name='userHandle' labelPlaceholder='User Handle'

                                css={{
                                    width: 'clamp(250px, 80%, 400px)'
                                }}
                            />
                            {errors.userHandle && touched.userHandle && <InputError>{errors.userHandle}</InputError>}
                            <Spacer y={2} />
                            <Field as={Input.Password} size='xl' name='password'
                                labelPlaceholder='Password'
                                css={{
                                    width: 'clamp(250px, 80%, 400px)'
                                }}
                            />
                            {errors.password && touched.password && <InputError>{errors.password}</InputError>}
                            <Spacer y={2} />
                            <Button color='primary' type='submit' size='lg' css={{ mx: 'auto', dropShadow: '$lg' }} >Log In</Button>
                            <Spacer y={1} />
                            <Button color='error' size='lg' css={{ mx: 'auto', dropShadow: '$lg' }} >Cancel</Button>
                        </Form>
                    )}
                </Formik>
            </InnerContainer>
        </Container>
    )
}

const InnerContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
})

export default Login