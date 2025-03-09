import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // For redirect after successful signup
import { useTranslation } from 'react-multi-lang';


const SignUp = () => {
    const t = useTranslation(); //Hook to get translated text


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate(); // For redirecting after success

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous errors
        setError(null);
        setNameError('');
        setEmailError('');
        setPasswordError('');

        let isValid = true;

        // Validate form data
        if (!name) {
            setNameError(t('errors.name_required'));
            isValid = false;
        }

        // Validate email format as name@gmail.com
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError(t('errors.email_required'));
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError(t('errors.invalid_email'));
            isValid = false;
        }

        if (!password) {
            setPasswordError(t('errors.password_required'));
            isValid = false;
        } else if (password.length < 3) {
            setPasswordError(t('errors.short_password'));
            isValid = false;
        }

        if (!isValid) return; // Stop submission if validation fails

        try {
            // Send data to backend (replace URL with your actual backend route)
            const response = await axios.post("http://localhost:5000/users", {
                name,
                email,
                password
            });

            if (response.status === 201) {
                alert(t("messages.signup_success"));
                navigate('/sign-in'); // Redirect to login page
            }
        } catch (error) {
            setError(t('errors.signup_failed'));
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="container m-4">

            <h1>{t('signup.title')}</h1>


            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display general error messages */}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">{t('signup.name')}</label>
                    <input
                        className="form-control"
                        type="text"
                        id="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <span className="text-danger">{nameError}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">{t('signup.email')}</label>
                    <input
                        className="form-control"
                        type="text"
                        id="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <span className="text-danger">{emailError}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">{t('signup.password')}</label>
                    <input
                        className="form-control"
                        type="password"
                        id="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <span className="text-danger">{passwordError}</span>}
                </div>

                <button type="submit" className="btn btn-primary mt-2">{t('signup.button')}</button>
            </form>
        </div>
    );
}

export default SignUp;
