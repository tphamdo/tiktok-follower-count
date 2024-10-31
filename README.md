# TikTok Follower Count Scraper

This is a node application to get the follower counts of a list of TikTok handles.

To install:
```console
npm install
npx tsc --init
```

First put the TikTok handles in an input file with each handle on a new line:
```text
zachking
tombrady
```

To run:
```console
npx ts-node tiktok.ts <input-file>
```

For example, you may get:
```shell-session
foo@bar:~$ npx ts-node tiktok.ts tiktok-input.txt
82,200,000
4,900,000

```

To pipe output to a file, you can run:
```console
npx ts-node tiktok.ts <input-file> 2>&1 | tee <output-file>
```
