import fs from 'fs';

/**
 * Reassign the variable and emit an event
 * @param value The new value
 */
export function updateUsersList(value) {
  const prevValue = JSON.parse(fs.readFileSync('src/storage/users.json', 'utf8')).users;

  if (!value) {
    return prevValue;
  }

  fs.writeFileSync('user_data.json', JSON.stringify({ users: value }));

  return value;
}
