// Day 2 of Advent of Code 2024
// Red-Nosed Reports
// Using Deno ^2.0

const USE_TEST_FILE = false;

const readInput = async (): Promise<number[][]> => {
    const input = await Deno.readTextFile(
        USE_TEST_FILE ? "./day02/test.txt" : "./day02/input.txt",
    );

    const levels: number[][] = [];

    input.split("\n").filter((line) => line.trim()).forEach((line) => {
        const level = line.split(" ");
        levels.push(level.map((num) => parseInt(num.trim())));
    });

    return levels;
};

const isSafeLevel = (level: number[]): boolean => {
    let isDecreasing = false;
    let isIncreasing = false;
    let isNotChanging = false;

    for (let i = 0; i < level.length - 1; i++) {
        const current = level[i];
        const next = level[i + 1];

        if (current > next) {
            if (current - next > 3) {
                return false;
            }
            isDecreasing = true;
        } else if (current < next) {
            if (next - current > 3) {
                return false;
            }
            isIncreasing = true;
        } else {
            isNotChanging = true;
        }
    }

    if (
        isNotChanging || (isDecreasing && isIncreasing) ||
        (!isDecreasing && !isIncreasing)
    ) {
        return false;
    }
    return true;
};

const isTolerablySafeLevel = (level: number[]): boolean => {
    // If the level is already safe, we can return true
    if (isSafeLevel(level)) return true;
    
    // Lets remove each number once and check if the resulting sequence is safe
    for (let i = 0; i < level.length; i++) {
        const newLevel = [...level.slice(0, i), ...level.slice(i + 1)];
        if (isSafeLevel(newLevel)) {
            return true;
        }
    }
    
    return false;
};

const part01 = async () => {
    const levels = await readInput();
    let safeCount = 0;
    let unsafeCount = 0;

    for (let i = 0; i < levels.length; i++) {
        isSafeLevel(levels[i]) ? safeCount++ : unsafeCount++;
    }

    console.log("Part 1");
    console.log("Your puzzle answer was:", safeCount);
};

const part02 = async () => {
    const levels = await readInput();
    let safeCount = 0;
    let unsafeCount = 0;

    for (let i = 0; i < levels.length; i++) {
        isTolerablySafeLevel(levels[i]) ? safeCount++ : unsafeCount++;
    }

    console.log("Part 2");
    console.log("Your puzzle answer was:", safeCount);
};

console.log("Advent of Code 2024");
console.log("Day 2: Red-Nosed Reports");
part01().then(part02).catch(console.error).finally(() => Deno.exit());
