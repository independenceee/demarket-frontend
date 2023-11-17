"use client";

import React, { ChangeEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Collection.module.scss";
import Button from "@/components/Button";
import Image from "next/image";
import images from "@/assets/images";
import axios from "axios";
import { post } from "@/utils/httpRequest";
const cx = classNames.bind(styles);
type Props = {};

const CollectionPage = function ({}: Props) {
    const [imageBackgroundPath, setImageBackgroundPath] = useState<string>("");
    const [imageBackground, setImageBackground] = useState<File>(null!);
    const [fileNameBackground, setFileNameBackground] = useState<string>(
        "PNG, Video, Music, GIF, MP4 or MP3. Max 100mb",
    );
    const [imageItemFilePath, setImageItemFilePath] = useState<string>("");
    const [imageItemFile, setImageItemFile] = useState<File>(null!);
    const [fileNameItemFile, setFileNameItemFile] = useState<string>("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [mediaType, setMediaType] = useState<string>("Select Your Option");

    const handleChooseFile = function (className: string) {
        const fileImageElement: any = document.querySelector(className);
        fileImageElement?.click();
    };

    const handleChangeBackground = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files !== null) {
            setImageBackground(event.target.files[0]);
            setImageBackgroundPath(URL.createObjectURL(event.target.files[0]));
            setFileNameBackground(event.target.files[0].name);
        }
    };

    const handleChangeItemFile = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files !== null) {
            setImageItemFile(event.target.files[0]);
            setImageItemFilePath(URL.createObjectURL(event.target.files[0]));
            setFileNameItemFile(event.target.files[0].name);
            setMediaType(event.target.files[0].type);
        }
    };

    const handleChangeTitle = function (event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    };

    const handleChangeDescription = function (event: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    };

    const handleSubmit = async function () {
        try {
            const formData = new FormData();
            formData.append("cover", imageBackground);
            formData.append("avatar", imageItemFile);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("url", "url");
            formData.append("accountId", "67bfc8b0-ca42-49c0-9bcb-eed34d0cd357");
            // const response = await axios.post(
            //     `http://localhost:5000/api/v1/collection?destination=/images/collection`,
            //     formData,
            // );

            const response = await axios.post(
                `https://demarket-backend.vercel.app/api/v1/collection?destination=/images/collection`,
                formData,
            );

            // const response = await post(
            //     "/collection?destination=/images/collection",
            //     formData,
            // );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                <section className={cx("left")}>
                    <header className={cx("header")}>Collections</header>
                    {/* upload-background-begin */}
                    <div className={cx("upload-wrapper")}>
                        <h3 className={cx("upload-title")}>Upload backgound</h3>
                        <div
                            className={cx("upload-content")}
                            onClick={function () {
                                handleChooseFile(".file__input_background");
                            }}
                        >
                            <p className={cx("upload-type")}>{fileNameBackground}</p>
                            <input
                                type="file"
                                className="file__input_background"
                                accept="image/*"
                                hidden
                                onChange={handleChangeBackground}
                            />
                            <Button>Upload</Button>
                        </div>
                    </div>
                    {/* upload-background-end */}
                    {/* upload-item-file-begin */}
                    <div className={cx("upload-wrapper")}>
                        <h3 className={cx("upload-title")}>Upload item file</h3>
                        <div
                            className={cx("upload-content")}
                            onClick={function () {
                                handleChooseFile(".file__input_item_file");
                            }}
                        >
                            <p className={cx("upload-type")}>{fileNameItemFile}</p>
                            <input
                                type="file"
                                className="file__input_item_file"
                                accept="image/*"
                                hidden
                                onChange={handleChangeItemFile}
                            />
                            <Button>Upload</Button>
                        </div>
                    </div>
                    {/* upload-item-file-end */}
                    {/* title-begin */}
                    <div className={cx("title-wrapper")}>
                        <h3 className={cx("label")}>Title</h3>
                        <input
                            placeholder="Enter your title"
                            type="text"
                            className={cx("title-control")}
                            onChange={handleChangeTitle}
                        />
                    </div>
                    {/* title-end */}
                    {/* select-begin */}

                    {/* select-end */}
                    {/* description-begin */}
                    <div className={cx("title-wrapper")}>
                        <h3 className={cx("label")}>Description</h3>
                        <textarea
                            placeholder="Description of the NFT"
                            rows={10}
                            typeof="text"
                            className={cx("title-control")}
                            onChange={handleChangeDescription}
                        />
                    </div>
                    {/* description-end */}
                    {/* title-begin */}
                    <div className={cx("title-wrapper")}>
                        <h3 className={cx("label")}>URL</h3>
                        <input placeholder="Enter your title" type="text" className={cx("title-control")} />
                    </div>
                    {/* title-end */}
                    <div className={cx("content__wrapper-reponsive")}>
                        <div className={cx("content__container")}>
                            <Image
                                width={100}
                                height={100}
                                src={imageBackgroundPath ? imageBackgroundPath : images.noImage}
                                alt="Background"
                                className={cx("content__background")}
                            />

                            <div className={cx("content__image")}>
                                <Image
                                    width={100}
                                    height={100}
                                    className={cx("image")}
                                    src={imageItemFilePath ? imageItemFilePath : images.noImage}
                                    alt="Image"
                                />
                            </div>
                            <h3 className={cx("title")}>{title}</h3>
                            <p className={cx("description")}>{description}</p>
                        </div>
                    </div>
                    {/* button-begin */}
                    <div className={cx("button-wrapper")}>
                        <Button onClick={handleSubmit}>CREATE</Button>
                    </div>
                    {/* button-end */}
                </section>
                <section className={cx("right")}>
                    <div className={cx("content")}>
                        <div className={cx("content__wrapper")}>
                            <div className={cx("content__container")}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={imageBackgroundPath ? imageBackgroundPath : images.noImage}
                                    alt="Background"
                                    className={cx("content__background")}
                                />

                                <div className={cx("content__image")}>
                                    <Image
                                        width={100}
                                        height={100}
                                        className={cx("image")}
                                        src={imageItemFilePath ? imageItemFilePath : images.noImage}
                                        alt="Image"
                                    />
                                </div>
                                <h3 className={cx("title")}>{title}</h3>
                                <p className={cx("description")}>{description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CollectionPage;
