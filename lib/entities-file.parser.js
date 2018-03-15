const appRoot = require('app-root-dir').get();
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

function createGeneratorFromString(generatorName) {
    let Generator = requireGenerator(generatorName);
    let toReturn = {};
    toReturn[generatorName] = new Generator();
    return new Generator();
}

function createGeneratorFromObject(generatorInfo) {
    let name = generatorInfo.name;
    let specCopy = {...generatorInfo.spec};
    let Generator = requireGenerator(name);
    toReturn[name] = new Generator(specCopy);
    return toReturn;
}

function requireGenerator(generatorName) {

    let Generator = require(getGeneratorPath(generatorName));

    return Generator;

}

function getGeneratorPath(generatorName) {

}

function EntitiesFileParser(path, hlpers) {
    helpers =  hlpers;

    console.log("appRoot");
    console.log(appRoot);

    process.exit();

    constructor(path);
    
    this.getGenerators = () => {
        return generators;
    }

    this.getEntitySpecs = () => {
        return entitySpecs;
    }
}

module.exports = EntitiesFileParser