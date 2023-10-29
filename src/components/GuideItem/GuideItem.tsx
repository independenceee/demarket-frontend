"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./GuideItem.module.scss";
import ReactPlayer from "react-player";
import Aos from "aos";
import "aos/dist/aos.css";
import { GrAdd } from "react-icons/gr";
import images from "@/assets/images";

const cx = classNames.bind(styles);
type Props = {
    index: number;
    url: string;
};

const GuideItem = function ({ url, index }: Props) {
    const [opened, setOpened] = useState<boolean>(index == 0 ? true : false);
    const handleOpen = function () {
        setOpened(!opened);
    };

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")} onClick={handleOpen}>
                <p className={cx("title")}>How to getting started?</p>
                <GrAdd className={cx("icon")} />
            </header>

            {opened && (
                <div className={cx("container")}>
                    <h2 className={cx("question")}>How to use pladform?</h2>
                    <div className={cx("video-container")}>
                        <ReactPlayer
                            data-aos="fade-down"
                            width={1440}
                            height={670}
                            className={cx("video")}
                            controls
                            url={url}
                        />
                    </div>

                    <p className={cx("description")}>
                        In hac habitasse platea dictumst. Integer arcu odio, malesuada id
                        eros vel, hendrerit consequat quam. Pellentesque volutpat quis
                        elit at tincidunt. Fusce vel velit augue. Integer gravida justo
                        nec mauris congue, sit amet faucibus nisl dictum. Nullam in urna
                        tincidunt, fringilla nisl a, efficitur neque.
                    </p>
                </div>
            )}
        </div>
    );
};

export default GuideItem;
