import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}
@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) { }

	loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const categories: IImportCategory[] = [];
			const stream = fs.createWriteStream(file.path);

			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on("data", async (line) => {
					const [name, description] = line;
					categories.push({ name, description });
				})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("errr", (err) => {
					reject(err);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const { name, description } = category;

			const existsCategory = await this.categoriesRepository.findByName(name);

			if (!existsCategory) {
				await this.categoriesRepository.create({
					name,
					description,
				});
			}
		});
	}
}

export { ImportCategoryUseCase };
