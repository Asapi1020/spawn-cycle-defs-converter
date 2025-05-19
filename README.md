# spawn-cycle-defs-converter

A tool to convert spawn cycle data from one format to another.

## install

```sh
pnpm i -D @asp1020/spawn-cycle-converter
```

## TXT to UC

```sh
txt2uc cycleName --date 2015-11-18 --author Mr.Foster
```
- Default date is today.
- Default author is "Unknown"

## UC to TXT

```sh
uc2txt cycleName
```

## Configuration

Make a `sccConfig.json` on your root directory.

example
```json
{
	"txtDir": "./your-directory-contains-txt",
	"ucDir": "./your-directory-contains-uc",
	"combinedClassNameStyle": true
}
```
- combinedClassNameStyle [optional] - Set true and make class name same as cycle name. This is a style used in Combined CD
