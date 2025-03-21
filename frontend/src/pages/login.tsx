import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../services/firebaseconfig";

const Login = () => {    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            localStorage.setItem('userData', JSON.stringify(user));
            navigate('/home');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Incorrect email or password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center w-full mt-[13vh]">
            <div className="flex flex-col items-center gap-3 p-5 w-[30%] h-[50%] rounded-2xl text-center">
                <img src="/group.png" alt="logo" className="w-16 h-auto" />
                <p className="font-bold text-[23px]">Human Resources Dashboard</p>
                <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="
                    bg-black
                    text-sm 
                    rounded-lg 
                    focus:ring-primary
                    focus:border-red-500
                    block 
                    w-full 
                    p-3"
                    placeholder="E-mail"
                    required
                />
                <div className="flex w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="
                        bg-black
                        text-sm 
                        rounded-lg 
                        focus:ring-primary
                        focus:border-red-500 
                        block 
                        w-full 
                        p-3"
                        placeholder="Password"
                        required
                    />
                    <button
                        className="cursor-pointer relative -ml-5"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex font-light underline justify-center gap-1">
                    <p className="cursor-pointer" onClick={() => navigate('/home')}>
                        sing in as a guest
                    </p>
                    <span>|</span>
                    <p className="cursor-pointer">Forgot your password?</p>
                </div>
                <button 
                    onClick={handleLogin}
                    className="
                    w-full
                    cursor-pointer 
                    p-2 
                    rounded-md 
                    font-bold
                    bg-primary 
                    hover:bg-[#ff4536] 
                    transition 
                    duration-150 
                    ease-in-out"
                >
                    Sign in
                </button>
                <button 
                    onClick={() => navigate('/register')}
                    className="
                    w-full
                    cursor-pointer 
                    p-2 
                    rounded-md 
                    font-bold
                    bg-secundary 
                    hover:bg-[#22acff] 
                    transition 
                    duration-150 
                    ease-in-out"
                >
                    Create Accout
                </button>
                <p className="flex gap-2 items-center text-center">
                    Developed by Gaiek da costa
                    <a
                        href="https://github.com/gaiekdacosta/rh-dashboard"
                        target="_blank"
                        rel="github repositore" 
                    >
                        <FaGithub className="text-[21px] cursor-pointer" />
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;