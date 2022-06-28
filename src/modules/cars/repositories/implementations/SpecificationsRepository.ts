import { Specification } from "../../model/Specification";
import {
	ISpecificationsRepository,
	ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
	private specifications: Specification[];

	constructor() {
		this.specifications = [];
	}

	create({ name, description }: ICreateSpecificationDTO): void {
		// const category: Category = {
		// 	name,
		// 	description,
		// 	id: uuidV4(),
		// 	created_at: new Date(),
		// };

		const specification = new Specification();
		// category.name = name;
		// category.description = description;
		// category.created_at = new Date();

		// OR

		Object.assign(specification, {
			name,
			description,
			created_at: new Date(),
		});

		this.specifications.push(specification);
	}

	list(): Specification[] {
		return this.specifications;
	}

	findByName(name: string): Specification {
		const specification = this.specifications.find(
			(specification) => specification.name === name
		);

		return specification;
	}
}

export { SpecificationsRepository };
