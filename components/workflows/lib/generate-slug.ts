import { uniqueNamesGenerator, Config, adjectives, animals } from "unique-names-generator"

const config: Config = {
  dictionaries: [adjectives, animals],
  separator: "-",
  length: 2,
}

export function generateSlug() {
  return uniqueNamesGenerator(config)
}
