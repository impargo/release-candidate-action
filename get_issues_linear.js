const { LinearClient } = require('@linear/sdk')

const client = new LinearClient({
  apiKey: process.env.PERSONAL_API_KEY
})

async function getTeamDoneIssues(teamID) {
    const team = await client.team(teamID);
    let msg = '### Done Issues:\n'
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
  
getTeamDoneIssues(process.env.TEAM_ID)
  
