/* shared.js — Firebase helpers only */

export function write(path, value) {
  return firebase.database().ref(path).set(value);
}

export function update(path, value) {
  return firebase.database().ref(path).update(value);
}

export function onValue(path, callback) {
  return firebase.database().ref(path).on("value", snap => callback(snap.val()));
}

export function remove(path) {
  return firebase.database().ref(path).remove();
}
