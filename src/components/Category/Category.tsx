"use client";

import React, { ChangeEvent, useContext, useState } from "react";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CategoryItemType } from "@/types/GenericsType";
import { DemarketContextType } from "@/types/DemarketContextType";
import DemarketContext from "@/contexts/components/DemarketContext";
import styles from "./Category.module.scss";

const cx = classNames.bind(styles);

type Props = {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Category = function ({ setSelectedCategory }: Props) {
    const { categories, loadingCategories } = useContext<DemarketContextType>(DemarketContext);
    const [openCategory, setOpenCategory] = useState<boolean>(true);

    const handleChangeCategory = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setSelectedCategory(event.target.value);
    };

    const handleOpenCategory = function () {
        setOpenCategory(!openCategory);
    };
    return (
        <section className={cx("content__filter")}>
            <header className={cx("content__filter--header")} onClick={handleOpenCategory}>
                <h3 className={cx("content__filter--title")}>Category</h3>
                {!openCategory ? (
                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                ) : (
                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                )}
            </header>

            {openCategory && (
                <article className={cx("content__filter--option")}>
                    {loadingCategories
                        ? new Array(5).fill(null).map(function (category: any, index) {
                              return (
                                  <section key={index} className={cx("content__filter--group")}>
                                      <SkeletonTheme highlightColor="#7000ff" />
                                      <Skeleton width={150} height={20} />
                                      <Skeleton width={40} height={20} />
                                  </section>
                              );
                          })
                        : categories.slice(0, 5).map(function (category: CategoryItemType, index: number) {
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
            )}
        </section>
    );
};

export default Category;
