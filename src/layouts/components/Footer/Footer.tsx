import React, { SetStateAction } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Logo from "@/components/Logo";
import { publicRouters } from "@/routes";
import Image from "next/image";
import images from "@/assets/images";

const cx = classNames.bind(styles);
type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<SetStateAction<string>>;
};

const Footer = function ({ selectedRouter, setSelectedRouter }: Props) {
    return (
        <footer className={cx("footer")}>
            <div className={cx("container")}>
                <div className={cx("row")}>
                    <div className={cx("footer-col")}>
                        <Logo />
                        <p>
                            Buy, sell and discover exclusive digital assets by the top artists of Design & Develop with
                            by BlockAlpha
                        </p>
                        <div className={cx("social-links")}>
                            <Link href="#">
                                <Image src={images.meta} alt="" />
                            </Link>
                            <Link href="#">
                                <Image src={images.linkedin} alt="" />
                            </Link>
                            <Link href="#">
                                <Image src={images.youtube} alt="" />
                            </Link>
                            <Link href="#">
                                <Image src={images.twitter} alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={cx("footer-col")}>
                        <h4>Main page</h4>
                        <ul>
                            <li>
                                <Link href="#">FAQ</Link>
                            </li>
                            <li>
                                <Link href="#">shipping</Link>
                            </li>
                            <li>
                                <Link href="#">returns</Link>
                            </li>
                            <li>
                                <Link href="#">order status</Link>
                            </li>
                            <li>
                                <Link href="#">payment options</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx("footer-col")}>
                        <h4>Useful page</h4>
                        <ul>
                            <li>
                                <Link href="#">watch</Link>
                            </li>
                            <li>
                                <Link href="#">bag</Link>
                            </li>
                            <li>
                                <Link href="#">shoes</Link>
                            </li>
                            <li>
                                <Link href="#">dress</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx("footer-col")}>
                        <h4>Feed back</h4>
                        <div className={cx("social-links")}>
                            <input />
                            <textarea />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("origin")}>
                
            </div>
        </footer>
    );
};

export default Footer;
