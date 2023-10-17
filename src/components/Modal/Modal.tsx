import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);
type Props = {
    children: ReactNode;
    isShowing: boolean;
    toggle: () => void;
};

const Modal = function ({ isShowing, toggle, children }: Props) {
    if (isShowing) {
        return (
            <main className={cx("wrapper")}>
                <div className={cx("modal")} onClick={toggle}></div>
                {children}
            </main>
        );
    }

    return null;
};

export default Modal;
