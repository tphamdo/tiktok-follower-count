import axios from 'axios';
import path from 'path';
import fs from 'fs';

function formatNum(num: string) {
  num = String(num)
  num = num.replace('M', '*1000000')
  num = num.replace('K', '*1000')

  num = eval(num)
  return num.toLocaleString()
}

const REGEX = /followerCount":(.+),/;

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Expected 1 argument. ts-node tiktok.ts <input-file>');
    return;
  }

  const inputFile = args[0];
  try {
    const data = fs.readFileSync(inputFile, 'utf-8');
    const usernames = data.split('\n');

    for (const username of usernames) {
      if (!username) {
        console.log('');
      } else {
        const followerCount = await getTiktokFollowerCount(username);
        console.log(followerCount);
      }
    }
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

async function getTiktokFollowerCount(username: string): Promise<string> {
  return axios
    .get(`https://www.tiktok.com/@${username}`)
    .then((response) => {
      let data: string = response.data;

      const index = data.indexOf("followerCount");
      data = data.slice(index, index + 30);

      const matches = data.match(REGEX);
      if (matches && matches.length >= 1) {
        return formatNum(matches[1]);
      } else {
        return "Error: Found no match";
      }
    })
    .catch(() => {
      return "Error: caught an error";
    });
}

main();
