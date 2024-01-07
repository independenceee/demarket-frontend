"use client";

import React, { ChangeEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Collection.module.scss";

const cx = classNames.bind(styles);
type Props = {};

const CollectionCreatePage = function ({}: Props) {
    const [loadingCreateCollection, setLoadingCreateCollection] = useState<boolean>(false);

    const handleCreateCollection = async function () {
        setLoadingCreateCollection(true);
        try {
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCreateCollection(false);
        }
    };

    return <></>;
};

export default CollectionCreatePage;
