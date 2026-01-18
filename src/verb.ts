// 动词变形引擎

// 动词类型
export enum VerbType {
  GODAN = '一类', // 五段动词
  ICHIDAN = '二类', // 一段动词
  SURU = '三类サ变', // サ变动词
  KURU = '三类カ变', // カ变动词
}

// 五段动词词尾映射表（う段 -> あ段、い段、う段、え段、お段）
const GODAN_CONJUGATION_MAP: Record<string, string[]> = {
  'う': ['わ', 'い', 'う', 'え', 'お'],
  'く': ['か', 'き', 'く', 'け', 'こ'],
  'ぐ': ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
  'す': ['さ', 'し', 'す', 'せ', 'そ'],
  'つ': ['た', 'ち', 'つ', 'て', 'と'],
  'ぬ': ['な', 'に', 'ぬ', 'ね', 'の'],
  'ふ': ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  'ぶ': ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
  'む': ['ま', 'み', 'む', 'め', 'も'],
  'る': ['ら', 'り', 'る', 'れ', 'ろ'],
};

// 常见汉字动词到平假名的映射
const KANJI_VERB_MAP: Record<string, string> = {
  '行く': 'いく',
  '来る': 'くる',
};

// 规范化动词输入（将汉字动词转换为平假名）
function normalizeVerb(verb: string): string {
  return KANJI_VERB_MAP[verb] || verb;
}

// 判断动词类型
export function getVerbType(verb: string): VerbType {
  if (!verb || verb.length === 0) {
    throw new Error('动词不能为空');
  }

  // 规范化动词
  const normalizedVerb = normalizeVerb(verb);

  // 检查是否为カ变动词
  if (normalizedVerb === 'くる') {
    return VerbType.KURU;
  }

  // 检查是否为サ变动词
  if (normalizedVerb === 'する' || normalizedVerb.endsWith('する')) {
    return VerbType.SURU;
  }

  // 检查是否为一段动词（二类动词）
  // 词尾必须是る，且る前面的假名在い段或え段
  if (normalizedVerb.endsWith('る') && normalizedVerb.length >= 2) {
    const secondLastChar = normalizedVerb[normalizedVerb.length - 2];
    // い段：き、し、ち、に、ひ、み、り、ぎ、じ、ぢ、び、ぴ
    // え段：け、せ、て、ね、へ、め、れ、げ、ぜ、で、べ、ぺ
    const ichidanEndings = [
      'き', 'し', 'ち', 'に', 'ひ', 'み', 'り', 'ぎ', 'じ', 'ぢ', 'び', 'ぴ',
      'け', 'せ', 'て', 'ね', 'へ', 'め', 'れ', 'げ', 'ぜ', 'で', 'べ', 'ぺ'
    ];
    
    if (ichidanEndings.includes(secondLastChar)) {
      // 排除一些特殊的一类动词（如：帰る、走る、知る等）
      // 注意：ねる（寝る）是二类动词，不在例外列表中
      const exceptions = ['かえる', 'はしる', 'しる', 'きる', 'はいる', 'いる', 'へる', 'かぎる', 'ける', 'まいる', 'まじる', 'にぎる', 'ちる', 'てる', 'しげる', 'あせる', 'すべる', 'しゃべる', 'かじる', 'しめる', 'みなぎる'];
      if (!exceptions.includes(normalizedVerb)) {
        return VerbType.ICHIDAN;
      }
    }
  }

  // 默认为五段动词（一类动词）
  return VerbType.GODAN;
}

// 获取五段动词的词干和词尾
function getGodanStemAndEnding(verb: string): { stem: string; ending: string } {
  const normalizedVerb = normalizeVerb(verb);
  const lastChar = normalizedVerb[normalizedVerb.length - 1];
  if (!GODAN_CONJUGATION_MAP[lastChar]) {
    throw new Error(`无效的五段动词词尾: ${lastChar}`);
  }
  return {
    stem: normalizedVerb.slice(0, -1),
    ending: lastChar,
  };
}

// 获取一段动词的词干
function getIchidanStem(verb: string): string {
  if (!verb.endsWith('る')) {
    throw new Error('一段动词必须以る结尾');
  }
  return verb.slice(0, -1);
}

// 获取サ变动词的词干
function getSuruStem(verb: string): string {
  if (verb === 'する') {
    return '';
  }
  if (verb.endsWith('する')) {
    return verb.slice(0, -2);
  }
  throw new Error('无效的サ变动词');
}

// ========== 一类动词（五段动词）变形 ==========

// ます形（连用形）
export function masuForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const iForm = GODAN_CONJUGATION_MAP[ending][1]; // い段
    return stem + iForm;
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb);
  }
  
  if (type === VerbType.SURU) {
    const stem = getSuruStem(verb);
    return stem + 'し';
  }
  
  if (type === VerbType.KURU) {
    return 'き';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// て形
export function teForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    let teFormEnding: string;
    
    // 特殊规则：い音便、促音便、拨音便
    if (ending === 'う' || ending === 'つ' || ending === 'る') {
      // 促音便：って
      teFormEnding = 'って';
    } else if (ending === 'む' || ending === 'ぶ' || ending === 'ぬ') {
      // 拨音便：んで
      teFormEnding = 'んで';
    } else if (ending === 'く') {
      // い音便：いて（但行く是特殊：いって）
      const normalizedVerb = normalizeVerb(verb);
      if (normalizedVerb === 'いく') {
        teFormEnding = 'って';
      } else {
        teFormEnding = 'いて';
      }
    } else if (ending === 'ぐ') {
      // い音便：いで
      teFormEnding = 'いで';
    } else if (ending === 'す') {
      // して
      teFormEnding = 'して';
    } else {
      teFormEnding = 'て';
    }
    
    return stem + teFormEnding;
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'て';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'して';
  }
  
  if (type === VerbType.KURU) {
    return 'きて';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// た形（过去形）
export function taForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    let taFormEnding: string;
    
    // 特殊规则：い音便、促音便、拨音便
    if (ending === 'う' || ending === 'つ' || ending === 'る') {
      // 促音便：った
      taFormEnding = 'った';
    } else if (ending === 'む' || ending === 'ぶ' || ending === 'ぬ') {
      // 拨音便：んだ
      taFormEnding = 'んだ';
    } else if (ending === 'く') {
      // い音便：いた（但行く是特殊：いった）
      const normalizedVerb = normalizeVerb(verb);
      if (normalizedVerb === 'いく') {
        taFormEnding = 'った';
      } else {
        taFormEnding = 'いた';
      }
    } else if (ending === 'ぐ') {
      // い音便：いだ
      taFormEnding = 'いだ';
    } else if (ending === 'す') {
      // した
      taFormEnding = 'した';
    } else {
      taFormEnding = 'た';
    }
    
    return stem + taFormEnding;
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'た';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'した';
  }
  
  if (type === VerbType.KURU) {
    return 'きた';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// ない形（未然形）
export function naiForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const aForm = GODAN_CONJUGATION_MAP[ending][0]; // あ段
    return stem + aForm + 'ない';
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'ない';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'しない';
  }
  
  if (type === VerbType.KURU) {
    return 'こない';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// ば形（假定形）
export function baForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const eForm = GODAN_CONJUGATION_MAP[ending][3]; // え段
    return stem + eForm + 'ば';
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'れば';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'すれば';
  }
  
  if (type === VerbType.KURU) {
    return 'くれば';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// 命令形
export function imperativeForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const eForm = GODAN_CONJUGATION_MAP[ending][3]; // え段
    return stem + eForm;
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'ろ';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'しろ';
  }
  
  if (type === VerbType.KURU) {
    return 'こい';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// 可能形
export function potentialForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const eForm = GODAN_CONJUGATION_MAP[ending][3]; // え段
    return stem + eForm + 'る';
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'られる';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'できる';
  }
  
  if (type === VerbType.KURU) {
    return 'こられる';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// 被动形
export function passiveForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const aForm = GODAN_CONJUGATION_MAP[ending][0]; // あ段
    return stem + aForm + 'れる';
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'られる';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'される';
  }
  
  if (type === VerbType.KURU) {
    return 'こられる';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// 使役形
export function causativeForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const aForm = GODAN_CONJUGATION_MAP[ending][0]; // あ段
    return stem + aForm + 'せる';
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'させる';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'させる';
  }
  
  if (type === VerbType.KURU) {
    return 'こさせる';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}

// 意志形（意向形）
export function volitionalForm(verb: string): string {
  const type = getVerbType(verb);
  
  if (type === VerbType.GODAN) {
    const { stem, ending } = getGodanStemAndEnding(verb);
    const oForm = GODAN_CONJUGATION_MAP[ending][4]; // お段
    return stem + oForm + 'う';
  }
  
  if (type === VerbType.ICHIDAN) {
    return getIchidanStem(verb) + 'よう';
  }
  
  if (type === VerbType.SURU) {
    return getSuruStem(verb) + 'しよう';
  }
  
  if (type === VerbType.KURU) {
    return 'こよう';
  }
  
  throw new Error(`不支持的动词类型: ${type}`);
}
