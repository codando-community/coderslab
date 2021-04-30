import { Request, Response } from "express";

import { IGroupDTO } from "../interfaces/IGroupDTO";
import { Group } from "../model/Group";

class DeleteGroupController {
	async handle(request: Request, response: Response) {
		const { id, idUser } = request.params;

		const group = new Group();
		
		try {
			const findIndex = await group.readById(id);
			
			if(!findIndex) {
				return response.status(404).send("Group does not exist");
			} 
			
			let newfindIndex = <IGroupDTO> findIndex;
			
			if(newfindIndex._owner != idUser) {
				return response.status(401).send();
			}
			
			await group.delete(id);

			return response.status(204).send();
		} catch(err) {
			console.log(err.message);
			return response.status(400).send("Bad Request");
		}
	}
}

export { DeleteGroupController };