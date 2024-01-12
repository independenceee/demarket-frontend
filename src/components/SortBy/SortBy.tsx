"use client";

import React, { useState, useEffect, ChangeEvent, memo, useCallback } from "react";
import classNames from "classnames/bind";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";
import sortbys from "@/constants/sortbys";
import { QueryParamsType } from "@/types/GenericsType";

import styles from "./SortBy.module.scss";

const cx = classNames.bind(styles);

type Props = {
    sortBySearchParam: string;
    setSortBySearchParam: React.Dispatch<React.SetStateAction<string>>;
};

const SortBy = function ({ sortBySearchParam, setSortBySearchParam }: Props): React.JSX.Element {
    const router = useRouter();
    const pathname: string = usePathname();
    const searchParams = useSearchParams();

    const [openSortBy, setOpenSortBy] = useState<boolean>(true);
    const [sortByQuery, setSortByQuery] = useQueryState<QueryParamsType>("sortby", {
        defaultValue: { sortby: sortBySearchParam },
        parse: (query) => JSON.parse(query) as QueryParamsType,
    });
    const handleOpenSortBy = function () {
        setOpenSortBy(!openSortBy);
    };

    const handleChangeSortBy = useCallback(function (event: ChangeEvent<HTMLInputElement>) {
        setSortBySearchParam(event.target.value);
        setSortByQuery({ sortby: event.target.value } as QueryParamsType);
    }, []);

    useEffect(() => {
        const { sortby } = sortByQuery;
        setSortBySearchParam(sortby as string);
    }, [sortByQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("sortby", sortBySearchParam);
        router.replace(pathname + "?" + params.toString(), { scroll: false });
    }, [sortByQuery, router]);

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
                    {sortbys.map(function (sortby, index: number) {
                        return (
                            <section key={index} className={cx("content__filter--group")}>
                                <h4 className={cx("content__filter--name")}>{sortby.displayName}</h4>
                                <input
                                    name={sortby.name}
                                    checked={sortby.value === sortByQuery.sortby}
                                    value={sortby.value}
                                    className={cx("content__filter--control")}
                                    onChange={handleChangeSortBy}
                                    type={sortby.type}
                                />
                            </section>
                        );
                    })}
                </form>
            )}
        </section>
    );
};

export default memo(SortBy);
