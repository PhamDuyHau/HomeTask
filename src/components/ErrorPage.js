
import { useNavigate } from 'react-router-dom';
import SignIn from "./SignIn";


const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div>

            <p><strong>404: User Not Found</strong></p>
            <button onClick={() => navigate('/sign-in')} className="btn btn-secondary">
                Go Back
            </button>
        </div>
    );
}

export default ErrorPage

