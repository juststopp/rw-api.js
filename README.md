# RW-API.JS

`RW-API.JS` est un module permettant d'écouter les évents émis par notre site web. (Votes & Bump)

## Comment le faire fonctionner

### Etape 1: Configuration

Tout d'abord, vous allez avoir besoin de configurer le module sur le dashboard du serveur souhaité. Pour ce faire, [connectez vous à notre site](https://ref-world.xyz/api/auth/discord/login). Une fois connecté, cliquez sur votre pseudo en haut à droite, puis sur "Dashboard". Ici, choisissez le serveur que vous souhaitez. Une fois fait, cliquez sur le bouton "**API**". Vous pourrez alors configurer:

* Le port qu'utilisera la module pour communiquer (ATTENTION, il ne doit pas être déjà utilisé !) ;
* L'endpoint vers lequel notre site enverra les données (EXEMPLE: 123.12.123.12:8080/rwapi avec 8080 étant le port configuré au dessus, et 123.12.123.12 l'IP de votre machine.) ;
* Un mot de passe unique pour vérifier que les données vous sont bien envoyées à vous.

Une fois tout ceci fait, enregistrez et passez à l'étape suivante.

### Etape 2: Mise en place de l'API

Une fois l'étape de configuration faite, vous allez désormais devoir, dans le code de votre robot, ajouté un bout de code pour que l'API fonctione. Voici le code en question:

```js
const { APICLient } = require('rw-api.js');
const RWClient = new APIClient(endpoint, port, password); // L'endpoint, le port, et le password doivent être les mêmes que ceux configurés sur le site. 
                                                          // Pour l'endpoint, mettez simplement ce qui se trouve après le / EXEMPLE: L'endpoint sur le site est 123.12.123.12:8080/rwapi, mettez simplement /rwapi.
RWClient.on('vote', async (new_votes, user) => {
    /* Vous mettez ici ce que vous voulez.
     * new_votes est le nombre de votes que le serveur à après le vote de l'utilisateur et user est un objet User basique de discord.js;
     * Exemple:
    */

    const channel = this.client.channels.cache.get('123456789');
    channel.send(`Merci à ${user.username}#${user.discriminator} qui vient de voter pour le serveur ! Nous sommes désormais à ${new_vote} votes.`)
})
RWClient.start();
```