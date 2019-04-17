// Command to set up Cavy within a repo
// `cavy init`
//
const indexContent = require('../templates/index.test.js');
const specContent = require('../templates/exampleSpec.js');
const { existsSync, writeFileSync, mkdirSync } = require('fs');

DEFAULT_TEST_DIR = 'specs';
DEFAULT_ENTRY_FILE = 'index.test.js';

// Sets up Cavy entry index file and example spec.
function init(args) {
  console.log('cavy: Adding Cavy to your project...');

  // The first additional argument to cavy init is the name of the test
  // directory. This is used in the index.test.js file too.
  const folderName = args[1] || DEFAULT_TEST_DIR;

  if (existsSync(folderName)) {
    console.log(`cavy: Looks like a ./${folderName} directory already exists for this project.`);
    console.log('cavy: To continue set up, re-run the command with an alternative test directory name: `cavy init <test-directory>`')
    process.exit(0)
  }

  // Create a exampleTest.js file in the specified folder in the route of the
  // project.
  mkdirSync(`./${folderName}`);
  writeFileSync(`./${folderName}/exampleSpec.js`, specContent);

  // Don't overwrite any index.test.js file that already exists.
  if (existsSync(DEFAULT_ENTRY_FILE)) {
    console.log(`cavy: ${DEFAULT_ENTRY_FILE} already exists, skipping this step.`);
  } else {
    // Create an index.test.js file in the route of the project.
    writeFileSync(DEFAULT_ENTRY_FILE, indexContent(folderName));
  }

  // Exit
  console.log('cavy: Done!');
  process.exit(1);
}

module.exports = init;
