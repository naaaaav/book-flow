import React, { useState } from 'react';
import HomeHeader from "../components/home/HomeHeader";
import Categories from "../components/home/Categories";
import Event from "../resources/home/event.jpg";
import Books from "../components/home/Books";
import Footer from "../components/home/Footer";
import './Home.css';

function Home() {
    const [activeCategory, setActiveCategory] = useState('홈');

    return (
        <div className="container">
            <div>
                <HomeHeader />
            </div>
            <div>
                <Categories 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory} 
                />
            </div>
            <div>
                <img className="eventImg" src={Event} alt="Event" />
            </div>
            <div>
                <Books />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
