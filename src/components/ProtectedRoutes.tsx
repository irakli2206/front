import React, { useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import ActionModal from './ActionModal';

type Props = {
    userId: string | null
    redirectPath?: string
}

export const AuthenticatedProtectedRoutes = ({ userId, redirectPath = '/' }: Props) => {
    if (userId) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};




export const UnauthenticatedProtectedRoutes = ({ userId, redirectPath = '/' }: Props) => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const navigate = useNavigate()

    if (!userId) {
        return <Navigate to={redirectPath} replace />;
    }

    

    

    const modalAction = () => {
        navigate('/auth/login')
        setShowLoginModal(false)
    }

    return <>
        <ActionModal actionTitle='Log In' actionHandler={modalAction}
            closeHandler={() => setShowLoginModal(false)} visible={showLoginModal}
            modalTitle='You need to log in to view the profile'
        />
        <Outlet />
    </>

};

