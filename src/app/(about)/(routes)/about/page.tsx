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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper pulvinar
                            imperdiet. Fusce rhoncus vel lacus vel tempor. Nullam eu magna congue, auctor nisl ac,
                            tristique urna. In blandit mattis massa.
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
                                    url="https://www.youtube.com/watch?v=Zzn9-ATB9aU"
                                />
                            </div>
                            <div className={cx("about__content")} data-aos="fade-left">
                                <h2>Open Your Own Marketplace</h2>
                                <p>
                                    In hac habitasse platea dictumst. Integer arcu odio, malesuada id eros vel,
                                    hendrerit consequat quam. Pellentesque volutpat quis elit at tincidunt. Fusce vel
                                    velit augue. Integer gravida justo nec mauris congue, sit amet faucibus nisl dictum.
                                </p>
                                <p>
                                    Integer ornare mauris id mauris semper, non fermentum est vestibulum. Sed non
                                    laoreet ligula. Praesent tempor scelerisque nulla, non tristique dolor rhoncus ac.
                                    Nulla vitae ornare sapien. Quisque non massa ut justo convallis blandit.
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
