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
    segments: [
      "46",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
    ],
    lastLength: 6,
  },
  853: {
    // Macau: 8-digit number, segments usually start with 6
    country: "澳门",
    segments: [
      "630",
      "631",
      "632",
      "633",
      "634",
      "635",
      "636",
      "637",
      "638",
      "639",
      "660",
      "661",
      "662",
      "663",
      "664",
      "665",
      "666",
      "667",
      "668",
      "669",
      "680",
      "681",
      "682",
      "683",
      "684",
      "685",
      "686",
      "687",
      "688",
      "689",
    ],
    lastLength: 5,
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
    segments: [
      "901",
      "902",
      "903",
      "905",
      "906",
      "907",
      "908",
      "909",
      "911",
      "912",
      "913",
      "914",
      "915",
      "916",
      "917",
      "918",
      "919",
      "921",
      "922",
      "923",
      "924",
      "925",
      "926",
      "927",
      "928",
      "929",
      "931",
      "932",
      "933",
      "934",
      "935",
      "936",
      "937",
      "938",
      "939",
      "941",
      "942",
      "943",
      "944",
      "945",
      "946",
      "947",
      "948",
      "949",
      "950",
      "951",
      "952",
      "953",
      "954",
      "955",
      "956",
      "957",
      "958",
      "959",
      "961",
      "962",
      "963",
      "964",
      "965",
      "966",
      "967",
      "968",
      "969",
      "971",
      "972",
      "973",
      "974",
      "975",
      "976",
      "977",
      "978",
      "979",
      "981",
      "982",
      "983",
      "984",
      "985",
      "986",
      "987",
      "988",
      "989",
      "991",
      "992",
      "993",
      "994",
      "995",
      "996",
      "997",
      "998",
      "999",
    ],
    lastLength: 7,
  },
  34: {
    // Spain: 9-digit number, typically starts with 6, 7, or 9
    country: "西班牙",
    segments: [
      "600",
      "601",
      "602",
      "603",
      "604",
      "605",
      "606",
      "607",
      "608",
      "609",
      "640",
      "641",
      "642",
      "643",
      "644",
      "645",
      "646",
      "647",
      "648",
      "649",
      "700",
      "701",
      "702",
      "703",
      "704",
      "705",
      "706",
      "707",
      "708",
      "709",
      "720",
      "721",
      "722",
      "723",
      "724",
      "725",
      "726",
      "727",
      "728",
      "729",
    ],
    lastLength: 6, // after the country code, total digits = 9
  },
  61: {
    // Australia: Mobile numbers usually start with 4 (e.g., 04xx xxx xxx)
    country: "澳大利亚",
    segments: ["4"],
    lastLength: 8, // after the '4', 8 digits follow for mobile
  },
};

export function isValidActiveDetect(taskName, file) {
  if (!taskName || !file) {
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

export function isValidSocialDetect(taskName, file) {
  if (!taskName || !file) {
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

export function isValidGenerateParam(amount, countryCode, middleCode) {
  if (!amount || !countryCode || middleCode.size === 0) {
    return "请填写所有必填字段。";
  }
  return null;
}

export async function generatePhoneNumbers({
  file,
  amount,
  middleCode,
  countryCode,
}) {
  const rules = countryRules[countryCode];
  if (!rules) {
    throw new Error(`Unsupported country code: ${countryCode}`);
  }

  const { lastLength } = rules;
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
    const middleCodeArray = Array.from(middleCode);
    const segment =
      middleCodeArray[Math.floor(Math.random() * middleCodeArray.length)];
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
