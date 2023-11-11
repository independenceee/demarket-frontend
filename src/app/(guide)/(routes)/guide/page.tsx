"use client";

import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import { get } from "@/utils/httpRequest";
import GuideItem from "@/components/GuideItem";
import styles from "./Guide.module.scss";
import { Guide } from "@/types";
import Title from "@/components/Title";
type Props = {};

const cx = classNames.bind(styles);

const GuidePage = function ({}: Props) {
    const [guides, setGuides] = useState<Guide[]>([]);

    const fetchGuides = async function () {
        try {
            const data = await get("/guide");
            setGuides(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(function () {
        fetchGuides();
    }, []);

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
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
                <section className={cx("heading__wrapper")}>
                    <h2 className={cx("heading__title")}>How can I help You?</h2>
                    <p className={cx("heading__description")}>
                        You dont Know how to use feature of pladform. Let me give you some Manual document.
                    </p>
                </section>
                <section className={cx("guide__wrapper")}>
                    {guides.map(function (guide: Guide, index: number) {
                        return <GuideItem key={index} index={index} url={guide.url} />;
                    })}
                </section>
            </div>
        </main>
    );
};

export default GuidePage;
