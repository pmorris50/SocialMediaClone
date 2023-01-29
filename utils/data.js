const userNames = [
    'Fuscous',
    'Shenanigans',
    'Acracymes1983fly',
    'Hodgepodge',
    'Mayayber',
    'Nincompoop',
    'Limaciform',
    'Tuchis',
    'Saxicolous',
    'Burgoo',
    'Dissemble',
    'Caoutchouc',
    'Justiciar',
    'Nimrod',
    'Psittacine',
    'Dithyramb',
    'Anaudia',
    'Gazebo',
    'Annomination',
    'Bumbershoot',
    'Parvanimity',
    'Frangipani',
    'Contumacious',
    'Tuque',
    'Acicular',
    'Topple',
    'Chevrotain',
    'Stroon',
    'Krypsis',
    'Panjandrum'
]



const emails =[
    'fallorn@me.com',
    'arnold@aol.com',
    'knorr@aol.com',
    'vmalik@sbcglobal.net',
    'melnik@att.net',
    'miyop@yahoo.com',
    'airship@yahoo.com',
    'zavadsky@yahoo.ca',
    'bradl@icloud.com',
    'uncled@mac.com',
    'scotfl@yahoo.ca',
    'grolschie@sbcglobal.net',
    'denton@outlook.com',
    'preneel@optonline.net',
    'noahb@aol.com',
    'corrada@mac.com',
    'miami@yahoo.ca',
    'gmcgath@verizon.net',
    'notaprguy@verizon.net',
    'nanop@icloud.com',
    'burns@mac.com',
    'psharpe@verizon.net',
    'caronni@comcast.net',
    'carreras@mac.com',
    'majordick@me.com',
    'hahiss@mac.com',
    'dartlife@aol.com',
    'sbmrjbr@gmail.com',
    'ewaters@optonline.net',
    'violinhi@live.comv'
]

//get a random item given an array
const  getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

//Gets a random userName
const getRandomUserName = (arr) => `${getRandomArrItem(userNames)}`;
const getRandomEmail = (arr) => `${getRandomArrItem(emails)}`;


module.exports = {getRandomUserName, getRandomEmail};