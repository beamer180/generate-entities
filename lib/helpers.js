const fs = requrie('fs');

module.exports = {
     basePath = () => {
         return fs.realpathSync(__dirname + "/../");
     }
}