/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const { exec } = require('child_process');
const { existsSync } = require('node:fs');

// getting db connection parameters from environment file
const databaseUrl = process.env.DATABASE_URL;

// defining restore file name
const fileToRestore = process.argv[0];

// defining backup file name
const currentDate = new Date();
const today = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
const backupFile = `clean-nextjs-starter-app-db_backup-${today}.sql`;

// writing postgresql backup function
const generateBackupFile = () => {
  console.log('DATABASE_URL: ', databaseUrl);
  console.log('backup file name: ', backupFile);

  if (existsSync(backupFile)) {
    console.warn('~~~ WARNING ~~~');
    console.warn(`The database backup file "./${backupFile}", already exists!`);
    console.warn('Please delete this file to continue.');
    return;
  }

  exec(`pg_dump -d ${databaseUrl} -f ${backupFile}`, (error: Error, stdout: unknown, stderr: unknown) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Command produced standard error: ${stderr}`);
      return;
    }
    console.log('postgres backup complete.');
  });
};

// restore postgresql sql function
const restoreBackupFile = () => {
  console.log('DATABASE_URL: ', databaseUrl);
  console.log('backup file name: ', backupFile);

  if (!existsSync(fileToRestore)) {
    console.warn('~~~ ERROR ~~~');
    console.warn(`The database backup file "${fileToRestore}", does not exists!`);
    console.warn('Please provide a valid sql file to restore.');
    return;
  }

  exec(`pg_restore -C -d ${databaseUrl} ${fileToRestore}`, (error: Error, stdout: unknown, stderr: unknown) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Command produced standard error: ${stderr}`);
      return;
    }
    console.log('postgres restore complete.');
  });
};

module.exports = {
  generateBackupFile,
  restoreBackupFile,
};
