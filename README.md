# hackathon-bot

I have 7 minutes to write this... Anyway, this is the Tic Tac Toe bot I made for the 2023 NCP CSHS Hackathon. I had a lot of fun rushing to do this and definitely learned about what is doable in the time we had after I realized my original idea (Connect 4) wouldn't work.

You can run the bot yourself by making a Discord application and a `.env` file with the content:
```
TOKEN=<your bot token>
CLIENTID=<your application's client id>
```
The Discord application should have the messages intent.

Then, you can add the bot to your server using the normal invite link. Start a game with `/start`, join one with `/join`, and place a tile with `/move` (the bot will automatically detect who's move it is and what tile to place). Read the individual command option descriptions for more information.