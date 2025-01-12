import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline';

// 関数の型
type FactorialFun = (num: number) => number;

// 階乗の計算過程を保存する配列
let calcSteps: number[] = [];

// 階乗を計算する再帰関数
const factorial: FactorialFun = (num: number): number => {
  switch (num) {
    case 0:
      return 0;

    case 1:
      calcSteps.push(1);
      return 1;

    default:
      calcSteps.push(num);
      return num * factorial(num - 1);
  }
};

const rl = readline.createInterface({ input, output });

// ユーザー入力を処理する関数
const main = async () => {
  try {
    while (true) {
      const input = await new Promise<string>((resolve) => {
        rl.question('正整数Nを入力してください。: ', resolve);
      });

      const num = parseInt(input);

      if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
        console.log('正整数を入力してください。');
        continue;
      }

      const result = factorial(num);
      const calculation = calcSteps.join(' x ');
      console.log(`${num}! = ${calculation} = ${result}`);
      calcSteps = [];
    }
  } finally {
    rl.close();
  }
};

main().catch(console.error);
