const get = obj => key => obj[key];
export const getKeys = (keys, obj) => keys.map(get(obj));
export const notKeys = (keys, obj) => Object.keys(obj)
.filter(key => !keys.includes(key))
.map(get(obj));

export const asSet = fn => (arr, ...args) => {
	const set = new Set(arr);
	fn(set, ...args);
	return Array.from(set);
};
export const addUniq = asSet((a, x) => a.add(x));
export const remove = asSet((a, x) => a.delete(x));