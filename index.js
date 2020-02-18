const fs = require('fs');
const path = require('path');

const staticDir = 'static';

module.exports = (src) => {
    const basePath = src;

    const scanDirectoryRecursive = (route = './') => {

        const structure = [];

        for (let item of fs.readdirSync(route)) {
            const itemPath = path.join(route, item);
            const itemStat = fs.lstatSync(itemPath);
            if (itemStat.isDirectory()) {
                structure.push({
                    name: item,
                    type: 'directory',
                    path: itemPath.replace(path.join(basePath), '').replace(/\\/g, '/').substr(1),
                    content: scanDirectoryRecursive(itemPath),
                });
            } else {
                structure.push({
                    name: item,
                    type: 'file',
                    path: itemPath.replace(path.join(basePath), '').replace(/\\/g, '/').substr(1),
                });
            }
        }
        return structure;
    }


    return scanDirectoryRecursive(src);
}
