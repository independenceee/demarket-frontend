import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { CopyIcon } from "@/components/Icons";
import styles from "./NftItem.module.scss";
import images from "@/assets/images";

const cx = classNames.bind(styles);
type Props = {};

const NftItem = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("image__wrapper")}>
                    <Image className={cx("image")} src={images.background} alt="" />
                </section>
                <section className={cx("content")}>
                    <h3 className={cx("content__title")}>The Dark world</h3>
                    <h3 className={cx("content__title")}>Art</h3>
                </section>
                <section className={cx("information")}>
                    <div className={cx("author")}>
                        <Image className={cx("avatar")} src={images.background} alt="" />
                        <h3 className={cx("name")}>Creator</h3>
                    </div>
                    <h3 className={cx("price")}>100 ADA</h3>
                </section>
                <section className={cx("policyId")}>
                    <h4 className={cx("policyId__name")}>PolicyID</h4>
                    <p className={cx("policyId__value")}>qhut0...hfteh45</p>
                    <div className={cx("icon__wrapper")}>
                        <CopyIcon width={"16px"} height={"16"} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NftItem;
