import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
		);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			driver_license: "121312",
			email: "user@token.com",
			password: "password",
			name: "user",
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token");
	});

	it("should not be able to authenticate a nonexistent user", async () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "user.email@fake.com",
				password: "password",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate with incorrect password", async () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				driver_license: "121312",
				email: "user@token.com",
				password: "password",
				name: "user",
			};

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: "user.password",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
