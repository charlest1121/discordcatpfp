const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
  setInterval(async () => {
    try {
      
      const randomCatImg = (await import('random-cat-img')).default;
      const fetch = (await import('node-fetch')).default;

      const result = await randomCatImg();
      const imageUrl = result.message; 
      console.log('Image URL:', imageUrl); 
      
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
      const imageBuffer = await response.arrayBuffer();
      await client.user.setAvatar(imageBuffer);
      console.log('Profile picture updated!');
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  }, 60000); // Change every 60 seconds
});

client.login('DISCORD_TOKEN');
