"use client";

import React, { useEffect, useState } from "react";
import styles from "./MetedataContainer.module.scss";
import classNames from "classnames/bind";
import { post } from "@/utils/httpRequest";

type Props = {
    policyId: string;
    assetName: string;
};

const cx = classNames.bind(styles);

const MetadataContainer = function ({ policyId, assetName }: Props) {
    const [metadata, setMetadata] = useState<any>();

    useEffect(() => {
        const fetchMetadataFromPolicyIdAndAssetName = async function () {
            const metadata = await post("/blockfrost/assets/information", {
                policyId: policyId,
                assetName: assetName,
            });
            setMetadata(metadata.onchain_metadata);
        };

        fetchMetadataFromPolicyIdAndAssetName();
    }, [policyId, assetName]);

    if (metadata) {
        return (
            <div className={cx("wrapper")}>
                {Object.entries(metadata).map(([key, value]: any) => (
                    <div key={key} className={cx("container")}>
                        <div className={cx("key")}>{key}</div> <div className={cx("value")}>{value}</div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default MetadataContainer;
