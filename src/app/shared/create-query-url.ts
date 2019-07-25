// create the url query search string for a text field in the database
// property -> name of property
// text -> text entered by user to search for
export function createTextQuery(property: string, text: string): string {

  // the query that will be returned
  let query = `${property}=/`;
  // the individual words in the text
  const words: string[] = Array.from(text.match(/\S+/g));

  // add each individual word to the regular expression for searching
  words.forEach( word => {
    query += `\\b${word}|`;
  });
  // remove the last 'or' and make the search case insensitive
  query = query.slice(0, query.length - 1) + '/i';

  return query;
}


// create the url query search string for a number field in the database
// property -> name of property
// text -> text entered by user to search for
export function createNumberQuery(property: string, text: string): string {

  // find position of any range specifier in text
  const position = text.search(/[<>-]/);

  // no range specifier, look for exactly the number in the text
  if ( position === -1 ) {
    return `${property}=${parseInt(text, 10)}`;
  } else if (text.includes('-')) {
    // used the '-' sign to create a range to search
    // break the text into two queries, one for each end of the range
    let query = '';
    query = `${property}>=${parseInt(text.slice(0, position), 10)}`;
    query += `&${property}<=${parseInt(text.slice(position + 1), 10)}`;
    return query;
  } else {
  // used '>' or '<' for searching, just use the text
    return `${property}${text}`;
  }
}


// create the url query search string for a date field in the database
// property -> name of property
// text -> text entered by user to search for
export function createDateQuery(property: string, text: string): string {

  // find position of the range specifier (...) in text
  const position = text.search(/\.{3}/);

  // no range specifier, look for exactly the date in the text
  if ( position === -1 ) {
    return `${property}=${text}`;
  } else if ( position === 0 ) {
    // specified range prior to a given date
    return `${property}<=${text.slice(position + 3)}`;
  } else if ( position === text.length - 3) {
    // specified range after a given date
    return `${property}>=${text.slice(0, position)}`;
  } else {
    // specified a complete date range
    let query = '';
    query = `${property}>=${text.slice(0, position)}`;
    query += `&${property}<=${text.slice(position + 3)}`;
    return query;
  }
}
