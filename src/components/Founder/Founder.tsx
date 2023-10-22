import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import images from "@/assets/images";
import styles from "./Founder.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const Founder = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("image-wrapper")}>
                <Image className={cx("image")} src={images.logo} alt="" />
            </div>
            <div className={cx("container")}>
                <div className={cx("name")}>Nguyen Khanh</div>
                <div className={cx("role")}>Co-Founder</div>
            </div>
        </div>
    );
};

export default Founder;
