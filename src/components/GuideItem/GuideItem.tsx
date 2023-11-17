"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./GuideItem.module.scss";
import ReactPlayer from "react-player";
import { GrAdd } from "react-icons/gr";

const cx = classNames.bind(styles);
type Props = {
    index: number;
    url: string;
    question: string;
    title: string;
    description: string;
};

const GuideItem = function ({ url, index, title, description, question }: Props) {
    const [opened, setOpened] = useState<boolean>(index == 0 ? true : false);
    const handleOpen = function () {
        setOpened(!opened);
    };

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")} onClick={handleOpen}>
                <p className={cx("title")}>{title}</p>
                <GrAdd className={cx("icon")} />
            </header>

            {opened && (
                <div className={cx("container")}>
                    <h2 className={cx("question")}>{question}</h2>
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

                    <p className={cx("description")}>{description}</p>
                </div>
            )}
        </div>
    );
};

export default GuideItem;
