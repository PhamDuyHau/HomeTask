import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Login1 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {

            // Gửi request POST lên mock database
            const response = await axios.get("http://localhost:5000/users");
            const users = response.data;

            // Kiểm tra thông tin đăng nhập
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                setMessage(`Welcome, ${user.name}!`);
                alert("Login Success!");
            } else {
                setMessage("Wrong email or password");
                alert("Login Fail");
            }


        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>

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
                {message}
            </div>

            <button type="button" className="btn btn-primary" onClick={handleLogin}>Primary</button>
        </div>
    );
}

export default Login1

