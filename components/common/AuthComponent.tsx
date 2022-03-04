import { getDBUser, useAuth } from '../../context/auth-user-context'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import React from 'react'
import LoadingPage from './LoadingPage'

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { authUser, loading }: any = useAuth()
    const [data, setData] = useState({})

    useEffect(() => {
      const getShelterImg = async (userData: any) => {
        const storage = getStorage()
        const imgRef = ref(storage, `${userData.uid}-shelter`)
        try {
          const imgUrl = await getDownloadURL(imgRef)
          return imgUrl
        } catch (err: any) {
          if (err.code === 'storage/object-not-found') {
            return await getDownloadURL(ref(storage, `default-shelter`))
          }
          console.log(err)
        }
      }

      const getUser = async () => {
        const dbUserData = await getDBUser(authUser)
        if (!dbUserData) {
          router.push('/')
        } else {
          const userData = {
            ...authUser,
            ...dbUserData
          }
          setData({
            ...userData,
            shelterImg: await getShelterImg(userData),
          })
        }
      }
      if (!loading) {
        getUser()
      }
    }, [loading, authUser])
    return Object.keys(data).length && !loading ? (
      <Component userData={data} />
    ) : (
      <LoadingPage />
    )
  }

  return AuthenticatedComponent
}

export default withAuth
