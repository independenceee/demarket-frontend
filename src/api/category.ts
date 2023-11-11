import { get } from "@/utils/httpRequest";
import { Category } from "@/types";

class CategoryApi {
    async getAllCategories(): Promise<Category[]> {
        try {
            const categories: Category[] = await get("/category", {});
            return categories;
        } catch (error) {
            console.log(error);
        }
        return [];
    }
}

export default new CategoryApi();
