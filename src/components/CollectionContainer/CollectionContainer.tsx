import React, { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CollectionContainer.module.scss";
import { CollectionItemType } from "@/types/GenericsType";
import { Pagination, Stack } from "@mui/material";
import CollectionItem from "@/components/CollectionContainer/CollectionItem";

const cx = classNames.bind(styles);
type Props = {
    collections: Array<CollectionItemType | any>;
    itemsPerPage?: number;
    loading?: boolean;
};
const CollectionContainer = function ({ collections, itemsPerPage = 12, loading }: Props) {
    const [currentItems, setCurrentItems] = useState<any>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(collections?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(collections?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, collections]);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        const newOffset = (value - 1) * itemsPerPage;
        setItemOffset(newOffset);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {loading
                    ? new Array(itemsPerPage).fill(null).map(function (value: any, index: number) {
                          return null;
                      })
                    : collections.map(function (collection: CollectionItemType, index: number) {
                          return <CollectionItem collection={collection} index={index} key={index} />;
                      })}
            </div>
            {!loading && collections.length !== 0 ? (
                <Stack spacing={2}>
                    <Pagination count={pageCount} page={Math.ceil(itemOffset / itemsPerPage) + 1} onChange={handlePageChange} shape="rounded" />
                </Stack>
            ) : null}
        </div>
    );
};

export default CollectionContainer;
