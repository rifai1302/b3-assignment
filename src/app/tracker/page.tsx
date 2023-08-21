const axios = require('axios')
import io from 'socket.io-client';
let socket

const gitlabApiBaseUrl = 'https://gitlab.lnu.se/api/v4';
const repoId = '31808';

async function fetchIssues() {
  try {
    const headers = {
      'Private-Token': process.env.token
    };

    const response = await axios.get(
      `${gitlabApiBaseUrl}/projects/${repoId}/issues`,
      { headers }
    );

    console.log(response)

    if (response.status === 200) {
      const issues = response.data;
      const issueList: String[][] = []
      issues.forEach((issue: { title: String; state: String; type: String; }) => {
        const current = []
        current.push(issue.title)
        current.push(issue.state)
        current.push(issue.type)
        issueList.push(current)
      });
      return issueList;
    }
  } catch (error: any) {
    console.error('Error fetching issues:', error.message);
  }
}


export default async function Tracker() {
    const returner = []
    let issues = await fetchIssues();
    if (issues !== undefined){
      for (let i = 0; i < issues.length; i++){
        const temp = [issues[i][0], issues[i][1], issues[i][2]]
        returner.push(temp)
      }
    }
    
    //await fetch('./api/socket')
    socket = io()
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('gitLabIssue', (issue) => {
      console.log(issue)
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div id = "issues" className="grid grid-cols-1 grid-flow-row gap-4 w-screen p-10">
        {returner.map((title, state) => (
          <div style={{width: "100%", backgroundColor: "rgb(43, 43, 43)", padding: "10px", borderRadius: "10px", fontSize: '1.75em'}}>
            {
            (title[2] === 'INCIDENT') ? (
              <p style={{fontSize: "0.70em", color: 'red'}}>{title[2]}</p>
            ) : (
            <p style={{fontSize: "0.70em", color: 'yellow'}}>{title[2]}</p>
            )
        }
            {title[0]}
            </div>
        ))}
        </div>
    </main>
  )
}
  
