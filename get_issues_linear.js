const { LinearClient } = require('@linear/sdk')

const client = new LinearClient({
  apiKey: process.env.PERSONAL_API_KEY
})

async function getTeamDoneIssues(teamID) {
    const team = await client.team(teamID);
    let msg = `### Done Issues in ${team.name} (${Math.floor((await team.activeCycle).progress * 100 )} %)\n`
    const doneIssues = (await team.issues()).nodes.filter(async (issue) => {
      const state = await issue.state
      return state === 'Done'
    });
    
    if (doneIssues.length) {
      doneIssues.forEach((issue) => {
        msg += `- [ ] [${issue.title}](${issue.url})\n`
      })
    } else {
      msg += `${team} has no done issues!\n`
    }
    console.log(msg)
  }
console.log('Welcome to the release candidate!\n')
getTeamDoneIssues('POS')
getTeamDoneIssues('DEV')
getTeamDoneIssues('DFS')
getTeamDoneIssues('DES')
