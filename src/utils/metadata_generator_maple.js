/**
 * maple 직업 메타데이터 생성하는 함수
 * 해당 디렉토리에서 node metadata_generator.js 실행하면 됨
 * 메이플 홈페이지에 접근하여 각각의 html 코드에서 메타데이터를 뽀아옴
 * 뽑아온 데이터를 json 으로 만들어 파일 생성!!
 */

const axios = require("axios");
var fs = require("fs");

const mapleJobImgUrl = (num) => {
  if (parseInt(num) == null)
    return "https://i.namu.wiki/i/daHc24jPo44GZJgTCkw_grC6JJoNsS3bH1WLjzXIEIhZzoX0xBcT2CuOYgVALDrN8laj7NUjWr1FSD05wpM7AA.mp4";

  return `https://lwi.nexon.com/maplestory/guide/char_info/char_view/char${num}.jpg`;
};

const getMetaData = async (num) => {
  const dirtyData = await axios.get(
    `https://maplestory.nexon.com/Guide/N23Job/View/${num}`
  );
  const oneLineDataList = dirtyData.data.split("\n");

  return getMetaDataFromHtml(oneLineDataList);
};

const getMetaDataFromHtml = (lineDataList) => {
  let basicIndex = 0;
  for (let i = 0; i < lineDataList.length; i++) {
    const thisLineText = lineDataList[i];
    if (thisLineText.includes("char_view_img")) {
      basicIndex = i;
      break;
    }
  }

  const image = getSrcInImg(lineDataList[basicIndex]);
  const kind = getTextBetweenTag("em", lineDataList[basicIndex + 1]);
  const name = getTextBetweenTag("h2", lineDataList[basicIndex + 2]);
  const description = getTextBetweenTag("h3", lineDataList[basicIndex + 3]);
  const detail = getRemoveBrTag(
    getTextBetweenTag("p", lineDataList[basicIndex + 4])
  );

  return JSON.stringify(
    {
      image,
      name,
      description,
      attributes: [
        {
          trait_type: "kind",
          value: kind,
        },
        {
          trait_type: "detail",
          value: detail,
        },
      ],
    },
    null,
    4
  );
};
const getRemoveBrTag = (htmlText) => {
  const list = htmlText.split("<br>");
  let text = "";
  list.map((v, i) => {
    if (text != "") {
      text += "  ";
    }
    text += v;
  });
  return text;
};
const getSrcInImg = (imgHtmlText) => {
  const list = imgHtmlText.split('<img src="');
  const imgUrl = list[1].split('"')[0];
  return imgUrl;
};
const getTextBetweenTag = (tag, htmlText) => {
  const list = htmlText.split(`</${tag}`);
  const startList = list[0].split(`<${tag}`);
  const startIndex = startList[1].indexOf(">");

  return startList[1].substring(startIndex + 1);
};

const generateWholeMetaData = async () => {
  let jsonList = [];

  for (let i = 0; i < 47; i++) {
    const oneMetaData = await getMetaData(i + 1);
    fs.writeFile(`${i + 1}.json`, oneMetaData, (err, result) => {
      console.log(err);
      console.log(result);
    });
    jsonList.push(oneMetaData);
  }

  return jsonList;
};

generateWholeMetaData().then((v) => console.log(v));
