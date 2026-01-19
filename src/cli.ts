#!/usr/bin/env node

import { createInterface } from 'readline';
import { getParticleInfo, getAllParticles, getParticlesByType, ParticleType } from './particle';
import { 
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
  VerbType 
} from './verb';
import { 
  getAdjectiveType, 
  adjectiveNegative, 
  adjectivePast, 
  adjectivePastNegative, 
  adjectiveTeForm, 
  adjectiveAdverb, 
  adjectiveBaForm,
  AdjectiveType 
} from './adjective';
import { getAllAdverbs, isTimeAdverb, isDegreeAdverb, isMannerAdverb } from './adverb';
import { hiraganaToKatakana, katakanaToHiragana, isHiragana, isKatakana } from './kana';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printHelp() {
  console.log(`
日语学习工具 - 命令行界面

命令列表：
  help, h              - 显示帮助信息
  particle <助词>      - 查询助词信息（如: particle は）
  particles            - 列出所有助词
  verb <动词>          - 查询动词的所有变形（如: verb 食べる）
  adjective <形容词>   - 查询形容词的所有变形（如: adjective 高い）
  adverb <副词>        - 查询副词信息（如: adverb とても）
  kana <假名>          - 假名转换（如: kana あいうえお）
  exit, quit, q        - 退出程序

示例：
  > particle は
  > verb 食べる
  > adjective 高い
  > kana あいうえお
`);
}

function queryParticle(particle: string) {
  const info = getParticleInfo(particle);
  if (!info) {
    console.log(`未找到助词 "${particle}"`);
    return;
  }
  
  console.log(`\n助词: ${info.particle}`);
  console.log(`类型: ${info.type.join('、')}`);
  console.log(`含义: ${info.meaning}`);
  console.log(`示例:`);
  info.examples.forEach((example, index) => {
    console.log(`  ${index + 1}. ${example}`);
  });
  console.log();
}

function listAllParticles() {
  const particles = getAllParticles();
  console.log(`\n所有助词 (共${particles.length}个):\n`);
  particles.forEach((p, index) => {
    console.log(`${index + 1}. ${p.particle} - ${p.meaning}`);
  });
  console.log();
}

function queryVerb(verb: string) {
  try {
    const type = getVerbType(verb);
    console.log(`\n动词: ${verb}`);
    console.log(`类型: ${type}`);
    console.log(`\n变形:`);
    console.log(`  ます形: ${masuForm(verb)}`);
    console.log(`  て形: ${teForm(verb)}`);
    console.log(`  た形: ${taForm(verb)}`);
    console.log(`  ない形: ${naiForm(verb)}`);
    console.log(`  ば形: ${baForm(verb)}`);
    console.log(`  命令形: ${imperativeForm(verb)}`);
    console.log(`  可能形: ${potentialForm(verb)}`);
    console.log(`  被动形: ${passiveForm(verb)}`);
    console.log(`  使役形: ${causativeForm(verb)}`);
    console.log(`  意志形: ${volitionalForm(verb)}`);
    console.log();
  } catch (error: any) {
    console.log(`错误: ${error.message}\n`);
  }
}

function queryAdjective(adjective: string) {
  try {
    const type = getAdjectiveType(adjective);
    console.log(`\n形容词: ${adjective}`);
    console.log(`类型: ${type}`);
    console.log(`\n变形:`);
    console.log(`  否定形: ${adjectiveNegative(adjective)}`);
    console.log(`  过去形: ${adjectivePast(adjective)}`);
    console.log(`  过去否定形: ${adjectivePastNegative(adjective)}`);
    console.log(`  て形: ${adjectiveTeForm(adjective)}`);
    console.log(`  副词形: ${adjectiveAdverb(adjective)}`);
    console.log(`  ば形: ${adjectiveBaForm(adjective)}`);
    console.log();
  } catch (error: any) {
    console.log(`错误: ${error.message}\n`);
  }
}

function queryAdverb(adverb: string) {
  const allAdverbs = getAllAdverbs();
  if (!allAdverbs.includes(adverb)) {
    console.log(`未找到副词 "${adverb}"\n`);
    return;
  }
  
  console.log(`\n副词: ${adverb}`);
  const types: string[] = [];
  if (isTimeAdverb(adverb)) types.push('时间副词');
  if (isDegreeAdverb(adverb)) types.push('程度副词');
  if (isMannerAdverb(adverb)) types.push('状态副词');
  
  if (types.length > 0) {
    console.log(`类型: ${types.join('、')}`);
  }
  console.log();
}

function convertKana(text: string) {
  console.log(`\n原文: ${text}`);
  
  if (isHiragana(text)) {
    const katakana = hiraganaToKatakana(text);
    console.log(`片假名: ${katakana}`);
  } else if (isKatakana(text)) {
    const hiragana = katakanaToHiragana(text);
    console.log(`平假名: ${hiragana}`);
  } else {
    // 混合或包含其他字符，尝试转换
    const hasHiragana = /[\u3040-\u309F]/.test(text);
    const hasKatakana = /[\u30A0-\u30FF]/.test(text);
    
    if (hasHiragana) {
      const katakana = hiraganaToKatakana(text);
      console.log(`转换为片假名: ${katakana}`);
    }
    if (hasKatakana) {
      const hiragana = katakanaToHiragana(text);
      console.log(`转换为平假名: ${hiragana}`);
    }
    if (!hasHiragana && !hasKatakana) {
      console.log(`未检测到假名字符`);
    }
  }
  console.log();
}

function processCommand(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return;
  
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');
  
  switch (command) {
    case 'help':
    case 'h':
      printHelp();
      break;
      
    case 'particle':
      if (!args) {
        console.log('请提供助词，例如: particle は\n');
      } else {
        queryParticle(args);
      }
      break;
      
    case 'particles':
      listAllParticles();
      break;
      
    case 'verb':
      if (!args) {
        console.log('请提供动词，例如: verb 食べる\n');
      } else {
        queryVerb(args);
      }
      break;
      
    case 'adjective':
      if (!args) {
        console.log('请提供形容词，例如: adjective 高い\n');
      } else {
        queryAdjective(args);
      }
      break;
      
    case 'adverb':
      if (!args) {
        console.log('请提供副词，例如: adverb とても\n');
      } else {
        queryAdverb(args);
      }
      break;
      
    case 'kana':
      if (!args) {
        console.log('请提供假名，例如: kana あいうえお\n');
      } else {
        convertKana(args);
      }
      break;
      
    case 'exit':
    case 'quit':
    case 'q':
      console.log('再见！');
      rl.close();
      process.exit(0);
      break;
      
    default:
      console.log(`未知命令: ${command}`);
      console.log('输入 help 查看帮助信息\n');
  }
}

function main() {
  console.log('欢迎使用日语学习工具！');
  console.log('输入 help 查看帮助信息\n');
  
  rl.setPrompt('> ');
  rl.prompt();
  
  rl.on('line', (input) => {
    processCommand(input);
    rl.prompt();
  });
  
  rl.on('close', () => {
    console.log('\n再见！');
    process.exit(0);
  });
}

if (require.main === module) {
  main();
}
