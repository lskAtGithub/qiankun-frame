export const ResponseTypeEnum = {
  ARRAYBUFFER: 'arraybuffer',
  BLOB: 'blob',
  DOCUMENT: 'document',
  JSON: 'json',
  TEXT: 'text',
  STREAM: 'stream'
}

export const isResponseTypeWhitelist = (responseType) => {
  return [ResponseTypeEnum.BLOB].includes(responseType)
}

