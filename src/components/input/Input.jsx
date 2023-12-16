import { useRef, useState } from 'react';
import './input.css';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Input = ({ label, state, setState, placeholder, type }) => {

    const [icon, setIcon] = useState(<FaEyeSlash />);

    const eyeIconRef = useRef();
    const inputRef = useRef();

    function toggleEye(e) {
        if (inputRef.current.type === 'password') {
            inputRef.current.type = 'text';
            setIcon(<FaEye />);
        }
        else {
            inputRef.current.type = 'password';
            setIcon(<FaEyeSlash />);
        }
    }

    return (
        <div className='input-wrapper'>
            <p className='input-label'>{label}</p>
            <input
                ref={inputRef}
                className='custom-input'
                type={type}
                placeholder={placeholder}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            {type === 'password' && <span ref={eyeIconRef} onClick={toggleEye} style={{ cursor: 'pointer' }}> {icon} </span>}
        </div>
    )
}

export default Input;