import './style.css'
import { setupPhoneExtractor } from "./phone-extractor.js";

document.querySelector("#app").innerHTML = `
  <div class="w-screen min-h-screen bg-gray-50 p-4">
    <div class="max-w-lg mx-auto flex flex-col items-center justify-center gap-6 space-y-4g">
            <img src="xlsx.png" alt="" class="w-[150px]" id="preview-img" />
      <div class="w-full flex flex-col gap-3 space-y-4">
        <input type="file" id="excel-file" accept=".xlsx, .xls"
          class="w-full text-sm text-gray-600 file:bg-sky-900 file:text-white file:rounded file:px-3 file:py-1 file:border-0" />

        <button id="extract-button"
          class="bg-sky-900 text-white px-4 py-2 rounded text-sm w-full hover:bg-sky-800 transition">
          Extract Phone Numbers
        </button>

        <p id="status" class="text-center text-gray-500 text-sm mt-2"></p>
      </div>
    </div>
  </div>
`;

setupPhoneExtractor(
    document.querySelector("#extract-button"),
    document.querySelector("#excel-file"),
    document.querySelector("#status")
);
