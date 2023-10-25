import React from "react";
import { BsTrashFill as TrashIcon } from "react-icons/bs";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { BsChevronDown as DownIcon } from "react-icons/bs";
import { AiFillHeart as HeartIcon } from "react-icons/ai";
import { LuSendHorizonal as HorizonalIcon } from "react-icons/lu";
import { FaXTwitter as TwitterIcon } from "react-icons/fa6";
import { BiLogoLinkedin as LinkedinIcon } from "react-icons/bi";
import { BsYoutube as YoutubeIcon } from "react-icons/bs";
import { FaTelegramPlane as TelegramIcon } from "react-icons/fa";

type Props = {
    width?: string;
    height?: string;
    className?: any;
};

const SearchIcon = function ({ width = "2.4rem", height = "2.4rem", className }: Props) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
            ></path>
        </svg>
    );
};

const CopyIcon = function ({ width = "2.4rem", height = "2.4rem", className }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
        >
            <path
                d="M5.08271 0.857422H12.0014C13.3219 2.37309 14.6427 3.88805 15.9638 5.40229C15.9852 5.42657 15.9999 5.44121 15.9999 5.47693C16.0001 8.40636 16 11.3358 15.9995 14.2652C15.9995 14.5945 15.9843 14.8316 15.9538 14.9766C15.7649 15.8795 15.041 16.5816 14.1671 16.7998C13.8603 16.8766 13.4967 16.8594 13.1635 16.8562C13.1591 16.8562 13.1549 16.8579 13.1517 16.8609C13.1485 16.8639 13.1466 16.868 13.1464 16.8723C13.0746 18.0858 12.1296 19.0672 10.9086 19.1426H2.23029C1.18568 19.0826 0.268206 18.2948 0.0485699 17.2737C0.016428 17.1254 0.00035714 16.8925 0.00035714 16.5752C0.00035714 12.961 0.000238088 9.34681 0 5.73263C0 5.4136 0.0151185 5.17658 0.0453557 5.02158C0.219636 4.12804 0.931401 3.3552 1.84923 3.19271C2.12387 3.14378 2.50671 3.15378 2.83134 3.14343C2.84468 3.14319 2.85182 3.13628 2.85277 3.12271C2.93527 1.91525 3.86346 0.935277 5.08271 0.857422ZM4.05309 14.8716C4.21059 15.3702 4.67093 15.7113 5.19663 15.7116C7.98583 15.7135 10.775 15.7142 13.5642 15.7138C14.1446 15.7134 14.6378 15.4309 14.8049 14.862C14.8399 14.7437 14.8574 14.5542 14.8574 14.2935C14.8572 11.7233 14.8571 9.1561 14.8571 6.59189C14.8571 6.5864 14.8549 6.58113 14.851 6.57725C14.8471 6.57336 14.8418 6.57118 14.8363 6.57118C14.3745 6.57213 13.912 6.57213 13.4489 6.57118C13.1184 6.57023 12.8812 6.55547 12.7371 6.5269C11.6704 6.31333 10.8575 5.33943 10.8575 4.25018C10.8573 3.50401 10.8572 2.76082 10.8572 2.0206C10.8572 2.0152 10.855 2.01002 10.8512 2.00621C10.8474 2.00239 10.8422 2.00024 10.8368 2.00024C9.02425 2.00001 7.21098 2.00013 5.39698 2.0006C5.14104 2.00084 4.95711 2.01822 4.84521 2.05274C4.46594 2.1706 4.15309 2.48737 4.04559 2.86915C4.01559 2.97653 4.00048 3.17223 4.00024 3.45627C4 7.08164 4.00012 10.7069 4.0006 14.332C4.0006 14.5806 4.01809 14.7605 4.05309 14.8716ZM14.836 5.40336L12.0164 2.03739C12.0152 2.03591 12.0135 2.03485 12.0117 2.03435C12.0098 2.03385 12.0079 2.03394 12.0061 2.03461C12.0043 2.03527 12.0027 2.03648 12.0016 2.03807C12.0005 2.03965 12 2.04154 12 2.04346C12 2.50963 12 2.97724 12 3.44627C11.9998 3.70484 12.0156 3.90626 12.0475 4.05054C12.1479 4.50553 12.4953 5.25836 12.9946 5.403C13.0541 5.42014 13.1478 5.42871 13.2757 5.42871C13.7988 5.42871 14.3149 5.42871 14.8242 5.42871C14.8461 5.42871 14.85 5.42026 14.836 5.40336ZM1.19604 17.1573C1.35353 17.6558 1.81387 17.9966 2.33957 17.9973C5.09449 17.9992 7.84941 17.9999 10.6043 17.9994C10.8565 17.9994 11.0396 17.982 11.1536 17.9473C11.6207 17.8048 11.9729 17.3684 11.9971 16.873C11.9972 16.871 11.9969 16.869 11.9962 16.8671C11.9955 16.8652 11.9943 16.8634 11.9929 16.862C11.9915 16.8605 11.9897 16.8593 11.9878 16.8585C11.9859 16.8577 11.9839 16.8573 11.9818 16.8573C9.80685 16.8568 7.63442 16.8568 5.46448 16.8573C5.14187 16.8575 4.90485 16.8423 4.75343 16.8116C3.84239 16.6266 3.09419 15.8816 2.9042 14.9695C2.87277 14.8178 2.85706 14.5809 2.85706 14.2588C2.85777 10.9422 2.85777 7.62555 2.85706 4.30875C2.85706 4.29613 2.85063 4.2897 2.83777 4.28946C2.61921 4.28756 2.401 4.2953 2.18315 4.31268C1.70031 4.35089 1.3246 4.67481 1.19496 5.12872C1.16044 5.24967 1.14318 5.43943 1.14318 5.69799C1.14294 9.33812 1.14306 12.978 1.14354 16.6177C1.14354 16.8662 1.16104 17.0461 1.19604 17.1573Z"
                fill="#7C3AED"
                fill-opacity="0.75"
            />
            <path
                d="M12.0077 8.86719H6.84931C6.54043 8.86719 6.29004 9.11758 6.29004 9.42646V9.44788C6.29004 9.75676 6.54043 10.0072 6.84931 10.0072H12.0077C12.3166 10.0072 12.567 9.75676 12.567 9.44788V9.42646C12.567 9.11758 12.3166 8.86719 12.0077 8.86719Z"
                fill="#7C3AED"
                fill-opacity="0.75"
            />
            <path
                d="M12.008 11.7246H6.85028C6.54141 11.7246 6.29102 11.975 6.29102 12.2839V12.3053C6.29102 12.6142 6.54141 12.8646 6.85028 12.8646H12.008C12.3169 12.8646 12.5673 12.6142 12.5673 12.3053V12.2839C12.5673 11.975 12.3169 11.7246 12.008 11.7246Z"
                fill="#7C3AED"
                fill-opacity="0.75"
            />
        </svg>
    );
};

export {
    CopyIcon,
    SearchIcon,
    CloseIcon,
    TrashIcon,
    AddIcon,
    DownIcon,
    HeartIcon,
    HorizonalIcon,
    TwitterIcon,
    LinkedinIcon,
    YoutubeIcon,
    TelegramIcon,
};
