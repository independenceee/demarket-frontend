import React, { MouseEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import styles from "./SearchFeild.module.scss";
import routes from "@/configs/routes";

const cx = classNames.bind(styles);

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
};
const SearchFeild = ({ setResults }: Props) => {
    const router = useRouter();
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

    const handleSubmit = function () {
        router.push(routes.marketplace + "?search=" + input);
    };

    return (
        <div className={cx("input-wrapper")}>
            <button onClick={handleSubmit} className={cx("search-icon")}>
                <FaSearch className={cx("search-icon")} />
            </button>
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default SearchFeild;
