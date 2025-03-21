import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, db } from "../services/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('E-mail inválido.');
            return;
        }

        /*
        if (!captchaToken) {
            setError('Por favor, complete o reCAPTCHA.');
            return;
        }
        */

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), { email: email });

            navigate('/');
        } catch (error: any) {
            console.error('Erro ao registrar:', error);
            let errorMessage = 'Erro ao registrar. Tente novamente.';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'E-mail já está em uso.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Senha fraca. Use pelo menos 6 caracteres.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'E-mail inválido.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Erro de conexão. Verifique sua internet.';
                    break;
            }
            setError(errorMessage);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center w-full mt-[12vh]">
            <div className="flex flex-col items-center gap-3 p-5 w-[30%] h-[50%] rounded-2xl text-center">
                <img src="/group.png" alt="logo" className="w-16 h-auto" />
                <p className="font-bold text-[23px]">Human Resources Dashboard</p>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="bg-black text-sm rounded-lg focus:ring-primary focus:border-red-500 block w-full p-3"
                    placeholder="Email"
                    required
                />
                <div className="flex w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="bg-black text-sm rounded-lg focus:ring-primary focus:border-red-500 block w-full p-3"
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
                <div className="flex w-full">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="bg-black text-sm rounded-lg focus:ring-primary focus:border-red-500 block w-full p-3"
                        placeholder="Confirm Password"
                        required
                    />
                    <button
                        className="cursor-pointer relative -ml-5"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                {/*
                <ReCAPTCHA
                    sitekey="6LcCxfoqAAAAAFdWYVaCFyvLFxkyMgGdf9wlCfMT"
                    onChange={(token) => setCaptchaToken(token)}
                />
                */}
                <button 
                    onClick={handleRegister}
                    disabled={isLoading}
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
                    ease-in-out
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Criando...' : 'Create'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="cursor-pointer underline" onClick={() => navigate('/')}>
                    Already have an account? Log in.
                </p>
            </div>
        </div>
    );
}

export default Register;
