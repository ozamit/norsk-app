require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

const newCategories = [
    {
        key: 'technology',
        title: 'Technology & Devices',
        group: 'Modern Life',
        words: [
            { word: 'Telefon', translations: { en: 'Phone' }, context: 'Telefonen ringer.' },
            { word: 'Datamaskin', translations: { en: 'Computer' }, context: 'Jeg jobber på datamaskinen.' },
            { word: 'Lader', translations: { en: 'Charger' }, context: 'Hvor er laderen min?' },
            { word: 'Skjerm', translations: { en: 'Screen' }, context: 'Skjermen er knust.' },
            { word: 'Tastatur', translations: { en: 'Keyboard' }, context: 'Tastaturet virker ikke.' },
            { word: 'Mus', translations: { en: 'Mouse' }, context: 'Jeg trenger en ny mus.' },
            { word: 'Nettbrett', translations: { en: 'Tablet' }, context: 'Barna spiller på nettbrett.' },
            { word: 'Internett', translations: { en: 'Internet' }, context: 'Internettet er tregt.' },
            { word: 'Passord', translations: { en: 'Password' }, context: 'Hva er passordet?' },
            { word: 'App', translations: { en: 'App' }, context: 'Last ned appen.' },
            { word: 'Batteri', translations: { en: 'Battery' }, context: 'Batteriet er tomt.' },
            { word: 'Kamera', translations: { en: 'Camera' }, context: 'Kameraet tar gode bilder.' },
            { word: 'Hodetelefoner', translations: { en: 'Headphones' }, context: 'Jeg hører på musikk med hodetelefoner.' },
            { word: 'Melding', translations: { en: 'Message' }, context: 'Du har fått en melding.' },
            { word: 'E-post', translations: { en: 'Email' }, context: 'Send meg en e-post.' },
            { word: 'Lenke', translations: { en: 'Link' }, context: 'Klikk på lenken.' },
            { word: 'Fil', translations: { en: 'File' }, context: 'Lagre filen.' },
            { word: 'Mappe', translations: { en: 'Folder' }, context: 'Legg dokumentet i mappen.' },
            { word: 'Oppdatering', translations: { en: 'Update' }, context: 'Det er en ny oppdatering.' },
            { word: 'Strøm', translations: { en: 'Power/Electricity' }, context: 'Vi har ikke strøm.' }
        ]
    },
    {
        key: 'technology_l2',
        title: 'Technology (Level 2)',
        group: 'Modern Life',
        words: [
            { word: 'Kunstig intelligens', translations: { en: 'Artificial Intelligence' }, context: 'Kunstig intelligens er fremtiden.' },
            { word: 'Algoritme', translations: { en: 'Algorithm' }, context: 'Algoritmen bestemmer hva du ser.' },
            { word: 'Skriver', translations: { en: 'Printer' }, context: 'Skriveren er tom for papir.' },
            { word: 'Minnepinne', translations: { en: 'USB stick' }, context: 'Har du en minnepinne?' },
            { word: 'Harddisk', translations: { en: 'Hard drive' }, context: 'Harddisken er full.' },
            { word: 'Nettverk', translations: { en: 'Network' }, context: 'Nettverket er nede.' },
            { word: 'Server', translations: { en: 'Server' }, context: 'Serveren krasjet.' },
            { word: 'Programvare', translations: { en: 'Software' }, context: 'Programvaren må oppdateres.' },
            { word: 'Maskinvare', translations: { en: 'Hardware' }, context: 'Maskinvaren er gammel.' },
            { word: 'Sikkerhet', translations: { en: 'Security' }, context: 'Datasikkerhet er viktig.' }
        ]
    },
    {
        key: 'sports',
        title: 'Sports & Activities',
        group: 'Hobbies & Leisure',
        words: [
            { word: 'Fotball', translations: { en: 'Soccer/Football' }, context: 'Vi spiller fotball.' },
            { word: 'Svømming', translations: { en: 'Swimming' }, context: 'Svømming er god trening.' },
            { word: 'Løping', translations: { en: 'Running' }, context: 'Jeg liker løping.' },
            { word: 'Ski', translations: { en: 'Skiing' }, context: 'Nordmenn elsker ski.' },
            { word: 'Sykling', translations: { en: 'Cycling' }, context: 'Sykling er populært.' },
            { word: 'Håndball', translations: { en: 'Handball' }, context: 'Norge er gode i håndball.' },
            { word: 'Tennis', translations: { en: 'Tennis' }, context: 'Vil du spille tennis?' },
            { word: 'Basketball', translations: { en: 'Basketball' }, context: 'Han er høy og spiller basketball.' },
            { word: 'Volleyball', translations: { en: 'Volleyball' }, context: 'Vi spiller volleyball på stranden.' },
            { word: 'Dans', translations: { en: 'Dance' }, context: 'Hun går på dans.' },
            { word: 'Trening', translations: { en: 'Training/Workout' }, context: 'Jeg skal på trening.' },
            { word: 'Kamp', translations: { en: 'Match/Game' }, context: 'Vi vant kampen.' },
            { word: 'Lag', translations: { en: 'Team' }, context: 'Hvilket lag heier du på?' },
            { word: 'Ball', translations: { en: 'Ball' }, context: 'Kast ballen til meg.' },
            { word: 'Mål', translations: { en: 'Goal' }, context: 'Han scoret mål!' },
            { word: 'Dommer', translations: { en: 'Referee' }, context: 'Dommeren blåste i fløyta.' },
            { word: 'Stadion', translations: { en: 'Stadium' }, context: 'Stadion er full.' },
            { word: 'Treningssenter', translations: { en: 'Gym/Fitness center' }, context: 'Jeg trener på treningssenter.' },
            { word: 'Yoga', translations: { en: 'Yoga' }, context: 'Yoga gir ro.' },
            { word: 'Tur', translations: { en: 'Hike/Walk' }, context: 'Vi går på tur i skogen.' }
        ]
    },
    {
        key: 'sports_l2',
        title: 'Sports (Level 2)',
        group: 'Hobbies & Leisure',
        words: [
            { word: 'Friidrett', translations: { en: 'Athletics' }, context: 'Friidrett er spennende.' },
            { word: 'Klatring', translations: { en: 'Climbing' }, context: 'Klatring krever styrke.' },
            { word: 'Ishockey', translations: { en: 'Ice hockey' }, context: 'Ishockey er en rask sport.' },
            { word: 'Golf', translations: { en: 'Golf' }, context: 'Han spiller golf hver helg.' },
            { word: 'Boksing', translations: { en: 'Boxing' }, context: 'Boksing er en kampsport.' },
            { word: 'Bryting', translations: { en: 'Wrestling' }, context: 'Bryting er populært i noen land.' },
            { word: 'Skøyter', translations: { en: 'Skating' }, context: 'Vi går på skøyter om vinteren.' },
            { word: 'Snowboard', translations: { en: 'Snowboard' }, context: 'Han står på snowboard.' },
            { word: 'Medalje', translations: { en: 'Medal' }, context: 'Hun vant gullmedalje.' },
            { word: 'Konkurranse', translations: { en: 'Competition' }, context: 'Jeg deltar i en konkurranse.' }
        ]
    },
    {
        key: 'hobbies',
        title: 'Hobbies & Leisure',
        group: 'Hobbies & Leisure',
        words: [
            { word: 'Maling', translations: { en: 'Painting' }, context: 'Maling er avslappende.' },
            { word: 'Lesing', translations: { en: 'Reading' }, context: 'Jeg liker lesing.' },
            { word: 'Musikk', translations: { en: 'Music' }, context: 'Musikk gjør meg glad.' },
            { word: 'Spill', translations: { en: 'Game/Gaming' }, context: 'Vi spiller spill.' },
            { word: 'Foto', translations: { en: 'Photography' }, context: 'Foto er min hobby.' },
            { word: 'Strikking', translations: { en: 'Knitting' }, context: 'Bestemor liker strikking.' },
            { word: 'Matlaging', translations: { en: 'Cooking' }, context: 'Matlaging er gøy.' },
            { word: 'Hagearbeid', translations: { en: 'Gardening' }, context: 'Hagearbeid gir ro.' },
            { word: 'Fiske', translations: { en: 'Fishing' }, context: 'Vi drar på fiske.' },
            { word: 'Reise', translations: { en: 'Travel' }, context: 'Jeg elsker å reise.' },
            { word: 'Kino', translations: { en: 'Cinema' }, context: 'Skal vi gå på kino?' },
            { word: 'Teater', translations: { en: 'Theater' }, context: 'Vi så et stykke på teateret.' },
            { word: 'Konsert', translations: { en: 'Concert' }, context: 'Konserten var fantastisk.' },
            { word: 'Museum', translations: { en: 'Museum' }, context: 'Vi besøkte et museum.' },
            { word: 'Sjakk', translations: { en: 'Chess' }, context: 'Han er god i sjakk.' },
            { word: 'Kortspill', translations: { en: 'Card game' }, context: 'Vi spiller kortspill.' },
            { word: 'Puslespill', translations: { en: 'Puzzle' }, context: 'Dette er et vanskelig puslespill.' },
            { word: 'Samling', translations: { en: 'Collection' }, context: 'Han har en stor samling.' },
            { word: 'Tegning', translations: { en: 'Drawing' }, context: 'Hun er flink til tegning.' },
            { word: 'Sang', translations: { en: 'Singing' }, context: 'Vi synger en sang.' }
        ]
    },
    {
        key: 'hobbies_l2',
        title: 'Hobbies (Level 2)',
        group: 'Hobbies & Leisure',
        words: [
            { word: 'Slektsforskning', translations: { en: 'Genealogy' }, context: 'Han driver med slektsforskning.' },
            { word: 'Fuglekikking', translations: { en: 'Bird watching' }, context: 'Fuglekikking krever tålmodighet.' },
            { word: 'Modellbygging', translations: { en: 'Model building' }, context: 'Han bygger modellfly.' },
            { word: 'Keramikk', translations: { en: 'Pottery' }, context: 'Hun lager keramikk.' },
            { word: 'Sying', translations: { en: 'Sewing' }, context: 'Sying er nyttig.' },
            { word: 'Hekling', translations: { en: 'Crocheting' }, context: 'Hekling ligner på strikking.' },
            { word: 'Treskjæring', translations: { en: 'Wood carving' }, context: 'Treskjæring er en gammel kunst.' },
            { word: 'Dansing', translations: { en: 'Dancing' }, context: 'Vi skal på dansing.' },
            { word: 'Camping', translations: { en: 'Camping' }, context: 'Vi drar på camping i ferien.' },
            { word: 'Jakt', translations: { en: 'Hunting' }, context: 'Jakt er populært om høsten.' }
        ]
    },
    {
        key: 'travel',
        title: 'Travel & Tourism',
        group: 'Travel & Movement',
        words: [
            { word: 'Hotell', translations: { en: 'Hotel' }, context: 'Vi bor på hotell.' },
            { word: 'Pass', translations: { en: 'Passport' }, context: 'Husk passet ditt.' },
            { word: 'Billett', translations: { en: 'Ticket' }, context: 'Jeg har bestilt billett.' },
            { word: 'Koffert', translations: { en: 'Suitcase' }, context: 'Kofferten er pakket.' },
            { word: 'Turist', translations: { en: 'Tourist' }, context: 'Det er mange turister her.' },
            { word: 'Kart', translations: { en: 'Map' }, context: 'Vi trenger et kart.' },
            { word: 'Guide', translations: { en: 'Guide' }, context: 'Guiden viste oss byen.' },
            { word: 'Severdighet', translations: { en: 'Sight/Attraction' }, context: 'Vi så mange severdigheter.' },
            { word: 'Strand', translations: { en: 'Beach' }, context: 'Stranden er vakker.' },
            { word: 'Fjell', translations: { en: 'Mountain' }, context: 'Vi gikk tur i fjellet.' },
            { word: 'By', translations: { en: 'City/Town' }, context: 'Jeg liker denne byen.' },
            { word: 'Land', translations: { en: 'Country' }, context: 'Hvilket land kommer du fra?' },
            { word: 'Språk', translations: { en: 'Language' }, context: 'Hvilke språk snakker du?' },
            { word: 'Ferie', translations: { en: 'Vacation/Holiday' }, context: 'Når skal du på ferie?' },
            { word: 'Reisebyrå', translations: { en: 'Travel agency' }, context: 'Vi bestilte via reisebyrå.' },
            { word: 'Resepsjon', translations: { en: 'Reception' }, context: 'Nøkkelen er i resepsjonen.' },
            { word: 'Rom', translations: { en: 'Room' }, context: 'Rommet har utsikt.' },
            { word: 'Seng', translations: { en: 'Bed' }, context: 'Sengen er god.' },
            { word: 'Frokost', translations: { en: 'Breakfast' }, context: 'Frokost er inkludert.' },
            { word: 'Utsikt', translations: { en: 'View' }, context: 'Det er fin utsikt her.' }
        ]
    },
    {
        key: 'travel_l2',
        title: 'Travel (Level 2)',
        group: 'Travel & Movement',
        words: [
            { word: 'Vandrerhjem', translations: { en: 'Hostel' }, context: 'Vandrerhjem er billigere.' },
            { word: 'Visum', translations: { en: 'Visa' }, context: 'Du trenger visum til USA.' },
            { word: 'Toll', translations: { en: 'Customs' }, context: 'Vi gikk gjennom tollen.' },
            { word: 'Valuta', translations: { en: 'Currency' }, context: 'Hvilken valuta bruker de?' },
            { word: 'Suvenir', translations: { en: 'Souvenir' }, context: 'Jeg kjøpte en suvenir.' },
            { word: 'Utflukt', translations: { en: 'Excursion' }, context: 'Vi var på en utflukt.' },
            { word: 'Cruise', translations: { en: 'Cruise' }, context: 'De dro på cruise.' },
            { word: 'Campingplass', translations: { en: 'Campsite' }, context: 'Campingplassen var full.' },
            { word: 'Telt', translations: { en: 'Tent' }, context: 'Vi sov i telt.' },
            { word: 'Sovepose', translations: { en: 'Sleeping bag' }, context: 'Soveposen var varm.' }
        ]
    },
    {
        key: 'shopping',
        title: 'Shopping',
        group: 'Society & Culture',
        words: [
            { word: 'Pris', translations: { en: 'Price' }, context: 'Hva er prisen?' },
            { word: 'Kasse', translations: { en: 'Checkout/Cashier' }, context: 'Betal i kassen.' },
            { word: 'Pose', translations: { en: 'Bag' }, context: 'Vil du ha en pose?' },
            { word: 'Butikk', translations: { en: 'Shop/Store' }, context: 'Butikken er åpen.' },
            { word: 'Kjøpesenter', translations: { en: 'Shopping mall' }, context: 'Vi går på kjøpesenteret.' },
            { word: 'Salg', translations: { en: 'Sale' }, context: 'Det er salg nå.' },
            { word: 'Tilbud', translations: { en: 'Offer' }, context: 'Dette er et godt tilbud.' },
            { word: 'Kvittering', translations: { en: 'Receipt' }, context: 'Vil du ha kvittering?' },
            { word: 'Kunde', translations: { en: 'Customer' }, context: 'Kunden har alltid rett.' },
            { word: 'Penger', translations: { en: 'Money' }, context: 'Jeg har ikke penger.' },
            { word: 'Kort', translations: { en: 'Card' }, context: 'Tar dere kort?' },
            { word: 'Kontanter', translations: { en: 'Cash' }, context: 'Jeg betaler med kontanter.' },
            { word: 'Størrelse', translations: { en: 'Size' }, context: 'Hvilken størrelse bruker du?' },
            { word: 'Prøverom', translations: { en: 'Fitting room' }, context: 'Hvor er prøverommet?' },
            { word: 'Dyr', translations: { en: 'Expensive' }, context: 'Den var for dyr.' },
            { word: 'Billig', translations: { en: 'Cheap' }, context: 'Det var veldig billig.' },
            { word: 'Handlekurv', translations: { en: 'Shopping cart' }, context: 'Handlekurven er full.' },
            { word: 'Marked', translations: { en: 'Market' }, context: 'Vi kjøpte frukt på markedet.' },
            { word: 'Gave', translations: { en: 'Gift' }, context: 'Det er en gave.' },
            { word: 'Retur', translations: { en: 'Return' }, context: 'Jeg vil gjøre en retur.' }
        ]
    },
    {
        key: 'shopping_l2',
        title: 'Shopping (Level 2)',
        group: 'Society & Culture',
        words: [
            { word: 'Rabatt', translations: { en: 'Discount' }, context: 'Får jeg rabatt?' },
            { word: 'Utstillingsvindu', translations: { en: 'Display window' }, context: 'Se i utstillingsvinduet.' },
            { word: 'Merkeklær', translations: { en: 'Brand clothes' }, context: 'Han liker merkeklær.' },
            { word: 'Bruktbutikk', translations: { en: 'Thrift store' }, context: 'Jeg fant den i en bruktbutikk.' },
            { word: 'Kø', translations: { en: 'Queue/Line' }, context: 'Det er lang kø.' },
            { word: 'Veksel', translations: { en: 'Change' }, context: 'Her er vekselen din.' },
            { word: 'Garanti', translations: { en: 'Warranty' }, context: 'Er det garanti på denne?' },
            { word: 'Reklamasjon', translations: { en: 'Complaint/Claim' }, context: 'Dette er en reklamasjon.' },
            { word: 'Åpningstid', translations: { en: 'Opening hours' }, context: 'Sjekk åpningstidene.' },
            { word: 'Stengt', translations: { en: 'Closed' }, context: 'Butikken er stengt.' }
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

        console.log('Done adding batch 2!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

addCategories();
