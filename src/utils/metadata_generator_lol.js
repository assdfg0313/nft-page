/**
 * lol champion 메타데이터 생성하는 함수
 * 해당 디렉토리에서 node metadata_generator.js 실행하면 됨
 * 메이플 홈페이지에 접근하여 각각의 html 코드에서 메타데이터를 뽀아옴
 * 뽑아온 데이터를 json 으로 만들어 파일 생성!!
 */

const axios = require("axios");
var fs = require("fs");
var DOMParser = require("dom-parser");

const champions = [
  "garen",
  "galio",
  "gangplank",
  "gragas",
  "graves",
  "gwen",
  "gnar",
  "nami",
  "nasus",
  "nautilus",
  "nocturne",
  "nunu",
  "nidalee",
  "neeko",
  "nilah",
  "darius",
  "diana",
  "draven",
  "ryze",
  "rakan",
  "rammus",
  "lux",
  "rumble",
  "renata",
  "renekton",
  "leona",
  "rek-sai",
  "rell",
  "rengar",
  "lucian",
  "lulu",
  "leblanc",
  "lee-sin",
  "riven",
  "lissandra",
  "lillia",
  "master-yi",
  "maokai",
  "malzahar",
  "malphite",
  "mordekaiser",
  "morgana",
  "dr-mundo",
  "miss-fortune",
  "milio",
  "bard",
  "varus",
  "vi",
  "veigar",
  "vayne",
  "vex",
  "bel-veth",
  "vel-koz",
  "volibear",
  "braum",
  "brand",
  "vladimir",
  "blitzcrank",
  "viego",
  "viktor",
  "poppy",
  "samira",
  "sion",
  "sylas",
  "shaco",
  "senna",
  "seraphine",
  "sejuani",
  "sett",
  "sona",
  "soraka",
  "shen",
  "shyvana",
  "swain",
  "skarner",
  "sivir",
  "xin-zhao",
  "syndra",
  "singed",
  "thresh",
  "ahri",
  "amumu",
  "aurelion-sol",
  "ivern",
  "azir",
  "akali",
  "akshan",
  "aatrox",
  "aphelios",
  "alistar",
  "annie",
  "anivia",
  "ashe",
  "yasuo",
  "ekko",
  "elise",
  "wukong",
  "ornn",
  "orianna",
  "olaf",
  "yone",
  "yorick",
  "udyr",
  "urgot",
  "warwick",
  "yuumi",
  "irelia",
  "evelynn",
  "ezreal",
  "illaoi",
  "jarvan-iv",
  "xayah",
  "zyra",
  "zac",
  "janna",
  "jax",
  "zed",
  "xerath",
  "zeri",
  "jayce",
  "zoe",
  "ziggs",
  "jhin",
  "zilean",
  "jinx",
  "cho-gath",
  "karma",
  "camille",
  "kassadin",
  "karthus",
  "cassiopeia",
  "kai-sa",
  "kha-zix",
  "katarina",
  "kalista",
  "kennen",
  "caitlyn",
  "kayn",
  "kayle",
  "kog-maw",
  "corki",
  "quinn",
  "k-sante",
  "kled",
  "qiyana",
  "kindred",
  "taric",
  "talon",
  "taliyah",
  "tahm-kench",
  "trundle",
  "tristana",
  "tryndamere",
  "twisted-fate",
  "twitch",
  "pyke",
  "pantheon",
  "fiddlesticks",
  "fiora",
  "fizz",
  "heimerdinger",
  "hecarim",
];

const getMetaData = async (character) => {
  const dirtyData = await axios.get(
    `https://www.leagueoflegends.com/ko-kr/champions/${character}`
  );

  const oneLineDataList = dirtyData.data.split("\n");

  return getMetaDataFromHtml(oneLineDataList);
};

const getMetaDataFromHtml = (lineDataList) => {
  let basicIndex = 0;
  for (let i = 0; i < lineDataList.length; i++) {
    const thisLineText = lineDataList[i];
    if (thisLineText.includes("overview:")) {
      basicIndex = i;
      // console.log(lineDataList[basicIndex]);
      // break;
    }
  }
  const image = getSrcInImg(lineDataList[basicIndex]);

  const name = getTextName(lineDataList[basicIndex]);
  const subname = getTextSubName(lineDataList[basicIndex]);
  const role = getRole(lineDataList[basicIndex]);

  const difficulty = getDifficulty(lineDataList[basicIndex]);

  const description = getDescription(lineDataList[basicIndex]);

  // console.log({ image, name, subname, role, difficulty, description });

  return {
    image,
    name,
    description,
    attributes: [
      {
        trait_type: "subname",
        value: subname,
      },
      {
        trait_type: "role",
        value: role,
      },
      {
        trait_type: "difficulty",
        value: difficulty,
      },
    ],
  };
};

// const getRemoveBrTag = (htmlText) => {
//   const list = htmlText.split("<br>");
//   let text = "";
//   list.map((v, i) => {
//     if (text != "") {
//       text += "  ";
//     }
//     text += v;
//   });
//   return text;
// };
const getSrcInImg = (oneLineText) => {
  const list = oneLineText.split('<img src="');
  // console.log(list[1]);

  const imgUrl = list[1].split('"')[0];

  return imgUrl;
};
const getTextSubName = (oneLineText) => {
  const list = oneLineText.split(`overview:subtitle">`);

  const subName = list[1].split("<")[0];

  return subName;
};

const getTextName = (oneLineText) => {
  const list = oneLineText.split(`overview:title">`);

  const name = list[1].split("<")[0];

  return name;
};

const getRole = (oneLineText) => {
  const list = oneLineText.split(`overview:role"`);

  const secondlist = list[1].split('">')[1];
  const role = secondlist.split("<")[0];

  return role;
};

const getDifficulty = (oneLineText) => {
  const list = oneLineText.split(`overview:difficulty"`);

  const secondlist = list[1].split('">')[1];
  const difficulty = secondlist.split("<")[0];

  return difficulty;
};

const getDescription = (oneLineText) => {
  const list = oneLineText.split(`overview:description">`);

  const description = list[1].split("<")[0];

  return description;
};

const action = async () => {
  // for (let i = 0; i < champions.length; i++) {
  //   const data = await getMetaData(champions[i]);
  //   console.log(data);
  // }
};

action();

const generateWholeMetaData = async () => {
  let jsonList = [];

  for (let i = 0; i < champions.length; i++) {
    const oneMetaData = await getMetaData(champions[i]);
    // fs.writeFile(`${i + 1}.json`, oneMetaData, (err, result) => {
    //   console.log(err);
    //   console.log(result);
    // });
    jsonList.push(oneMetaData);
  }
  fs.writeFile(
    `total.json`,
    JSON.stringify(jsonList, null, 4),
    (err, result) => {
      console.log(err);
      console.log(result);
    }
  );
};

generateWholeMetaData();
// generateWholeMetaData().then((v) => console.log(v));
