#!/usr/bin/env node
var GenerateEntities = require("../lib/generate-entities");
var EntitiesFileParser = require('../lib/entities-file.parser');
var GeneratorBuilder = require('../lib/generator.builder.js');
const appRoot = require('app-root-dir').get();

generateEntities = new GenerateEntities(process.argv, EntitiesFileParser, new GeneratorBuilder(appRoot), appRoot);
generateEntities.run();