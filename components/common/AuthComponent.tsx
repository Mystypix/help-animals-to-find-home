import { useAuth } from '../../context/auth-user-context'
import { db } from '../../firebase/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import { getStorage, ref, getDownloadURL } from "firebase/storage"


const withAuth = (Component: any) => {
    const AuthenticatedComponent = () => {
        const router = useRouter();
        const { authUser, loading } = useAuth()
        const [data, setData] = useState({})

        useEffect(() => {
            const getDBUser = async (user: any) => {
                if (!user) return null
                const q = query(collection(db, 'users'), where("id", "==", user.uid))
            
                const querySnapshot = await getDocs(q);
                return querySnapshot.empty ? null : querySnapshot.docs[0].data()
            }

            const getShelterImg = async (userData: any) => {
                const storage = getStorage();
                const imgRef = ref(storage, `${userData.id}-shelter`)
                try {
                    const imgUrl = await getDownloadURL(ref(storage, `${userData.id}-shelter`))
                    return imgUrl
                } catch (err: any) {
                    if (err.code === 'storage/object-not-found') {
                        return ''
                    }
                    console.log(err)
                }
            }

            const getUser = async () => {
                const userData = await getDBUser(authUser);
                if (!userData) {
                    router.push('/');
                } else {
                    setData({
                        ...authUser,
                        ...userData,
                        shelterImg: await getShelterImg(userData),
                    });
                }  
            };
            if (!loading) {
                getUser();
            }
        }, [loading, authUser]);
        return Object.keys(data).length && !loading ? <Component userData={data} /> : <CircularProgress />; // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
};

export default withAuth
