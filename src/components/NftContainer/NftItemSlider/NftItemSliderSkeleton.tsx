"use client";
import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./NftItemSlider.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const cx = classNames.bind(styles);
type Props = {
    index: number;
};

const NftItemSkeleton = function ({ index }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <Skeleton width={"100%"} height={"100%"} />
        </div>
    );
};

export default NftItemSkeleton;
