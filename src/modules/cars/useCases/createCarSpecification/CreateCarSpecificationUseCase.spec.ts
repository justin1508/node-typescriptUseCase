import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRespositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", async () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
		);
	});

	it("should not be able to add a new specification to a non-exists car", async () => {
		expect(async () => {
			const car_id = "123";
			const specifications_id = ["456"];
			await createCarSpecificationUseCase.execute({
				car_id,
				specifications_id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to add a new specification to a car", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car name",
			description: "Car description",
			daily_rate: 100,
			license_plate: "ABC-1234",
			fine_amount: 50,
			brand: "Car brand",
			category_id: "Car category_id",
		});

		const specification = await specificationsRepositoryInMemory.create({
			name: "test",
			description: "test",
		});

		const specifications_id = [specification.id];

		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id,
		});

		expect(specificationsCars).toHaveProperty("specifications");
		expect(specificationsCars.specifications.length).toBe(1);
	});
});
