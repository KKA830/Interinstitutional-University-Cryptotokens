const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const CONTRACT_FILE_NAME = 'UVS_updated.sol';
const buildPath = path.resolve(__dirname, 'src/ethereum/build');
const contractPath = path.resolve(__dirname, './contracts', CONTRACT_FILE_NAME);
let contractSource;

try {
  contractSource = fs.readFileSync(contractPath, 'utf8');
} catch (error) {
  console.error(`Error reading contract file: ${error.message}`);
  process.exit(1);
}

const input = {
  language: 'Solidity',
  sources: {
    [CONTRACT_FILE_NAME]: {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// Remove the build folder and its content
fs.removeSync(buildPath);

function findImports(importPath) {
  try {
    const basePath = path.resolve(__dirname, 'node_modules', importPath);
    const content = fs.readFileSync(basePath, 'utf8');
    return { contents: content };
  } catch (error) {
    return { error: `File not found: ${importPath}` };
  }
}

// solc.compile generates a JSON output
console.log(`Compiling ${contractPath}...`);
let output;
try {
  output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
} catch (error) {
  console.error(`Compilation error: ${error.message}`);
  process.exit(1);
}

// Check for compilation errors
if (output.errors) {
  output.errors.forEach((err) => {
    console.error(err.formattedMessage);
  });
  process.exit(1);
}

// Ensure that build path exists
fs.ensureDirSync(buildPath);

// For each compiled smart contract, save it to build folder
for (const contract in output.contracts[CONTRACT_FILE_NAME]) {
  console.log(`Exporting ${contract} contract...`);

  // Save generated compiled output to JSON file
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract}.json`),
    output.contracts[CONTRACT_FILE_NAME][contract],
    { spaces: 2 } // Indent JSON output with 2 spaces
  );
}

console.log('Compilation and export completed successfully.');
