const { spawn } = require('child_process');
const config = require('./config')
const request = require('request')
const async = require('async')
const fs = require('fs')

function github(method, repo, resource, object, callback){
  let resource_url = `https://${config.username}:${config.password}@api.github.com/repos/pandeysoni/${repo}/git/${resource}`
  if(!object){
     let options = {
        url: resource_url,
        method: method,
        json: true,
        headers: {
          'User-Agent': 'shell-script-test'
        }
      }
      request(options, (err, httpResponse, body) => {
          //console.log(err, body)
          callback(err, body)
      }) 
  }
  else{
    let options = {
        url: resource_url,
        method: method,
        json: true,
        body: object,
        headers: {
          'User-Agent': 'shell-script-test'
        }
      }
      request(options, (err, httpResponse, body) => {
          //console.log(err, body)
          callback(err, body)
      }) 
  }            
}
function deployEnvironment() {
  let repo = "shell-script-test"
  let last_commit_sha;
  async.waterfall([
    (callback)=>{
       github("get", repo, "refs/heads/master", null, callback)
    }, 
    (repoDetails, callback)=>{
      console.log("45 repoDetails", repoDetails)
      last_commit_sha = repoDetails.object.sha
      github("get", repo, `commits/${last_commit_sha}`, null, callback)
    },
    (commitDetails, callback)=>{
      console.log("50 commitDetails", commitDetails)
      let last_tree_sha = commitDetails.tree.sha
      let object = {
        "base_tree": last_tree_sha,
        "tree": [
          {
            "path": "index.js",
            "mode": "100644",
            "content": fs.readFileSync('./index.js').toString()
          }
        ]
      }
      github("post", repo, "trees", object, callback)
    },
    (treeDetails, callback)=>{
      console.log("50 treeDetails", treeDetails)
      let new_content_tree_sha = treeDetails.sha
      let object = {
            "parents": [last_commit_sha],
            "tree": new_content_tree_sha,
            "message": "commit via api"
      }
      github("post", repo, "commits", object, callback)
    },
    (newCommitDetails, callback)=>{
      console.log("76 newCommitDetails", newCommitDetails)
      let new_commit_sha = newCommitDetails.sha
          let object = {
               "sha": new_commit_sha
          }
          github("patch", repo, "refs/heads/master", object, callback)
    }
  ], (error, result) => {
    console.log(error, result)
  })
}
deployEnvironment()