import moment from 'moment';
/**
 *
 * @param {Date} start
 * @param {Date} end
 * @returns {Date}
 */
export function randomDate(start = moment().subtract(1, 'months').toDate(), end = new Date()) {
  return moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    const record = json.results[0];
    return {
      firstName: record.name.first,
      lastName: record.name.last,
      email: record.email,
      phone: record.phone,
      gender: record.gender,
      picture: record.picture.large,
      nationality: record.nat,
      birthday: record.dob.date,
    };
  } catch (error) {
    console.error('Unable to fetch data:', error);
  }
}

function fetchNames() {
  return fetchData(`https://randomuser.me/api/`);
}

export async function generateName() {
  try {
    const response = await fetchNames();
    const { firstName, lastName } = response;
    return `${firstName} ${lastName}`;
  } catch (error) {
    console.error('Unable to generate name:', error);
  }
}
