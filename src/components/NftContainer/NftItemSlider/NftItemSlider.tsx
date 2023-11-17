import React from "react";
import classNames from "classnames/bind";
import styles from "./NftItemSlider.module.scss";
import Image from "next/image";
import images from "@/assets/images";
const cx = classNames.bind(styles);

type Props = {
    index: number;
};
const NftItemSlider = function ({ index }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <Image className={cx("container")} src={images.background} alt="" />
        </div>
    );
};

export default NftItemSlider;
