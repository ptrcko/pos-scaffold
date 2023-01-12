const { exec } = require("child_process");
function generate(cmd){
    exec('node "bin/generate" ' + cmd  + ' ' + args, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    }); 
}
