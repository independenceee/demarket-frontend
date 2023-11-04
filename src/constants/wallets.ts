import configs from "@/configs";
import images from "@/assets/images";
import { WalletType } from "@/types";

declare const window: any;

const wallets: Array<WalletType> = [
    {
        name: "Nami",
        image: images.namiWallet,
        api: async function () {
            return await window.cardano.nami.enable();
        },
        checkApi: async function () {
            return await window.cardano.nami;
        },
        downloadApi: configs.wallets.nami,
    },
    {
        name: "Eternl",
        image: images.eternlWallet,
        api: async function () {
            return window.cardano.eternl.enable();
        },
        checkApi: async function () {
            return await window.cardano.eternl;
        },
        downloadApi: configs.wallets.eternl,
    },
    {
        name: "Flint",
        image: images.flintWallet,
        api: async function () {
            return await window.cardano.flint.enable();
        },
        checkApi: async function () {
            return await window.cardano.flint;
        },
        downloadApi: configs.wallets.flint,
    },
    {
        name: "Gero",
        image: images.geroWallet,
        api: async function () {
            return await window.cardano.gero.enable();
        },
        checkApi: async function () {
            return await window.cardano.gero;
        },
        downloadApi: configs.wallets.gero,
    },
    {
        name: "Typhon",
        image: images.typhonWallet,
        api: async function () {
            return await window.cardano.typhon.enable();
        },
        checkApi: async function () {
            return await window.cardano.typhon;
        },
        downloadApi: configs.wallets.typhon,
    },
    {
        name: "Vespr",
        image: images.vesprWallet,
        api: async function () {
            return await window.cardano.vespr.enable();
        },
        checkApi: async function () {
            return await window.cardano.vespr;
        },
        downloadApi: configs.wallets.vespr,
    },
];

export default wallets;
