const GIT_REPOSITORY_ROOT = 'D:/project/azure-rest-api-specs'
const simpleGit = require('simple-git/promise');
const fs = require('fs');
const path = require('path');

const git = simpleGit(GIT_REPOSITORY_ROOT)

async function fileOperation(event, fileName, data) {
    const filePath = path.join('.');
    const pathExist = await (async () => {
      try {
        await fs.promises.access(filePath, fs.constants.R_OK);
        return true;
      } catch (e) {
        return false;
      }
    })();
    if (!pathExist) {
      await fs.promises.mkdir(filePath, {
        recursive: true,
      });
    }
  
    if (event === 'writeFile') {
      await fs.promises.writeFile(
        `${filePath}/${fileName}`,
        JSON.stringify(data),
        { encoding: 'UTF-8' }
      );
    } else if (event === 'appendFile') {
      await fs.promises.appendFile(
        `${filePath}/${fileName}`,
        JSON.stringify(data),
        { encoding: 'UTF-8' }
      );
    } else if (event === 'readFile') {
      const result = await fs.promises.readFile(`${filePath}/${fileName}`, {
        encoding: 'utf-8',
      });
      return Buffer.isBuffer(result) ? result : JSON.parse(result);
    }
  }

// async function getCurrentBranch() {
//     res1 = await git.branch()
//     console.log(res1);
//     await fileOperation('writeFile', "git-branch.json", res1);
//  }

//  getCurrentBranch();

 async function isBranchIncludes() {
    const targetBranchName = "NullMDR-patch-pull-request-template"
    // const res1 = branches.all.includes(targetBranchName)
    res2 = git.branch([targetBranchName, `remotes/origin/${targetBranchName}`])
    console.log(res2);
    await fileOperation('writeFile', "git-inclues-branch.json", res2);
    const branches = await git.branch()
    await fileOperation('writeFile', "git-inclues-branch2.json", branches);
 }

 isBranchIncludes();