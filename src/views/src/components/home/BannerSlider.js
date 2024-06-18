import React, { useState, useEffect } from 'react';
import Event from '../../resources/home/event.png';
import Event2 from '../../resources/home/event2.png';
import Event3 from '../../resources/home/event3.png';
import Event4 from '../../resources/home/event4.png';
import './BannerSlider.css';

const BannerSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const banners = [ Event, Event2, Event3, Event4];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="banner-slider">
            {banners.map((banner, index) => (
                <img
                    key={index}
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className={index === currentSlide ? 'active' : ''}
                />
            ))}
        </div>
    );
};

export default BannerSlider;