#!/bin/bash
typeorm-ts-node-commonjs migration:generate -d ./src/config/mysql.datasource.ts -p ./src/modules/database/migrations/$1
