"use client";

import React, { ChangeEvent, useEffect, useRef, useState, useCallback, memo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { QueryParamsType } from "@/types/GenericsType";
import { useDebounce } from "@/hooks";
import { SearchIcon } from "@/components/Icons";
import styles from "./Search.module.scss";
import { useQueryState } from "nuqs";

const cx = classNames.bind(styles);
type Props = {
    searchValueParam: string;
    setSearchValueParam: React.Dispatch<React.SetStateAction<string>>;
};

const Search = function ({ searchValueParam, setSearchValueParam }: Props) {
    const router = useRouter();
    const pathname: string = usePathname();
    const searchParams = useSearchParams();

    const [searchValueQuery, setSearchValueQuery] = useQueryState<QueryParamsType>("search", {
        defaultValue: { search: searchValueParam as string },
        parse: (query) => JSON.parse(query) as QueryParamsType,
    });

    const [loading, setLoading] = useState<boolean>(false);
    const debouncedValue = useDebounce(searchValueParam, 500);
    const inputRef = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            return;
        }
        const handleSearchData = function () {
            try {
                setLoading(true);
            } catch (error) {
                setLoading(false);
            }
        };

        handleSearchData();
    }, [debouncedValue]);

    const handleClear = function () {
        setSearchValueParam("");
        inputRef.current.focus();
    };

    const handleChange = useCallback(function (event: ChangeEvent<HTMLInputElement>) {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearchValueParam(searchValue);
            setSearchValueQuery({ search: searchValue } as QueryParamsType);
        }
    }, []);

    useEffect(() => {
        if (searchValueQuery) {
            const { search } = searchValueQuery;
            setSearchValueParam(search as string);
        }
    }, [searchValueQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("search", searchValueParam);
        router.replace(pathname + "?" + params.toString(), { scroll: false });
    }, [router, searchValueQuery]);

    return (
        <section className={cx("wrapper")}>
            <header className={cx("header")}>Search</header>
            <article className={cx("container")}>
                <input
                    ref={inputRef}
                    value={searchValueParam}
                    spellCheck={false}
                    type="text"
                    onChange={handleChange}
                    placeholder="Search accounts and assets ..."
                />
                {!!searchValueParam && !loading && (
                    <button className={cx("clear")} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

                <button className={cx("search-btn")} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon className={"search-icon"} width="2rem" height="2rem" />
                </button>
            </article>
        </section>
    );
};

export default Search;
