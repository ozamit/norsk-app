require('dotenv').config();
const mongoose = require('mongoose');
const Verb = require('../models/Verb');

const verbs = [
    {
        infinitive: 'å spise',
        translation: 'to eat',
        forms: { present: 'spiser', past: 'spiste', perfect: 'har spist', pluperfect: 'hadde spist', future: 'skal spise', imperative: 'spis' },
        sentences: [
            { english: 'I eat breakfast now', norwegian: 'Jeg spiser frokosten nå', tense: 'present' },
            { english: 'You eat lunch every day', norwegian: 'Du spiser lunsjen hver dag', tense: 'present' },
            { english: 'He eats dinner often', norwegian: 'Han spiser middagen ofte', tense: 'present' },
            { english: 'I ate breakfast yesterday', norwegian: 'Jeg spiste frokosten i går', tense: 'past' },
            { english: 'She ate lunch last week', norwegian: 'Hun spiste lunsjen forrige uke', tense: 'past' },
            { english: 'I have already eaten breakfast', norwegian: 'Jeg har allerede spist frokosten', tense: 'perfect' },
            { english: 'He has just eaten lunch', norwegian: 'Han har nettopp spist lunsjen', tense: 'perfect' },
            { english: 'I had eaten breakfast before you came', norwegian: 'Jeg hadde spist frokosten før du kom', tense: 'pluperfect' },
            { english: 'I will eat breakfast tomorrow', norwegian: 'Jeg skal spise frokosten i morgen', tense: 'future' },
            { english: 'Eat breakfast!', norwegian: 'Spis frokosten!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å drikke',
        translation: 'to drink',
        forms: { present: 'drikker', past: 'drakk', perfect: 'har drukket', pluperfect: 'hadde drukket', future: 'skal drikke', imperative: 'drikk' },
        sentences: [
            { english: 'I drink water now', norwegian: 'Jeg drikker vann nå', tense: 'present' },
            { english: 'She drinks coffee every morning', norwegian: 'Hun drikker kaffe hver morgen', tense: 'present' },
            { english: 'I drank milk yesterday', norwegian: 'Jeg drakk melk i går', tense: 'past' },
            { english: 'We drank tea last night', norwegian: 'Vi drakk te i går kveld', tense: 'past' },
            { english: 'I have drunk two glasses', norwegian: 'Jeg har drukket to glass', tense: 'perfect' },
            { english: 'He has drunk all the juice', norwegian: 'Han har drukket all juicen', tense: 'perfect' },
            { english: 'I had drunk the water before running', norwegian: 'Jeg hadde drukket vannet før jeg løp', tense: 'pluperfect' },
            { english: 'I will drink wine tonight', norwegian: 'Jeg skal drikke vin i kveld', tense: 'future' },
            { english: 'Drink water!', norwegian: 'Drikk vann!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å gå',
        translation: 'to walk/go',
        forms: { present: 'går', past: 'gikk', perfect: 'har gått', pluperfect: 'hadde gått', future: 'skal gå', imperative: 'gå' },
        sentences: [
            { english: 'I walk to school now', norwegian: 'Jeg går til skolen nå', tense: 'present' },
            { english: 'He walks home every day', norwegian: 'Han går hjem hver dag', tense: 'present' },
            { english: 'I walked to the store yesterday', norwegian: 'Jeg gikk til butikken i går', tense: 'past' },
            { english: 'We went to the cinema last week', norwegian: 'Vi gikk på kino forrige uke', tense: 'past' },
            { english: 'I have walked 10 kilometers', norwegian: 'Jeg har gått 10 kilometer', tense: 'perfect' },
            { english: 'She has gone home', norwegian: 'Hun har gått hjem', tense: 'perfect' },
            { english: 'I had gone before he arrived', norwegian: 'Jeg hadde gått før han kom', tense: 'pluperfect' },
            { english: 'I will go to work tomorrow', norwegian: 'Jeg skal gå på jobb i morgen', tense: 'future' },
            { english: 'Go home!', norwegian: 'Gå hjem!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å sove',
        translation: 'to sleep',
        forms: { present: 'sover', past: 'sov', perfect: 'har sovet', pluperfect: 'hadde sovet', future: 'skal sove', imperative: 'sov' },
        sentences: [
            { english: 'I sleep well now', norwegian: 'Jeg sover godt nå', tense: 'present' },
            { english: 'The baby sleeps a lot', norwegian: 'Babyen sover mye', tense: 'present' },
            { english: 'I slept badly last night', norwegian: 'Jeg sov dårlig i natt', tense: 'past' },
            { english: 'We slept in a tent yesterday', norwegian: 'Vi sov i telt i går', tense: 'past' },
            { english: 'I have slept for 8 hours', norwegian: 'Jeg har sovet i 8 timer', tense: 'perfect' },
            { english: 'He has slept all day', norwegian: 'Han har sovet hele dagen', tense: 'perfect' },
            { english: 'I had slept before the movie started', norwegian: 'Jeg hadde sovet før filmen startet', tense: 'pluperfect' },
            { english: 'I will sleep soon', norwegian: 'Jeg skal sove snart', tense: 'future' },
            { english: 'Sleep well!', norwegian: 'Sov godt!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å lese',
        translation: 'to read',
        forms: { present: 'leser', past: 'leste', perfect: 'har lest', pluperfect: 'hadde lest', future: 'skal lese', imperative: 'les' },
        sentences: [
            { english: 'I read a book now', norwegian: 'Jeg leser en bok nå', tense: 'present' },
            { english: 'She reads the newspaper daily', norwegian: 'Hun leser avisen daglig', tense: 'present' },
            { english: 'I read the letter yesterday', norwegian: 'Jeg leste brevet i går', tense: 'past' },
            { english: 'We read the report last week', norwegian: 'Vi leste rapporten forrige uke', tense: 'past' },
            { english: 'I have read this book', norwegian: 'Jeg har lest denne boken', tense: 'perfect' },
            { english: 'He has read the email', norwegian: 'Han har lest e-posten', tense: 'perfect' },
            { english: 'I had read the news before breakfast', norwegian: 'Jeg hadde lest nyhetene før frokost', tense: 'pluperfect' },
            { english: 'I will read the contract tomorrow', norwegian: 'Jeg skal lese kontrakten i morgen', tense: 'future' },
            { english: 'Read the text!', norwegian: 'Les teksten!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å skrive',
        translation: 'to write',
        forms: { present: 'skriver', past: 'skrev', perfect: 'har skrevet', pluperfect: 'hadde skrevet', future: 'skal skrive', imperative: 'skriv' },
        sentences: [
            { english: 'I write a letter now', norwegian: 'Jeg skriver et brev nå', tense: 'present' },
            { english: 'He writes code every day', norwegian: 'Han skriver kode hver dag', tense: 'present' },
            { english: 'I wrote an email yesterday', norwegian: 'Jeg skrev en e-post i går', tense: 'past' },
            { english: 'She wrote a book last year', norwegian: 'Hun skrev en bok i fjor', tense: 'past' },
            { english: 'I have written the report', norwegian: 'Jeg har skrevet rapporten', tense: 'perfect' },
            { english: 'We have written many letters', norwegian: 'Vi har skrevet mange brev', tense: 'perfect' },
            { english: 'I had written the note before leaving', norwegian: 'Jeg hadde skrevet lappen før jeg dro', tense: 'pluperfect' },
            { english: 'I will write to you soon', norwegian: 'Jeg skal skrive til deg snart', tense: 'future' },
            { english: 'Write your name!', norwegian: 'Skriv navnet ditt!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å snakke',
        translation: 'to speak',
        forms: { present: 'snakker', past: 'snakket', perfect: 'har snakket', pluperfect: 'hadde snakket', future: 'skal snakke', imperative: 'snakk' },
        sentences: [
            { english: 'I speak Norwegian now', norwegian: 'Jeg snakker norsk nå', tense: 'present' },
            { english: 'They speak English at work', norwegian: 'De snakker engelsk på jobb', tense: 'present' },
            { english: 'I spoke to him yesterday', norwegian: 'Jeg snakket med ham i går', tense: 'past' },
            { english: 'We spoke about the plan', norwegian: 'Vi snakket om planen', tense: 'past' },
            { english: 'I have spoken to the boss', norwegian: 'Jeg har snakket med sjefen', tense: 'perfect' },
            { english: 'She has spoken clearly', norwegian: 'Hun har snakket tydelig', tense: 'perfect' },
            { english: 'I had spoken to her before the meeting', norwegian: 'Jeg hadde snakket med henne før møtet', tense: 'pluperfect' },
            { english: 'I will speak to them tomorrow', norwegian: 'Jeg skal snakke med dem i morgen', tense: 'future' },
            { english: 'Speak louder!', norwegian: 'Snakk høyere!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å komme',
        translation: 'to come',
        forms: { present: 'kommer', past: 'kom', perfect: 'har kommet', pluperfect: 'hadde kommet', future: 'skal komme', imperative: 'kom' },
        sentences: [
            { english: 'I come home now', norwegian: 'Jeg kommer hjem nå', tense: 'present' },
            { english: 'Winter is coming', norwegian: 'Vinteren kommer', tense: 'present' },
            { english: 'I came yesterday', norwegian: 'Jeg kom i går', tense: 'past' },
            { english: 'He came late to the party', norwegian: 'Han kom sent til festen', tense: 'past' },
            { english: 'I have come to help', norwegian: 'Jeg har kommet for å hjelpe', tense: 'perfect' },
            { english: 'They have come back', norwegian: 'De har kommet tilbake', tense: 'perfect' },
            { english: 'I had come home when it rained', norwegian: 'Jeg hadde kommet hjem da det regnet', tense: 'pluperfect' },
            { english: 'I will come tomorrow', norwegian: 'Jeg skal komme i morgen', tense: 'future' },
            { english: 'Come here!', norwegian: 'Kom hit!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å se',
        translation: 'to see',
        forms: { present: 'ser', past: 'så', perfect: 'har sett', pluperfect: 'hadde sett', future: 'skal se', imperative: 'se' },
        sentences: [
            { english: 'I see you now', norwegian: 'Jeg ser deg nå', tense: 'present' },
            { english: 'She sees a bird', norwegian: 'Hun ser en fugl', tense: 'present' },
            { english: 'I saw a movie yesterday', norwegian: 'Jeg så en film i går', tense: 'past' },
            { english: 'We saw the accident', norwegian: 'Vi så ulykken', tense: 'past' },
            { english: 'I have seen this before', norwegian: 'Jeg har sett dette før', tense: 'perfect' },
            { english: 'He has seen the world', norwegian: 'Han har sett verden', tense: 'perfect' },
            { english: 'I had seen the sign before I turned', norwegian: 'Jeg hadde sett skiltet før jeg svingte', tense: 'pluperfect' },
            { english: 'I will see you later', norwegian: 'Jeg skal se deg senere', tense: 'future' },
            { english: 'Look at this!', norwegian: 'Se på dette!', tense: 'imperative' }
        ]
    },
    {
        infinitive: 'å gjøre',
        translation: 'to do',
        forms: { present: 'gjør', past: 'gjorde', perfect: 'har gjort', pluperfect: 'hadde gjort', future: 'skal gjøre', imperative: 'gjør' },
        sentences: [
            { english: 'I do my homework now', norwegian: 'Jeg gjør leksene mine nå', tense: 'present' },
            { english: 'He does a good job', norwegian: 'Han gjør en god jobb', tense: 'present' },
            { english: 'I did it yesterday', norwegian: 'Jeg gjorde det i går', tense: 'past' },
            { english: 'She did the dishes', norwegian: 'Hun gjorde oppvasken', tense: 'past' },
            { english: 'I have done everything', norwegian: 'Jeg har gjort alt', tense: 'perfect' },
            { english: 'We have done our best', norwegian: 'Vi har gjort vårt beste', tense: 'perfect' },
            { english: 'I had done the work before he asked', norwegian: 'Jeg hadde gjort arbeidet før han spurte', tense: 'pluperfect' },
            { english: 'I will do it tomorrow', norwegian: 'Jeg skal gjøre det i morgen', tense: 'future' },
            { english: 'Do it now!', norwegian: 'Gjør det nå!', tense: 'imperative' }
        ]
    }
];

async function seedVerbs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Verb.deleteMany({});
        console.log('Cleared existing verbs');

        await Verb.insertMany(verbs);
        console.log(`Seeded ${verbs.length} verbs`);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding verbs:', error);
        process.exit(1);
    }
}

seedVerbs();
