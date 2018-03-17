const fs = require('fs');

function EntitiesFileParser(path, hlpers) {


    const appRoot = require('app-root-dir').get();
    var entitiesFilePath = null;
    var entitySpecs = null;
    var generatorSpecs = null;
    var generators = null;
    var helpers = null;
    helpers =  hlpers;

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
        generators = generatorSpecs.reduce(function(aggregator, generatorSpec) {
            let generator = {};
            if(typeof generatorSpec == "string") {
                generator = createGeneratorFromString(generatorSpec)
            } else if (typeof generatorSpecs == "object") {
                generator = createGeneratorsFromObject();
            }

            return {...aggregator, ...generator};
            
        }, {});
        
    }

    function createGeneratorFromString(generatorName) {
        let Generator = requireGenerator(generatorName);
        let toReturn = {};
        toReturn[generatorName] = new Generator();

        return toReturn;
    }

    function createGeneratorFromObject(generatorInfo) {
        let name = generatorInfo.name;
        let specCopy = {...generatorInfo.spec};
        let Generator = requireGenerator(name);
        toReturn[name] = new Generator(specCopy);
        return toReturn;
    }

    function requireGenerator(generatorName) {

        let Generator = require(fs.realpathSync(appRoot + "/" + generatorName));

        return Generator;

    }

}

module.exports = EntitiesFileParser