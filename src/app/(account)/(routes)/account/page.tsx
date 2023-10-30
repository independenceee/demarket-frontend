import React from "react";
import classNames from "classnames/bind";
import styles from "./Account.module.scss";
import { ArrowDropdownCircleIcon, SearchIcon } from "@/components/Icons";

type Props = {};
const cx = classNames.bind(styles);

const AccountPage = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("account__wrapper")}></section>
                <section className={cx("content__wrapper")}>
                    <aside className={cx("content__left")}>
                        <section className={cx("content__search")}>
                            <header className={cx("content__search--header")}>
                                Search
                            </header>
                            <article className={cx("content__search--control")}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className={cx("content__search--input")}
                                />
                                <button className={cx("content__search--btn")}>
                                    <SearchIcon className={cx("content__search--icon")} />
                                </button>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Category</h3>
                                <ArrowDropdownCircleIcon
                                    className={cx("content__filter--icon")}
                                />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Category</h3>
                                <ArrowDropdownCircleIcon
                                    className={cx("content__filter--icon")}
                                />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                            </article>
                        </section>
                    </aside>
                    <article className={cx("content__right")}>
                        <nav className={cx("tab__wrapper")}>
                            <ul className={cx("tab__list")}>
                                <li className={cx("tab__item")}>Selling</li>
                                <li className={cx("tab__item")}>My assets</li>
                                <li className={cx("tab__item")}>Created</li>
                                <li className={cx("tab__item")}>Collection</li>
                                <li className={cx("tab__item")}>Following</li>
                                <li className={cx("tab__item")}>Follower</li>
                            </ul>
                        </nav>
                        <section></section>
                        <section></section>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default AccountPage;
