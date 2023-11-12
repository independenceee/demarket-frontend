"use client";

import React from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { LinkedinIcon, TelegramIcon } from "@/components/Icons";
import styles from "./FounderItem.module.scss";

const cx = classNames.bind(styles);

type Props = {
    index: number;
    avatar: string;
    company: string;
    fistName: string;
    lastName: string;
    role: string;
    twitter: string;
    linkedin: string;
};

const FounderItem = function ({ index, avatar, company, fistName, lastName, role, twitter, linkedin }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <div className={cx("image__wrapper")}>
                <img className={cx("image")} src={avatar} alt="Avatar" />
                <div className={cx("social__icon")}>
                    {twitter && (
                        <Link className={cx("icon__link")} href={twitter}>
                            <TelegramIcon />
                        </Link>
                    )}
                    {linkedin && (
                        <Link className={cx("icon__link")} href={linkedin}>
                            <LinkedinIcon />
                        </Link>
                    )}
                </div>
            </div>
            <div className={cx("container")}>
                <div className={cx("name")}>{fistName + " " + lastName} </div>
                <div className={cx("role")}>{role}</div>
            </div>
        </div>
    );
};

export default FounderItem;
