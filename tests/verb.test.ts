import { expect, test, describe } from '@rstest/core';
import {
  VerbType,
  getVerbType,
  masuForm,
  teForm,
  taForm,
  naiForm,
  baForm,
  imperativeForm,
  potentialForm,
  passiveForm,
  causativeForm,
  volitionalForm,
} from '../src/verb';

describe('动词分类', () => {
  test('应该正确识别一类动词（五段动词）', () => {
    expect(getVerbType('かく')).toBe(VerbType.GODAN);
    expect(getVerbType('いく')).toBe(VerbType.GODAN);
    expect(getVerbType('はなす')).toBe(VerbType.GODAN);
    expect(getVerbType('たつ')).toBe(VerbType.GODAN);
    expect(getVerbType('よむ')).toBe(VerbType.GODAN);
    expect(getVerbType('あう')).toBe(VerbType.GODAN);
    expect(getVerbType('のむ')).toBe(VerbType.GODAN);
    expect(getVerbType('かう')).toBe(VerbType.GODAN);
  });

  test('应该正确识别二类动词（一段动词）', () => {
    expect(getVerbType('たべる')).toBe(VerbType.ICHIDAN);
    expect(getVerbType('みる')).toBe(VerbType.ICHIDAN);
    expect(getVerbType('おきる')).toBe(VerbType.ICHIDAN);
    expect(getVerbType('ねる')).toBe(VerbType.ICHIDAN);
    expect(getVerbType('でる')).toBe(VerbType.ICHIDAN);
    expect(getVerbType('あける')).toBe(VerbType.ICHIDAN);
  });

  test('应该正确识别三类动词（サ变动词）', () => {
    expect(getVerbType('する')).toBe(VerbType.SURU);
    expect(getVerbType('べんきょうする')).toBe(VerbType.SURU);
    expect(getVerbType('りょこうする')).toBe(VerbType.SURU);
  });

  test('应该正确识别三类动词（カ变动词）', () => {
    expect(getVerbType('くる')).toBe(VerbType.KURU);
    expect(getVerbType('来る')).toBe(VerbType.KURU);
  });

  test('应该正确识别特殊的一类动词', () => {
    expect(getVerbType('かえる')).toBe(VerbType.GODAN); // 帰る
    expect(getVerbType('はしる')).toBe(VerbType.GODAN); // 走る
    expect(getVerbType('しる')).toBe(VerbType.GODAN); // 知る
  });
});

describe('ます形（连用形）', () => {
  test('一类动词的ます形', () => {
    expect(masuForm('かく')).toBe('かき');
    expect(masuForm('いく')).toBe('いき');
    expect(masuForm('はなす')).toBe('はなし');
    expect(masuForm('たつ')).toBe('たち');
    expect(masuForm('よむ')).toBe('よみ');
    expect(masuForm('あう')).toBe('あい');
    expect(masuForm('のむ')).toBe('のみ');
    expect(masuForm('かう')).toBe('かい');
  });

  test('二类动词的ます形', () => {
    expect(masuForm('たべる')).toBe('たべ');
    expect(masuForm('みる')).toBe('み');
    expect(masuForm('おきる')).toBe('おき');
    expect(masuForm('ねる')).toBe('ね');
    expect(masuForm('でる')).toBe('で');
    expect(masuForm('あける')).toBe('あけ');
  });

  test('三类动词的ます形', () => {
    expect(masuForm('する')).toBe('し');
    expect(masuForm('べんきょうする')).toBe('べんきょうし');
    expect(masuForm('くる')).toBe('き');
  });
});

describe('て形', () => {
  test('一类动词的て形（促音便）', () => {
    expect(teForm('あう')).toBe('あって');
    expect(teForm('たつ')).toBe('たって');
    expect(teForm('かえる')).toBe('かえって');
  });

  test('一类动词的て形（拨音便）', () => {
    expect(teForm('よむ')).toBe('よんで');
    expect(teForm('のむ')).toBe('のんで');
    expect(teForm('あそぶ')).toBe('あそんで');
  });

  test('一类动词的て形（い音便）', () => {
    expect(teForm('かく')).toBe('かいて');
    expect(teForm('およぐ')).toBe('およいで');
  });

  test('一类动词的て形（特殊：行く）', () => {
    expect(teForm('いく')).toBe('いって');
    expect(teForm('行く')).toBe('いって');
  });

  test('一类动词的て形（す结尾）', () => {
    expect(teForm('はなす')).toBe('はなして');
  });

  test('二类动词的て形', () => {
    expect(teForm('たべる')).toBe('たべて');
    expect(teForm('みる')).toBe('みて');
    expect(teForm('おきる')).toBe('おきて');
    expect(teForm('ねる')).toBe('ねて');
  });

  test('三类动词的て形', () => {
    expect(teForm('する')).toBe('して');
    expect(teForm('べんきょうする')).toBe('べんきょうして');
    expect(teForm('くる')).toBe('きて');
  });
});

describe('た形（过去形）', () => {
  test('一类动词的た形（促音便）', () => {
    expect(taForm('あう')).toBe('あった');
    expect(taForm('たつ')).toBe('たった');
    expect(taForm('かえる')).toBe('かえった');
  });

  test('一类动词的た形（拨音便）', () => {
    expect(taForm('よむ')).toBe('よんだ');
    expect(taForm('のむ')).toBe('のんだ');
    expect(taForm('あそぶ')).toBe('あそんだ');
  });

  test('一类动词的た形（い音便）', () => {
    expect(taForm('かく')).toBe('かいた');
    expect(taForm('およぐ')).toBe('およいだ');
  });

  test('一类动词的た形（特殊：行く）', () => {
    expect(taForm('いく')).toBe('いった');
    expect(taForm('行く')).toBe('いった');
  });

  test('一类动词的た形（す结尾）', () => {
    expect(taForm('はなす')).toBe('はなした');
  });

  test('二类动词的た形', () => {
    expect(taForm('たべる')).toBe('たべた');
    expect(taForm('みる')).toBe('みた');
    expect(taForm('おきる')).toBe('おきた');
  });

  test('三类动词的た形', () => {
    expect(taForm('する')).toBe('した');
    expect(taForm('べんきょうする')).toBe('べんきょうした');
    expect(taForm('くる')).toBe('きた');
  });
});

describe('ない形（未然形）', () => {
  test('一类动词的ない形', () => {
    expect(naiForm('かく')).toBe('かかない');
    expect(naiForm('いく')).toBe('いかない');
    expect(naiForm('はなす')).toBe('はなさない');
    expect(naiForm('たつ')).toBe('たたない');
    expect(naiForm('よむ')).toBe('よまない');
    expect(naiForm('あう')).toBe('あわない');
  });

  test('二类动词的ない形', () => {
    expect(naiForm('たべる')).toBe('たべない');
    expect(naiForm('みる')).toBe('みない');
    expect(naiForm('おきる')).toBe('おきない');
  });

  test('三类动词的ない形', () => {
    expect(naiForm('する')).toBe('しない');
    expect(naiForm('べんきょうする')).toBe('べんきょうしない');
    expect(naiForm('くる')).toBe('こない');
  });
});

describe('ば形（假定形）', () => {
  test('一类动词的ば形', () => {
    expect(baForm('かく')).toBe('かけば');
    expect(baForm('いく')).toBe('いけば');
    expect(baForm('はなす')).toBe('はなせば');
    expect(baForm('たつ')).toBe('たてば');
    expect(baForm('よむ')).toBe('よめば');
    expect(baForm('あう')).toBe('あえば');
  });

  test('二类动词的ば形', () => {
    expect(baForm('たべる')).toBe('たべれば');
    expect(baForm('みる')).toBe('みれば');
    expect(baForm('おきる')).toBe('おきれば');
  });

  test('三类动词的ば形', () => {
    expect(baForm('する')).toBe('すれば');
    expect(baForm('べんきょうする')).toBe('べんきょうすれば');
    expect(baForm('くる')).toBe('くれば');
  });
});

describe('命令形', () => {
  test('一类动词的命令形', () => {
    expect(imperativeForm('かく')).toBe('かけ');
    expect(imperativeForm('いく')).toBe('いけ');
    expect(imperativeForm('はなす')).toBe('はなせ');
    expect(imperativeForm('たつ')).toBe('たて');
    expect(imperativeForm('よむ')).toBe('よめ');
    expect(imperativeForm('あう')).toBe('あえ');
  });

  test('二类动词的命令形', () => {
    expect(imperativeForm('たべる')).toBe('たべろ');
    expect(imperativeForm('みる')).toBe('みろ');
    expect(imperativeForm('おきる')).toBe('おきろ');
  });

  test('三类动词的命令形', () => {
    expect(imperativeForm('する')).toBe('しろ');
    expect(imperativeForm('べんきょうする')).toBe('べんきょうしろ');
    expect(imperativeForm('くる')).toBe('こい');
  });
});

describe('可能形', () => {
  test('一类动词的可能形', () => {
    expect(potentialForm('かく')).toBe('かける');
    expect(potentialForm('いく')).toBe('いける');
    expect(potentialForm('はなす')).toBe('はなせる');
    expect(potentialForm('たつ')).toBe('たてる');
    expect(potentialForm('よむ')).toBe('よめる');
  });

  test('二类动词的可能形', () => {
    expect(potentialForm('たべる')).toBe('たべられる');
    expect(potentialForm('みる')).toBe('みられる');
    expect(potentialForm('おきる')).toBe('おきられる');
  });

  test('三类动词的可能形', () => {
    expect(potentialForm('する')).toBe('できる');
    expect(potentialForm('べんきょうする')).toBe('べんきょうできる');
    expect(potentialForm('くる')).toBe('こられる');
  });
});

describe('被动形', () => {
  test('一类动词的被动形', () => {
    expect(passiveForm('かく')).toBe('かかれる');
    expect(passiveForm('いく')).toBe('いかれる');
    expect(passiveForm('はなす')).toBe('はなされる');
    expect(passiveForm('たつ')).toBe('たたれる');
    expect(passiveForm('よむ')).toBe('よまれる');
  });

  test('二类动词的被动形', () => {
    expect(passiveForm('たべる')).toBe('たべられる');
    expect(passiveForm('みる')).toBe('みられる');
    expect(passiveForm('おきる')).toBe('おきられる');
  });

  test('三类动词的被动形', () => {
    expect(passiveForm('する')).toBe('される');
    expect(passiveForm('べんきょうする')).toBe('べんきょうされる');
    expect(passiveForm('くる')).toBe('こられる');
  });
});

describe('使役形', () => {
  test('一类动词的使役形', () => {
    expect(causativeForm('かく')).toBe('かかせる');
    expect(causativeForm('いく')).toBe('いかせる');
    expect(causativeForm('はなす')).toBe('はなさせる');
    expect(causativeForm('たつ')).toBe('たたせる');
    expect(causativeForm('よむ')).toBe('よませる');
  });

  test('二类动词的使役形', () => {
    expect(causativeForm('たべる')).toBe('たべさせる');
    expect(causativeForm('みる')).toBe('みさせる');
    expect(causativeForm('おきる')).toBe('おきさせる');
  });

  test('三类动词的使役形', () => {
    expect(causativeForm('する')).toBe('させる');
    expect(causativeForm('べんきょうする')).toBe('べんきょうさせる');
    expect(causativeForm('くる')).toBe('こさせる');
  });
});

describe('意志形（意向形）', () => {
  test('一类动词的意志形', () => {
    expect(volitionalForm('かく')).toBe('かこう');
    expect(volitionalForm('いく')).toBe('いこう');
    expect(volitionalForm('はなす')).toBe('はなそう');
    expect(volitionalForm('たつ')).toBe('たとう');
    expect(volitionalForm('よむ')).toBe('よもう');
    expect(volitionalForm('あう')).toBe('あおう');
  });

  test('二类动词的意志形', () => {
    expect(volitionalForm('たべる')).toBe('たべよう');
    expect(volitionalForm('みる')).toBe('みよう');
    expect(volitionalForm('おきる')).toBe('おきよう');
  });

  test('三类动词的意志形', () => {
    expect(volitionalForm('する')).toBe('しよう');
    expect(volitionalForm('べんきょうする')).toBe('べんきょうしよう');
    expect(volitionalForm('くる')).toBe('こよう');
  });
});

describe('综合测试', () => {
  test('动词"かく"的所有变形', () => {
    expect(getVerbType('かく')).toBe(VerbType.GODAN);
    expect(masuForm('かく')).toBe('かき');
    expect(teForm('かく')).toBe('かいて');
    expect(taForm('かく')).toBe('かいた');
    expect(naiForm('かく')).toBe('かかない');
    expect(baForm('かく')).toBe('かけば');
    expect(imperativeForm('かく')).toBe('かけ');
    expect(potentialForm('かく')).toBe('かける');
    expect(passiveForm('かく')).toBe('かかれる');
    expect(causativeForm('かく')).toBe('かかせる');
    expect(volitionalForm('かく')).toBe('かこう');
  });

  test('动词"たべる"的所有变形', () => {
    expect(getVerbType('たべる')).toBe(VerbType.ICHIDAN);
    expect(masuForm('たべる')).toBe('たべ');
    expect(teForm('たべる')).toBe('たべて');
    expect(taForm('たべる')).toBe('たべた');
    expect(naiForm('たべる')).toBe('たべない');
    expect(baForm('たべる')).toBe('たべれば');
    expect(imperativeForm('たべる')).toBe('たべろ');
    expect(potentialForm('たべる')).toBe('たべられる');
    expect(passiveForm('たべる')).toBe('たべられる');
    expect(causativeForm('たべる')).toBe('たべさせる');
    expect(volitionalForm('たべる')).toBe('たべよう');
  });

  test('动词"する"的所有变形', () => {
    expect(getVerbType('する')).toBe(VerbType.SURU);
    expect(masuForm('する')).toBe('し');
    expect(teForm('する')).toBe('して');
    expect(taForm('する')).toBe('した');
    expect(naiForm('する')).toBe('しない');
    expect(baForm('する')).toBe('すれば');
    expect(imperativeForm('する')).toBe('しろ');
    expect(potentialForm('する')).toBe('できる');
    expect(passiveForm('する')).toBe('される');
    expect(causativeForm('する')).toBe('させる');
    expect(volitionalForm('する')).toBe('しよう');
  });

  test('动词"くる"的所有变形', () => {
    expect(getVerbType('くる')).toBe(VerbType.KURU);
    expect(masuForm('くる')).toBe('き');
    expect(teForm('くる')).toBe('きて');
    expect(taForm('くる')).toBe('きた');
    expect(naiForm('くる')).toBe('こない');
    expect(baForm('くる')).toBe('くれば');
    expect(imperativeForm('くる')).toBe('こい');
    expect(potentialForm('くる')).toBe('こられる');
    expect(passiveForm('くる')).toBe('こられる');
    expect(causativeForm('くる')).toBe('こさせる');
    expect(volitionalForm('くる')).toBe('こよう');
  });
});
