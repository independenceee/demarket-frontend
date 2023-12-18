import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import images from "@/assets/images";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);
type Props = {
    image?: string | any;
    onClick?: () => any;
    small?: any;
    medium?: any;
    large?: any;
};

const Avatar = function ({ image }: Props) {
    return (
        <div className={cx("wrapper")}>
            <Image className={cx("image")} src={image ? image : images.user} alt="" />
        </div>
    );
};

export default Avatar;
