"use client";

import React from "react";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import FounderItem from "@/components/FounderItem";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import styles from "./About.module.scss";
import Button from "@/components/Button";
import founders from "@/data/founders";

type Props = {};
const cx = classNames.bind(styles);

const AboutPage = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")} data-aos="fade-down">
                <section className={cx("background-wrapper")}>
                    <div className={cx("background-container")} data-aos="fade-down">
                        <h2 className={cx("background-title")}>About Us</h2>
                        <p className={cx("background-description")}>
                            Blockalpha brings an exciting solution to access the WEB3 platform for everyone, with the ultimate goal of transforming
                            the model from WEB2 to WEB3. We provide technologies to address issues related to transparency, information security, and
                            eliminate third-party interference.
                        </p>
                    </div>
                </section>
                <Title main="HOME" slug="ABOUT" />
                <SubTitle title="About Us" />
                <section className={cx("about")}>
                    <div className={cx("wrapper")}>
                        <div className={cx("wrapper-inner")}>
                            <div className={cx("video-wrapper")} data-aos="fade-right">
                                <iframe
                                    className={cx("video")}
                                    src="https://www.youtube.com/embed/bA_0YiNfma8?si=bVvN7wXIy5D2lVyz"
                                    title="YouTube video player"
                                    frameBorder={0}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen={false}
                                />
                            </div>
                            <div className={cx("content-wrapper")} data-aos="fade-left">
                                <div className={cx("content-body")}>
                                    <h2 className={cx("content-body-title")}>Open Your Own Marketplace</h2>
                                    <div className={cx("content-body-description")}>
                                        In the era of digital transformation with the rise of digital art, NFT has gradually changed the concept of
                                        ownership and created a revolution connecting with digital assets. demarket, a decentralized NFT exchange on
                                        the Cardano Blockchain platform from BlockAlpha.
                                    </div>
                                    <div className={cx("content-body-description")}>
                                        Demarket is a decentralized NFT exchange project developed by the BlockAlpha team. The project has received
                                        high ratings from the review (CR) community with a score of 4.61, and ranked 2nd in the ranking in the Startup
                                        & Onboarding for Students category of Project Catalyst Fund 10.
                                    </div>
                                </div>
                                <Button>Contact us</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <Statistics />
                <section className={cx("founder-wrapper")}>
                    <SubTitle
                        title="Our Foundation"
                        description="We are impartial and independent, and every day we create distinctive, world-class
                            programmes and develop"
                    />

                    <div id="founder-contact" className={cx("founder-container")}>
                        {founders?.map(function (founder: any, index: number) {
                            return (
                                <FounderItem
                                    index={index}
                                    role={founder.role}
                                    twitter={founder.twitter}
                                    linkedin={founder.linkedin}
                                    lastName={founder.lastName}
                                    firstName={founder.firstName}
                                    company={founder.company}
                                    avatar={founder.avatar}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;
