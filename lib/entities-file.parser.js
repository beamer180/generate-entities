const fs = require('fs');

function EntitiesFileParser(path, generatorBuilder, rootPath) {


    const appRoot = rootPath;
    var entitiesFilePath = null;
    var entitySpecs = null;
    var generatorSpecs = null;
    var generators = null;
    var helpers = null;

    constructor(path);
    
    this.getGenerators = () => {
        return generators;
    }

    this.getEntitySpecs = () => {
        return entitySpecs;
    }

    function constructor(entitiesPath) {
        entitiesFilePath = entitiesPath;
        read();
        createGenerators();
    }

    function read() {
        var entityInfo = require(entitiesFilePath);
        entitySpecs = entityInfo.entities;
        generatorSpecs = entityInfo.generators;
    }

    function createGenerators() {

        generatorSpecs.forEach((genSpec) => {
            generators = {...generators, ...generatorBuilder.buildGenerator(genSpec)}
        });
        
    }

    

}

module.exports = EntitiesFileParser