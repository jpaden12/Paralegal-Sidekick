import { db } from './DBManager.js';

export const readAllProfiles = () => {
  try {
    const query = `SELECT * FROM client_profiles`;
    const readQuery = db.prepare(query);
    return readQuery.all();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const insertProfile = (profile) => {
  try {
    const insertQuery = db.prepare(`
      INSERT INTO client_profiles (name, date_of_birth, address, medical_provider_name, medical_provider_address)
      VALUES (@name, @date_of_birth, @address, @medical_provider_name, @medical_provider_address)
    `);

    const transaction = db.transaction((row) => insertQuery.run(row));
    const info = transaction(profile);
    return info.lastInsertRowid;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
