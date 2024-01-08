import { Blockfrost, Lucid } from "lucid-cardano";

const lucidService = async function (): Promise<Lucid> {
    const lucid = await Lucid.new(
        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodQfe5parraxgP3k0IqDnrptIvZVBejjsS"),
        "Preprod",
    );

    return lucid;
};

export default lucidService;
