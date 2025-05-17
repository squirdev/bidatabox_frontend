import JSZip from "jszip";
import { saveAs } from "file-saver";

export const countryRules = {
  86: {
    // China: 3-digit segment + 8-digit number (e.g., 13812345678)
    country: "中国大陆",
    segments: [
      "130",
      "131",
      "132",
      "133",
      "134",
      "135",
      "136",
      "137",
      "138",
      "139",
      "150",
      "151",
      "152",
      "153",
      "155",
      "156",
      "157",
      "158",
      "159",
      "170",
      "171",
      "172",
      "173",
      "175",
      "176",
      "177",
      "178",
      "179",
      "180",
      "181",
      "182",
      "183",
      "184",
      "185",
      "186",
      "187",
      "188",
      "189",
    ],
    lastLength: 8,
  },
  852: {
    // Hong Kong: 8-digit number, segments typically 5-9 (e.g., 91234567)
    country: "香港",
    segments: ["4", "7", "8"],
    lastLength: 7,
  },
  853: {
    // Macau: 8-digit number, segments usually start with 6
    country: "澳门",
    segments: ["6"],
    lastLength: 7,
  },
  // 81: {
  //   // Japan: e.g., 090, 080, 070 + 8 digits
  //   country: "Japan",
  //   segments: ["090", "080", "070", "050"],
  //   lastLength: 8,
  // },
  886: {
    // Taiwan: e.g., 09x + 8 digits
    country: "台湾",
    segments: ["900", "901", "902", "903", "905", "906", "907", "908", "909"],
    lastLength: 7,
  },
};

export function isValidActiveDetect(taskName, countryCode, file) {
  if (!taskName || !countryCode || !file) {
    return {
      message: "请填写所有必填字段。",
      valid: false,
    };
  } else {
    return {
      message: "",
      valid: true,
    };
  }
}

export function isValidSocialDetect(taskName, countryCode, file) {
  if (!taskName || !countryCode || !file) {
    return {
      message: "请填写所有必填字段。",
      valid: false,
    };
  } else {
    return {
      message: "",
      valid: true,
    };
  }
}

export function isValidGenerateParam(amount, countryCode) {
  if (!amount || !countryCode) {
    return "请填写所有必填字段。";
  }
  return null;
}

export async function generatePhoneNumbers({ file, amount, countryCode }) {
  const rules = countryRules[countryCode];
  if (!rules) {
    throw new Error(`Unsupported country code: ${countryCode}`);
  }

  const { segments, lastLength } = rules;
  const maxNumber = Math.pow(10, lastLength);
  const resultBatches = [];
  const currentBatch = new Set();

  // Read the file and store excluded numbers
  const excludedNumbers = new Set();
  if (file) {
    const text = await file.text();
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .forEach((number) => excludedNumbers.add(number));
  }

  while (currentBatch.size < amount) {
    const segment = segments[Math.floor(Math.random() * segments.length)];
    const randomNumber = Math.floor(Math.random() * maxNumber);
    const lastPart = randomNumber.toString().padStart(lastLength, "0");

    if (lastPart === "0000000" || lastPart === "00000000") continue;

    const fullNumber = `${countryCode}${segment}${lastPart}`;
    if (excludedNumbers.has(fullNumber)) continue;
    currentBatch.add(fullNumber);
  }

  const phoneNumbers = Array.from(currentBatch);
  while (phoneNumbers.length) {
    resultBatches.push(phoneNumbers.splice(0, 200000));
  }

  return resultBatches;
}

export const downloadTextFile = async (result) => {
  console.log("Result", result);
  const zip = new JSZip();

  result.forEach((text, i) => {
    const content = text.join("\n");
    zip.file(`phone${i}.txt`, content);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "phones.zip");
};

export function getSimplifiedDateTime(isoString) {
  const date = new Date(isoString);

  // Get the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Get the time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the output as YYYY-MM-DD HH:mm:ss
  const simpleDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return simpleDateTime;
}

export function getTimeStrHeader(social) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const formattedDate = `${social}_${year}_${month}_${day}`;
  return formattedDate;
}
