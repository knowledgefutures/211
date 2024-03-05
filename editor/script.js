const textareaNode = document.getElementById('text');
const maskNode = document.getElementById('mask');
const jargonNode = document.getElementById('jargon');
const wordCountNode = document.getElementById('word-count');
const allwordsNode = document.getElementById('allwords');
const wordListNode = document.getElementById('word-list');

const parseWords = () => {
	const jargonList = document.createElement('ul');
	const input = textareaNode.value;
	const inputWords = input
		.trim()
		.toLowerCase()
		.replace(/[\r\n]+/g, ' ')
		.replace(/[.,\/#!?$%\^&\*;:{}=\_`~()]/g, '')
		.split(' ')
		.filter((word) => word.length);
	const wordCount = inputWords.length;
	wordCountNode.innerHTML = wordCount > 211 ? `<span>${wordCount}</span>` : wordCount;
	const seenWords = {};
	let hasInvalidWords = false;
	inputWords
		.filter((word) => {
			// Make sure it has at least one letter.
			// We have to do this for leading hyphens, which
			// are included for the sake of hyphenated words.
			return word.match(/\b([\w]+)\b/g);
		})
		.filter((word) => {
			if (seenWords[word]) {
				return false;
			}
			seenWords[word] = true;
			return true;
		})
		.forEach((word) => {
			const wordObject = words[word];
			const wordNode = document.createElement('li');
			const textnode = document.createElement('div');
			textnode.innerHTML = word;
			textnode.className = "text";
			const isValid = wordObject && wordObject.rank <= 2048;
			if (!isValid) {
				hasInvalidWords = true;
			}
			const countNode = document.createElement('span');
			countNode.textContent = wordObject ? wordObject.rank : '5000+';
			wordNode.className = isValid ? 'valid' : 'not-valid';
			wordNode.appendChild(textnode);
			wordNode.appendChild(countNode);
			jargonList.appendChild(wordNode);
		});
	jargonNode.innerHTML = '';
	if (hasInvalidWords || allwordsNode.checked) {
		jargonNode.appendChild(jargonList);
	} else {
		jargonNode.innerHTML = "<div class='shadow'>All words are valid!</div>";
	}
};
const overlayMask = () => {
	const newItems = textareaNode.value.replaceAll(/\b([\w-']+)\b/g, (word) => {
		const cleanedWord = word
			.toLowerCase()
			.replace(/[\r\n]+/g, ' ')
			.replace(/[.,\/#!?$%\^&\*;:{}=\_`~()]/g, '');
		const wordObject = words[cleanedWord];
		const isValid = wordObject && wordObject.rank < 2048;
		if (!isValid) {
			return `<span>${word}</span>`;
		}
		return word;
	});
	maskNode.innerHTML = newItems;
};

const auto_grow = () => {
	textareaNode.style.height = '0px';
	textareaNode.style.height = textareaNode.scrollHeight + 'px';
};

const handleCheck = () => {
	const isChecked = allwordsNode.checked;
	wordListNode.className = isChecked ? 'word-list all' : 'word-list';
	parseWords();
};

textareaNode.addEventListener('keyup', parseWords);
textareaNode.addEventListener('input', overlayMask);
textareaNode.addEventListener('input', auto_grow);
allwordsNode.addEventListener('input', handleCheck);
auto_grow();
parseWords();
overlayMask();
handleCheck();
