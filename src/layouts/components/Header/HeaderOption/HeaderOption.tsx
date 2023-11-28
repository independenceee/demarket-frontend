"use client";

import React, { memo, Dispatch, SetStateAction, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import classNames from "classnames/bind";
import styles from "./HeaderOption.module.scss";
const cx = classNames.bind(styles);
type Props = {
    text: string;
    isActive?: boolean;
    redirect: string;
    setSelected?: Dispatch<SetStateAction<string>>;
};
const HeaderOption = function ({ text, isActive, setSelected, redirect }: Props) {
    const router = useRouter();

    const handleClick = useCallback(
        function (content = text) {
            if (setSelected && redirect) {
                setSelected(content);
                router.push(redirect);
            } else {
                return;
            }
        },
        [redirect],
    );

    return (
        <Link
            href={redirect}
            className={cx("navbar__link")}
            onClick={() => {
                handleClick(text);
            }}
        >
            <span className={cx(`${isActive ? "navbar__content--active" : "navbar__content"}`)}>{text}</span>
        </Link>
    );
};

export default memo(HeaderOption);
