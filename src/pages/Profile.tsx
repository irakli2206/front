import { Container, styled, Card, Grid, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfilePosts from '../components/profile/ProfilePosts'
import ProfileUser from '../components/profile/ProfileUser'
import { BASE_URL } from '../env'

const Profile = () => {
  //have to check if I am viewing profile as the profile's owner
  //gonna check if localStorage userId is same as the userId of profile userhandle

  const params = useParams()
  const [profile, setProfile] = useState<any>({
    _id: '',
    
  })

  const isVisitorOwner = JSON.parse(localStorage.getItem('userId') ?? '') == profile._id

  useEffect(() => {
    const getProfile = async () => {
      const profileDataResponse = await fetch(`${BASE_URL}/api/users/get-by-handle/${params.userhandle}`)
      const profileData = await profileDataResponse.json()
      setProfile(profileData)
    }
    getProfile()
  }, [])

  useEffect(() => {
    const getPosts = async () => {

    }
    getPosts()
  }, [profile])

  return (
    <>
      {profile && <ProfileContainer>
        <Grid.Container gap={4} justify='space-between'>
          <Grid xs={12} md={6} css={{ display: 'block !important' }}  >
            <ProfileUser {...profile} isVisitorOwner={isVisitorOwner} />
          </Grid>
          <Grid xs={12} md={6} css={{ height: '100%' }}>

            {(profile.posts && profile.likedPosts) ? <ProfilePosts {...profile} /> : <div>Nothing here</div>}
          </Grid>
        </Grid.Container>
      </ProfileContainer>}
    </>
  )
}

const ProfileContainer = styled(Container, {
  height: 'calc(100vh - 76px)',
  display: 'flex',
  flexDirection: 'row',
  gap: '$12',
  justifyContent: 'space-between',
  py: '$24'
})

export default Profile