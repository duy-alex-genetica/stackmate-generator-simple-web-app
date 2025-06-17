import { env } from '@/helpers/env';
import fs from 'fs-extra';
import { google } from 'googleapis';

const serviceAccount = JSON.parse(env('GOOGLE_SERVICE_ACCOUNT_JSON') || '{}');

// Initialize Google Auth
const auth = new google.auth.JWT(
  serviceAccount.client_email,
  undefined,
  serviceAccount.private_key.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/drive']
);

const drive = google.drive({ version: 'v3', auth });

/**
 * Check if a folder exists in Google Drive under a specified parent folder.
 * If found, return the folder ID.
 * @param folderName - The name of the folder to check.
 * @param parentFolderId - The ID of the parent folder.
 * @returns The folder ID if found, otherwise null.
 */
export async function getDriveFolderId(folderName: string, parentFolderId: string): Promise<string | undefined | null> {
  try {
    const response = await drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: 'files(id, name)',
    });

    if (response.data.files?.length) {
      console.log(`✅ Existing folder found: ${response.data.files[0].id}`);
      return response.data?.files?.[0]?.id;
    }

    return null;
  } catch (error) {
    console.error('❌ Error checking folder existence:', error);
    return null;
  }
}

/**
 * Delete a folder from Google Drive.
 * @param folderId - The ID of the folder to delete.
 */
export async function deleteDriveFolder(folderId: string): Promise<boolean> {
  try {
    await drive.files.delete({ fileId: folderId });
    console.log(`🗑️ Folder deleted: ${folderId}`);
    return true;
  } catch (error) {
    console.error('❌ Error deleting folder:', error);
    return false;
  }
}

/**
 * Create a folder in Google Drive under the specified parent folder.
 * @param folderName - The name of the folder to create.
 * @param parentFolderId - The ID of the parent folder where this folder will be created.
 * @returns The ID of the created folder.
 */
export async function createDriveFolder(folderName: string, parentFolderId: string): Promise<string | null> {
  try {
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };

    const folder = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    });

    console.log(`✅ Folder created: ${folder.data.id}`);
    return folder.data.id || null;
  } catch (error) {
    console.error('❌ Error creating folder:', error);
    return null;
  }
}

/**
 * Upload a file to a specified Google Drive folder.
 * @param filePath - The local file path to upload.
 * @param fileName - The name of the file in Drive.
 * @param folderId - The ID of the Drive folder to upload to.
 * @returns The ID of the uploaded file.
 */
export async function uploadFileToDrive(filePath: string, fileName: string, folderId: string): Promise<string | null> {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType: getMimeType(filePath),
      body: fs.createReadStream(filePath),
    };

    console.log(`📤 Uploading file: ${JSON.stringify({
      requestBody: fileMetadata,
      media,
      fields: 'id',
    }, null, 2)}`);

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id',
    });

    console.log(`✅ File uploaded: ${file.data.id}`);
    return file.data.id || null;
  } catch (error) {
    console.error('❌ Error uploading file:', error);
    return null;
  }
}

/**
 * Get the public link of a Google Drive folder.
 * @param folderId - The ID of the Drive folder.
 * @returns The shareable link of the folder.
 */
export async function getDriveFolderLink(folderId: string): Promise<string> {
  const response = await drive.files.get({
    fileId: folderId,
    fields: 'webViewLink',
  });

  return response.data?.webViewLink ?? "";
}

/**
 * Get the MIME type of a file based on its extension.
 * @param filePath - The file path to determine the MIME type.
 * @returns The MIME type as a string.
 */
function getMimeType(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    pdf: 'application/pdf',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    txt: 'text/plain',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  return mimeTypes[extension || ''] || 'application/octet-stream';
}
