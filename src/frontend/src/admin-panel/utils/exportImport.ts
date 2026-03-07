/**
 * Export/Import utilities for SolTrek Admin Panel
 * Pure JS/TS — no external libraries required.
 */

/**
 * Escapes a single CSV cell value.
 * Wraps in quotes if it contains commas, quotes, or newlines.
 */
function escapeCSVCell(value: string | number | undefined | null): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Always quote cells that contain commas, quotes, or newlines
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Converts headers + rows into a CSV string with UTF-8 BOM
 * so Excel opens it correctly (including ₹ symbols).
 */
function buildCSV(headers: string[], rows: (string | number)[][]): string {
  const BOM = "\uFEFF"; // UTF-8 Byte Order Mark — Excel needs this for UTF-8
  const headerRow = headers.map(escapeCSVCell).join(",");
  const dataRows = rows.map((row) => row.map(escapeCSVCell).join(","));
  return BOM + [headerRow, ...dataRows].join("\n");
}

/**
 * Triggers a browser file download.
 */
function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  // Revoke the object URL after a short delay to allow the download to start
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Exports data as a CSV file. UTF-8 BOM ensures Excel reads ₹ symbols correctly.
 * @param filename - e.g. "orders-export.csv"
 * @param headers - column header labels
 * @param rows - 2D array of cell values
 */
export function exportToCSV(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
): void {
  const csv = buildCSV(headers, rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, filename);
}

/**
 * Exports data as an Excel-compatible CSV file (UTF-8 BOM, .csv extension).
 * Excel opens .csv files with BOM as native UTF-8, preserving ₹ symbols.
 * @param filename - e.g. "orders-export.csv" (use .csv; Excel opens it natively)
 * @param headers - column header labels
 * @param rows - 2D array of cell values
 */
export function exportToExcel(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
): void {
  // We use a UTF-8 BOM CSV — Excel opens this natively as a spreadsheet
  // with full support for INR ₹ currency symbols
  const csv = buildCSV(headers, rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  // Ensure filename ends with .csv for Excel compatibility
  const safeFilename = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  triggerDownload(blob, safeFilename);
}

/**
 * Reads an uploaded CSV file and returns a 2D array of string cells.
 * The first row is included (headers). Empty lines are skipped.
 * @param file - The File object from an <input type="file"> element
 * @returns Promise resolving to a 2D array of strings (rows × columns)
 */
export function parseCSVImport(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        let text = event.target?.result as string;
        // Strip UTF-8 BOM if present
        if (text.startsWith("\uFEFF")) {
          text = text.slice(1);
        }

        const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
        const rows: string[][] = lines.map((line) => parseCSVLine(line));
        resolve(rows);
      } catch (err) {
        reject(new Error(`Failed to parse CSV: ${err}`));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsText(file, "utf-8");
  });
}

/**
 * Parses a single CSV line respecting quoted fields.
 */
function parseCSVLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        // Check for escaped quote ("")
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        cells.push(current);
        current = "";
      } else {
        current += char;
      }
    }
  }

  cells.push(current);
  return cells;
}
