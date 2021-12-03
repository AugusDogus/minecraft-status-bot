<p align="center">
<img src="https://i.imgur.com/shFtqm7.png" alt="Logo">
</p>

[![Docker Image CI](https://github.com/AugusDogus/minecraft-status-bot/actions/workflows/docker-image.yml/badge.svg)](https://github.com/AugusDogus/minecraft-status-bot/actions/workflows/docker-image.yml) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/fa067f6879b74528b3a2ed791cb60e3e)](https://www.codacy.com/manual/AugusDogus/minecraft-status-bot?utm_source=github.com&utm_medium=referral&utm_content=AugusDogus/minecraft-status-bot&utm_campaign=Badge_Grade) ![GitHub](https://img.shields.io/github/license/AugusDogus/minecraft-status-bot?color=blue) [![ko-fi](https://img.shields.io/badge/Buy%20me%20a-Coffee-brightgreen)](https://ko-fi.com/augusdogus)

---

<details>
  <summary>Example</summary>
  
  <img src="https://i.imgur.com/ac1wj7n.png" align="center"/>
  
</details>

## Requirements

- Docker
- A [discord bot](https://discordapp.com/developers/applications/) token
- A Minecraft server
- Node.js (for development)

## Running from Docker Hub

    $ docker run --name minecraft-status-bot -e "token=Disord_Bot_Token_Here" -e "ip=Minecraft_Server_IP_Here" -e "delay=Time_In_Milliseconds" augusdogus/minecraft-status-bot:latest

## Building & Running from source

    $ git clone https://github.com/augusdogus/minecraft-status-bot
    $ cd minecraft-status-bot
    $ docker build -t minecraft-status-bot .
    $ docker run --name minecraft-status-bot -e "token=Disord_Bot_Token_Here" -e "ip=Minecraft_Server_IP_Here" -e "delay=Time_In_Milliseconds" minecraft-status-bot:latest

## License

This project is licensed under the MIT License - see the [License](License) file for details

## Acknowledgments

- Thanks to **tedztar**'s initial work on the first [bot](https://github.com/tedztar/mcstatusbot/).
- Thanks to **Huskydog9988**'s [revision](https://github.com/Huskydog9988/mcstatusbot) of tedztar's code from which this project was inspired.
