require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const sadWords = ["sad", "depressed", "unhappy", "angry", "failing", "feeling down", "frustrated", "angry", "upset", "unmotivated", "mad", "not good", "not okay", "frustrating", "unwell"];

const encouragements = [ 
    "Hang in there. Things will eventually get better.", 
    "It's okay not to feel your best. Life has its up's and down's.", 
    "You are enough. If you don't believe that, at least I do.",
    "Being produdctive is good but try not to overwork yourself.",
    "Slow down, you're doing fine.",
    "Tomorrow will be better and if it's not, you say it again, and again, because at some point tomorrow will be better.",
    "You're trying your best, and I'm very proud of you.",
    "Just because you take longer than others doesn't mean you failed.",
    "There is nothing in nature that blooms all year long so don't expect yourself to do so either."
]
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
function getQuote(){
    return fetch("https://zenquotes.io/api/random")
        .then((res) => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
};

client.on('ready', (c) => {
    console.log(`ðŸ’š${c.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot){
        return;
    }
    if (message.content === "inspire"){
        getQuote().then(quote => message.channel.send(quote))
    }
    if (message.content === 'hi') {
        message.reply("Hello human");
    }
    if (message.content === "thank you") {
        message.reply("You're welcome!");
    }
    if (message.content === 'bye') {
        message.reply("Goodbye!");
    }
    if (sadWords.some(word => message.content.includes(word))){
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        message.reply(encouragement);
    }
});



client.login(process.env.TOKEN);