import Json from 'json5'

export const safeJSONParse = json => {
  if (typeof json !== 'string') return json
  try {
    return Json.parse(json)
  } catch (error) {}
  return null
}
