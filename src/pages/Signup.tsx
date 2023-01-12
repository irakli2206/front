import { Container, Text, Input, Button, Spacer, styled, Link } from '@nextui-org/react'
import { Form, Formik, Field } from 'formik'
import React, { useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import * as Yup from 'yup'
import InputError from '../components/InputError'

type FormData = {
    username: string
    publicName: string
    password: string
    passwordConfirm: string
}

const Signup = () => {
    const navigate = useNavigate()

    const schema = Yup.object().shape({
        username: Yup.string().max(24, "Must be 20 characters or less").required("Required"),
        publicName: Yup.string().max(24, "Must be 20 characters or less").required("Required"),
        password: Yup.string().min(8, 'Password has to be at least 8 characters').required("Required"),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match").required("Required"),
    })


    const signUp = async (formData: FormData) => {
        let res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userHandle: formData.username,
                username: formData.publicName,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,

            })
        }).then((res) => {if(res.ok) navigate('/login')}).catch(e => console.error(e))
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
                    }}
                >Sign Up</Text>
                <Text
                    size={20}
                    css={{
                        color: '$accents7',
                        fontFamily: 'Josefin Sans',
                        m: '0'
                    }}
                >Already have an account? <Link>Log In</Link></Text>
                <Spacer y={2} />
                <Formik initialValues={{
                    username: '',
                    publicName: '',
                    password: '',
                    passwordConfirm: ''
                }}
                    validationSchema={schema}
                    onSubmit={async (vals, actions) => {
                        await signUp(vals)
                    }}>
                    {({ errors, touched }) => (
                        <Form
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Field as={Input} size='xl' name='username' labelPlaceholder='Username'
                                css={{
                                    width: 'clamp(250px, 80%, 400px)'
                                }}
                            />
                            {errors.username && touched.username && <InputError>{errors.username}</InputError>}
                            <Spacer y={2} />
                            <Field as={Input} size='xl' name='publicName'
                                labelPlaceholder='Public name'
                                css={{
                                    width: 'clamp(250px, 80%, 400px)'
                                }}
                            />
                            {errors.publicName && touched.publicName && <InputError>{errors.publicName}</InputError>}
                            <Spacer y={2} />
                            <Field as={Input.Password} size='xl' name='password' labelPlaceholder="Password"
                                css={{
                                    width: 'clamp(250px, 80%, 400px)'
                                }}
                            />
                            {errors.password && touched.password && <InputError>{errors.password}</InputError>}
                            <Spacer y={2} />
                            <Field as={Input.Password} size='xl' name='passwordConfirm' labelPlaceholder="Confirm password"
                                css={{
                                    width: 'clamp(250px, 80%, 400px)'
                                }}
                            />
                            {errors.passwordConfirm && touched.passwordConfirm && <InputError>{errors.passwordConfirm}</InputError>}
                            <Spacer y={2} />
                            <Button color='primary' type='submit' size='lg' css={{ mx: 'auto', dropShadow: '$lg' }} >Sign Up</Button>
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

export default Signup