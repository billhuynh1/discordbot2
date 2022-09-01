const { Client, GatewayIntentBits, ActionRow, Message, ButtonComponent } = require('discord.js')
const { token } = require('./config.json')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Creates new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("ready", () => {
    //for global
    // const Guilds = client.guilds.cache.map(guild => guild.id);
    // console.log(Guilds);
    //let commands = client.application.commands
    //testing at guild
    const guildId = '966088294167367680'
    const guild = client.guilds.cache.get(guildId)
    let commands 

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application.commands
    }

    commands.create({
        name: 'ping',
        description: 'pong',
    })

    commands.create({
        name: 'tictactoe',
        description: 'plays a game of tic tac toe',
    })
});

// When client is ready, run this once
client.once('ready', () => {
    console.log('Ready');
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }
    const { commandName } = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong'
        })
    }
})

client.on('messageCreate', (message) => {
    if(message.author.id === client.user.id) return;

    if(message.content === "lost ark") {
        message.reply("is dogshit game")
    }
 })

 client.on('messageCreate', (message) => {
    if(message.author.id === client.user.id) return;

    if(message.content === "cindy") {
        message.reply("loml")
    }
 })

/* Tic Tac Toe */
let EMPTY = Symbol("empty");
let PLAYER = Symbol("player")
let BOT = Symbol("bot")

let tictactoe_state

function makeGrid() {
    components = []

    for (let row = 0; row < 3; row++) {
    actionRow = new ActionRowBuilder

        for (let col = 0; col < 3; col ++) {

            messageButton = new ButtonBuilder()
                .setCustomId('tictactoe_' + row + '_' + col)

            switch(tictactoe_state[row][col]) {
                case EMPTY:
                messageButton
                    .setLabel(' ')
                    .setStyle(ButtonStyle.Secondary)
                break;
                case PLAYER:
                messageButton
                    .setLabel('X')
                    .setStyle(ButtonStyle.Primary)
                break;
                case BOT:
                    messageButton
                        .setLabel('O')
                        .setStyle(ButtonStyle.Danger)
                break;
            }
            actionRow.addComponents(messageButton)
        }
        components.push(actionRow)
    }
    return components
}

 client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'tictactoe') {
        tictactoe_state = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ]

        await interaction.reply({ content: 'Playing tic tac toe!', components: makeGrid()})
    }
 })

// Login to Discord with client's token
client.login(token);