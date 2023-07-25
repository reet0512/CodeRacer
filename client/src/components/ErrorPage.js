import { useEffect } from 'react';

import '../styles/errorPage.css';

const ErrorPage = ({msg}) => {
    useEffect(() => {
        setTimeout(() => {
            window.location.replace('/');
        }, 2000);
    }, [])
    return (
        <div className="error-page">
            <h1>
                There Was an Internal Error, Redirecting You To Home Page
            </h1>
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
        </div>

    )
}

export default ErrorPage;