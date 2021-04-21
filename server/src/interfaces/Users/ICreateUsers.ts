interface ICreateUserDTO {
  id: string;
  username: string;
  name: string;
  last_name: string;
  email: string;
  discord_id: string;
  github_id: string;
  password: string;
  // TODO - Criar Interst
  interst_list: string;
  // TODO - Criar Group
  group_list: string;
}

interface ICreateUsersRepository {
  create(data: ICreateUserDTO): void;
}

export {ICreateUsersRepository, ICreateUserDTO}
