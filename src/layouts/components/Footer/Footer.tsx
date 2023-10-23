import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import images from "@/assets/images";
import styles from "./Footer.module.scss";
import Link from "next/link";
import {
    HorizonalIcon,
    HeartIcon,
    YoutubeIcon,
    TwitterIcon,
    LinkedinIcon,
} from "@/components/Icons";

const cx = classNames.bind(styles);
type Props = {};

const Footer = function ({}: Props) {
    return (
        <footer className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("footer__introduct")}>
                    <div className={cx("footer__introduct--logo")}>
                        <Image
                            src={images.logo}
                            alt=""
                            className={cx("footer__logo--image")}
                        />
                    </div>
                    <p className={cx("footer__introduct--description")}>
                        Buy, sell and discover exclusive digital assets by the top artists
                        of Design & Develop with by BlockAlpha
                    </p>
                </section>

                <section className={cx("footer__content")}>
                    <h2 className={cx("footer__content--heading")}>Main Page</h2>
                    <ul className={cx("footer__content--list")}>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Home</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Transaction</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>History</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Mint</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Assets</Link>
                        </li>
                    </ul>
                </section>

                <section className={cx("footer__content")}>
                    <h2 className={cx("footer__content--heading")}>Useful Page</h2>
                    <ul className={cx("footer__content--list")}>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Home</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Transaction</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>History</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Mint</Link>
                        </li>
                        <li className={cx("footer__content--item")}>
                            <Link href={""}>Assets</Link>
                        </li>
                    </ul>
                </section>

                <section className={cx("footer__contact")}>
                    <h2 className={cx("footer__contact--heading")}>
                        Please give us some feedback
                    </h2>
                    <div className={cx("footer__input")}>
                        <input
                            className={cx("footer__input--control")}
                            type="text"
                            placeholder="Your feedback"
                        />
                        <div className={cx("footer__input--icon")}>
                            <HorizonalIcon className={cx("icon")} />
                        </div>
                    </div>
                    <h2 className={cx("footer__contact--heading")}>
                        Contact With us here
                    </h2>
                    <div className={cx("footer__list--icon")}>
                        <Link href="#" className={cx("icon-link")}>
                            <LinkedinIcon className={cx("icon")} />
                        </Link>
                        <Link href="#" className={cx("icon-link")}>
                            <YoutubeIcon className={cx("icon")} />
                        </Link>
                        <Link href="#" className={cx("icon-link")}>
                            <TwitterIcon className={cx("icon")} />
                        </Link>
                    </div>
                </section>
            </div>

            <div className={cx("footer__origin")}>
                <p>{`© ${new Date().getFullYear()} Marketplace. Design & Develop with by BlockAlpha`}</p>
            </div>
        </footer>
    );
};

export default Footer;
