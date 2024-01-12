"use client";

import React, { useState, ChangeEvent, memo, useCallback, useEffect } from "react";
import classNames from "classnames/bind";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";
import { useQueryState } from "nuqs";
import { QueryParamsType } from "@/types/GenericsType";
import styles from "./Verify.module.scss";

const cx = classNames.bind(styles);

type Props = {
    verifySearchParam: string;
    setVerifySearchParam: React.Dispatch<React.SetStateAction<string>>;
};

const Verify = function ({ verifySearchParam, setVerifySearchParam }: Props): React.JSX.Element {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [openVerify, setOpenVerify] = useState<boolean>(true);
    const [verifyQuery, setVerifyQuery] = useQueryState<QueryParamsType>("verify", {
        defaultValue: { verify: verifySearchParam },
        parse: (query) => JSON.parse(query) as QueryParamsType,
    });
    const handleOpenVerify = function () {
        setOpenVerify(!openVerify);
    };

    const handleChangeVerify = useCallback(function (event: ChangeEvent<HTMLInputElement>) {
        setVerifySearchParam(event.target.value);
        setVerifyQuery({ verify: event.target.value } as QueryParamsType);
    }, []);

    useEffect(() => {
        const { verify } = verifyQuery;
        setVerifySearchParam(verify as string);
    }, [verifyQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("verify", verifySearchParam);
        router.replace(pathname + "?" + params.toString(), { scroll: false });
    }, [verifyQuery, router]);

    return (
        <section className={cx("content__filter")}>
            <header className={cx("content__filter--header")} onClick={handleOpenVerify}>
                <h3 className={cx("content__filter--title")}>Verify</h3>
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
                        <input name="verify" value={"true"} className={cx("content__filter--control")} onChange={handleChangeVerify} type="radio" />
                    </section>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>No</h4>
                        <input name="verify" value={"false"} className={cx("content__filter--control")} onChange={handleChangeVerify} type="radio" />
                    </section>
                </form>
            )}
        </section>
    );
};

export default memo(Verify);
