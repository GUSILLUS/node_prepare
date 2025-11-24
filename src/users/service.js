import fs from 'fs/promises';

export async function getUsersList({ name } = {}) {
  const usersFromDb = await fs.readFile('src/storage/users.json', 'utf8');
  const users = JSON.parse(usersFromDb).users;

  if (name) {
    return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  return users;
}

export async function getUserById(id) {
  const users = await getUsersList();

  return users.find(user => user.id === id);
}

export async function createUser(user) {
  const users = await getUsersList();

  const newUser = { id: crypto.randomUUID(), ...user };

  try {
    await fs.writeFile('src/storage/users.json', JSON.stringify({ users: [...users, newUser] }, null, 2));
  } catch (error) {
    throw new Error('Failed to create user');
  }

  return newUser;
}

export async function updateUser(id, user) {
  const users = await getUsersList();

  const updatedUser = { id, ...user };

  const updatedUsers = users.map(currentUser => currentUser.id === id ? updatedUser : currentUser);

  try {
    await fs.writeFile('src/storage/users.json', JSON.stringify({ users: updatedUsers }, null, 2));
  } catch (error) {
    throw new Error('Failed to update user');
  }

  return updatedUser;
}

export async function patchUser(id, user) {
  const userFromDb = await getUserById(id);

  const updatedUser = { ...userFromDb, ...user };

  return await updateUser(id, updatedUser);
}

export async function deleteUser(id) {
  const users = await getUsersList();
  const userFromDb = await getUserById(id);

  if (!userFromDb) {
    throw new Error('User not found');
  }

  const updatedUsers = users.filter(user => user.id !== id);

  try {
    await fs.writeFile('src/storage/users.json', JSON.stringify({ users: updatedUsers }, null, 2));
  } catch (error) {
    throw new Error('Failed to delete user');
  }

  return { message: 'User deleted successfully', user: userFromDb };
}