const nonLetters = [' ', ',', '.', ':', '-', ';', '\'']

// NEW
const calcStringIndex = (str) => {
    // const lettersCount = [...str].filter(l => !nonLetters.includes(l)).length // this solution is less memory effective
    let lettersCount = 0
    for (let i = 0; i < str.length; i++) {
        if (!nonLetters.includes(str[i])) {
            lettersCount++
        }
    }
    return (1 + 1 * (lettersCount - 1)) * lettersCount / 2 // sum of arithmetic progression Sn = (2 * a1 + d * (n - 1)) * n / 2
}

const calcCommentStringIndex = (str) => {
    const [textIndex, commentIndex] = str.split('|').map(calcStringIndex)
    return commentIndex > 0.5 ? textIndex + commentIndex : undefined;
}

const groupBy = (arr, key, value) => arr.reduce((r, v) => {
    const k = key(v)
    if (!r[k]) {
        r[k] = []
    }
    r[k].push(value(v))
    return r
}, {})

export const compareNew = (ruText, enTextWithComments) => {
    const ru = ruText.map(text => ({ text, index: calcStringIndex(text) }))
    const en = groupBy(enTextWithComments, calcCommentStringIndex, text => text)
    return ru.filter(({index}) => en[index])
      .flatMap(({ text: ruText, index }) => en[index].map(enText => ({ ruText, enText })))
}

// OLD
export function compareOld(ruText, enTextWithComments) {
    let equalPairs = [];
    let nonLetters = [' ', ',', '.', ':', '-', ';', '\'']
    for (let i = 0; i < ruText.length; i++) {
        let ruStringIndex = 0;
        let ruLetterIndex = 0.5;
        for (let j = 0; j < ruText[i].length; j++) {
            if (!nonLetters.includes(ruText[i][j])) {
                ruStringIndex += ruLetterIndex;
                ruLetterIndex += 1;
            }
        }
        for (let k = 0; k < enTextWithComments.length; k++) {
            let enStringIndex = 0;
            let enLetterIndex = 0.5;
            let enCommentIndex = 0;
            let commentLetterIndex = 0.5;
            let enText = enTextWithComments[k].split('|')[0];
            let comment = enTextWithComments[k].split('|')[1];
            for (let n = 0; n < enText.length; n++) {
                if (!nonLetters.includes(enText[n])) {
                    enStringIndex += enLetterIndex;
                    enLetterIndex += 1;
                }
            }
            for (let m = 0; m < comment.length; m++) {
                if (!nonLetters.includes(comment[m])) {
                    enCommentIndex += commentLetterIndex;
                    commentLetterIndex += 1;
                }
            }
            if (enCommentIndex > 0.5) {
                if (ruStringIndex === enStringIndex + enCommentIndex) {
                    equalPairs.push({
                        ruText: ruText[i],
                        enText: enTextWithComments[k]
                    });
                }
            }
        }
    }
    return equalPairs;
}