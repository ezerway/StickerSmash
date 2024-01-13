import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export async function addLog(message) {
  try {
    const current = await getAllLogs();
    current.push({
      id: current.length + 1,
      created_at: moment().toISOString(),
      message,
    });
    const jsonValue = JSON.stringify(current);
    await AsyncStorage.setItem('logs', jsonValue);
  } catch {
    // saving error
  }
}

export async function clearAllLogs() {
  try {
    await AsyncStorage.setItem('logs', '[]');
  } catch {
    // saving error
  }
}

export async function getAllLogs() {
  try {
    const jsonValue = await AsyncStorage.getItem('logs');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch {
    return [];
  }
}
