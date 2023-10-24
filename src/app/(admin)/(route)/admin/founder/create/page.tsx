import React from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import Button from "@/components/Button";
import Link from "next/link";

const cx = classNames.bind(styles);
const Create = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <h1>Create Founder</h1>
                    <div className={cx("button")}>
                        <Link href={"/admin/founder/edit"}>
                            <Button>Edit</Button>
                        </Link>
                        <Link href={"/admin/founder"}>
                            <Button>Back</Button>
                        </Link>
                    </div>
                </div>
                <div className={cx("content")}>
                    <div className={cx("group_input")}>
                        <div className={cx("container_input", "input_file")}>
                            <span>Upload avatar</span>
                            <div className={cx("box_input")}>
                                <span>PNG, GIF, WEBP, MP4 or MP3. Max 100mb</span>
                                <input type="file" id="upLoadAvatar" />
                                <label
                                    htmlFor="upLoadAvatar"
                                    className={cx("icon_label")}
                                >
                                    +
                                </label>
                            </div>
                        </div>
                        <div className={cx("container_input")}>
                            <span>First Name</span>
                            <input type="text" placeholder=" First Name" />
                        </div>
                        <div className={cx("container_input")}>
                            <span>Last Name</span>
                            <input type="text" placeholder="Last Name" />
                        </div>
                        <div className={cx("container_input")}>
                            <span>Position</span>
                            <input type="text" placeholder="Position" />
                        </div>

                        <div className={cx("container_input")}>
                            <span>Email</span>
                            <input placeholder="Link to Email" type="text" />
                        </div>
                        <div className={cx("container_input")}>
                            <span>GitHub</span>
                            <input placeholder="Link to github" type="text" />
                        </div>
                    </div>
                    <div className={cx("button_save")}>
                        <Button>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
