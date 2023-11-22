import { Blockfrost, Lucid } from "lucid-cardano";

const lucidService = async function (): Promise<Lucid> {
    const lucid = await Lucid.new(
        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodMLN0qpW8GZENdqNe4ot6pwRLku7hXAF6"),
        "Preprod",
    );

    return lucid;
};

export default lucidService;
