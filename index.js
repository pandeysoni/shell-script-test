// const { spawn } = require('child_process');
// const config = require('./config')
// const request = require('request')

// function github(method, repo, resource, callback){
//   let resource_url = `https://${config.username}:${config.password}@api.github.com/repos/pandeysoni/${repo}/git/${resource}`
//   let options = {
//                     url: resource_url,
//                     json: true, 
//                     method: method  
//                 }
//                 request(options, (err, httpResponse, body) => {
//                     console.log(err, body)
//                     if(err) callback(err, null)
//                     else callback(null, body)
//                 }) 
// }
// function deployEnvironment() {
//   github("get", "shell-script-test", "refs/heads/master", (error, result) => {
//     console.log(error, result)
//   })
//   // const deploy = spawn(`serverless`, ['deploy'], {
//   //   cwd: serverlessConfigPath
//   // });
//   // deploy.stdout.on('data', (data) => {
//   //   console.log('' + data);
//   // });
//   // deploy.stderr.on('data', (data) => {
//   //   console.error('' + data);
//   // });
//   // deploy.on('close', (code) => {
//   //   console.log(`child process exited with code ${code}`);
//   // });
// }
// deployEnvironment()