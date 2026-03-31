const STORAGE_KEY = 'smart_health_tracker_data';

export const saveToStorage = (data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('Could not save data to local storage', err);
  }
};

export const loadFromStorage = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Could not load data from local storage', err);
    return null;
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Could not clear storage', err);
  }
};
