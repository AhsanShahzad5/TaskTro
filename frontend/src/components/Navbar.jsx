import React from 'react'
import Button from './Button'
import TasktroSvg from './TasktroSvg'
import { Link } from 'react-router-dom'
import Pricing from './Pricing'

const Navbar = ({title}) => {
    return (
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <TasktroSvg/>
                        <span className="ml-3 text-xl">{title}</span>
                    </a>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                        <Link to = '/' className="mr-5 hover:text-gray-900 cursor-pointer">Features</Link>
                        <Link className="mr-5 hover:text-gray-900 cursor-pointer">Teams</Link>
                        <Link to = '/integrations' className="mr-5 hover:text-gray-900 cursor-pointer">Integrations</Link>
                        <Link to= '/pricing' className="mr-5 hover:text-gray-900 cursor-pointer">Pricing</Link>
                    </nav>
                    <Button text="Sign up for free"/>
                </div>
            </header>
        </>
    )
}

export default Navbar
