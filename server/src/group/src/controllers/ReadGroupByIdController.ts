import { Request, Response } from "express";

import { Group } from "../model/Group";

class ReadGroupByIdController {
	async handle(request: Request, response: Response) {
		const { id } = request.params;

		const group = new Group();

		try {
			const data = await group.readById(id);

			if(!data) {
				return response.status(404).send("Group does not exist");
			}

			response.status(200).send(data);
		} catch(err) {
			console.log(err.message);
			return response.status(400).send("Bad Request");
		}
	}
}

export { ReadGroupByIdController };