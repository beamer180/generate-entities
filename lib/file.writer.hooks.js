function FileWriterHooks() {

    var hooks = {};

    function makeHookArray(generatorName) {

        if(!hooks[generatorName]) {
            hooks[generatorName] = [];
        }
    }

    this.registerHook = function(genetorToListenFor, callback) {

        makeHookArray(generatorToListenFor);
        hooks[generatorToListenFor].push(callback);
    }

    this.runGeneratorHooks = function(geneartorName, path, fileContents) {
        makeHookArray(generatorName);

        hooks.forEach((hookCallback) => {
            hookCallback(path, fileContents);
        })
    }
}

module.exports = new FileWriterHooks();