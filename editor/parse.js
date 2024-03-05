import { parse } from 'csv-parse/sync';
import fs from 'fs';

const fileBuffer = fs.readFileSync('editor/wordforms.csv');
const records = parse(fileBuffer, {
	columns: true,
});

const words = {};
records
	// .filter((record) => {
	// 	return Number(record.lemRank) < 2049;
	// })
	.forEach((record) => {
		if (!words[record.word]) {
			// The source CSV seems to have some duplicates at higher ranks.
			// e.g. "this"
			words[record.word] = { rank: Number(record.lemRank), lemma: record.lemma };
		}
	});

const data = `const words = ${JSON.stringify(words)};`;

fs.writeFile('editor/words.js', data, (err) => {
	if (err) {
		throw err;
	}
	console.log('JSON data is saved.');
});
