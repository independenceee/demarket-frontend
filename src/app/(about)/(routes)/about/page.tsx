"use client";

import React, { useContext } from "react";
import Link from "next/link";
import ReactPlayer from "react-player/youtube";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import FounderItem from "@/components/FounderItem";
import { FounderItemType } from "@/types/GenericsType";
import DemarketContext from "@/contexts/components/DemarketContext";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import styles from "./About.module.scss";
import FounderItemSkeleton from "@/components/FounderItem/FounderItemSkeleton";
import { DemarketContextType } from "@/types/DemarketContextType";
import Button from "@/components/Button";

type Props = {};
const cx = classNames.bind(styles);

const AboutPage = function ({}: Props) {
    const { founders, loadingFounders } = useContext<DemarketContextType>(DemarketContext);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")} data-aos="fade-down">
                <section className={cx("background__wrapper")}>
                    <div className={cx("background__container")} data-aos="fade-down">
                        <h2 className={cx("background__title")}>About Us</h2>
                        <p className={cx("background__description")}>
                            Blockalpha brings an exciting solution to access the WEB3 platform for everyone, with the
                            ultimate goal of transforming the model from WEB2 to WEB3. We provide technologies to
                            address issues related to transparency, information security, and eliminate third-party
                            interference.
                        </p>
                    </div>
                </section>
                <Title main="HOME" slug="ABOUT" />
                <section className={cx("heading__wrapper")}>
                    <a className={cx("heading__title")} data-aos="fade-up" href="founder__contact">
                        About Us
                    </a>
                </section>
                <section className={cx("about__wrapper")}>
                    <div className={cx("about__container")}>
                        <div className={cx("about__inner")}>
                            <div className={cx("about__video")} data-aos="fade-right">
                                <ReactPlayer
                                    className={cx("about__video--control")}
                                    controls
                                    width={"100%"}
                                    height={"350px"}
                                    url="https://www.youtube.com/watch?v=icX1mgKkrS0"
                                />
                            </div>
                            <div className={cx("about__content")} data-aos="fade-left">
                                <h2>Open Your Own Marketplace</h2>
                                <p>
                                    In the era of digital transformation with the rise of digital art, NFT has gradually
                                    changed the concept of ownership and created a revolution connecting with digital
                                    assets. demarket, a decentralized NFT exchange on the Cardano Blockchain platform
                                    from BlockAlpha.
                                </p>
                                <p>
                                    Demarket is a decentralized NFT exchange project developed by the BlockAlpha team.
                                    The project has received high ratings from the review (CR) community with a score of
                                    4.61, and ranked 2nd in the ranking in the Startup & Onboarding for Students
                                    category of Project Catalyst Fund 10.
                                </p>

                                <div className={cx("about__button")}>
                                    <Button className={cx("button")} href={""}>
                                        Contact us
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={cx("statistics__wrapper")}>
                    <Statistics />
                </section>
                <section className={cx("founder__wrapper")}>
                    <SubTitle
                        title="Our Foundation"
                        description="We are impartial and independent, and every day we create distinctive, world-class
                            programmes and develop"
                    />

                    <div id="founder__contact" className={cx("founder__container")}>
                        {loadingFounders
                            ? new Array(6).fill(null).map(function (value: any, index: number) {
                                  return <FounderItemSkeleton index={index} key={index} />;
                              })
                            : founders.map(function (founder: FounderItemType, index: number) {
                                  return (
                                      <FounderItem
                                          index={index}
                                          role={founder.role}
                                          twitter={founder.twitter}
                                          linkedin={founder.linkedin}
                                          lastName={founder.lastName}
                                          fistName={founder.fistName}
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
