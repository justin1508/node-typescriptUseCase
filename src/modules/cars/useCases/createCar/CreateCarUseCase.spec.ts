import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it("should be able to create a new car", async () => {
		const car = await createCarUseCase.execute({
			name: "Car name",
			description: "Car description",
			daily_rate: 100,
			license_plate: "ABC-1234",
			fine_amount: 50,
			brand: "Car brand",
			category_id: "Car category_id",
		});

		expect(car).toHaveProperty("id");
	});

	it("should not be able to create a car with exists license plate", async () => {
		expect(async () => {
			await createCarUseCase.execute({
				name: "Car1",
				description: "Car description",
				daily_rate: 100,
				license_plate: "ABC-1234",
				fine_amount: 50,
				brand: "Car brand",
				category_id: "Car category_id",
			});

			await createCarUseCase.execute({
				name: "Car2",
				description: "Car description",
				daily_rate: 100,
				license_plate: "ABC-1234",
				fine_amount: 50,
				brand: "Car brand",
				category_id: "Car category_id",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a car with available tru by default", async () => {
		const car = await createCarUseCase.execute({
			name: "Car Available",
			description: "Car description",
			daily_rate: 100,
			license_plate: "ABCD-1234",
			fine_amount: 50,
			brand: "Car brand",
			category_id: "Car category_id",
		});

		expect(car.available).toBe(true);
	});
});
