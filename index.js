import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

//Personal reminder: finished working on initialize() for role decision
//
// TODO: Work on getting the first round setup and get the gameplay loop going

/*
LEts think this through
maybe we dont have to make an object because there are only two important roles
*/


const prefix = '!'

let gameIsOngoing = false;
let playerArr = [];
let poppedArr = [];
let isAddingPlayers = false;
let hitler;
let liberals = [];
let fascists = [];
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});


const nameAllPlayers = () =>
{
    let playerNames = [];
    playerArr.forEach(user => {
        playerNames.push(user);
    });
    return playerNames.join(', ');
}


//processing the commands
client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    //initializing game
    if(command === 'initgame')
    {
        if(gameIsOngoing)
        {
            message.channel.send('If you would like to end current game please type \"!forcequit\"');
        }
        else{
            message.channel.send('Players who would like to join please type !joingame');
            isAddingPlayers = true;
        }
    }
    //joining game process
    else if(command === 'joingame')
    {
        if(isAddingPlayers)
        {
            //check if theres already user limit
            if ( playerArr.length < 9 )
            {
				console.log(playerArr.length);
				if(args.length == 1)
				{
					let user = args[0];
					if(!playerArr.includes(user))
					{
						playerArr.push(user);
					}
					else
					{
						message.reply("You are already part of the game");
					}
				}
				/*
                let user = message.author;
                if(!playerArr.includes(user))
                {
                    playerArr.push(user);
                }
                else 
                {
                    message.reply("You are already a part of the game");
                }
				*/
            }
			else{
				message.channel.send("The max of 10 players has been reached, no more players allowed.")
			}
            console.log(nameAllPlayers());
        }
        else 
        {
            message.channel.send("Game is either happening or not started");
        }
    }
    //actually starting the game
    else if(command === 'startgame')
    {
        if(isAddingPlayers)
      
            if(playerArr.length >= 5 && playerArr.length <= 10)
            {
                isAddingPlayers = false;
                message.channel.send('The players participating are ' + nameAllPlayers());
				gameIsOngoing = true;
				initialize();
            }
            else
            {
                    message.reply("You only have " + playerArr.length + " players. You need between 5 and 10 players to play");
            }
        }

    }    
})

const initialize = () =>{
	poppedArr = playerArr;
	chooseRoles();j
	notify();	
}

const chooseRoles = () => {
	chooseHitler();
	chooseFacists();
	chooseLiberals();
}

const notifyFacists = () => {
	if (fascists.length > 1)
	{
		for (let i = 0; i < fascists.length; i ++)
		{
			let otherFascists = fascists;
			otherFascists.pop(fascists[i]);
			fascists[i].send("You are a fascist")
		}
	}
	else
	{
		facsist[0].send("You are a fascist and " + hitler.username + " is hitler.");
	}
}
const notify = () => {
	notifyHitler();
	notifyLiberals();
	notifyFacists();
}
const notifyHitler = () => {
	hitler.message("You are hitler!");
}
const notifyLiberals = () => {
	for (let i = 0; i < liberals.length; i++)
	{
		liberals[i].message("You are a liberal.");
	}
}

const chooseHitler = () =>{
	let random = Math.floor(Math.random() * poppedArr.length);
	hitler = poppedArr[random];
}

const chooseFacists = () =>{
	if(playerArr.length == 5 || playerArr.length == 6)
	{
		let random = Math.floor(Math.random() * poppedArr.length);
		let tempFascist = poppedArr[random];
		fascists.push(tempFascist)
		poppedArr.pop(tempFascist)
	}
	else if (playerArr.length == 7 || playerArr.length == 8)
	{
		for( let i = 0; i < 2; i++)
		{
			let random = Math.floor(Math.random() * poppedArr.length);
			let tempFascist = poppedArr[random];
			fascists.push(tempFascist);
			poppedArr.pop(tempFascist);
		}
	}
	else if (playerArr.length == 9 || playerArr.length == 10)
	{
		for ( let  i = 0; i < 3; i++)
		{
			let random = Math.floor(Math.random() * poppedArr.length);
			let tempFascist = poppedArr[random];
			fascists.push(tempFascist);
			poppedArr.pop(tempFascist);
		}
	}
}

const chooseLiberals = () =>{
	liberals = poppedArr;
}


//you can retain a game state everytime a command is thrown
/*
    For example:
    You can just run a sequence of code everytime that a person is given a the choice of cards
    and everytime after they choose the next person they nominate to be chancellor
    In the end it is a finite state machine and can be paused at any moment to wait for 
    player input to cause the machine to change state
*/
client.on('ready', () => {
    console.log('The mf bot is ready');
})


client.login(process.env.TOKEN);

