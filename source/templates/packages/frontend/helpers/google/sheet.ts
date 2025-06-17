// Load the service account key JSON file
import { env } from '@/helpers/env';
// import serviceAccount from '@public/lifeai-438107-59a27252fb7c.json';
import { google } from 'googleapis';

const serviceAccount = JSON.parse(env('GOOGLE_SERVICE_ACCOUNT_JSON') || '{}');

// Initialize Google Auth
const auth = new google.auth.JWT(
  serviceAccount.client_email,
  undefined,
  serviceAccount.private_key.replace(/\\n/g, '\n'),
  [
    'https://www.googleapis.com/auth/spreadsheets',

  ]
);

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Get the last row number in a Google Sheet for a specific column.
 * @param spreadsheetId - The ID of the Google Sheet.
 * @param sheetName - The sheet name to check.
 * @param column - The column to check for the last row (e.g., "A", "B", "F").
 * @returns The last used row number.
 */
async function getLastRow(
  spreadsheetId: string,
  sheetName: string,
  column: string
): Promise<number> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${column}:${column}`,
    });

    const numRows = response.data.values?.length || 1;
    return numRows + 1;
  } catch (error) {
    console.error('❌ Error getting last row:', error);
    return 2;
  }
}

/**
 * Append form data to the last available row in Google Sheets.
 * @param spreadsheetId - The ID of the Google Sheet.
 * @param sheetName - The sheet name to append data.
 * @param values - The values to append.
 * @param column - The column to check for the last row (default is "A").
 */
export async function appendToGoogleSheet({
  spreadsheetId,
  sheetName,
  values,
  column = "A",
}: {
  spreadsheetId: string;
  sheetName: string;
  values: (string | number)[];
  column?: string;
}): Promise<any> {
  try {
    const lastRow = await getLastRow(spreadsheetId, sheetName, column);
    const range = `${sheetName}!A${lastRow}`;

    return sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });
  } catch (error) {
    console.error('❌ Error appending data:', error);
  }
  return null;
}

export async function getGoogleSheetRows({
  spreadsheetId,
  sheetName,
}: {
  spreadsheetId: string, sheetName: string,
}) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:Z`,
    });
    return response.data.values || [];
  } catch (error) {
    console.error('❌ Error getting Google Sheet rows:', error);
    return [];
  }
}

