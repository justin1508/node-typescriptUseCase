import { getRepository, Repository } from "typeorm";

import {
	ICreateSpecificationDTO,
	ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = getRepository(Specification);
	}

	async create({
		name,
		description,
	}: ICreateSpecificationDTO): Promise<Specification> {
		// const category: Category = {
		// 	name,
		// 	description,
		// 	id: uuidV4(),
		// 	created_at: new Date(),
		// };

		// const specification = new Specification();
		// category.name = name;
		// category.description = description;
		// category.created_at = new Date();

		// OR

		// Object.assign(specification, {
		// 	name,
		// 	description,
		// 	created_at: new Date(),
		// });

		// this.specifications.push(specification);

		const specification = this.repository.create({ name, description });

		await this.repository.save(specification);

		return specification;
	}

	async list(): Promise<Specification[]> {
		return this.repository.find();
	}

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOne({ name });

		return specification;
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		return this.repository.findByIds(ids);
	}
}

export { SpecificationsRepository };
