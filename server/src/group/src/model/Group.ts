import { IGroupDTO } from "../interfaces/IGroupDTO";
import { IGroupRepository } from "../interfaces/IGroupRepository";
import GroupSchema from "../database/Schemas/GroupSchema";

class Group implements IGroupRepository {
  async create({
    name,
    category,
    subject_label,
    level,
    token,
    is_public,
    _owner,
    _user_list,
    _schedule_list
  } : IGroupDTO) : Promise<object> {
    return await GroupSchema.create({
      name,
      category,
      subject_label,
      level,
      token,
      is_public,
      _owner,
      _user_list,
      _schedule_list
    });
  }

  async readById(_id: string) : Promise<object> {
    return await GroupSchema.findOne({ _id });
  }

  async readByName(name: string) : Promise<object> {
    return await GroupSchema.find({ name: { "$regex": name }, is_public: true}).sort({ name: 1 });
  }

  async readByCategory(category: string) : Promise<object> {
    return await GroupSchema.find({ category, is_public: true}).sort({ name: 1 });
  }

  async readBySubject(subject_label: string) : Promise<object> {
    return await GroupSchema.find({ subject_label, is_public: true }).sort({ name: 1 });
  }

  async readAll() : Promise<object> {
    return await GroupSchema.find({ is_public: true }).sort({ name: 1 });
  }

  async readByToken(token: string) : Promise<object> {
    return await GroupSchema.findOne({ token });
  }

  async update(_id: string, {
    name,
    category,
    subject_label,
    level,
    token,
    is_public,
    _owner,
    _user_list,
    _schedule_list
  } : IGroupDTO) : Promise<object> {
    return await GroupSchema.findByIdAndUpdate(_id, {
      name,
      category,
      subject_label,
      level,
      token,
      is_public,
      _owner,
      _user_list,
      _schedule_list
    }, {new: true});
  }

  async delete(_id: string) : Promise<object> {
    return await GroupSchema.deleteOne({ _id });
  }
}

export { Group };