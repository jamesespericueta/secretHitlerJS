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

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'startgame')
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
    else if(command === 'joingame')
    {
        if(isAddingPlayers)
        {
            let playerid = message.author.id;
            if(!playerArr.includes(playerid))
            {
                playerArr.push(playerid);
            }
            else 
            {
                message.reply("You are already a part of the game");
            }
            console.log(playerArr);
        }
        else 
        {
            message.channel.send("Game is either happening or not started");
        }
    }    
})

client.on('ready', () => {
    console.log('The mf bot is ready');
})
client.login(process.env.TOKEN);
