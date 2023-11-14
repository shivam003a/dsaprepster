import React from "react";
import { Link } from 'react-router-dom'
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si'

const Footer = () => {
    return (
        <>
            <div className="footer">
                <footer>
                    <span className="brand">DSAprep</span>
                    <div className="social">
                        <a href="https://www.instagram.com/shivam003a/" target="_blank"><SiInstagram color="#ffffff" size={26}/></a>
                        <a href="https://www.linkedin.com/in/shivam003a/" target="_blank"><SiLinkedin color="#ffffff" size={26}/></a>
                        <a href="https://www.github.com/shivam003a/" target="_blank"><SiGithub color="#ffffff" size={26}/></a>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer;