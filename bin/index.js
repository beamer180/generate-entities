#!/usr/bin/env node
var GenerateEntities = require("../lib/generate-entities");
var EntitiesFileParser = require('../lib/entities-file.parser');
var GeneratorFactory = require('../lib/generator.builder.js');
var FileWriterFactory = require('../lib/file-writer.factory');
var FileWriter = require('../lib/file.writer');
const appRoot = require('app-root-dir').get();

var FileWriterHooks = require('../lib/file.writer.hooks');
var fileWriterHooks = new FileWriterHooks();

generateEntities = new GenerateEntities(process.argv, EntitiesFileParser, new GeneratorFactory(appRoot, fileWriterHooks), appRoot,  new FileWriterFactory(FileWriter, fileWriterHooks));
generateEntities.run();