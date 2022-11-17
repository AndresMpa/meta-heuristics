from dotenv import dotenv_values
import matplotlib.pyplot as plt
from datetime import datetime
import getPlotData as data
import random

random.seed(5)


def get_marker():
    markers = [
        "o", "v", "^", "<", ">", "8", "s",
        "p", "*", "h", "H", "D", "d", "P",
        "X"
    ]
    return random.choice(markers)


def get_color():
    colors = [
        "#29912D",
        "#33DE3A",
        "#DE4628",
        "#0C7C91",
        "#1DBFDE",
        "#5B49E0",
        "#E0B155",
        "#947740",
        "#7B9422",
        "#BDE03F",
        "#944E81",
        "#E06CC1",
        "#60E097",
        "#945531",
        "#E08955"
    ]
    return random.choice(colors)


def simpleSchema(files, epochs, method):
    # Creating figure
    figure = plt.figure(figsize=(18, 10), dpi=80)
    figure.add_subplot(111)

    # Defining some extra data
    plt.xlabel("Costo")
    plt.ylabel("Volumen")
    plt.title("Created on {} using '{}' method".format(
        datetime.now().strftime("%d/%m/%Y"), method))

    for _, file in enumerate(files):
        plt.figtext(0.825, 0.925, "Running {} epochs".format(epochs))
        plt.figtext(0.812, 0.905, "Volumen limite {}".format(
            file["limitVolume"]))

        plt.scatter(x=file["cost"], y=file["volume"], s=128,
                    marker=get_marker())

    plt.axhline(files[0]["limitVolume"], color='r', linestyle='-',
                label="Volumen limite {}".format(files[0]["limitVolume"]))
    plt.legend(loc="lower right")

    # To save figure as a picture
    plt.savefig("./plots/{} {}.png".format(datetime.now(), method))
    plt.close()


def populationSchemes(files, method):
    # Creating figure
    figure = plt.figure(figsize=(18, 10), dpi=80)
    figure.add_subplot(111)

    # Defining some extra data
    plt.xlabel("Costo")
    plt.ylabel("Volumen")
    plt.title("Created on {} using '{}' heuristic".format(
        datetime.now().strftime("%d/%m/%Y"), method))

    # Plot points X, Y
    marker = get_marker()
    color = get_color()

    for index, file in enumerate(files[0]):
        if index == 0:
            plt.axhline(
                file["limitVolume"], color='r', linestyle='--',
                label="Volume limit: {}".format(file["limitVolume"])
            )
        plt.scatter(
            x=file["cost"],
            y=file["volume"],
            s=128, c=color, marker=marker,
            label="Generation {}".format(index)
        )
        marker = get_marker()
        color = get_color()

    plt.legend(loc="upper left")

    # To save figure as a picture
    plt.savefig("./plots/{} {} {}.png".format(datetime.now(), method, "scatter"))
    plt.close()


def schemesStats(file, method, population_size, combination_points, offspring, mutation_rate):
    population_size = float(population_size)
    combination_points = float(combination_points)
    mutation_rate = float(mutation_rate)
    offspring = float(offspring)

    selection_proyection = []
    recombination_proyection = []
    mutation_proyection = []

    offspring_rate = offspring / (population_size * len(file[0]['schema']))
    mutation_probability = mutation_rate / \
        (population_size * len(file[0]['schema']))

    for dataIndex, data in enumerate(file):
        recombination_probability = combination_points * \
            data["length"] / (population_size - 1)

        offspring_probability = 1 - \
            (offspring_rate * recombination_probability)

        # Creating figure
        figure = plt.figure(figsize=(18, 10), dpi=80)
        figure.add_subplot(111)

        # Defining some extra data
        plt.xlabel("Proyection")
        plt.ylabel("Probability")
        plt.title("Created on {} using '{}' heuristic; {} of {}".format(
            datetime.now().strftime("%d/%m/%Y"), method, dataIndex + 1, len(file)))

        for index in range(1, 10):
            selection_proyection.append(
                data["schema_population"] * pow(1 + data["fitness"], index))
            recombination_proyection.append(
                (selection_proyection[index - 1] * offspring_probability))
            mutation_proyection.append(
                1 - (data["order"] * mutation_probability))

        plt.plot(selection_proyection, linewidth=2.0,
                 c=get_color(), marker=get_marker(), label=" Selection {}".format(dataIndex+1))
        plt.plot(recombination_proyection, linewidth=2.0, c=get_color(), marker=get_marker(),
                 label=" Recombination {}".format(dataIndex+1))
        plt.plot(mutation_proyection, linewidth=2.0, c=get_color(), marker=get_marker(),
                 label=" Mutation {}".format(dataIndex+1))

        plt.legend(loc="upper left")

        # To save figure as a picture
        plt.savefig(
            "./plots/{} {} using {} for extra data.png".format(datetime.now(), method, "linear"))
        plt.close()

        selection_proyection = []
        recombination_proyection = []
        mutation_proyection = []


config = dotenv_values(".env")

# Extracting data from JSON file
files = data.getPlotData()

# Getting environmental data
epochs = list(config.items())[0][1]
method = list(config.items())[2][1]
offspring = list(config.items())[9][1]
mutation_rate = list(config.items())[11][1]
population_size = list(config.items())[3][1]
combination_points = list(config.items())[10][1]

if method == "genetic":
    populationSchemes(files, method)
    schemesStats(files[1], method, population_size,
                 combination_points, offspring, mutation_rate)
elif method == "grasp":
    simpleSchema(files, epochs, method)
elif method == "path":
    simpleSchema(files, epochs, method)
else:
    raise Exception("Something went wrong, error may be on .env file")
