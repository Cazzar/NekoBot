var booru = require('booru');
var rq = require('request');

module.exports = function(cmder) {
    cmder.command('nekoroulette', {
            desc: 'Get a safe neko'
        })
        .callback((msg, site, query) => search('', msg, site, query));

    cmder.command('nekosafe', {
            desc: 'Get a safe neko'
        })
        .callback((msg, site, query) => search('rating:safe', msg, site, query));
    cmder.command('neko', {
            desc: 'Get some lewd nekos'
        })
        .callback((msg, site, query) => search('rating:questionable', msg, site, query));

    cmder.command('nekoporn', {
            desc: 'Get some overly lewd nekos'
        })
        .callback((msg, site, query) => search('rating:explicit', msg, site, query));
};  


function search(rating, msg, site, query) {
    if (query == undefined) query = '';
    else query = query.value;
    if (site == undefined) site = 'gelbooru'
    else site = site.value;
    // booru.search(, function (err,data) {
    //     if(err) return;
    //     var neko = data.random(); // All of your cute kittehgirls!
    //     msg.reply(neko.url);
    // })

    booru.search(site, cleanArray([rating, 'cat_ears', query]), {limit: 1, random: true})
        .then(booru.commonfy)
        .then(images => {
            // msg.reply(images[0].common.file_url);
            var url = images[0].common.file_url;
            //msg.message.channel.uploadFile(rq.get(url), url.substring(url.lastIndexOf('/') + 1), 'Found one master!').catch(a => {
            //    msg.reply(`Found one master! ${url}`);
            //});
            msg.reply('', {
                title: 'Found one master!',
                type: 'image',
                url: images[0].common.file_url,
                image: {
                    url: images[0].common.file_url,
                    proxy_url: images[0].preview_url,
                }
            })
        }).catch(err => {
            if (err.name === 'booruError') {
                //It's a custom error thrown by the package 
                console.log(err.message);
                console.log(err.stack);
                msg.reply(`Error: ${err.message}`);
            } else {
                //This means I messed up. Whoops. 
                console.log(err)
            }
        })
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  console.log(newArray.length)
  return newArray;
}