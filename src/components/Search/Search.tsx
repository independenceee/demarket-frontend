"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useDebounce } from "@/hooks";
import { SearchIcon } from "@/components/Icons";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);
type Props = {};

const Search = function ({}: Props) {
    const [searchValue, setSearchValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null!);
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(
        function () {
            if (!debouncedValue.trim()) {
                return;
            }

            const fetchApi = function () {
                try {
                    setLoading(true);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                }
            };

            fetchApi();
        },
        [debouncedValue],
    );

    const handleClear = function () {
        setSearchValue("");
        inputRef.current.focus();
    };

    const handleChange = function (event: ChangeEvent<HTMLInputElement>) {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearchValue(searchValue);
        }
    };

    return (
        <section className={cx("wrapper")}>
            <header className={cx("header")}>Search</header>
            <article className={cx("container")}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    spellCheck={false}
                    type="text"
                    onChange={handleChange}
                    placeholder="Search accounts and assets ..."
                />
                {!!searchValue && !loading && (
                    <button className={cx("clear")} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

                <button className={cx("search-btn")} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon />
                </button>
            </article>
        </section>
    );
};

export default Search;
