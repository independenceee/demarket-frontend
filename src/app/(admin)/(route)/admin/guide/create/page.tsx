import React from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import Link from "next/link";
import Button from "@/components/Button";
const cx = classNames.bind(styles);
const Create = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <h1>Create Guide</h1>
                    <div className={cx("button")}>
                        <Link href={"/admin/guide/edit"}>
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
                            <span>Upload Image</span>
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
                        <div className={cx("container_input", "input_file")}>
                            <span>Upload Video</span>
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
                            <span>Title</span>
                            <input type="text" placeholder="Name of Category" />
                        </div>
                        <div className={cx("container_input")}>
                            <span>Description</span>
                            <textarea rows={4} placeholder="Name of Category" />
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
