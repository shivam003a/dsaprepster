import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../ContextAPI/AppContext";

const Home = () => {

    const { logged } = useContext(AppContext);

    return (
        <div className="hero-container">
            <div className="hero">
                <h1>DSAprep</h1>
                <p>Your one stop Solution</p>
                <p>for all your Data Structure and Algorithms needs.</p>
                <Link to={logged ? "/dashboard" : "/login"}>Prepare</Link>
            </div>
            <div class="hero-details">
                <div class="cont1">
                    <div>
                        <div className="attr-que">450</div>
                        <div className="attr-desc">Questions carefully curated by</div>
                    </div>
                    <div className="attr-name">-Love Babbar</div>
                </div>
                <div class="cont2">
                    <p>Sharpen your problem-solving skills and conquer any DSA question with ease!</p>
                </div>
                <div class="cont3">
                    <div>
                        <div className="contact-heading">Contact Us</div>
                        <span>anytime</span>
                    </div>
                    <a href="mailto:shivam003a@gmail.com">shivam003a@gmail.com</a>

                </div>
            </div>
        </div>
    )
}

export default Home;