"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import GuideItem from "@/components/GuideItem";
import styles from "./Guide.module.scss";
import { DemarketContextType, Guide } from "@/types";
import DemarketContext from "@/contexts/components/DemarketContext";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";

type Props = {};

const cx = classNames.bind(styles);

const GuidePage = function ({}: Props) {
    const { guides } = useContext<DemarketContextType>(DemarketContext);

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")} data-aos="fade-down">
                <section className={cx("background__wrapper")}>
                    <div className={cx("background__container")} data-aos="fade-down">
                        <h2 className={cx("background__title")}>Guide Center</h2>
                        <p className={cx("background__description")}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae
                            quo ad iste ipsum officiis deleniti asperiores sit.
                        </p>
                    </div>
                </section>
                <Title main="HOME" slug="GUIDE" />
                <SubTitle
                    title="How can I help You?"
                    description="You dont Know how to use feature of pladform. Let me give you some Manual document."
                />
                <section className={cx("guide__wrapper")}>
                    {guides.map(function (guide: Guide, index: number) {
                        return (
                            <GuideItem
                                key={index}
                                index={index}
                                url={guide.videoUrl}
                                title={guide.title}
                                question={guide.question}
                                description={guide.description}
                            />
                        );
                    })}
                </section>
            </div>
        </main>
    );
};

export default GuidePage;
