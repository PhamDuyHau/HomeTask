import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {


        try {
            // Use GET instead of Get to fetch all users
            const response = await axios.get("http://localhost:5000/users");
            const users = response.data;

            // Find a user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                setMessage(`Welcome, ${user.name}!`);

                // Store user ID in localStorage
                localStorage.setItem("userId", user.id);

                alert("Login Success!");
                navigate('/user-profile'); // Redirect to login page
            } else {
                setMessage("Wrong email or password");
                alert("Login Failed");
                navigate('/error-page'); // Redirect to error page
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Server error, please try again later.");
        }

    };

    return (
        <div>
            {message}
            <div className="row g-2">
                <div className="col-md-6">
                    <div>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(a) => setPassword(a.target.value)}
                        />
                    </div>
                </div>
                <p>
                    <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                    <button onClick={() => navigate('/sign-up')} className="btn btn-primary">
                        Go to Target Page
                    </button>
                </p>
            </div>


        </div>
    );
}

export default SignIn

