
import React from 'react'
import {useNavigate} from 'react-router-dom'
const Button = ({text}) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/signup');
    };

    return (
        <>
            <button
             className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 focus:outline-none cursor-pointer"
            
            onClick={handleClick}

            >
                {text}
            </button>

        </>
    )
}

export default Button