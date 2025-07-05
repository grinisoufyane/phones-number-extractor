import * as XLSX from "xlsx";

function isPhoneNumber(input) {
    return /^(\+?\d{1,3})? *(\d{1,4})? *(\d *?){8,14}$/.test(input);
}

function formatPhoneNumber(phone) {
    let clean = phone.replace(/\s+/g, "");
    if (clean.startsWith("0")) {
        clean = clean.replace(/^0/, "+212");
    } else if (!clean.startsWith("+")) {
        clean = "+212" + clean;
    }
    return clean;
}

async function extractPhoneNumbersFromExcel(file) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });

    const phoneNumbers = [];

    workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        rows.forEach((row) => {
            row.forEach((cell) => {
                const value = String(cell || "").trim();
                if (isPhoneNumber(value)) {
                    phoneNumbers.push(formatPhoneNumber(value));
                }
            });
        });
    });

    return [...new Set(phoneNumbers)];
}

export function setupPhoneExtractor(buttonElement, fileInput, statusElement) {
    buttonElement.addEventListener("click", async () => {
        const file = fileInput.files[0];

        if (!file) {
            statusElement.textContent = "Please upload an Excel file.";
            return;
        }

        try {
            const numbers = await extractPhoneNumbersFromExcel(file);

            if (numbers.length === 0) {
                statusElement.textContent = "No valid phone numbers found.";
                return;
            }

            const blob = new Blob([numbers.join(",")], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);

            const baseName = file.name.split(".").slice(0, -1).join(".");
            link.download = `${baseName}_numbers.txt`;
            link.click();

            statusElement.textContent = `✅ Extracted ${numbers.length} numbers.`;
        } catch (err) {
            console.error("Extraction failed:", err);
            statusElement.textContent = "Failed to extract numbers.";
        }
    });
}
