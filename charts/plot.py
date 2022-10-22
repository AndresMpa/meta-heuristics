from dotenv import dotenv_values
import matplotlib.pyplot as plt
from datetime import datetime
import getPlotData as data

config = dotenv_values(".env")

# Extracting data from JSON file
file = data.cleanData()
print(file)

x = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11, 12, 9, 6]
y = [9, 6, 7, 8, 1, 6, 3, 7, 4, 8, 7, 5, 6]

epochs = list(config.items())[0][1]
method = list(config.items())[1][1]

plt.figure(figsize=(8, 6), dpi=80)

# Defining some extra data
plt.title('Created on {} using "{}" method'.format(
    datetime.now().strftime("%d/%m/%Y"), method))
plt.xlabel('Year')
plt.ylabel('Some measurements')
plt.figtext(0.73, 0.835, "Running {} epochs".format(epochs))

# Defining plot type
plt.scatter(x, y)

# To save figure as a picture
plt.savefig("./plots/{} {}.png".format(datetime.now(), method))
plt.close()
