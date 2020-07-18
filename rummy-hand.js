/*
In this simplified version of Mah-jongg/rummy we have a 14-tile hand consisting
of positive integers.
A winning hand must contain a combination 4 sets or streets and one pair.
set – 3 of a kind – e.g. 1, 1, 1
street – 3 in a row – e.g. 1, 2, 3
pair – 2 of a kind – e.g. 2, 2
example winning hand [1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 8, 8]
we can arrange this as three streets, one set and a pair
[1, 2, 3], [1, 2, 3], [5, 6, 7], [8, 8, 8], [4, 4]
example non-winning hand [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
there is no way to make a pair
Write a function that takes a 14-tile hand as input and returns true if we can
arrange the hand into a winning configuration, and false otherwise.
*/

const numerically = (a, b) => a-b;
const isUnique = arr => arr.join(',') === [...(new Set(arr))].join(',')
// XXX: hilarious comparison hack
const checkString = "0,1,2,3,4,5,6,7,8,9,10,11,12,13";

const generatePossiblePairs = input => {
    const possible = [];
    for (let i = 0; i < input.length; i++) {
        const thisCard = input[i];
        let thisCardMates = [];
        input.forEach((card, index) => {
            if (card === thisCard && index > i) {
                thisCardMates.push(index);
            }
        });
        thisCardMates.forEach(mate => possible.push([i, mate]));
    }

    return possible;
}

const generatePossibleSets = input => {
    const possible = [];
    for (let i = 0; i < input.length; i++) {
        const thisCard = input[i];
        const thisCardMates = [];
        // XXX duplicating this work, bad
        input.forEach((card, index) => {
            if (card === thisCard && index > i) {
                thisCardMates.push(index);
            }
        });
        thisCardMates.forEach(mateIndex => {
            const mate = input[mateIndex];
            input.forEach((card, index) => {
                if (card === mate && index > mateIndex) {
                    possible.push([i, mateIndex, index]);
                }
            });
        });
    }

    return possible;
}

const generatePossibleStreets = input => {
    const possible = [];
    for (let i = 0; i < input.length; i++) {
        const thisCard = input[i];
        const thisCardIncrements = [];
        input.forEach((card, index) => {
            if (index > i && card === thisCard + 1) {
                thisCardIncrements.push(index);
            }
        });
        thisCardIncrements.forEach(incIndex => {
            const plusOne = input[incIndex];
            input.forEach((card, index) => {
                if (index > incIndex && card === plusOne + 1 ) {
                    possible.push([i, incIndex, index]);
                }
            });
        });
    }

    return possible;
}

const bruteForceCandidates = (chosenItems, candidateInput) => {
    const candidates = [...candidateInput];
    var candidate;
    // XXX:  listen:  I don't like it either.
    while (candidate = candidates.pop()) {
        const candidateArray = [...chosenItems, ...candidate];
        let isAnswer;
        if (isUnique(candidateArray)) {
            // is this the one? if so, just return true
            const indexCombination = [
                ...(new Set(candidateArray.flat()))
            ].sort(numerically).join(',');
            if (indexCombination === checkString) {
                return true;
            }
            isAnswer = bruteForceCandidates(candidateArray, candidates);
        }
        if (isAnswer) {
            return true;
        }
    }
}

const isWinningHand = inputArr => {
    const input = inputArr.sort(numerically);
    const possiblePairs = generatePossiblePairs(input);
    if (!possiblePairs.length) {
        return false;
    }
    const possibleStreets = generatePossibleStreets(input);
    if (!possibleStreets.length) {
        // XXX: hack to make possibleStreets iterable
        possibleStreets.push([]);
    }
    const possibleSets = generatePossibleSets(input);

    for (let possiblePair of possiblePairs) {
        const candidateCombinations = [];
        for (let possibleStreet of possibleStreets) {
            if (
                !possibleStreet.includes(possiblePair[0]) ||
                !possibleStreet.includes(possiblePair[1])
            ) {
                candidateCombinations.push(possibleStreet);
            }
        }
        for (let possibleSet of possibleSets) {
            if (
                !possibleSet.includes(possiblePair[0]) ||
                !possibleSet.includes(possiblePair[1])
            ) {
                candidateCombinations.push(possibleSet);
            }
        }
        // is it even possible to use every card?  if not, exit early
        const uniqueForTheseCandidates = [
            ...(new Set(candidateCombinations.flat()))
        ].sort(numerically).join(',');
        if (uniqueForTheseCandidates !== checkString) {
            continue;
        }
        const isAnswer = bruteForceCandidates(possiblePair, candidateCombinations);
        if (isAnswer) {
            return true;
        }
    }

    return false;
}

console.assert(isWinningHand([1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 8, 8]))
console.assert(!isWinningHand([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]]))
