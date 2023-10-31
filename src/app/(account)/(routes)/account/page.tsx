import React from "react";
import classNames from "classnames/bind";
import {
    ArrowDropdownCircleIcon,
    CreatedAtIcon,
    FollowerIcon,
    NftIcon,
    PolicyIdIcon,
    RatingIcon,
    SearchIcon,
    SelledIcon,
    StakekeyIcon,
} from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import CopyItem from "@/components/CopyItem";
import customChars from "@/helpers/customChars";
import styles from "./Account.module.scss";
import AccountContainer from "@/components/AccountContainer";

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
                                <h3 className={cx("content__filter--title")}>
                                    Introduce
                                </h3>
                                <ArrowDropdownCircleIcon
                                    className={cx("content__filter--icon")}
                                />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <PolicyIdIcon />
                                        <span>PolicyId:</span>
                                    </h4>
                                    <p className={cx("content__filter--description")}>
                                        {customChars({
                                            inputString:
                                                "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
                                            numberOfFirstChar: 8,
                                            numberOfLastChar: -8,
                                        })}
                                    </p>
                                    <CopyItem value="123" />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <StakekeyIcon />
                                        <span>Stake key: </span>
                                    </h4>
                                    <p className={cx("content__filter--description")}>
                                        {customChars({
                                            inputString:
                                                "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
                                            numberOfFirstChar: 8,
                                            numberOfLastChar: -7,
                                        })}
                                    </p>
                                    <CopyItem value="123" />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <NftIcon />
                                        <span>NFTs: </span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <SelledIcon
                                            className={cx("content__filter--icon")}
                                        />
                                        <span>NFTs selled:</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <FollowerIcon
                                            className={cx("content__filter--icon")}
                                        />
                                        <span>Followers:</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <RatingIcon
                                            className={cx("content__filter--icon")}
                                        />
                                        <span>Rating</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <CreatedAtIcon
                                            className={cx("content__filter--icon")}
                                        />
                                        <span>Joinned</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
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
                        <section>
                            <NftContainer data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                        </section>
                        <section className={cx("follower__wrapper")}>
                            <header className={cx("follower__header")}>
                                Popular Creators
                            </header>
                            <div className={cx("follower__container")}>
                                <AccountContainer
                                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                    itemsPerPage={8}
                                />
                            </div>
                        </section>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default AccountPage;
