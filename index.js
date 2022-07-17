import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

//TODO: Get the beginning of the bot ready for a game
//      Get the players that want to play as part of the game where they would be stored
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
    console.log(playerArr);
    let playerNames ='';
    playerArr.forEach(user => {
        if(playerArr.indexOf(user) == playerArr.length--)
        {
            playerNames += user.username;
        }
        else 
        {
            playerNames += user.username + ", ";
        }
    });
    return playerNames;
}

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
            //check if theres already player limit
            if(playerArr.length <= 10)
            {
                let player = message.author;
                if(!playerArr.includes(player))
                {
                    playerArr.push(player);
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
                    message.reply("There aren't enought participants");
            }
        }

    }    
})

client.on('ready', () => {
    console.log('The mf bot is ready');
})
client.login(process.env.TOKEN);

