const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const server = http.createServer((req, res) => {
});

const app = express();

const wss = new WebSocket.Server({ noServer: true });

app.use(bodyParser.json());

app.post('/gitlab-webhook', (req, res) => {
  if (req.headers['x-gitlab-event'] === 'Issue Hook') {
    const issueEvent = req.body;
    console.log('Received GitLab Issue Event:', issueEvent.object_attributes.title);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send("issue received");
        }
      });
    res.status(200).send('Issue event received and processed.');
  } else {
    res.status(400).send('Invalid event type.');
  }
});


server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(process.env.WEBSOCKET_PORT || 3001, () => {
  console.log(`Server is listening on port ${process.env.WEBSOCKET_PORT || 3001}`);
});