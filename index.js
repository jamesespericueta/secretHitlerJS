import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

//Personal reminder: finished working on initialize() for role decision
//
//TODO: finish the locatePlayer function and all the other empty functions for
//the legislative session and policy dealing part of the game 
//
/*
LEts think this through
maybe we dont have to make an object because there are only two important roles
*/

let lastElectedPres;
const prefix = '!'
let presidentNominee;
let chancellorNominee;
let president;
let chancellor;
let lastElectedChancellor;
let gameIsOngoing = false;
let playerArr = [];
let poppedArr = [];
let isAddingPlayers = false;
let hitler;
let liberals = [];
let fascists = [];
let yays = 0;
let nays = 0;
let legislativeSession = false;

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
		// Change code to allow actual users to join once in production-----------------------------------------------------------
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
		{
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
	else if(command === "nominate")
	{
		if(args.length === 1)
		{
			if( playerExists(args[0]) )
			{
				if(isEligible(args[0]))
				{
					chancellor = locatePlayer(args[0]);
				}
				else 
				{
					message.reply("Player either does not exist or is not eligible");
				}
			}
			else 
			{
				message.author.send("Player is not in the game");
			}
			
		}
		else
		{
			mesesage.channel.send("You must input one valid player to nominate chancellor");
		}
	}
	else if(isElection)
	{
		
		if ( command === "yay" )
			yays++;
		else if ( command === "nay" )
			nays++;
		if((nays + yays) == playerArr.length)
		{
			processVotes();
		}
	}
	else if( legislativeSession )
	{
		
	}
	else if ( command === "choosechancellor" )
	{
		if(message.author == presidentNominee)
		{
			if( args.length == 1 )
			{
				if( playerExists(args[0]) )
				{
					chancellorNominee = locatePlayer(args[0])
				}
				else
				{
					message.author.send("Player given is not in the game please check your spelling");
				}
			}
			else 
			{
				message.author.send("Please enter only one player")
			}
		}
		else
		{
			message.author.send("You are not the current president nominee so you cannot choose the chancellor");
		}
		
	}
});

const playerExists = playerUsername => {
	return nameAllPlayers.toLowerCase().contains(playerUsername.toLowerCase());
		
}

const locatePlayer = (playerUsername) => {

}

const dealPolicies = () => {
	president.message("Here are your cards");

}

const checkEligibility = nominee => {
	
}
//set the chancellor and the president with actual power and move onto
//the choosing of removing policy card and giving chancellor the option
//of choosing which policy card to enact
processVotes = (yays, nays) => {
	if(yays > nays)
	{
		
	}

}

const initialize = () =>{
	poppedArr = playerArr;
	chooseRoles();
	notify();
	chooseFirstPres();
}

const chooseFirstPres = () => {
	let random = Math.floor(Math.random() * poppedArr.length);
	presidentNominee = poppedArr[random];
	presidentNominee.send("Please choose your chancellor by typing !choose 'nameofPlayer'");
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

client.on('ready', () => {
    console.log('The mf bot is ready');
})

client.login(process.env.TOKEN);

