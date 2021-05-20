import { Request, Response } from "express";

import { User } from "../model/User";
import Api from "../../../Api";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    
    const {
      username,
      name,
      last_name,
      email,
      discord_id,
      github_id,
      password,
      interest_list
    } = request.body;

    const user = new User();

    try {
      const findIndex = await user.readById(id);

      if(!findIndex) {
        return response.status(404).send();
      }

      const data = await user.update(id, {
        username,
        name,
        last_name,
        email,
        discord_id,
        github_id,
        password,
      });
      
      const api = new Api();

      try {
        if(interest_list.length != 0) {
          for(let i = 0; i < interest_list.length; i++) {
            let interest;

            if(interest_list[i]._id != "") {
              interest = await api.interests.put(`/update/${interest_list[i]._id}`, interest_list[i]);
            } else {
              interest = await api.interests.post("/create", interest_list[i]);
            }

            interest_list[i] = interest.data;
          }
        }

      } catch(err) {
        return response.status(err.response.status).send();
      }

      data.interest_list = interest_list;
      return response.status(200).send(data);
    } catch (err) {
      console.log(err.message);
      return response.status(400).send();
    }
  }
}

export { UpdateUserController };
