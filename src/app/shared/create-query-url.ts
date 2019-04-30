export function createTextQuery(property: string, text: string): string {

  let query: string = `${property}=/`;
  const words: string[] = Array.from(text.match(/\S+/g));

  words.forEach( word => {
    query += `\\b${word}|`
  });
  query = query.slice(0, query.length-1) + '/i';

  return query;
}

export function createNumberQuery(property: string, text: string): string {

  let position = text.search(/[<>-]/);

  if ( position === -1 ) {
    return `${property}=${parseInt(text)}`;
  }
  else if ( text.includes('-') ) {
    let query: string = '';
    query = `${property}>=${parseInt(text.slice(0, position))}`;
    query += `&${property}<=${parseInt(text.slice(position + 1))}`;
    return query;
  }
  else {
    return `${property}${text}`;
  }
}

export function createDateQuery(property: string, text: string): string {

  let position = text.search(/\.{3}/);

  if ( position === -1 ) {
    return `${property}=${text}`;
  }
  else if ( position === 0 ) {
    return `${property}<=${text.slice(position + 3)}`;
  }
  else if ( position === text.length - 3) {
    return `${property}>=${text.slice(0, position)}`;
  }
  else {
    let query: string = '';
    query = `${property}>=${text.slice(0, position)}`;
    query += `&${property}<=${text.slice(position + 3)}`;
    return query;
  }
}
