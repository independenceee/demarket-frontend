"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
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
    ArrowRightIcon,
} from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import CopyItem from "@/components/CopyItem";
import customChars from "@/helpers/convertString";
import AccountContainer from "@/components/AccountContainer";
import Modal from "@/components/Modal";
import { useModal } from "@/hooks";
import styles from "./Account.module.scss";
import images from "@/assets/images";
import { CategoryItemType } from "@/types/GenericsType";
import LucidContext from "@/contexts/components/LucidContext";
import DemarketContext from "@/contexts/components/DemarketContext";
import { LucidContextType } from "@/types/LucidContextType";
import { DemarketContextType } from "@/types/DemarketContextType";
import AccountContext from "@/contexts/components/AccountContext";
import { AccountContextType } from "@/types/AccountContextType";

type Props = {};
const cx = classNames.bind(styles);

const AccountPage = function ({}: Props) {
    const { walletItem, lucidWallet } = useContext<LucidContextType>(LucidContext);
    const { accounts, categories, currentPageAccounts, loadingAccounts, setCurrentPageAccounts, totalPagesAccounts } =
        useContext<DemarketContextType>(DemarketContext);

    const {
        account,
        loadingAccount,

        assetsFromAddress,
        setAssetsFromAddress,
        currentPageAssetsFromAddress,
        setCurrentPageAssetsFromAddress,
        totalPagesAssetsFromAddress,
        setTotalPagesAssetsFromAddress,
        loadingAssetsFromAddress,
        setLoadingAssetsFromAddress,

        createdAssetsFromAddress,
        setCreatedAssetsFromAddress,
        currentPageCreatedAssetsFromAddress,
        setCurrentPageCreatedAssetsFromAddress,
        totalPagesCreatedAssetsFromAddress,
        setTotalPagesCreatedAssetsFromAddress,
        loadingCreatedAssetsFromAddress,
        setLoadingCreatedAssetsFromAddress,

        sellingAssetsFromAddress,
        setSellingAssetsFromAddress,
        currentPageSellingAssetsFromAddress,
        setCurrentPageSellingAssetsFromAddress,
        totalPagesSellingAssetsFromAddress,
        setTotalPagesSellingAssetsFromAddress,
        loadingSellingAssetsFromAddress,
        setLoadingSellingAssetsFromAddress,

        followers,
        setFollowers,
        currentPageFollowers,
        setCurrentPageFollowers,
        loadingFollowers,
        setLoadingFollowers,
        totalPagesFollowers,
        setTotalPagesFollowers,

        followings,
        setFollowings,
        loadingFollowings,
        setLoadingFollowings,
        currentPageFollowings,
        setCurrentPageFollowings,
        totalPagesFollowings,
        setTotalPagesFollowings,
    } = useContext<AccountContextType>(AccountContext);

    const tabItems = [
        { name: "My assets", slug: "my assets" },
        { name: "Selling", slug: "selling" },
        { name: "Created", slug: "created" },
        { name: "Collection", slug: "collection" },
        { name: "Following", slug: "following" },
        { name: "Follower", slug: "follower" },
        { name: "Like", slug: "like" },
    ];
    const [activeTab, setActiveTab] = useState<string>("my assets");
    const { isShowing = true, toggle } = useModal();

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("banner__wrapper")}>
                    <Image className={cx("banner__image")} src={images.background} alt="Background" />
                </section>
                <section className={cx("avatar__wrapper")}>
                    <div className={cx("avatar__container")}>
                        <div className={cx("avatar__image--container")}>
                            <Image className={cx("avatar__image--image")} src={images.user} alt="User Avatar" />
                        </div>
                        <div></div>
                        <div className={cx("follower")}>FOLLOW</div>
                    </div>
                    <div className={cx("avatar__infomation")}>
                        <h4 className={cx("avatar__infomation--name")}>{}</h4>
                        <h4 className={cx("avatar__infomation--description")}>Slogan</h4>
                    </div>
                    <div className={cx("avatar__social")}>
                        <p>
                            <NftIcon />
                        </p>
                        <p>
                            <NftIcon />
                        </p>
                        <p>
                            <NftIcon />
                        </p>
                    </div>
                </section>

                <section className={cx("content__wrapper")}>
                    {!isShowing && (
                        <div onClick={toggle} className={cx("content__icon")}>
                            <ArrowRightIcon className={cx("icon")} />
                        </div>
                    )}

                    <Modal isShowing={isShowing} toggle={toggle}>
                        <aside className={cx("content__left--reponsive")}>
                            <section className={cx("content__search")}>
                                <h4 className={cx("content__search--header")}>Search</h4>
                                <article className={cx("content__search--control")}>
                                    <input type="text" placeholder="Search" className={cx("content__search--input")} />
                                    <button className={cx("content__search--btn")}>
                                        <SearchIcon className={cx("content__search--icon")} />
                                    </button>
                                </article>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Introduce</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <PolicyIdIcon />
                                            <span>PolicyId:</span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>
                                            {customChars({
                                                inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
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
                                                inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
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
                                        <h4 className={cx("content__filter--value")}></h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <SelledIcon className={cx("content__filter--icon")} />
                                            <span>NFTs selling:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}></h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <FollowerIcon className={cx("content__filter--icon")} />
                                            <span>Followers:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}></h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <RatingIcon className={cx("content__filter--icon")} />
                                            <span>Rating</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}></h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <CreatedAtIcon className={cx("content__filter--icon")} />
                                            <span>Joinned</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}></h4>
                                    </section>
                                </article>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Category</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    {categories.map(function (category: CategoryItemType, index: number) {
                                        return (
                                            <section key={index} className={cx("content__filter--group")}>
                                                <h4 className={cx("content__filter--name")}>{category.name}</h4>
                                                <input className={cx("content__filter--control")} type="checkbox" />
                                            </section>
                                        );
                                    })}
                                </article>
                            </section>
                        </aside>
                    </Modal>

                    <aside className={cx("content__left")}>
                        <section className={cx("content__search")}>
                            <h4 className={cx("content__search--header")}>Search</h4>
                            <article className={cx("content__search--control")}>
                                <input type="text" placeholder="Search" className={cx("content__search--input")} />
                                <button className={cx("content__search--btn")}>
                                    <SearchIcon className={cx("content__search--icon")} />
                                </button>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Introduce</h3>
                                <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <PolicyIdIcon />
                                        <span>PolicyId:</span>
                                    </h4>
                                    <p className={cx("content__filter--description")}>
                                        {customChars({
                                            inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
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
                                            inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
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
                                    <h4 className={cx("content__filter--value")}></h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <SelledIcon className={cx("content__filter--icon")} />
                                        <span>NFTs selling:</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}></h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <FollowerIcon className={cx("content__filter--icon")} />
                                        <span>Followers:</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>0</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <RatingIcon className={cx("content__filter--icon")} />
                                        <span>Rating</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>0</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <CreatedAtIcon className={cx("content__filter--icon")} />
                                        <span>Joinned</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}></h4>
                                </section>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Category</h3>
                                <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                            </header>
                            <article className={cx("content__filter--option")}>
                                {categories.map(function (category: CategoryItemType, index: number) {
                                    return (
                                        <section key={index} className={cx("content__filter--group")}>
                                            <h4 className={cx("content__filter--name")}>{category.name}</h4>
                                            <input className={cx("content__filter--control")} type="checkbox" />
                                        </section>
                                    );
                                })}
                            </article>
                        </section>
                    </aside>
                    <article className={cx("content__right")}>
                        <nav className={cx("tab__wrapper")}>
                            <ul className={cx("tab__list")}>
                                {tabItems.map(function (tab, index) {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => setActiveTab(tab.slug)}
                                            className={
                                                activeTab == tab.slug ? cx("tab__item--active") : cx("tab__item")
                                            }
                                        >
                                            {tab.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <section>
                            {activeTab === "my assets" && (
                                <NftContainer nfts={assetsFromAddress} loading={loadingAssetsFromAddress} />
                            )}
                            {activeTab === "selling" && (
                                <NftContainer nfts={sellingAssetsFromAddress} loading={loadingAssetsFromAddress} />
                            )}
                            {activeTab === "created" && (
                                <NftContainer nfts={createdAssetsFromAddress} loading={loadingAssetsFromAddress} />
                            )}
                            {activeTab === "collection" && <NftContainer nfts={assetsFromAddress} />}
                            {activeTab === "following" && (
                                <AccountContainer
                                    accounts={followings}
                                    currentPageAccounts={currentPageFollowings}
                                    totalPagesAccounts={totalPagesFollowings}
                                    loadingAccounts={loadingFollowings}
                                    setCurrentPageAccounts={setCurrentPageFollowings}
                                />
                            )}
                            {activeTab === "follower" && (
                                <AccountContainer
                                    accounts={followers}
                                    currentPageAccounts={currentPageFollowers}
                                    totalPagesAccounts={totalPagesFollowers}
                                    loadingAccounts={loadingFollowers}
                                    setCurrentPageAccounts={setCurrentPageFollowers}
                                />
                            )}
                            {activeTab === "like" && <NftContainer nfts={assetsFromAddress} />}
                        </section>
                        <section className={cx("follower__wrapper")}>
                            <header className={cx("follower__header")}>Popular Creators</header>
                            <div className={cx("follower__container")}>
                                <AccountContainer
                                    accounts={accounts}
                                    currentPageAccounts={currentPageAccounts}
                                    totalPagesAccounts={totalPagesAccounts}
                                    loadingAccounts={loadingAccounts}
                                    setCurrentPageAccounts={setCurrentPageAccounts}
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
