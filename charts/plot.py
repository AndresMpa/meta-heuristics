from dotenv import dotenv_values
import matplotlib.pyplot as plt
from datetime import datetime
import getPlotData as data
import random

random.seed(5)


def get_maker():
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


def path(files, epochs, method):
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
                    marker=get_maker())

    plt.axhline(files[0]["limitVolume"], color='r', linestyle='-',
                label="Volumen limite {}".format(files[0]["limitVolume"]))
    plt.legend(loc="lower right")

    # To save figure as a picture
    plt.savefig("./plots/{} {}.png".format(datetime.now(), method))
    plt.close()


def genetic(files, method):
    # Creating figure
    figure = plt.figure(figsize=(18, 10), dpi=80)
    figure.add_subplot(111)

    # Defining some extra data
    plt.xlabel("Costo")
    plt.ylabel("Volumen")
    plt.title("Created on {} using '{}' heuristic".format(
        datetime.now().strftime("%d/%m/%Y"), method))

    # Plot points X, Y
    marker = get_maker()
    color = get_color()
    for index, file in enumerate(files):
        if index == 0:
            plt.axhline(
                file["limitVolume"], color='r', linestyle='--',
                label="Volume limit: {}".format(file["limitVolume"])
            )
        plt.scatter(
            x=file["cost"][0],
            y=file["volume"][0],
            s=128, c=color, marker=marker,
            label="Generation {}".format(index)
        )
        marker = get_maker()
        color = get_color()

    plt.legend(loc="upper left")

    # To save figure as a picture
    plt.savefig("./plots/{} {} {}.png".format(datetime.now(), method, "scatter"))
    plt.close()


config = dotenv_values(".env")

# Extracting data from JSON file
files = data.clearData()

# Getting environmental data
epochs = list(config.items())[0][1]
method = list(config.items())[2][1]

if method == "genetic":
    genetic(files, method)
elif method == "grasp":
    path(files, epochs, method)
elif method == "path":
    path(files, epochs, method)
else:
    raise Exception("Something went wrong, error may be on .env file")
