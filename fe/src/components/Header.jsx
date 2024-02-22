import React from 'react'
import { Fragment } from "react"
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
    function smoothScroll(target1, duration) {
        var target = document.querySelector(target1);
        var targetPosition = target.getBoundingClientRect().top;
        var startPosition = window.pageYOffset;
        var distance = targetPosition;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = easing(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easing(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    useEffect(() => {
        const category = document.querySelector('div a[href="#category"]');
        const footer1 = document.querySelector('div a[href="#footer1"]');
        const product = document.querySelector('div a[href="#product"]');
        const intro = document.querySelector('div a[href="#intro"]');
        category.addEventListener('click', () => {
            smoothScroll('#category', 1500);
        });

        footer1.addEventListener('click', () => {
            smoothScroll('#footer1', 1500);
        });
        product.addEventListener('click', () => {
            smoothScroll('#product', 1500);
        });
        intro.addEventListener('click', () => {
            smoothScroll('#intro', 1500);
        });
        return () => {
            category.addEventListener('click', () => {
                smoothScroll('#category', 1500);
            });
    
            footer1.addEventListener('click', () => {
                smoothScroll('#footer1', 1500);
            });
            product.addEventListener('click', () => {
                smoothScroll('#product', 1500);
            });
            intro.addEventListener('click', () => {
                smoothScroll('#intro', 1500);
            });
        };
    }, []);


  return (
    <div className="cakes__header">
        <div className="cakes__header--content">
            <div className="cakes__header--content__image">
                <Link to="./homepage" ><img className="image__logo" src="src/assets/images/logocake.png" alt="" /></Link>
                
            </div>
            <div className="cakes__header--content__body">
                <div className="cakes__header--content__category">
                    <div className="cakes__header--link">
                        <a href="#intro">Giới thiệu</a>
                    </div>
                    <div className="cakes__header--link">
                        <a href="#category">Danh mục</a></div>
                    <div className="cakes__header--link">
                        <a href="#product">Sản phẩm</a></div>
                    <div className="cakes__header--link">
                        <a href="#footer1">Liên hệ</a></div>
                    <div className="cakes__header--link">
                        <Link to="/search-order">Tra cứu đơn hàng</Link>
                        </div>
                </div>
            </div>
            
        </div>
    </div>
    
  )
}

export default Header