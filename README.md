# Meta-heuristics

This repository contains heuristics, also meta-heuristics

## Usage

Run `npm run gen` to generate a sample them, run the heuristics
using `npm run start`, check results on "result.txt" also if you
want to keep that data you can use `npm run start k` to keep your
results on results directory, you can also pass first schema
definition by using options on this table

| options              | Command             |
| -------------------- | ------------------- |
| Max cost             | `npm run start k c` |
| Min volume           | `npm run start k v` |
| Max cost over volume | `npm run start k o` |
| Max k factor         | `npm run start k k` |
