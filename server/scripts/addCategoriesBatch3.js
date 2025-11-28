require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

const newCategories = [
    {
        key: 'kitchen',
        title: 'Kitchen Items',
        group: 'Home & Living',
        words: [
            { word: 'Skje', translations: { en: 'Spoon' }, context: 'Spis suppe med skje.' },
            { word: 'Gaffel', translations: { en: 'Fork' }, context: 'Bruk gaffel og kniv.' },
            { word: 'Kniv', translations: { en: 'Knife' }, context: 'Kniven er skarp.' },
            { word: 'Tallerken', translations: { en: 'Plate' }, context: 'Maten ligger på tallerkenen.' },
            { word: 'Glass', translations: { en: 'Glass' }, context: 'Kan jeg få et glass vann?' },
            { word: 'Kopp', translations: { en: 'Cup' }, context: 'En kopp kaffe, takk.' },
            { word: 'Stekepanne', translations: { en: 'Frying pan' }, context: 'Stek egg i stekepannen.' },
            { word: 'Kjele', translations: { en: 'Pot' }, context: 'Kok poteter i kjelen.' },
            { word: 'Kjøleskap', translations: { en: 'Refrigerator' }, context: 'Melken står i kjøleskapet.' },
            { word: 'Komfyr', translations: { en: 'Stove' }, context: 'Komfyren er varm.' },
            { word: 'Ovn', translations: { en: 'Oven' }, context: 'Sett pizzaen i ovnen.' },
            { word: 'Oppvaskmaskin', translations: { en: 'Dishwasher' }, context: 'Sett inn i oppvaskmaskinen.' },
            { word: 'Vask', translations: { en: 'Sink' }, context: 'Vasken er full av oppvask.' },
            { word: 'Skål', translations: { en: 'Bowl' }, context: 'En skål med frokostblanding.' },
            { word: 'Kjøkken', translations: { en: 'Kitchen' }, context: 'Vi spiser på kjøkkenet.' },
            { word: 'Fryser', translations: { en: 'Freezer' }, context: 'Isen ligger i fryseren.' },
            { word: 'Mikrobølgeovn', translations: { en: 'Microwave' }, context: 'Varm maten i mikrobølgeovnen.' },
            { word: 'Kjøkkenhåndkle', translations: { en: 'Kitchen towel' }, context: 'Tørk hendene på kjøkkenhåndkleet.' },
            { word: 'Visp', translations: { en: 'Whisk' }, context: 'Bruk en visp til kremen.' },
            { word: 'Øse', translations: { en: 'Ladle' }, context: 'Bruk en øse til suppen.' }
        ]
    },
    {
        key: 'kitchen_l2',
        title: 'Kitchen (Level 2)',
        group: 'Home & Living',
        words: [
            { word: 'Dørslag', translations: { en: 'Colander' }, context: 'Hell vannet i dørslaget.' },
            { word: 'Rivjern', translations: { en: 'Grater' }, context: 'Riv osten på rivjernet.' },
            { word: 'Skjærebrett', translations: { en: 'Cutting board' }, context: 'Skjær brød på skjærebrettet.' },
            { word: 'Kjevle', translations: { en: 'Rolling pin' }, context: 'Bruk kjevle til deigen.' },
            { word: 'Slikkepott', translations: { en: 'Spatula' }, context: 'Bruk slikkepott i bollen.' },
            { word: 'Ildfast form', translations: { en: 'Ovenproof dish' }, context: 'Lag lasagne i ildfast form.' },
            { word: 'Vekt', translations: { en: 'Scale' }, context: 'Vei mel på vekten.' },
            { word: 'Blender', translations: { en: 'Blender' }, context: 'Lag smoothie i blenderen.' },
            { word: 'Brødrister', translations: { en: 'Toaster' }, context: 'Brødet er i brødristeren.' },
            { word: 'Vannkoker', translations: { en: 'Kettle' }, context: 'Kok vann i vannkokeren.' }
        ]
    },
    {
        key: 'bathroom',
        title: 'Bathroom Items',
        group: 'Home & Living',
        words: [
            { word: 'Håndkle', translations: { en: 'Towel' }, context: 'Her er et rent håndkle.' },
            { word: 'Tannbørste', translations: { en: 'Toothbrush' }, context: 'Husk tannbørsten din.' },
            { word: 'Såpe', translations: { en: 'Soap' }, context: 'Vask hendene med såpe.' },
            { word: 'Sjampo', translations: { en: 'Shampoo' }, context: 'Jeg trenger ny sjampo.' },
            { word: 'Toalett', translations: { en: 'Toilet' }, context: 'Hvor er toalettet?' },
            { word: 'Dusj', translations: { en: 'Shower' }, context: 'Jeg tar en dusj.' },
            { word: 'Badekar', translations: { en: 'Bathtub' }, context: 'Badekaret er fullt.' },
            { word: 'Speil', translations: { en: 'Mirror' }, context: 'Se deg i speilet.' },
            { word: 'Vask', translations: { en: 'Sink' }, context: 'Vask ansiktet i vasken.' },
            { word: 'Tannkrem', translations: { en: 'Toothpaste' }, context: 'Vi er tomme for tannkrem.' },
            { word: 'Toalettpapir', translations: { en: 'Toilet paper' }, context: 'Kjøp toalettpapir.' },
            { word: 'Kam', translations: { en: 'Comb' }, context: 'Har du en kam?' },
            { word: 'Børste', translations: { en: 'Brush' }, context: 'Hårbørsten ligger der.' },
            { word: 'Barberhøvel', translations: { en: 'Razor' }, context: 'Han bruker barberhøvel.' },
            { word: 'Krem', translations: { en: 'Cream/Lotion' }, context: 'Smør deg med krem.' },
            { word: 'Bad', translations: { en: 'Bathroom' }, context: 'Badet er opptatt.' },
            { word: 'Kran', translations: { en: 'Tap/Faucet' }, context: 'Kranen drypper.' },
            { word: 'Sluk', translations: { en: 'Drain' }, context: 'Sluket er tett.' },
            { word: 'Fliser', translations: { en: 'Tiles' }, context: 'Flisene er blå.' },
            { word: 'Matte', translations: { en: 'Mat' }, context: 'Stå på matten.' }
        ]
    },
    {
        key: 'bathroom_l2',
        title: 'Bathroom (Level 2)',
        group: 'Home & Living',
        words: [
            { word: 'Badevekt', translations: { en: 'Bathroom scale' }, context: 'Badevekten viser feil.' },
            { word: 'Hårføner', translations: { en: 'Hair dryer' }, context: 'Bruk hårføner etter dusjen.' },
            { word: 'Tanntråd', translations: { en: 'Dental floss' }, context: 'Bruk tanntråd hver dag.' },
            { word: 'Munnskyll', translations: { en: 'Mouthwash' }, context: 'Munnskyll gir frisk pust.' },
            { word: 'Deodorant', translations: { en: 'Deodorant' }, context: 'Ikke glem deodorant.' },
            { word: 'Neglesaks', translations: { en: 'Nail scissors' }, context: 'Hvor er neglesaksen?' },
            { word: 'Pinsett', translations: { en: 'Tweezers' }, context: 'Jeg trenger en pinsett.' },
            { word: 'Bomull', translations: { en: 'Cotton' }, context: 'Bruk bomull til å vaske såret.' },
            { word: 'Q-tips', translations: { en: 'Cotton buds' }, context: 'Ikke bruk Q-tips i øret.' },
            { word: 'Svamp', translations: { en: 'Sponge' }, context: 'Vask deg med svampen.' }
        ]
    },
    {
        key: 'bedroom',
        title: 'Bedroom Items',
        group: 'Home & Living',
        words: [
            { word: 'Seng', translations: { en: 'Bed' }, context: 'Sengen er myk.' },
            { word: 'Pute', translations: { en: 'Pillow' }, context: 'Jeg trenger en pute til.' },
            { word: 'Dyne', translations: { en: 'Duvet' }, context: 'Dyna er varm.' },
            { word: 'Madrass', translations: { en: 'Mattress' }, context: 'Madrassen er ny.' },
            { word: 'Laken', translations: { en: 'Sheet' }, context: 'Skift laken på sengen.' },
            { word: 'Skap', translations: { en: 'Closet/Wardrobe' }, context: 'Klærne henger i skapet.' },
            { word: 'Skuff', translations: { en: 'Drawer' }, context: 'Sokkene ligger i skuffen.' },
            { word: 'Nattbord', translations: { en: 'Nightstand' }, context: 'Boken ligger på nattbordet.' },
            { word: 'Lampe', translations: { en: 'Lamp' }, context: 'Slå på lampen.' },
            { word: 'Teppe', translations: { en: 'Blanket/Rug' }, context: 'Det er kaldt, ta et teppe.' },
            { word: 'Vekkerklokke', translations: { en: 'Alarm clock' }, context: 'Vekkerklokken ringer klokken syv.' },
            { word: 'Gardin', translations: { en: 'Curtain' }, context: 'Trekk for gardinene.' },
            { word: 'Speil', translations: { en: 'Mirror' }, context: 'Det er speil på veggen.' },
            { word: 'Kommode', translations: { en: 'Dresser' }, context: 'Kommoden har fem skuffer.' },
            { word: 'Kleshenger', translations: { en: 'Hanger' }, context: 'Heng jakken på en kleshenger.' },
            { word: 'Soverom', translations: { en: 'Bedroom' }, context: 'Soverommet er malt grønt.' },
            { word: 'Pyjamas', translations: { en: 'Pajamas' }, context: 'Ta på deg pyjamas.' },
            { word: 'Tøfler', translations: { en: 'Slippers' }, context: 'Tøflene står under sengen.' },
            { word: 'Bokhylle', translations: { en: 'Bookshelf' }, context: 'Bokhyllen er full av bøker.' },
            { word: 'Bilde', translations: { en: 'Picture' }, context: 'Bildet henger over sengen.' }
        ]
    },
    {
        key: 'bedroom_l2',
        title: 'Bedroom (Level 2)',
        group: 'Home & Living',
        words: [
            { word: 'Sengeteppe', translations: { en: 'Bedspread' }, context: 'Sengeteppet er pent.' },
            { word: 'Dynetrekk', translations: { en: 'Duvet cover' }, context: 'Dynetrekket har blomster.' },
            { word: 'Putetrekk', translations: { en: 'Pillowcase' }, context: 'Vask putetrekket.' },
            { word: 'Overmadrass', translations: { en: 'Mattress topper' }, context: 'Overmadrassen gjør sengen mykere.' },
            { word: 'Rullegardin', translations: { en: 'Roller blind' }, context: 'Trekk ned rullegardinen.' },
            { word: 'Persienne', translations: { en: 'Blinds' }, context: 'Persiennene stenger solen ute.' },
            { word: 'Sengegavl', translations: { en: 'Headboard' }, context: 'Sengegavlen er av tre.' },
            { word: 'Nattlys', translations: { en: 'Night light' }, context: 'Barna har nattlys.' },
            { word: 'Smykkeskrin', translations: { en: 'Jewelry box' }, context: 'Smykkeskrinet står på kommoden.' },
            { word: 'Klesstativ', translations: { en: 'Clothes rack' }, context: 'Klesstativet veltet.' }
        ]
    },
    {
        key: 'tools',
        title: 'Tools',
        group: 'Objects & Materials',
        words: [
            { word: 'Hammer', translations: { en: 'Hammer' }, context: 'Slå spikeren med en hammer.' },
            { word: 'Skrutrekker', translations: { en: 'Screwdriver' }, context: 'Bruk en skrutrekker.' },
            { word: 'Sag', translations: { en: 'Saw' }, context: 'Sagen er skarp.' },
            { word: 'Spiker', translations: { en: 'Nail' }, context: 'Jeg trenger en spiker.' },
            { word: 'Skrue', translations: { en: 'Screw' }, context: 'Skruen er løs.' },
            { word: 'Drill', translations: { en: 'Drill' }, context: 'Bruk drillen til å lage hull.' },
            { word: 'Målebånd', translations: { en: 'Tape measure' }, context: 'Mål lengden med målebånd.' },
            { word: 'Tang', translations: { en: 'Pliers' }, context: 'Bruk tangen til å klippe.' },
            { word: 'Stige', translations: { en: 'Ladder' }, context: 'Klatre opp stigen.' },
            { word: 'Maling', translations: { en: 'Paint' }, context: 'Malingen har tørket.' },
            { word: 'Pensel', translations: { en: 'Paintbrush' }, context: 'Vask penselen etter bruk.' },
            { word: 'Verktøy', translations: { en: 'Tool' }, context: 'Verktøyet ligger i kassen.' },
            { word: 'Verktøykasse', translations: { en: 'Toolbox' }, context: 'Hent verktøykassen.' },
            { word: 'Tommestokk', translations: { en: 'Folding rule' }, context: 'Har du en tommestokk?' },
            { word: 'Vater', translations: { en: 'Level' }, context: 'Bruk vater for å få det rett.' },
            { word: 'Skiftenøkkel', translations: { en: 'Wrench' }, context: 'Bruk skiftenøkkel på mutteren.' },
            { word: 'Øks', translations: { en: 'Axe' }, context: 'Han hugger ved med øks.' },
            { word: 'Kniv', translations: { en: 'Knife' }, context: 'Bruk en skarp kniv.' },
            { word: 'Teip', translations: { en: 'Tape' }, context: 'Teipen sitter fast.' },
            { word: 'Lim', translations: { en: 'Glue' }, context: 'Limet må tørke.' }
        ]
    },
    {
        key: 'tools_l2',
        title: 'Tools (Level 2)',
        group: 'Objects & Materials',
        words: [
            { word: 'Sandpapir', translations: { en: 'Sandpaper' }, context: 'Puss med sandpapir.' },
            { word: 'Høvel', translations: { en: 'Plane' }, context: 'Snekkeren bruker høvel.' },
            { word: 'Meisel', translations: { en: 'Chisel' }, context: 'Bruk meisel på steinen.' },
            { word: 'Fil', translations: { en: 'File' }, context: 'Fil kanten glatt.' },
            { word: 'Skrustikke', translations: { en: 'Vise' }, context: 'Fest emnet i skrustikken.' },
            { word: 'Loddebolt', translations: { en: 'Soldering iron' }, context: 'Loddebolten er varm.' },
            { word: 'Sirkelsag', translations: { en: 'Circular saw' }, context: 'Vær forsiktig med sirkelsagen.' },
            { word: 'Stikksag', translations: { en: 'Jigsaw' }, context: 'Stikksagen lager buer.' },
            { word: 'Brekkjern', translations: { en: 'Crowbar' }, context: 'Bruk brekkjern for å åpne kassen.' },
            { word: 'Trillebår', translations: { en: 'Wheelbarrow' }, context: 'Trillebåren er full av jord.' }
        ]
    },
    {
        key: 'money',
        title: 'Money & Banking',
        group: 'Society & Culture',
        words: [
            { word: 'Penger', translations: { en: 'Money' }, context: 'Tid er penger.' },
            { word: 'Bank', translations: { en: 'Bank' }, context: 'Jeg må i banken.' },
            { word: 'Konto', translations: { en: 'Account' }, context: 'Sjekk kontoen din.' },
            { word: 'Kort', translations: { en: 'Card' }, context: 'Betaler du med kort?' },
            { word: 'Kontanter', translations: { en: 'Cash' }, context: 'Jeg har ingen kontanter.' },
            { word: 'Lommebok', translations: { en: 'Wallet' }, context: 'Jeg mistet lommeboken.' },
            { word: 'Mynt', translations: { en: 'Coin' }, context: 'Har du en mynt?' },
            { word: 'Seddel', translations: { en: 'Banknote' }, context: 'En hundrelapp er en seddel.' },
            { word: 'Lønn', translations: { en: 'Salary' }, context: 'Når får vi lønn?' },
            { word: 'Regning', translations: { en: 'Bill' }, context: 'Betal regningen i tide.' },
            { word: 'Pris', translations: { en: 'Price' }, context: 'Prisen er høy.' },
            { word: 'Kjøpe', translations: { en: 'Buy' }, context: 'Jeg vil kjøpe den.' },
            { word: 'Selge', translations: { en: 'Sell' }, context: 'Han vil selge bilen.' },
            { word: 'Spare', translations: { en: 'Save' }, context: 'Vi må spare penger.' },
            { word: 'Bruke', translations: { en: 'Spend/Use' }, context: 'Ikke bruk alle pengene.' },
            { word: 'Låne', translations: { en: 'Borrow/Lend' }, context: 'Kan jeg låne en tier?' },
            { word: 'Gjeld', translations: { en: 'Debt' }, context: 'Han har stor gjeld.' },
            { word: 'Rente', translations: { en: 'Interest' }, context: 'Renten stiger.' },
            { word: 'Minibank', translations: { en: 'ATM' }, context: 'Hvor er nærmeste minibank?' },
            { word: 'Valuta', translations: { en: 'Currency' }, context: 'Norsk valuta er kroner.' }
        ]
    },
    {
        key: 'money_l2',
        title: 'Money (Level 2)',
        group: 'Society & Culture',
        words: [
            { word: 'Budsjett', translations: { en: 'Budget' }, context: 'Vi må sette opp et budsjett.' },
            { word: 'Investering', translations: { en: 'Investment' }, context: 'Dette er en god investering.' },
            { word: 'Aksje', translations: { en: 'Share/Stock' }, context: 'Han kjøpte aksjer.' },
            { word: 'Fond', translations: { en: 'Fund' }, context: 'Spar i fond.' },
            { word: 'Skatt', translations: { en: 'Tax' }, context: 'Vi betaler skatt.' },
            { word: 'Avgift', translations: { en: 'Fee/Charge' }, context: 'Det er en liten avgift.' },
            { word: 'Kvittering', translations: { en: 'Receipt' }, context: 'Ta vare på kvitteringen.' },
            { word: 'Overføring', translations: { en: 'Transfer' }, context: 'Bankoverføringen tar tid.' },
            { word: 'Innskudd', translations: { en: 'Deposit' }, context: 'Gjør et innskudd.' },
            { word: 'Uttak', translations: { en: 'Withdrawal' }, context: 'Gjør et uttak i minibanken.' }
        ]
    }
];

async function addCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const cat of newCategories) {
            // Add learningLanguage: 'no' to all
            cat.learningLanguage = 'no';

            // Check if exists
            const exists = await Category.findOne({ key: cat.key });
            if (exists) {
                console.log(`Skipping ${cat.key} - already exists`);
                continue;
            }

            // Format words correctly (ensure structure matches schema)
            cat.words = cat.words.map(w => ({
                word: w.word,
                translations: w.translations,
                context: w.context,
                contextTranslations: { en: w.context } // Simple context translation for now
            }));

            await Category.create(cat);
            console.log(`Added category: ${cat.title}`);
        }

        console.log('Done adding batch 3!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

addCategories();
