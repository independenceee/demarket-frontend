"use client";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";
import { get } from "@/utils/httpRequest";
import { Statistic } from "@/types/GenericsType";
import { contractAddress } from "@/libs";
const cx = classNames.bind(styles);

type Props = {};
const Statistics = function ({}: Props) {
    const [statistics, setStatistics] = useState<Statistic>();

    useEffect(function () {
        const fetchStatistics = async function () {
            try {
                const { totalAccounts } = await get("/statistics/account");
                const { totalTrendings } = await get("/statistics/trending");
                const { totalTransactions } = await get(`/statistics/transaction?contractAddress=${contractAddress}`);
                const { totalProducts } = await get(`/statistics/product?contractAddress=${contractAddress}`);
                setStatistics({
                    totalAccount: totalAccounts,
                    totalProduct: totalProducts,
                    totalTransaction: totalTransactions,
                    totalTrending: totalTrendings,
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchStatistics();
    }, []);

    return (
        <div className={cx("wrapper")} data-aos="fade-up">
            <div className={cx("container")}>
                <ul className={cx("statistics")}>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="500">
                        <h2>
                            <CountUp start={0} end={statistics?.totalProduct || 0} duration={2} delay={0} />
                        </h2>
                        <p>PRODUCT</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1000">
                        <h2>
                            <CountUp start={0} end={statistics?.totalTransaction || 0} duration={2} delay={0} />
                        </h2>
                        <p>TRANSACTION</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1500">
                        <h2>
                            <CountUp start={0} end={statistics?.totalTrending || 0} duration={2} delay={0} />
                        </h2>
                        <p>TRENDING</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="2000">
                        <h2>
                            <CountUp start={0} end={statistics?.totalAccount || 0} duration={2} delay={0} />
                        </h2>
                        <p>AUTHOR</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Statistics;
