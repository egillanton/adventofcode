// Day 3 of Advent of Code 2024
// Mull It Over
// Using Deno ^2.0

const readInput = async (config: Config): Promise<string> => {
    const filePath = config.useTestFile
        ? config.testFilePath
        : config.inputPath;

    const input = await Deno.readTextFile(filePath);
    return input.split("\n")
        .filter((line) => line.trim())
        .join("");
};

const part01 = async (config: Config) => {
    const sequence = await readInput(config);
    let sumOfMul = 0;

    const regex = new RegExp("mul\\(\\d\\d?\\d?,\\d\\d?\\d?\\)", "g");
    const matches = sequence.matchAll(regex);

    for (const match of matches) {
        const num1 = match[0].split("(")[1].split(",")[0];
        const num2 = match[0].split("(")[1].split(",")[1].split(")")[0];
        const mul = parseInt(num1) * parseInt(num2);
        sumOfMul += mul;
    }

    console.log("Part 1");
    console.log("Your puzzle answer was:", sumOfMul);
};

const part02 = async (config: Config) => {
    const sequence = await readInput(config);
    let sumOfMul = 0;

    const regex = new RegExp(
        "don't\\(\\)|do\\(\\)|mul\\(\\d\\d?\\d?,\\d\\d?\\d?\\)",
        "g",
    );
    const matches = sequence.matchAll(regex);

    let enableMul = true;

    for (const match of matches) {
        if (match[0] === "do()") {
            enableMul = true;
        } else if (match[0] === "don't()") {
            enableMul = false;
        } else if (enableMul) {
            const num1 = match[0].split("(")[1].split(",")[0];
            const num2 = match[0].split("(")[1].split(",")[1].split(")")[0];
            const mul = parseInt(num1) * parseInt(num2);
            sumOfMul += mul;
        }
    }

    console.log("Part 2");
    console.log("Your puzzle answer was:", sumOfMul);
};

type Config = {
    useTestFile: boolean;
    inputPath: string;
    testFilePath: string;
};

async function main() {
    console.log("Advent of Code 2024");
    console.log("Day 3: Mull It Over");

    try {
        await part01({
            useTestFile: false,
            inputPath: "./day03/input.txt",
            testFilePath: "./day03/test.txt",
        } as Config);

        await part02({
            useTestFile: false,
            inputPath: "./day03/input.txt",
            testFilePath: "./day03/test2.txt",
        });
    } catch (error) {
        console.error("Error solving puzzle:", error);
    } finally {
        Deno.exit();
    }
}

main();
