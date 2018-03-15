#!/usr/bin/env node
var GenerateEntities = require("../lib/generate-entities");
var EntitiesFileParser = require('../lib/entities-file.parser');

generateEntities = new GenerateEntities(process.argv, EntitiesFileParser);
generateEntities.run();