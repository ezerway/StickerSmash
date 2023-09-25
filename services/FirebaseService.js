import database from '@react-native-firebase/database';

export async function getStickers(startAtKey = 0, limit = 5) {
  let query = getDatabase().ref('/stickers').orderByChild('id');
  if (startAtKey) {
    query = query.startAt(startAtKey);
  }

  query = query.limitToFirst(limit);
  const snapshot = await query.once('value');
  if (!snapshot.exists()) {
    return [];
  }

  const stickers = [];
  snapshot.forEach(async (e, index) => {
    if (startAtKey && index === 0) {
      return;
    }

    stickers.push({
      key: e.key,
      ...e.val(),
    });
  });
  return stickers;
}

let databaseInstance = null;

export function getDatabase() {
  if (!databaseInstance) {
    databaseInstance = database();
  }

  return databaseInstance;
}
