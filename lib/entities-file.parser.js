var filepath = null;
var entitySpecs = null;
var generatorSpecs = null;
var generators = null;
var helpers = null;

function constructor(path) {
    filepath = path;
    read();
    createGenerators();
}

function read() {
    var entityInfo = require(filepath);
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
        
    }, {})
    
}

function createGeneratorFromString(generatorSpec) {
    let Generator = require(generatorSpec);
    let toReturn = {};
    toReturn[generatorSpec] = new Generator();
    return toReturn;
}

function createGeneratorFromObject(generatorSpec) {
    let name = generatorSpec.name;
    let Generator = require(name);
    let specCopy = {...generatorSpec};
    delete specCopy.name;

    var toReturn = {};
    toReturn[name] = new Generator();
    return toReturn;
}

function EntitiesFileParser(path, hlpers) {
    helpers =  hlpers;

    console.log(helpers.basePath());

    constructor(path);
    
    this.getGenerators = () => {
        return generators;
    }

    this.getEntitySpecs = () => {
        return entitySpecs;
    }
}

module.exports = EntitiesFileParser