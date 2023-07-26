# Code Racer

<a href="https://youtu.be/EBrdpG-kdWU">Demo Video Link</a> </br>
<a href="https://drive.google.com/file/d/1ZwUMgdlnb-sBGRBUsvwkOcfIiWwAWZLm/view?usp=sharing">Alternate Video Link</a>
---

## Premise
Code Racer is a platform to play a type racing game online with your friends while also improving your coding abilities. Code Racer will help improve coding speed, syntactic memory, and styling etiquette to help any struggling developer.

## How do I get started?
<ol>
<li> Install MongoDB community edition
<li> Open the repository in a code editor like VSCode
<li> In your terminal(routed to your code racer directory), run <b>`npm install`</b> to install the dependencies and get the node_modules folder.
<li> Run <b>`npm start`</b> to start your server to listen for clients
<li> Open a new terminal window and change the directory to the client folder (<b>`cd client`</b>) and then run <b>`npm install`</b> again to install the client's dependencies
<li> Change directories back to the server and run <b>`npm start`</b> to start the server.
<li> In a new terminal instance, go to your client directory and run <b>`npm start`</b> to start your react application. Multiple clients can be created locally by creating more terminal instances.
<li> Navigate the website to start a party or join an exisiting one and enjoy playing!
<li>Side Note: Since the server will be hosted locally, if you want to add more players, you need to open another terminal session, change the directory to client and run npm start. Currently, the game is set to support upto 4 players for testing but that can easily be changed by editing <i>server.js</i> and changing line 12 to add extra clients (or keep it open to all clients using RegEx)
</ol>