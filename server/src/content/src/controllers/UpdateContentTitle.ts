import { Request, Response } from "express";

import { Content } from "../model/Content";

class UpdateContentTitle {
  async handle(request: Request, response: Response) {
    const { _id } = request.params;

    const { title } = request.body;

    const content = new Content();

    try{
      const roadmapAlreadyExists = await content.readById(_id);

      if (roadmapAlreadyExists) {
        try {
          const data = await content.updateTitle(_id, title);

          return response.status(200).send(data);

        } catch (err) {
          console.log(err.message);
          return response.status(400).json({error: "Bad request"});
        }
      } else {
        return response.status(404).json({error: "Roadmap not found"});
      }
    } catch (err) {
      console.log(err.message);
      response.status(400).json({error: "Bad request"})
    }
  }
}

export { UpdateContentTitle };
