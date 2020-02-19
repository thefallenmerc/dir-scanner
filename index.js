const fs = require('fs');
const path = require('path');

const staticDir = 'static';

module.exports = (src, ignore = []) => {
    const basePath = src;

    const flat = [];

    const scanDirectoryRecursive = (route = './') => {

        const structure = [];

        for (let item of fs.readdirSync(route)) {
            const itemPath = path.join(route, item);
            const itemStat = fs.lstatSync(itemPath);
            if (ignore.includes(itemPath)) {
                continue;
            }
            if (itemStat.isDirectory()) {
                structure.push({
                    name: item,
                    type: 'directory',
                    path: itemPath.replace(path.join(basePath), '').replace(/\\/g, '/'),
                    content: scanDirectoryRecursive(itemPath),
                });
            } else {
                const fileObj = {
                    name: item,
                    type: 'file',
                    path: itemPath.replace(path.join(basePath), '').replace(/\\/g, '/'),
                };

                structure.push(fileObj);
                flat.push(fileObj);
            }
        }
        return { structure, flat };
    }


    return scanDirectoryRecursive(src);
}
