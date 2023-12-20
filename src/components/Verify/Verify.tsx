import React, { useState, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Verify.module.scss";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";

const cx = classNames.bind(styles);
type Props = {
    setVerify: React.Dispatch<React.SetStateAction<string>>;
};

const Verify = function ({ setVerify }: Props) {
    const [openVerify, setOpenVerify] = useState<boolean>(true);

    const handleOpenVerify = function () {
        setOpenVerify(!openVerify);
    };

    const handleChangeVerify = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setVerify(event.target.value);
    };

    return (
        <section className={cx("content__filter")}>
            <header className={cx("content__filter--header")} onClick={handleOpenVerify}>
                <h3 className={cx("content__filter--title")}>Category</h3>
                {!openVerify ? (
                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                ) : (
                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                )}
            </header>
            {openVerify && (
                <form className={cx("content__filter--option")}>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>Yes</h4>
                        <input
                            value={"verify"}
                            name="verify"
                            className={cx("content__filter--control")}
                            onChange={handleChangeVerify}
                            type="radio"
                        />
                    </section>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>No</h4>
                        <input
                            name="verify"
                            value={"noVerify"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeVerify}
                            type="radio"
                        />
                    </section>
                </form>
            )}
        </section>
    );
};

export default Verify;
