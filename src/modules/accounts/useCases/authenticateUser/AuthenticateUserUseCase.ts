import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UserRepository")
		private usersRepository: IUsersRepository
	) { }

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Email or password incorrect");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError("Email or password incorrect");
		}

		const token = sign({}, "battlefiled", {
			subject: user.id,
			expiresIn: "1d",
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };
