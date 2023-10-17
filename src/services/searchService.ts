import * as httpRequest from "@/utils/httpRequest";

type Props = {};

const search = async (q: string, type = "less") => {
    try {
        const res = await httpRequest.get("/search", {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export { search };
