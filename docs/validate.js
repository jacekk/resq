const fs = require('fs');
const util = require('util');
const glob = require('glob');
const tv4 = require('tv4');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-json-schema'));

const docsDirMatch = 'resources/**/*';
const examplesExt = '.json';
const specsExt = '.spec.json';
const globOptions = {
	ignore: docsDirMatch + specsExt,
};

glob(docsDirMatch + examplesExt, globOptions, function(err, filesPaths) {
	filesPaths.forEach(function(filePath) {
		const schemaPath = filePath.replace(examplesExt, specsExt);
		const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
		const example = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		expect(example).to.be.jsonSchema(schema);
		console.log(' ✔', filePath);
	});
})
