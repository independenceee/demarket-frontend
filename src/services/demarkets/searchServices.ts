import * as httpRequest from "@/utils/http-request";

type Props = {};

const searchServices = async (q: string, type = "less") => {
    try {
        const response = await httpRequest.get("/search", {
            params: { q, type },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default searchServices;
