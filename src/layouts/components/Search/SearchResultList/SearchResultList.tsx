import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import classNames from "classnames";
import styles from "./SearchResultList.module.scss";

const cx = classNames.bind(styles);
type Props = {
    results: string[];
};
const SearchResultList = ({ results }: Props) => {
    return (
        <div className={cx("results-list")}>
            {results.map((result: any, id) => {
                return <SearchResult result={result.name} key={id} />;
            })}
        </div>
    );
};

export default SearchResultList;
