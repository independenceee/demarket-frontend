import axios from "axios";

type Props = {
    image: File;
};

const ipfsPinata = async function ({ image }: Props): Promise<string> {
    try {
        const formData: FormData = new FormData();
        formData.append("file", image);
        const metadata: string = JSON.stringify({ name: "fileName" });
        formData.append("pinataMetadata", metadata);
        const option: string = JSON.stringify({ cidVersion: 0 });
        formData.append("pinataOptions", option);

        const { data } = await axios.post(process.env.PINATA_RPC_URL!, formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData}`,
                Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
            },
        });
        return "ipfs://" + data.IpfsHash;
    } catch (error) {
        return "";
    }
};

export default ipfsPinata;
