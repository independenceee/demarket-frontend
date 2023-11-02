import * as cbor from "cbor-x";
import { SpendingValidator, fromHex, toHex } from "lucid-cardano";
import demarketValidator from "@/libs";

const readValidator = async function (): Promise<SpendingValidator> {
    const validator = demarketValidator[0];
    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
};

export default readValidator;
