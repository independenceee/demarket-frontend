import configs from "@/configs";
import images from "@/assets/images";

declare const window: any;

const wallets = [
    {
        name: "Nami",
        image: images.namiWallet,
        connect: async function () {
            return await window.cardano.nami.enable();
        },
        checkExistWallet: async function () {
            return await window.cardano.nami;
        },
        walletDownload: configs.wallets.nami,
    },
    {
        name: "Eternl",
        image: images.eternlWallet,
        connect: async function () {
            return window.cardano.eternl.enable();
        },
        checkExistWallet: async function () {
            return await window.cardano.eternl;
        },
        walletDownload: configs.wallets.eternl,
    },
    {
        name: "Flint",
        image: images.flintWallet,
        connect: async function () {
            return await window.cardano.flint.enable();
        },
        checkExistWallet: async function () {
            return await window.cardano.flint;
        },
        walletDownload: configs.wallets.flint,
    },
    {
        name: "Gero",
        image: images.geroWallet,
        connect: async function () {
            return await window.cardano.gero.enable();
        },
        checkExistWallet: async function () {
            return await window.cardano.gero;
        },
        walletDownload: configs.wallets.gero,
    },
    {
        name: "Typhon",
        image: images.typhonWallet,
        connect: async function () {
            return await window.cardano.typhon.enable();
        },
        checkExistWallet: async function () {
            return await window.cardano.typhon;
        },
        walletDownload: configs.wallets.typhon,
    },
];

export default wallets;
