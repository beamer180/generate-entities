const fs = require("fs");
var appRoot;

function GeneratorBuilder(root) {
    appRoot = root;

    this.buildGenerator = function(generatorSpec) {

        if( typeof generatorSpec == "string") {
            return createGeneratorFromString(generatorSpec);
        } else if (typeof generatorSpec == "object") {
            return createGeneratorFromObject(generatorSpec);
        }
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
    
        if(isLocalModule(generatorName)) {
            return requireLocalFile(generatorName);
        }
    
        return requireModule(generatorName);
    
    }
    
    function isLocalModule(generatorName) {
    
        return generatorName.substring(0,1) === ".";
    
    }
    
    function requireLocalFile(generatorName) {
    
    
        return require(fs.realpathSync(appRoot + "/" + generatorName));
    }
    
    function requireModule(generatorName) {
    
        return require(generatorName);
    }
    
}




module.exports = GeneratorBuilder;