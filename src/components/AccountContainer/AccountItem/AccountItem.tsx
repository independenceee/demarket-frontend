"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import { AccountItemType } from "@/types/GenericsType";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

type Props = {
    account: AccountItemType;
    index: number;
    isFollow?: boolean;
};

const AccountItem = function ({ account, index, isFollow = false }: Props) {
    const router = useRouter();
    const [follow, setFollow] = useState<boolean>(isFollow);

    const { followAccount, unFollowAccount, account: accountConnect } = useContext<AccountContextType>(AccountContext);

    useEffect(() => {
        if (!accountConnect) {
            setFollow(false);
        }
    }, []);

    const handleFollowAccount = async function () {
        try {
            if (accountConnect) {
                await followAccount({ accountId: accountConnect.id, accountIdFollow: account.id });
                setFollow(!follow);
                toast.success("Follow account successfully");
            } else {
                setFollow(false);
                toast.warn("You can login account");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnfollowAccount = async function () {
        try {
            if (accountConnect) {
                await unFollowAccount({ accountId: accountConnect.id, accountIdUnFollow: account.id });
                setFollow(!follow);
                toast.success("Follow account successfully");
            } else {
                setFollow(false);
                toast.warn("You can login account");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
            onClick={() => router.push(`/account/${account.walletAddress}`)}
        >
            <div className={cx("container")}>
                <header className={cx("header")}>
                    <div className={cx("background__wrapper")}>
                        <Image className={cx("background__image")} src={account.cover || images.noImage} alt="Backgound Image" />
                    </div>
                    <div className={cx("avatar__wrapper")}>
                        <Image className={cx("avatar__image")} src={account.avatar || images.user} alt="User Image" />
                    </div>
                </header>
                <section className={cx("content")}>
                    <div className={cx("content__left")}>
                        <h3 className={cx("content__left--name")}>{account.userName}</h3>
                        <p className={cx("content__left--amount")}>{account.rating}</p>
                    </div>
                    <div className={cx("content_right")}>
                        {!follow ? (
                            <button onClick={handleFollowAccount} className={cx("content_right--button")}>
                                Follow
                            </button>
                        ) : (
                            <button onClick={handleUnfollowAccount} className={cx("content_right--button")}>
                                Unfollow
                            </button>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AccountItem;
