"use client";

import React, { ChangeEvent, useContext, useState } from "react";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";

import { CategoryItemType } from "@/types/GenericsType";
import { DemarketContextType } from "@/types/DemarketContextType";
import DemarketContext from "@/contexts/components/DemarketContext";
import styles from "./Category.module.scss";

const cx = classNames.bind(styles);

type Props = {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Category = function ({ setSelectedCategory }: Props) {
    const { categories } = useContext<DemarketContextType>(DemarketContext);
    const [openCategory, setOpenCategory] = useState<boolean>(false);

    const handleChangeCategory = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setSelectedCategory(event.target.value);
    };
    return (
        <section className={cx("content__filter")} onClick={() => setOpenCategory(!openCategory)}>
            <header className={cx("content__filter--header")}>
                <h3 className={cx("content__filter--title")}>Category</h3>
                {!openCategory ? (
                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                ) : (
                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                )}
            </header>

            <article className={cx("content__filter--option")}>
                {categories.slice(0, 5).map(function (category: CategoryItemType, index: number) {
                    return (
                        <section key={index} className={cx("content__filter--group")}>
                            <h4 className={cx("content__filter--name")}>{category.name}</h4>
                            <input
                                value={category.slug}
                                className={cx("content__filter--control")}
                                type="radio"
                                name="category"
                                onChange={handleChangeCategory}
                            />
                        </section>
                    );
                })}
            </article>
        </section>
    );
};

export default Category;
