#!/bin/bash
typeorm-ts-node-commonjs migration:revert -d ./src/config/mysql.datasource.ts
