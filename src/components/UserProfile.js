import { useState, useEffect } from "react";
import axios from "axios";



const UserProfile = () => {
    const [user, setUser] = useState('');

    const [error, setError] = useState(null); // State for error handling


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage

                const response = await axios.get(`http://localhost:5000/users/${userId}`);
                setUser(response.data); // Set user data
            } catch (error) {
                setError("Error fetching user data");
                console.error("Error:", error);
            }
        };

        fetchUserProfile();
    }, []);



    return (
        <div>
\
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}

export default UserProfile;

