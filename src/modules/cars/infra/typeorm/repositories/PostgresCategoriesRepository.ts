import { Category } from "../entities/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
	findByName(name: string): Category {
		return null;
	}
	list(): Category[] {
		return null;
	}
	create({ name, description }: ICreateCategoryDTO): void {
		console.log("1");
	}
}

export { PostgresCategoriesRepository };
