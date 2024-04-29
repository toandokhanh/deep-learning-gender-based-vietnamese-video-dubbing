const mongoose = require('mongoose');
const Language = require('../../../app/models/Language');
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/ct551_v3';

const dataLanguage = [
  {
    id: 'auto',
    name: 'Tự động nhận dạng ngôn ngữ (default)'
  },
  {
    id: 'vi',
    name: 'Tiếng Việt'
  },
  {
    id: 'en',
    name: 'Tiếng Anh'
  },
  {
    id: 'af',
    name: 'Tiếng Afrikaans'
  },
  {
    id: 'am',
    name: 'Tiếng Amharic'
  },
  {
    id: 'ar',
    name: 'Tiếng Ả Rập'
  },
  {
    id: 'as',
    name: 'Tiếng Assamese'
  },
  {
    id: 'az',
    name: 'Tiếng Azerbaijan'
  },
  {
    id: 'ba',
    name: 'Tiếng Bashkir'
  },
  {
    id: 'be',
    name: 'Tiếng Belarusian'
  },
  {
    id: 'bg',
    name: 'Tiếng Bulgarian'
  },
  {
    id: 'bn',
    name: 'Tiếng Bengali'
  },
  {
    id: 'bo',
    name: 'Tiếng Tibetan'
  },
  {
    id: 'br',
    name: 'Tiếng Breton'
  },
  {
    id: 'bs',
    name: 'Tiếng Bosnian'
  },
  {
    id: 'ca',
    name: 'Tiếng Catalan'
  },
  {
    id: 'cs',
    name: 'Tiếng Czech'
  },
  {
    id: 'cy',
    name: 'Tiếng Welsh'
  },
  {
    id: 'da',
    name: 'Tiếng Danish'
  },
  {
    id: 'de',
    name: 'Tiếng Đức'
  },
  {
    id: 'el',
    name: 'Tiếng Hy Lạp'
  },
  {
    id: 'es',
    name: 'Tiếng Tây Ban Nha'
  },
  {
    id: 'et',
    name: 'Tiếng Estonian'
  },
  {
    id: 'eu',
    name: 'Tiếng Basque'
  },
  {
    id: 'fa',
    name: 'Tiếng Ba Tư'
  },
  {
    id: 'fi',
    name: 'Tiếng Phần Lan'
  },
  {
    id: 'fo',
    name: 'Tiếng Faroese'
  },
  {
    id: 'fr',
    name: 'Tiếng Pháp'
  },
  {
    id: 'gl',
    name: 'Tiếng Galician'
  },
  {
    id: 'gu',
    name: 'Tiếng Gujarati'
  },
  {
    id: 'ha',
    name: 'Tiếng Hausa'
  },
  {
    id: 'haw',
    name: 'Tiếng Hawaiian'
  },
  {
    id: 'he',
    name: 'Tiếng Hebrew'
  },
  {
    id: 'hi',
    name: 'Tiếng Hindi'
  },
  {
    id: 'hr',
    name: 'Tiếng Croatian'
  },
  {
    id: 'ht',
    name: 'Tiếng Haitian Creole'
  },
  {
    id: 'hu',
    name: 'Tiếng Hungarian'
  },
  {
    id: 'hy',
    name: 'Tiếng Armenian'
  },
  {
    id: 'id',
    name: 'Tiếng Indonesia'
  },
  {
    id: 'is',
    name: 'Tiếng Icelandic'
  },
  {
    id: 'it',
    name: 'Tiếng Ý'
  },
  {
    id: 'ja',
    name: 'Tiếng Nhật'
  },
  {
    id: 'jw',
    name: 'Tiếng Javanese'
  },
  {
    id: 'ka',
    name: 'Tiếng Georgian'
  },
  {
    id: 'kk',
    name: 'Tiếng Kazakh'
  },
  {
    id: 'km',
    name: 'Tiếng Khmer'
  },
  {
    id: 'kn',
    name: 'Tiếng Kannada'
  },
  {
    id: 'ko',
    name: 'Tiếng Hàn Quốc'
  },
  {
    id: 'la',
    name: 'Tiếng Latin'
  },
  {
    id: 'lb',
    name: 'Tiếng Luxembourgish'
  },
  {
    id: 'ln',
    name: 'Tiếng Lingala'
  },
  {
    id: 'lo',
    name: 'Tiếng Lao'
  },
  {
    id: 'lt',
    name: 'Tiếng Lithuanian'
  },
  {
    id: 'lv',
    name: 'Tiếng Latvian'
  },
  {
    id: 'mg',
    name: 'Tiếng Malagasy'
  },
  {
    id: 'mi',
    name: 'Tiếng Maori'
  },
  {
    id: 'mk',
    name: 'Tiếng Macedonian'
  },
  {
    id: 'ml',
    name: 'Tiếng Malayalam'
  },
  {
    id: 'mn',
    name: 'Tiếng Mongolian'
  },
  {
    id: 'mr',
    name: 'Tiếng Marathi'
  },
  {
    id: 'ms',
    name: 'Tiếng Malay'
  },
  {
    id: 'mt',
    name: 'Tiếng Maltese'
  },
  {
    id: 'my',
    name: 'Tiếng Burmese'
  },
  {
    id: 'ne',
    name: 'Tiếng Nepali'
  },
  {
    id: 'nl',
    name: 'Tiếng Hà Lan'
  },
  {
    id: 'nn',
    name: 'Tiếng Norwegian (Nynorsk)'
  },
  {
    id: 'no',
    name: 'Tiếng Norwegian'
  },
  {
    id: 'oc',
    name: 'Tiếng Occitan'
  },
  {
    id: 'pa',
    name: 'Tiếng Punjabi'
  },
  {
    id: 'pl',
    name: 'Tiếng Ba Lan'
  },
  {
    id: 'ps',
    name: 'Tiếng Pashto'
  },
  {
    id: 'pt',
    name: 'Tiếng Bồ Đào Nha'
  },
  {
    id: 'ro',
    name: 'Tiếng Romanian'
  },
  {
    id: 'ru',
    name: 'Tiếng Nga'
  },
  {
    id: 'sa',
    name: 'Tiếng Sanskrit'
  },
  {
    id: 'sd',
    name: 'Tiếng Sindhi'
  },
  {
    id: 'si',
    name: 'Tiếng Sinhala'
  },
  {
    id: 'sk',
    name: 'Tiếng Slovak'
  },
  {
    id: 'sl',
    name: 'Tiếng Slovenian'
  },
  {
    id: 'sn',
    name: 'Tiếng Shona'
  },
  {
    id: 'so',
    name: 'Tiếng Somali'
  },
  {
    id: 'sq',
    name: 'Tiếng Albanian'
  },
  {
    id: 'sr',
    name: 'Tiếng Serbian'
  },
  {
    id: 'su',
    name: 'Tiếng Sundanese'
  },
  {
    id: 'sv',
    name: 'Tiếng Thụy Điển'
  },
  {
    id: 'sw',
    name: 'Tiếng Swahili'
  },
  {
    id: 'ta',
    name: 'Tiếng Tamil'
  },
  {
    id: 'te',
    name: 'Tiếng Telugu'
  },
  {
    id: 'tg',
    name: 'Tiếng Tajik'
  },
  {
    id: 'th',
    name: 'Tiếng Thái'
  },
  {
    id: 'tk',
    name: 'Tiếng Turkmen'
  },
  {
    id: 'tl',
    name: 'Tiếng Tagalog'
  },
  {
    id: 'tr',
    name: 'Tiếng Thổ Nhĩ Kỳ'
  },
  {
    id: 'tt',
    name: 'Tiếng Tatar'
  },
  {
    id: 'uk',
    name: 'Tiếng Ukrainian'
  },
  {
    id: 'ur',
    name: 'Tiếng Urdu'
  },
  {
    id: 'uz',
    name: 'Tiếng Uzbek'
  },
  {
    id: 'yi',
    name: 'Tiếng Yiddish'
  },
  {
    id: 'yo',
    name: 'Tiếng Yoruba'
  },
  {
    id: 'zh',
    name: 'Tiếng Trung Quốc'
  }
];

async function seedModels() {
  try {
    await Language.deleteMany(); 
    const createdLanguage = await Language.create(dataLanguage);
    console.log('seeder created successfully');
    process.exit(0); 
  } catch (error) {
    console.error('seeder created fail', error);
    process.exit(1); 
  }
}

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Mongoose successfully!');
    seedModels(); 
  })
  .catch((error) => console.error('error', error));
