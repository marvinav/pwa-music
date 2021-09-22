const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
const gitHooks = path.join(projectRoot, '.git/hooks');
const projectGitHooks = path.join(__dirname, 'git/hooks');

console.log('Preinstall hook execution');

function installGitHooks() {
    if (fs.realpathSync(gitHooks) == projectGitHooks) {
        return;
    }
    fs.rmSync(gitHooks, { recursive: true, force: true });
    fs.symlink(projectGitHooks, gitHooks, function (a) {
        if (a) {
            console.error(a);
        } else {
            console.log('Git hooks have been installed');
        }
    });
}

installGitHooks();
