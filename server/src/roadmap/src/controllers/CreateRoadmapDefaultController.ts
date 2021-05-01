import { Request, Response } from "express";

import { Roadmap } from "../model/Roadmap";

class CreateRoadmapDefaultController {
  async handle(request: Request, response: Response) {
    const {
      name,
      objective,
      content_list
    } = request.body;

    const roadmap = new Roadmap();

    const roadmapAlreadyExists = await roadmap.readByName(name);

    if(!roadmapAlreadyExists) {
      try {
        const data = await roadmap.createDefault({
          name,
          objective,
          content_list
        });

        return response.status(201).send(data);
      } catch(err) {
        console.log(err.message);
        return response.status(400).send("Bad Request");
      }
    } else {
      return response.status(409).json({error: "Roadmap already exists"})
    }
  }
}

export { CreateRoadmapDefaultController };
