import database from '@react-native-firebase/database';

export async function getStickers() {
  const ref = getDatabase().ref('/stickers');
  const stickers = await ref.orderByChild('added').once('value');
  const object = stickers.toJSON();
  return Object.values(object);
}

let databaseInstance = null;

export function getDatabase() {
  if (!databaseInstance) {
    databaseInstance = database();
  }

  return databaseInstance;
}
