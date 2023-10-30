"use client";

import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

type Props = {};
const Aos = function ({}: Props) {
    useEffect(function () {
        AOS.init({
            duration: 1000,
            offset: 250,
            easing: "ease-out-cubic",
            once: true,
            // delay: 400,
        });
    }, []);
    return null;
};

export default Aos;
