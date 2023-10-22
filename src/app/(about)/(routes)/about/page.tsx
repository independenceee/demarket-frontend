"use client";

import React, { useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import classNames from "classnames/bind";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";
import Statistics from "@/components/Statistics";
import Founder from "@/components/Founder";
import styles from "./About.module.scss";

type Props = {};

const cx = classNames.bind(styles);

const AboutPage = function ({}: Props) {
    useEffect(function () {
        Aos.init({
            duration: 800,
            offset: 150,
        });
    }, []);

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("background__wrapper")}>
                    <div className={cx("background__container")} data-aos="fade-down">
                        <h2 className={cx("background__title")}>About Us</h2>
                        <p className={cx("background__description")}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aliquam ullamcorper pulvinar imperdiet. Fusce rhoncus vel
                            lacus vel tempor. Nullam eu magna congue, auctor nisl ac,
                            tristique urna. In blandit mattis massa.
                        </p>
                    </div>
                </section>
                <section className={cx("title__wrapper")}>
                    <span className={cx("title__main")}>Home</span>
                    <span className={cx("title__middle")}></span>
                    <span className={cx("title__slug")}>About</span>
                </section>
                <section className={cx("heading__wrapper")}>
                    <h2 className={cx("heading__title")}>About Us</h2>
                </section>
                <section className={cx("about__wrapper")}>
                    <div className={cx("about__container")}>
                        <div className={cx("about__inner")}>
                            <div className={cx("about__video")} data-aos="fade-right">
                                <ReactPlayer
                                    className={cx("about__video--control")}
                                    controls
                                    url="https://www.youtube.com/watch?v=Zzn9-ATB9aU"
                                />
                            </div>
                            <div className={cx("about__content")} data-aos="fade-left">
                                <h2>Open Your Own Marketplace</h2>
                                <p>
                                    In hac habitasse platea dictumst. Integer arcu odio,
                                    malesuada id eros vel, hendrerit consequat quam.
                                    Pellentesque volutpat quis elit at tincidunt. Fusce
                                    vel velit augue. Integer gravida justo nec mauris
                                    congue, sit amet faucibus nisl dictum.
                                </p>
                                <p>
                                    Integer ornare mauris id mauris semper, non fermentum
                                    est vestibulum. Sed non laoreet ligula. Praesent
                                    tempor scelerisque nulla, non tristique dolor rhoncus
                                    ac. Nulla vitae ornare sapien. Quisque non massa ut
                                    justo convallis blandit.
                                </p>

                                <div className={cx("about__button")}>
                                    <Link className={cx("button")} href={""}>
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={cx("statistics__wrapper")}>
                    <Statistics />
                </section>
                <section className={cx("founder__wrapper")}>
                    <header className={cx("founder__header")}>
                        <h2 className={cx("founder__title")}>Our Foundation</h2>
                        <p className={cx("founder__description")}>
                            We are impartial and independent, and every day we create
                            distinctive, world-class programmes and develop
                        </p>
                    </header>
                    <div className={cx("founder__container")}>
                        <Founder />
                        <Founder />
                        <Founder />
                        <Founder />
                        <Founder />
                        <Founder />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;
