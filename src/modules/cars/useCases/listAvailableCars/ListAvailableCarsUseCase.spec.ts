import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(
			carsRepositoryInMemory
		);
	});

	it("should be able to list all available cars", async () => {
		await carsRepositoryInMemory.create({
			name: "Car1",
			description: "Car description",
			daily_rate: 100,
			license_plate: "ASD-4565",
			fine_amount: 40,
			brand: "brand_Car",
			category_id: "category_id",
		});

		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toEqual([cars]);
	});

	it("should be able to list all available cars by brand", async () => {
		await carsRepositoryInMemory.create({
			name: "Car1",
			description: "Car description",
			daily_rate: 100,
			license_plate: "ASD-4565",
			fine_amount: 40,
			brand: "brand_Car_teste",
			category_id: "category_id",
		});

		const cars = await listAvailableCarsUseCase.execute({
			brand: "brand_Car_teste",
		});

		expect(cars).toEqual([cars]);
	});

	it("should be able to list all available cars by name", async () => {
		await carsRepositoryInMemory.create({
			name: "Car3",
			description: "Car description",
			daily_rate: 100,
			license_plate: "ASD-4595",
			fine_amount: 40,
			brand: "brand_Car_teste",
			category_id: "category_id",
		});

		const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });

		expect(cars).toEqual([cars]);
	});

	it("should be able to list all available cars by category", async () => {
		await carsRepositoryInMemory.create({
			name: "Car3",
			description: "Car description",
			daily_rate: 100,
			license_plate: "ASD-4595",
			fine_amount: 40,
			brand: "brand_Car_teste",
			category_id: "12345",
		});

		const cars = await listAvailableCarsUseCase.execute({
			category_id: "12345",
		});

		expect(cars).toEqual([cars]);
	});
});
