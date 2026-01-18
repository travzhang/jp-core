import { expect, test, describe } from '@rstest/core';
import {
  HIRAGANA_GOJUON,
  KATAKANA_GOJUON,
  HIRAGANA_DAKUON,
  KATAKANA_DAKUON,
  HIRAGANA_HANDAKUON,
  KATAKANA_HANDAKUON,
  HIRAGANA_YOON,
  KATAKANA_YOON,
  getAllHiragana,
  getAllKatakana,
  isHiragana,
  isKatakana,
  isKana,
  hiraganaToKatakana,
  katakanaToHiragana,
} from '../src/kana';

describe('五十音图', () => {
  describe('基本五十音图', () => {
    test('平假名五十音图应该有10行', () => {
      expect(HIRAGANA_GOJUON.length).toBe(10);
    });

    test('片假名五十音图应该有10行', () => {
      expect(KATAKANA_GOJUON.length).toBe(10);
    });

    test('每行应该有5列', () => {
      HIRAGANA_GOJUON.forEach(row => {
        expect(row.length).toBe(5);
      });
      KATAKANA_GOJUON.forEach(row => {
        expect(row.length).toBe(5);
      });
    });

    test('平假名第一行应该是あいうえお', () => {
      expect(HIRAGANA_GOJUON[0]).toEqual(['あ', 'い', 'う', 'え', 'お']);
    });

    test('片假名第一行应该是アイウエオ', () => {
      expect(KATAKANA_GOJUON[0]).toEqual(['ア', 'イ', 'ウ', 'エ', 'オ']);
    });

    test('平假名和片假名应该对应', () => {
      for (let i = 0; i < HIRAGANA_GOJUON.length; i++) {
        for (let j = 0; j < HIRAGANA_GOJUON[i].length; j++) {
          const hiragana = HIRAGANA_GOJUON[i][j];
          const katakana = KATAKANA_GOJUON[i][j];
          if (hiragana && katakana) {
            expect(hiraganaToKatakana(hiragana)).toBe(katakana);
          }
        }
      }
    });
  });

  describe('浊音', () => {
    test('平假名浊音应该有4行', () => {
      expect(HIRAGANA_DAKUON.length).toBe(4);
    });

    test('片假名浊音应该有4行', () => {
      expect(KATAKANA_DAKUON.length).toBe(4);
    });

    test('浊音第一行应该是がぎぐげご', () => {
      expect(HIRAGANA_DAKUON[0]).toEqual(['が', 'ぎ', 'ぐ', 'げ', 'ご']);
    });

    test('片假名浊音第一行应该是ガギグゲゴ', () => {
      expect(KATAKANA_DAKUON[0]).toEqual(['ガ', 'ギ', 'グ', 'ゲ', 'ゴ']);
    });
  });

  describe('半浊音', () => {
    test('平假名半浊音应该有1行', () => {
      expect(HIRAGANA_HANDAKUON.length).toBe(1);
    });

    test('片假名半浊音应该有1行', () => {
      expect(KATAKANA_HANDAKUON.length).toBe(1);
    });

    test('半浊音应该是ぱぴぷぺぽ', () => {
      expect(HIRAGANA_HANDAKUON[0]).toEqual(['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ']);
    });

    test('片假名半浊音应该是パピプペポ', () => {
      expect(KATAKANA_HANDAKUON[0]).toEqual(['パ', 'ピ', 'プ', 'ペ', 'ポ']);
    });
  });

  describe('拗音', () => {
    test('平假名拗音应该有11行', () => {
      expect(HIRAGANA_YOON.length).toBe(11);
    });

    test('片假名拗音应该有11行', () => {
      expect(KATAKANA_YOON.length).toBe(11);
    });

    test('拗音第一行应该是きゃきゅきょ', () => {
      expect(HIRAGANA_YOON[0]).toEqual(['きゃ', 'きゅ', 'きょ']);
    });

    test('片假名拗音第一行应该是キャキュキョ', () => {
      expect(KATAKANA_YOON[0]).toEqual(['キャ', 'キュ', 'キョ']);
    });
  });

  describe('获取所有假名', () => {
    test('getAllHiragana应该返回所有平假名', () => {
      const allHiragana = getAllHiragana();
      expect(allHiragana.length).toBeGreaterThan(0);
      expect(allHiragana).toContain('あ');
      expect(allHiragana).toContain('が');
      expect(allHiragana).toContain('ぱ');
      expect(allHiragana).toContain('きゃ');
    });

    test('getAllKatakana应该返回所有片假名', () => {
      const allKatakana = getAllKatakana();
      expect(allKatakana.length).toBeGreaterThan(0);
      expect(allKatakana).toContain('ア');
      expect(allKatakana).toContain('ガ');
      expect(allKatakana).toContain('パ');
      expect(allKatakana).toContain('キャ');
    });

    test('所有平假名都应该是平假名', () => {
      const allHiragana = getAllHiragana();
      allHiragana.forEach(char => {
        expect(isHiragana(char)).toBe(true);
      });
    });

    test('所有片假名都应该是片假名', () => {
      const allKatakana = getAllKatakana();
      allKatakana.forEach(char => {
        expect(isKatakana(char)).toBe(true);
      });
    });
  });

  describe('假名判断函数', () => {
    test('isHiragana应该正确识别平假名', () => {
      expect(isHiragana('あ')).toBe(true);
      expect(isHiragana('が')).toBe(true);
      expect(isHiragana('ぱ')).toBe(true);
      expect(isHiragana('きゃ')).toBe(true);
      expect(isHiragana('ア')).toBe(false);
      expect(isHiragana('a')).toBe(false);
      expect(isHiragana('1')).toBe(false);
    });

    test('isKatakana应该正确识别片假名', () => {
      expect(isKatakana('ア')).toBe(true);
      expect(isKatakana('ガ')).toBe(true);
      expect(isKatakana('パ')).toBe(true);
      expect(isKatakana('キャ')).toBe(true);
      expect(isKatakana('あ')).toBe(false);
      expect(isKatakana('a')).toBe(false);
      expect(isKatakana('1')).toBe(false);
    });

    test('isKana应该正确识别所有假名', () => {
      expect(isKana('あ')).toBe(true);
      expect(isKana('ア')).toBe(true);
      expect(isKana('が')).toBe(true);
      expect(isKana('ガ')).toBe(true);
      expect(isKana('a')).toBe(false);
      expect(isKana('1')).toBe(false);
      expect(isKana('漢')).toBe(false);
    });
  });

  describe('假名转换函数', () => {
    test('hiraganaToKatakana应该正确转换平假名到片假名', () => {
      expect(hiraganaToKatakana('あ')).toBe('ア');
      expect(hiraganaToKatakana('が')).toBe('ガ');
      expect(hiraganaToKatakana('ぱ')).toBe('パ');
      expect(hiraganaToKatakana('きゃ')).toBe('キャ');
      expect(hiraganaToKatakana('あいうえお')).toBe('アイウエオ');
    });

    test('katakanaToHiragana应该正确转换片假名到平假名', () => {
      expect(katakanaToHiragana('ア')).toBe('あ');
      expect(katakanaToHiragana('ガ')).toBe('が');
      expect(katakanaToHiragana('パ')).toBe('ぱ');
      expect(katakanaToHiragana('キャ')).toBe('きゃ');
      expect(katakanaToHiragana('アイウエオ')).toBe('あいうえお');
    });

    test('转换应该是可逆的', () => {
      const hiragana = 'あいうえおかきくけこ';
      const katakana = hiraganaToKatakana(hiragana);
      expect(katakanaToHiragana(katakana)).toBe(hiragana);
    });
  });
});
