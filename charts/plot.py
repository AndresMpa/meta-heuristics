from dotenv import dotenv_values
import matplotlib.pyplot as plt
from datetime import datetime
import getPlotData as data

config = dotenv_values(".env")

# Extracting data from JSON file
files = data.clearData()

# Getting environmental data
epochs = list(config.items())[0][1]
method = list(config.items())[2][1]

# Creating figure
figure = plt.figure(figsize=(18, 10), dpi=80)
subplot = figure.add_subplot(111)

# Defining some extra data
plt.xlabel("Costo")
plt.ylabel("Volumen")
plt.title("Created on {} using '{}' method".format(
    datetime.now().strftime("%d/%m/%Y"), method))


# Defining plot type
markers = ["o", "v", "^", "<", ">", "8", "s",
           "p", "*", "h", "H", "D", "d", "P", "X"]
for index, file in enumerate(files):
    plt.figtext(0.825, 0.925, "Running {} epochs".format(epochs))
    plt.figtext(0.805, 0.905, "Volumen limite {}".format(file["limitVolume"]))

    plt.scatter(x=file["cost"], y=file["volume"], s=128, marker=markers[index], label="Volumen limite {}".format(file["title"]))

plt.legend(loc="upper left");

# To save figure as a picture
plt.savefig("./plots/{} {}.png".format(datetime.now(), method))
plt.close()
