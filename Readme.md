# Minecraft Status Bot

![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/augusdogus/minecraft-status-bot) ![Docker Cloud Automated build](https://img.shields.io/docker/cloud/automated/augusdogus/minecraft-status-bot) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/fa067f6879b74528b3a2ed791cb60e3e)](https://www.codacy.com/manual/AugusDogus/minecraft-status-bot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AugusDogus/minecraft-status-bot&amp;utm_campaign=Badge_Grade) ![GitHub](https://img.shields.io/github/license/AugusDogus/minecraft-status-bot?color=blue) [![Beerpay](https://img.shields.io/beerpay/AugusDogus/minecraft-status-bot)](https://beerpay.io/AugusDogus/minecraft-status-bot)
* * *

<details>
  <summary>Example</summary>
  
  <img src="https://i.imgur.com/ac1wj7n.png" align="center"/>
  
</details>

## Requirements

-   Docker
-   A [discord bot](https://discordapp.com/developers/applications/) token
-   A Minecraft server
-   Node.js (for development)

## Running from Docker Hub

    $ docker run --name minecraft-status-bot -e "token=Disord_Bot_Token_Here" -e "ip=Minecraft_Server_IP_Here" -e "delay=Time_In_Milliseconds" augusdogus/minecraft-status-bot:latest

## Building & Running from source

    $ git clone https://github.com/augusdogus/minecraft-status-bot
    $ cd minecraft-status-bot
    $ docker build -t minecraft-status-bot .
    $ docker run --name minecraft-status-bot -e "token=Disord_Bot_Token_Here" -e "ip=Minecraft_Server_IP_Here" -e "delay=Time_In_Milliseconds" minecraft-status-bot:latest

## License

This project is licensed under the MIT License - see the [License.md](License.md) file for details

## Acknowledgments
* Thanks to **tedztar**'s initial work on the first [bot](https://github.com/tedztar/mcstatusbot/). 
* Thanks to **Huskydog9988**'s [revision](https://github.com/Huskydog9988/mcstatusbot) of tedztar's code from which this project was inspired.
