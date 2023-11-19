import React from "react";
import classNames from "classnames/bind";
import styles from "./NftItemSlider.module.scss";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
const cx = classNames.bind(styles);

type Props = {
    index: number;
    value: any;
};
const NftItemSlider = function ({ value, index }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <img className={cx("container")} src={String(convertIpfsAddressToUrl(value.image))} alt="" />
        </div>
    );
};

export default NftItemSlider;
