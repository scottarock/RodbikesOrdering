// create the url query search string for a text field in the database
// property -> name of property
// text -> text entered by user to search for
export function createTextQuery(property: string, text: string): string {

  // special characters that need to be replaced in URL string
  const specialChars = {
    '$' : '%24',
    '&' : '%26',
    '+' : '%2B',
    ',' : '%2C',
    '/' : '%2F',
    ':' : '%3A',
    ';' : '%3B',
    '=' : '%3D',
    '?' : '%3F',
    '@' : '%40'
  };
  // the query that will be returned
  let query = `${property}=/`;
  // the individual words in the text
  const words: string[] = Array.from(text.match(/\S+/g));

  // add each individual word to the regular expression for searching
  words.forEach( word => {
    Object.keys(specialChars).forEach( key => {
      while ( word.includes(key) ) {
        word = word.replace(key, specialChars[key]);
      }
    });
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

  if ( position === -1 ) {
    // no range specifier, look for exactly the number in the text
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
  let query = '';

  if ( position === -1 ) {
    // no range specifier, need to create a one day range
    query = `${property}>=${text}`;
    query += `&${property}<${addDay(text)}`;
    return query;
  } else if ( position === 0 ) {
    // specified range prior to a given date
    return `${property}<=${addDay(text.slice(position + 3))}`;
  } else if ( position === text.length - 3) {
    // specified range after a given date
    return `${property}>=${text.slice(0, position)}`;
  } else {
    // specified a complete date range
    query = `${property}>=${text.slice(0, position)}`;
    query += `&${property}<${addDay(text.slice(position + 3))}`;
    return query;
  }
}

function addDay(dateString) {
  // takes a string in short date and adds one day to it
  const queryDate = new Date(dateString);
  queryDate.setDate(queryDate.getDate() + 1);
  return queryDate.toLocaleDateString();
}
