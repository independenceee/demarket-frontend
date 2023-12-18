import React, { ChangeEvent, SetStateAction, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Logo from "@/components/Logo";
import { publicRouters } from "@/routes";
import Image from "next/image";
import images from "@/assets/images";
import { post } from "@/utils/httpRequest";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<SetStateAction<string>>;
};

const Footer = function ({ selectedRouter, setSelectedRouter }: Props) {
    const [feedback, setFeedback] = useState<string>("");

    const handleChange = function (event: ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        setFeedback(event.target.value);
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null!);

    const handleSubmit = async function () {
        try {
            const data = await post("/mail", {
                feedback: feedback,
                emailFrom: "nguyenkhanh17112003@gmail.com",
            });

            toast.success(data);

            textareaRef.current.focus();
        } catch (error) {
            toast.warning("Send feedback failed !");
        }
    };

    const handleClear = function () {
        setFeedback("");
    };
    return (
        <footer className={cx("footer")}>
            <div className={cx("container")}>
                <div className={cx("row")}>
                    <div className={cx("column")}>
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
                    <div className={cx("column")}>
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
                    <div className={cx("column")}>
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
                    <div className={cx("column")}>
                        <h4>Feed back</h4>
                        <div className={cx("social-links")}>
                            <textarea
                                ref={textareaRef}
                                className={cx("form-input")}
                                name="feedback"
                                cols={30}
                                rows={5}
                                value={feedback}
                                placeholder="Your feedback..."
                                onChange={handleChange}
                            ></textarea>
                            <div className={cx("btn-group")}>
                                <button onClick={handleSubmit} className={cx("btn-submit")}>
                                    Submit
                                </button>
                                <button onClick={handleClear} className={cx("btn-cancel")}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("origin")}>
                <p>{`© ${new Date().getFullYear()} Marketplace. Design & Develop with by BlockAlpha`}</p>
            </div>
        </footer>
    );
};

export default Footer;
