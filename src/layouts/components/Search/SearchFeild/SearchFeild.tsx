import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import classNames from "classnames/bind";
import styles from "./SearchFeild.module.scss";

const cx = classNames.bind(styles);

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
};
const SearchFeild = ({ setResults }: Props) => {
    const [input, setInput] = useState("");

    const fetchData = (value: any) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user: any) => {
                    return value && user && user.name && user.name.toLowerCase().includes(value);
                });
                setResults(results);
            });
    };

    const handleChange = (value: any) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className={cx("input-wrapper")}>
            <FaSearch className={cx("search-icon")} />
            <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)} />
        </div>
    );
};

export default SearchFeild;
