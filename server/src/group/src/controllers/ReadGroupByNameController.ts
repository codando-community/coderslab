import { Request, Response } from "express";

import { Group } from "../model/Group";

class ReadGroupByNameController {
	async handle(request: Request, response: Response) {
		const {
			name
		} = request.params;

		const readGroup = new Group();

		try {
			const group = readGroup.readByName({
				name
			});

			response.status(group.status).json({message: group.message, group: group.data});
		} catch(err) {
			response.status(404);
		}
	}
}

export { ReadGroupByNameController };