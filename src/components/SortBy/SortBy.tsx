import React, { useState, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./SortBy.module.scss";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";

const cx = classNames.bind(styles);
type Props = {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

const SortBy = function ({ setSortBy }: Props) {
    const [openSortBy, setOpenSortBy] = useState<boolean>(true);
    const handleOpenSortBy = function () {
        setOpenSortBy(!openSortBy);
    };

    const handleChangeSortBy = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setSortBy(event.target.value);
    };

    return (
        <section className={cx("content__filter")}>
            <header className={cx("content__filter--header")} onClick={handleOpenSortBy}>
                <h3 className={cx("content__filter--title")}>Sort by</h3>
                {!openSortBy ? (
                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                ) : (
                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                )}
            </header>
            {openSortBy && (
                <form className={cx("content__filter--option")}>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>Default</h4>
                        <input
                            name="filter"
                            value={"default"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeSortBy}
                            type="radio"
                        />
                    </section>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>New</h4>
                        <input
                            name="filter"
                            value={"news"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeSortBy}
                            type="radio"
                        />
                    </section>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>Trending</h4>
                        <input
                            name="filter"
                            value={"trending"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeSortBy}
                            type="radio"
                        />
                    </section>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>Increment</h4>
                        <input
                            name="filter"
                            value={"increment"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeSortBy}
                            type="radio"
                        />
                    </section>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>Decrement</h4>
                        <input
                            name="filter"
                            value={"decrement"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeSortBy}
                            type="radio"
                        />
                    </section>
                </form>
            )}
        </section>
    );
};

export default SortBy;
