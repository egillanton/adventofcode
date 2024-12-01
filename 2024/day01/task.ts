// Day 1 of Advent of Code 2024
// Historian Hysteria
// Using Deno ^2.0

const readInput = async (
    test: boolean = false,
): Promise<[number[], number[]]> => {
    const input = await Deno.readTextFile(
        test ? "./day01/test.txt" : "./day01/input.txt",
    );

    const leftList: number[] = [];
    const rightList: number[] = [];

    input.split("\n").filter((line) => line.trim()).forEach((line) => {
        const [left, right] = line.split("   ");
        leftList.push(parseInt(left.trim()));
        rightList.push(parseInt(right.trim()));
    });

    return [leftList, rightList];
};

const sortLists = (leftList: number[], rightList: number[]): void => {
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);
};

const part01 = async () => {
    const [leftList, rightList] = await readInput();
    sortLists(leftList, rightList);
    const sum = leftList.reduce(
        (acc, left, i) => acc + Math.abs(left - rightList[i]),
        0,
    );

    console.log("Part 1");
    console.log("Your puzzle answer was:", sum);
};

const part02 = async () => {
    const [leftList, rightList] = await readInput();
    sortLists(leftList, rightList);

    // Create a frequency map for rightList
    const rightFreqMap = new Map<number, number>();
    rightList.forEach((num) => {
        rightFreqMap.set(num, (rightFreqMap.get(num) || 0) + 1);
    });

    const sum = leftList.reduce((acc, left) => {
        const occurrences = rightFreqMap.get(left) || 0;
        return acc + left * occurrences;
    }, 0);

    console.log("Part 2");
    console.log("Your puzzle answer was:", sum);
};

console.log("Advent of Code 2024");
console.log("Day 1: Historian Hysteria");
part01();
part02();   