import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
	ICreateSpecificationDTO,
	ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
	specifications: Specification[] = [];

	async findByName(name: string): Promise<Specification> {
		return this.specifications.find(
			(specifiction) => specifiction.name === name
		);
	}

	list(): Promise<Specification[]> {
		throw new Error("Method not implemented.");
	}

	async create({
		name,
		description,
	}: ICreateSpecificationDTO): Promise<Specification> {
		const specification = new Specification();

		Object.assign(specification, {
			description,
			name,
		});
		this.specifications.push(specification);

		return specification;
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		return this.specifications.filter((specification) =>
			ids.includes(specification.id)
		);
	}
}

export { SpecificationsRepositoryInMemory };
