"use client";

import React, { ChangeEvent, useContext, useState, useCallback, memo, useEffect } from "react";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CategoryItemType } from "@/types/GenericsType";
import { DemarketContextType } from "@/types/DemarketContextType";
import DemarketContext from "@/contexts/components/DemarketContext";
import styles from "./Category.module.scss";
import { QueryParamsType } from "@/types/GenericsType";
import { useQueryState } from "nuqs";

const cx = classNames.bind(styles);

type Props = {
    categorySearchParam: string;
    setCategorySearchParam: React.Dispatch<React.SetStateAction<string>>;
};

const Category = function ({ categorySearchParam, setCategorySearchParam }: Props) {
    const router = useRouter();
    const pathname: string = usePathname();
    const searchParams = useSearchParams();
    const { categories, loadingCategories } = useContext<DemarketContextType>(DemarketContext);
    const [openCategory, setOpenCategory] = useState<boolean>(true);
    const [categoryQuery, setCategoryQuery] = useQueryState<QueryParamsType>("category", {
        defaultValue: { category: "all" },
        parse: (query) => JSON.parse(query) as QueryParamsType,
    });

    const handleOpenCategory = function () {
        setOpenCategory(!openCategory);
    };

    const handleChangeCategory = useCallback(function (event: ChangeEvent<HTMLInputElement>) {
        setCategorySearchParam(event.target.value);
        setCategoryQuery({ sortby: event.target.value } as QueryParamsType);
    }, []);

    useEffect(() => {
        const { category } = categoryQuery;
        setCategorySearchParam(category as string);
    }, [categoryQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("category", categorySearchParam);
        router.replace(pathname + "?" + params.toString(), { scroll: false });
    }, [categoryQuery, router]);
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

export default memo(Category);
