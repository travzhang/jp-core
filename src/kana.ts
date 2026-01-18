// 五十音图

// 五十音图的行（段）
export const GOJUON_ROWS = [
  'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'
] as const;

// 五十音图的列（段）
export const GOJUON_COLS = [
  'あ', 'い', 'う', 'え', 'お'
] as const;

// 平假名五十音图
export const HIRAGANA_GOJUON: string[][] = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', '', 'ゆ', '', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', '', '', '', 'を'],
];

// 片假名五十音图
export const KATAKANA_GOJUON: string[][] = [
  ['ア', 'イ', 'ウ', 'エ', 'オ'],
  ['カ', 'キ', 'ク', 'ケ', 'コ'],
  ['サ', 'シ', 'ス', 'セ', 'ソ'],
  ['タ', 'チ', 'ツ', 'テ', 'ト'],
  ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
  ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
  ['マ', 'ミ', 'ム', 'メ', 'モ'],
  ['ヤ', '', 'ユ', '', 'ヨ'],
  ['ラ', 'リ', 'ル', 'レ', 'ロ'],
  ['ワ', '', '', '', 'ヲ'],
];

// 浊音（濁音）
export const HIRAGANA_DAKUON: string[][] = [
  ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
  ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
  ['だ', 'ぢ', 'づ', 'で', 'ど'],
  ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
];

export const KATAKANA_DAKUON: string[][] = [
  ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
  ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
  ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
  ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
];

// 半浊音（半濁音）
export const HIRAGANA_HANDAKUON: string[][] = [
  ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
];

export const KATAKANA_HANDAKUON: string[][] = [
  ['パ', 'ピ', 'プ', 'ペ', 'ポ'],
];

// 拗音（拗音）
export const HIRAGANA_YOON: string[][] = [
  ['きゃ', 'きゅ', 'きょ'],
  ['しゃ', 'しゅ', 'しょ'],
  ['ちゃ', 'ちゅ', 'ちょ'],
  ['にゃ', 'にゅ', 'にょ'],
  ['ひゃ', 'ひゅ', 'ひょ'],
  ['みゃ', 'みゅ', 'みょ'],
  ['りゃ', 'りゅ', 'りょ'],
  ['ぎゃ', 'ぎゅ', 'ぎょ'],
  ['じゃ', 'じゅ', 'じょ'],
  ['びゃ', 'びゅ', 'びょ'],
  ['ぴゃ', 'ぴゅ', 'ぴょ'],
];

export const KATAKANA_YOON: string[][] = [
  ['キャ', 'キュ', 'キョ'],
  ['シャ', 'シュ', 'ショ'],
  ['チャ', 'チュ', 'チョ'],
  ['ニャ', 'ニュ', 'ニョ'],
  ['ヒャ', 'ヒュ', 'ヒョ'],
  ['ミャ', 'ミュ', 'ミョ'],
  ['リャ', 'リュ', 'リョ'],
  ['ギャ', 'ギュ', 'ギョ'],
  ['ジャ', 'ジュ', 'ジョ'],
  ['ビャ', 'ビュ', 'ビョ'],
  ['ピャ', 'ピュ', 'ピョ'],
];

// 获取所有平假名
export function getAllHiragana(): string[] {
  const result: string[] = [];
  
  // 基本五十音
  HIRAGANA_GOJUON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  // 浊音
  HIRAGANA_DAKUON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  // 半浊音
  HIRAGANA_HANDAKUON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  // 拗音
  HIRAGANA_YOON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  return result;
}

// 获取所有片假名
export function getAllKatakana(): string[] {
  const result: string[] = [];
  
  // 基本五十音
  KATAKANA_GOJUON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  // 浊音
  KATAKANA_DAKUON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  // 半浊音
  KATAKANA_HANDAKUON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  // 拗音
  KATAKANA_YOON.forEach(row => {
    row.forEach(char => {
      if (char) result.push(char);
    });
  });
  
  return result;
}

// 判断字符是否为平假名
export function isHiragana(char: string): boolean {
  return /^[\u3040-\u309F]+$/.test(char);
}

// 判断字符是否为片假名
export function isKatakana(char: string): boolean {
  return /^[\u30A0-\u30FF]+$/.test(char);
}

// 判断字符是否为假名（平假名或片假名）
export function isKana(char: string): boolean {
  return isHiragana(char) || isKatakana(char);
}

// 平假名转片假名
export function hiraganaToKatakana(hiragana: string): string {
  return hiragana.replace(/[\u3041-\u3096]/g, (match) => {
    const code = match.charCodeAt(0);
    return String.fromCharCode(code + 0x60);
  });
}

// 片假名转平假名
export function katakanaToHiragana(katakana: string): string {
  return katakana.replace(/[\u30A1-\u30F6]/g, (match) => {
    const code = match.charCodeAt(0);
    return String.fromCharCode(code - 0x60);
  });
}
