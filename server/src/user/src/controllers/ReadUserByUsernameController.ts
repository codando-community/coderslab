import { Request, Response } from "express";

import { User } from "../model/User";

class ReadUserByUsernameController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;

    const user = new User();

    try {
      const data = await user.readByUsername(username);

      if(!data) {
        return response.status(404).send("User does not exist");
      }

      return response.status(200).send(data);
    } catch (err) {
      console.log(err.message);
      return response.status(400).send("Bad Request");
    }
  }
}

export { ReadUserByUsernameController };