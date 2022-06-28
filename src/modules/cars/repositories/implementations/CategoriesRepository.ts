import { Category } from "../../model/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
	private categories: Category[];

	private static INSTANCE: CategoriesRepository;

	private constructor() {
		this.categories = [];
	}

	public static getInstance(): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository();
		}
		return CategoriesRepository.INSTANCE;
	}

	create({ name, description }: ICreateCategoryDTO): void {
		// const category: Category = {
		// 	name,
		// 	description,
		// 	id: uuidV4(),
		// 	created_at: new Date(),
		// };

		const category = new Category();
		// category.name = name;
		// category.description = description;
		// category.created_at = new Date();

		// OR

		Object.assign(category, {
			name,
			description,
			created_at: new Date(),
		});

		this.categories.push(category);
	}

	list(): Category[] {
		return this.categories;
	}

	findByName(name: string): Category {
		const category = this.categories.find((category) => category.name === name);

		return category;
	}
}

export { CategoriesRepository };
