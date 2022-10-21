#!/bin/bash

# Getting environmental variables
DATE=`date +%s`
while read -r line; do
  VARS+=(`echo $line | cut -d '=' -f 2`)
done <.env

# Running simulator, also creating log file
node index.js > "./logs/${DATE}_using_${VARS[1]}_for_${VARS[0]}_epochs.txt"
