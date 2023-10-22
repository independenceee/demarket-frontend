"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import { Statistic } from "@/types";
import { get } from "@/utils/httpRequest";
import styles from "./Statistics.module.scss";
const cx = classNames.bind(styles);

import axios from "axios";

type Props = {};
const Statistics = function ({}: Props) {
    const [statistics, setStatistics] = useState<Statistic>();
    const fetchStatistics = async function () {
        try {
            const response = await axios.get(
                "https://demarket-backend.vercel.app/api/v1/guide",
            );
            setStatistics(response.data);
            console.log(statistics);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(function () {
        fetchStatistics();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <ul className={cx("statistics")}>
                    <li className={cx("statistic")}>
                        <h2>
                            <CountUp start={0} end={3250} duration={2} delay={0} />
                        </h2>
                        <p>PRODUCT</p>
                    </li>
                    <li className={cx("statistic")}>
                        <h2>
                            <CountUp start={0} end={17112003} duration={2} delay={0} />
                        </h2>
                        <p>COLLECTION</p>
                    </li>
                    <li className={cx("statistic")}>
                        <h2>
                            <CountUp start={0} end={3000} duration={2} delay={0} />
                        </h2>
                        <p>TRENDING</p>
                    </li>
                    <li className={cx("statistic")}>
                        <h2>
                            <CountUp start={0} end={122334} duration={2} delay={0} />
                        </h2>
                        <p>AUTHOR</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Statistics;
