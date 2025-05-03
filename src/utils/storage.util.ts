export enum StorageKey {
  user = 'the-grind::user',
  token = 'the-grind::token',
}

const stringPrefix = "s::";

const saveItem = (key: StorageKey, value: unknown): void => {
  if (!key || !value) {
    throw new Error('Invalid item');
  }

  let formattedValue = "";

  if (typeof value == 'string') {
    formattedValue = `${stringPrefix}${value}`
  }

  if (typeof value == 'object') {
    formattedValue = JSON.stringify(value)
  }

  localStorage.setItem(key, formattedValue);
}

const deleteItem = (key: StorageKey): void => {
  if (typeof window === "undefined") return;
  if (!key) {
    throw new Error('Invalid key');
  }

  localStorage.removeItem(key);
}

const getItem = <T>(key: StorageKey): T | string | null => {
  if (typeof window == "undefined") return null;
  if (!key) {
    throw new Error('Invalid key');
  }

  const item = localStorage.getItem(key);

  return item ? (item?.includes(stringPrefix) ? item.replace(stringPrefix, "") : JSON.parse(item)) : null;
}

const clear = (): void => {
  if (typeof window == "undefined") return;
  Object.entries(StorageKey).forEach(([, value]) => deleteItem(value));
}

const storageUtil = { saveItem, deleteItem, getItem, clear };

export default storageUtil;
