const scanner = require('../index');
const path = require('path');

const content = scanner(path.join(__dirname, ".."), [
    path.join(__dirname, '..', '.git')
]);

require('fs').writeFileSync('test/test.json', JSON.stringify(content));