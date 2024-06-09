# Meta - heuristics

This repository contains heuristics, also meta-heuristics implemented to solve a generic backpack problem; it owns 3 methods:

- Path and neighborhood heuristics
- GRASP (Greedy randomized adaptive search procedure)
- Genetic algorithm approach

Each one of those can be set using a ".env" file, this file is too important, it contains all the environmental data, that
this implementation uses, there are some notes about its configurations process below

## Prerequisites for Configuration

This implementation require at least [nodejs](https://nodejs.org/en/) version 16, using [npm](https://www.npmjs.com/) or
[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) to handle with modules (Usage section uses npm);
you will also need a [python3](https://www.python.org/downloads/) compiler at least version 10 and
[pip](https://pip.pypa.io/en/stable/cli/pip_install/) if you want to use the graphics module to see your metrics using some plots;
its recommended to use [virtual environments](https://docs.python.org/3/tutorial/venv.html)
since this implementation currently is NOT using docker. Once you have installed all the needed dependencies create a ".env" file
using ".env.example" as a template

## Configuration

#### .env file

To generate an ".env" file using the ".env.example" file as a template you can use the command:

```
touch .env
cat .env.example > .env
code .env # Or nano .env or vim .env
```

A quick example of configuration can be this one (You can copy-past it):

```.txt
EPOCHS=1
LOGGER=1
HEURISTIC="path"
SOLUTION_SIZE=10
ITERATION_LIMIT=10
BACKPACK=0.4
INFEASIBLE_LIMIT=2
RELEVANT=2
```

If you used vim press i to write, move with arrows then esc esc; then type ":wq"

#### Node dependencies

To install install node dependencies using npm it is as simple as run:

```
npm install
```

There should be a new folder named "node_modules", once the folder is there you can use npm scripts,
to make the file system create folders samples logs plots or simple run:

```
npm run init
```

Then you need some data to run the software, you can use a command to generated data, that data is different
every time you run the command, but you can also load your own data if you follow the structure of the generated
files, to get a sample use:

```
npm run gen
```

You can log the process using 2 options one of those is by setting LOGGER to 1 on your .env file, the other is by
running a command this command generates a .txt file containing all the process followed by the algorithms:

```
npm run log
```

> This command might not work on Windows

To get plots from a process, you need to keep some data as a file, this implementation uses a command for that, to
generated those plots as images there is another command, but this is quite simple to use, just run it as follows:

```
npm run start k
npm run image
```

There is one last command to clean old data that eventually you could not need, if you need it to, you can clean
information from logs and samples using:

```
npm run clean
```

#### Virtual environment

To create a virtual environment first close any previous one, to prevent overwriting some other dependencies using:

```
deactivate
```

Then create and run a new virtual environment to make graphics module work using:

```
python3 -m venv graphics
source graphics/bin/activate
```

You should see an icon or prompt with the label "graphics", on your terminal, if it is so, then install dependencies

```
python -m pip install -r python_requirements.txt
```

> Note: This configuration explanation was made thinking on linux users, it should also work on Mac; Windows users have to make this using default Win GUI

## Usage

#### Path and neighborhood heuristics

| Options              | Command             |
| -------------------- | ------------------- |
| Max cost             | `npm run start k c` |
| Min volume           | `npm run start k v` |
| Max cost over volume | `npm run start k o` |
| Max k factor         | `npm run start k k` |

> Default `npm run start` and `npm run start k` uses randomness to define schemes
