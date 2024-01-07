"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./BannerCreate.module.scss";
import Button from "../Button";
type Props = {
    title?: string;
    description?: string;
};

const cx = classNames.bind(styles);

const BannerCreate = function ({ title = "No Item", description }: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <h2 className={cx("title")}>{title}</h2>
                <p className={cx("description")}>{description}</p>
                <Button className={cx("button")}>Create Now</Button>
            </div>
        </main>
    );
};

export default BannerCreate;
