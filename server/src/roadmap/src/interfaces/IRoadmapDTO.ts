interface IRoadmapDTO {
  name: String,
  is_default?: Boolean,
  objective: String,
  content_list: String,
  is_done?: Boolean,
}

export { IRoadmapDTO };