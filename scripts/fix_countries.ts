import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const translationMap: Record<string, string> = {
  "俄国": "Russia",
  "哈萨克斯坦": "Kazakhstan",
  "阿拉伯联合酋长国": "United Arab Emirates",
  "印度尼西亚": "Indonesia",
  "捷克共和国": "Czech Republic",
  "约旦": "Jordan",
  "阿曼": "Oman",
  "菲律宾": "Philippines",
  "文莱": "Brunei",
  "卢森堡": "Luxembourg",
  "白俄罗斯": "Belarus",
  "乌兹别克斯坦": "Uzbekistan",
  "越南": "Vietnam",
  "哥斯达黎加": "Costa Rica",
  "科威特": "Kuwait",
  "孟加拉国": "Bangladesh",
  "巴林": "Bahrain",
  "乌拉圭": "Uruguay",
  "阿塞拜疆": "Azerbaijan",
  "北赛普勒斯": "Northern Cyprus",
  "委内瑞拉": "Venezuela",
  "突尼斯": "Tunisia",
  "伊拉克": "Iraq",
  "古巴": "Cuba",
  "厄瓜多尔": "Ecuador",
  "加纳": "Ghana",
  "埃塞俄比亚": "Ethiopia",
  "北塞浦路斯": "Northern Cyprus",
  "吉尔吉斯斯坦": "Kyrgyzstan",
  "格鲁吉亚": "Georgia",
  "亚美尼亚": "Armenia",
  "委内瑞拉玻利瓦尔共和": "Venezuela",
  "巴勒斯坦": "Palestine",
  "波多黎各": "Puerto Rico",
  "斯里兰卡": "Sri Lanka",
  "尼日利亚": "Nigeria",
  "肯尼亚": "Kenya",
  "乌干达": "Uganda",
  "摩洛哥": "Morocco",
  "阿拉伯叙利亚共和国": "Syria",
  "多明尼加共和国": "Dominican Republic",
  "巴拉圭": "Paraguay",
  "危地马拉": "Guatemala",
  "巴拿马": "Panama",
  "苏丹": "Sudan",
  "波斯尼亚和黑塞哥维那": "Bosnia and Herzegovina",
  "俄罗斯联邦": "Russia",
  "洪都拉斯": "Honduras",
  "利比亚": "Libya",
  "科索沃": "Kosovo",
  "牙买加": "Jamaica",
  "塞内加尔": "Senegal",
  "贝宁": "Benin",
  "卢旺达": "Rwanda",
  "刚果民主共和国": "Democratic Republic of the Congo",
  "台湾": "Taiwan",
  "尼泊尔": "Nepal",
  "蒙古": "Mongolia",
  "阿尔及利亚": "Algeria",
  "喀麦隆": "Cameroon",
  "也门": "Yemen",
  "津巴布韦": "Zimbabwe",
  "玻利维亚": "Bolivia",
  "坦桑尼亚": "Tanzania",
  "赞比亚": "Zambia",
  "莫桑比克": "Mozambique",
  "纳米比亚": "Namibia",
  "毛里求斯": "Mauritius",
  "博茨瓦纳": "Botswana",
  "马拉维": "Malawi",
  "黑山": "Montenegro",
  "斐济": "Fiji",
  "南韩": "South Korea",
  "北马其顿": "North Macedonia"
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const db = mongoose.connection.db;
  const Country = db.collection('countries');
  
  const countries = await Country.find({}).toArray();
  let updatedCount = 0;
  
  for (let c of countries) {
    if (c.name.en && /[\u4e00-\u9fa5]/.test(c.name.en)) {
      const chineseName = c.name.en;
      const englishName = translationMap[chineseName] || chineseName;
      
      if (englishName !== chineseName) {
        await Country.updateOne(
          { _id: c._id },
          { $set: { "name.en": englishName, "name.cn": chineseName } }
        );
        updatedCount++;
        console.log(`Updated ${chineseName} -> EN: ${englishName}, CN: ${chineseName}`);
      } else {
        console.log(`Missing translation for: ${chineseName}`);
      }
    }
  }
  
  console.log(`Done! Updated ${updatedCount} countries.`);
  process.exit(0);
}
run();
