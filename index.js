import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

//TODO: Get the beginning of the bot ready for a game
//      Get the players that want to play as part of the game where they would be stored
// TODO: Make objects for each player so that they have a political party state

/*
LEts think this through
maybe we dont have to make an object because there are only two important roles
*/

class Player
{
    constructor(isHitler, isLiberal, isFacist)
    {
        this.isHitler = isHitler;
        this.isLiberal = isLiberal;
        this.isFascist = isFascist;
    }

    isFascist()
    {
        return this.isFascist;
    }
    isLiberal()
    {
        return this.isLiberal;
    }
    isHitler()
    {
        return this.isHitler;
    }
}

const prefix = '!'

let gameIsOngoing = false;
let playerArr = [];
let isAddingPlayers = false;


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
        playerNames.push(user.username);
    });
    return playerNames.join(', ');
}

const designateRoles = () =>
{
    if(playerArr.length >= 5 && playerArr.length <= 6)
    {

    }
    else if(playerArr.length >= 7 && playerArr.length <= 8)
    {

    }
    else
    {

    }
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
            if(playerArr.length <= 10)
            {
                let user = message.author;
                if(!playerArr.includes(user))
                {
                    playerArr.push(user);
                }
                else 
                {
                    message.reply("You are already a part of the game");
                }
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
                message.channel.send('The players participating are ' + nameAllPlayers);


            }
            else
            {
                    message.reply("You only have " + playerArr.length + "players. You need between 5 and 10 players to play");
            }
        }

    }    
})


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

