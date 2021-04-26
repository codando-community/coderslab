import { Request, Response } from "express";

import { Interests } from "../model/Interests";

class ReadAllInterestsController {
  async handle(request: Request, response: Response) {
    const interests = new Interests();

    try {
      const data = interests.readAll();

      return response.status(data.status).send(data.interests);
    } catch (err) {
      console.log(err.message);
      return response.status(400).send("Bad Request");
    }
  }
}

export { ReadAllInterestsController };