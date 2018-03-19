const fs = require('fs');

function EntitiesFileParser(path, generatorBuilder, rootPath, fileWriterFactory) {


    const appRoot = rootPath;
    var entitiesFilePath = path;
    var entitySpecs = null;
    var generatorSpecs = null;
    var generators = null;
    var helpers = null;
    
    this.getGenerators = () => {
        return generators;
    }

    this.getEntitySpecs = () => {
        return entitySpecs;
    }

    function read() {
        var entityInfo = require(entitiesFilePath);
        entitySpecs = entityInfo.entities;
        generatorSpecs = entityInfo.generators;
    }

    function createGenerators() {

        generatorSpecs.forEach((genSpec) => {
            generators = {...generators, ...generatorBuilder.buildGenerator(genSpec, fileWriterFactory)}
        });
        
    }

}

module.exports = EntitiesFileParser