import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoute
