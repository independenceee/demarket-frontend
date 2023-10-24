import React from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";

import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import Button from "@/components/Button";
import Link from "next/link";
const cx = classNames.bind(styles);
const Create = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <h1>Create Category</h1>
                    <div className={cx("button")}>
                        <Link href={"/admin/category/edit"}>
                            <Button>Edit</Button>
                        </Link>
                        <Link href={"/admin/category"}>
                            <Button>Back</Button>
                        </Link>
                    </div>
                </div>
                <div className={cx("content")}>
                    <div className={cx("group_input")}>
                        <div className={cx("container_input")}>
                            <span>Name</span>
                            <input type="text" placeholder="Name of Category" />
                        </div>
                        <div className={cx("container_input")}>
                            <span>Description</span>
                            <textarea rows={4} placeholder="Name of Category" />
                        </div>
                        <div className={cx("container_input")}>
                            <span>CreateTime</span>
                            <input placeholder="UpdateTime" type="date" />
                        </div>
                        <div className={cx("container_input")}>
                            <span>UpdateTime</span>
                            <input placeholder="UpdateTime" type="date" />
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
