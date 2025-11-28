require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

const newCategories = [
    {
        key: 'fruits',
        title: 'Fruits',
        group: 'Food & Drink',
        words: [
            { word: 'Eple', translations: { en: 'Apple' }, context: 'Et rødt eple.' },
            { word: 'Banan', translations: { en: 'Banana' }, context: 'Bananen er gul.' },
            { word: 'Drue', translations: { en: 'Grape' }, context: 'Druer er søte.' },
            { word: 'Appelsin', translations: { en: 'Orange' }, context: 'Appelsinjuice er godt.' },
            { word: 'Pære', translations: { en: 'Pear' }, context: 'Pæren er moden.' },
            { word: 'Jordbær', translations: { en: 'Strawberry' }, context: 'Norske jordbær er best.' },
            { word: 'Bringebær', translations: { en: 'Raspberry' }, context: 'Vi plukker bringebær.' },
            { word: 'Blåbær', translations: { en: 'Blueberry' }, context: 'Blåbær er sunt.' },
            { word: 'Sitron', translations: { en: 'Lemon' }, context: 'Sitron er surt.' },
            { word: 'Ananas', translations: { en: 'Pineapple' }, context: 'Ananas på pizza?' },
            { word: 'Fersken', translations: { en: 'Peach' }, context: 'Ferskenen er myk.' },
            { word: 'Plomme', translations: { en: 'Plum' }, context: 'Plommetreet i hagen.' },
            { word: 'Kirsebær', translations: { en: 'Cherry' }, context: 'Kirsebær er røde.' },
            { word: 'Vannmelon', translations: { en: 'Watermelon' }, context: 'Vannmelon er friskt.' },
            { word: 'Mango', translations: { en: 'Mango' }, context: 'Mango er eksotisk.' },
            { word: 'Kiwi', translations: { en: 'Kiwi' }, context: 'Kiwi har mye C-vitamin.' },
            { word: 'Melon', translations: { en: 'Melon' }, context: 'Spis melon til frokost.' },
            { word: 'Lime', translations: { en: 'Lime' }, context: 'Lime i drinken.' },
            { word: 'Grapefrukt', translations: { en: 'Grapefruit' }, context: 'Grapefrukt er bittert.' },
            { word: 'Frukt', translations: { en: 'Fruit' }, context: 'Spis mer frukt.' }
        ]
    },
    {
        key: 'fruits_l2',
        title: 'Fruits (Level 2)',
        group: 'Food & Drink',
        words: [
            { word: 'Aprikos', translations: { en: 'Apricot' }, context: 'Tørket aprikos.' },
            { word: 'Fiken', translations: { en: 'Fig' }, context: 'Fiken er godt til ost.' },
            { word: 'Granateple', translations: { en: 'Pomegranate' }, context: 'Granateple har mange frø.' },
            { word: 'Pasjonsfrukt', translations: { en: 'Passion fruit' }, context: 'Pasjonsfrukt smaker godt.' },
            { word: 'Bjørnebær', translations: { en: 'Blackberry' }, context: 'Bjørnebær vokser i skogen.' },
            { word: 'Tyttebær', translations: { en: 'Lingonberry' }, context: 'Tyttebær til kjøttkaker.' },
            { word: 'Mult', translations: { en: 'Cloudberry' }, context: 'Multer kalles skogens gull.' },
            { word: 'Rips', translations: { en: 'Redcurrant' }, context: 'Rips med vaniljesaus.' },
            { word: 'Stikkelsbær', translations: { en: 'Gooseberry' }, context: 'Stikkelsbær er syrlige.' },
            { word: 'Solbær', translations: { en: 'Blackcurrant' }, context: 'Solbærsaft er godt.' }
        ]
    },
    {
        key: 'vegetables',
        title: 'Vegetables',
        group: 'Food & Drink',
        words: [
            { word: 'Gulrot', translations: { en: 'Carrot' }, context: 'Kaninen spiser gulrot.' },
            { word: 'Løk', translations: { en: 'Onion' }, context: 'Jeg gråter av løk.' },
            { word: 'Tomat', translations: { en: 'Tomato' }, context: 'Tomatsuppe er godt.' },
            { word: 'Potet', translations: { en: 'Potato' }, context: 'Vi spiser poteter til middag.' },
            { word: 'Agurk', translations: { en: 'Cucumber' }, context: 'Agurk på brødskiven.' },
            { word: 'Salat', translations: { en: 'Lettuce/Salad' }, context: 'En frisk salat.' },
            { word: 'Paprika', translations: { en: 'Pepper/Capsicum' }, context: 'Rød paprika er søt.' },
            { word: 'Brokkoli', translations: { en: 'Broccoli' }, context: 'Brokkoli er sunt.' },
            { word: 'Blomkål', translations: { en: 'Cauliflower' }, context: 'Blomkålsuppe.' },
            { word: 'Hvitløk', translations: { en: 'Garlic' }, context: 'Det lukter hvitløk.' },
            { word: 'Mais', translations: { en: 'Corn' }, context: 'Maiskolbe på grillen.' },
            { word: 'Erter', translations: { en: 'Peas' }, context: 'Erter, kjøtt og flesk.' },
            { word: 'Bønner', translations: { en: 'Beans' }, context: 'Bønner i tomatsaus.' },
            { word: 'Sopp', translations: { en: 'Mushroom' }, context: 'Vi plukker sopp.' },
            { word: 'Spinat', translations: { en: 'Spinach' }, context: 'Skipperen spiser spinat.' },
            { word: 'Squash', translations: { en: 'Zucchini' }, context: 'Squash er godt i lasagne.' },
            { word: 'Aubergine', translations: { en: 'Eggplant' }, context: 'Aubergine brukes i moussaka.' },
            { word: 'Purre', translations: { en: 'Leek' }, context: 'Purre i suppen.' },
            { word: 'Kål', translations: { en: 'Cabbage' }, context: 'Fårikål er laget av kål.' },
            { word: 'Grønnsak', translations: { en: 'Vegetable' }, context: 'Spis dine grønnsaker.' }
        ]
    },
    {
        key: 'vegetables_l2',
        title: 'Vegetables (Level 2)',
        group: 'Food & Drink',
        words: [
            { word: 'Asparges', translations: { en: 'Asparagus' }, context: 'Grillet asparges.' },
            { word: 'Rødbete', translations: { en: 'Beetroot' }, context: 'Syltede rødbeter.' },
            { word: 'Selleri', translations: { en: 'Celery' }, context: 'Selleristang.' },
            { word: 'Reddik', translations: { en: 'Radish' }, context: 'Reddik er sterkt.' },
            { word: 'Gresskar', translations: { en: 'Pumpkin' }, context: 'Gresskar til Halloween.' },
            { word: 'Søtpotet', translations: { en: 'Sweet potato' }, context: 'Søtpotetfries.' },
            { word: 'Kålrot', translations: { en: 'Rutabaga/Swede' }, context: 'Kålrotstappe.' },
            { word: 'Rosenkål', translations: { en: 'Brussels sprouts' }, context: 'Mange liker ikke rosenkål.' },
            { word: 'Fennikel', translations: { en: 'Fennel' }, context: 'Fennikel smaker lakris.' },
            { word: 'Artisjokk', translations: { en: 'Artichoke' }, context: 'Artisjokk er en delikatesse.' }
        ]
    },
    {
        key: 'drinks',
        title: 'Drinks',
        group: 'Food & Drink',
        words: [
            { word: 'Vann', translations: { en: 'Water' }, context: 'Drikk mye vann.' },
            { word: 'Melk', translations: { en: 'Milk' }, context: 'Melk er godt for skjelettet.' },
            { word: 'Kaffe', translations: { en: 'Coffee' }, context: 'Jeg må ha kaffe om morgenen.' },
            { word: 'Te', translations: { en: 'Tea' }, context: 'En kopp te.' },
            { word: 'Juice', translations: { en: 'Juice' }, context: 'Appelsinjuice.' },
            { word: 'Brus', translations: { en: 'Soda' }, context: 'Brus er usunt.' },
            { word: 'Øl', translations: { en: 'Beer' }, context: 'En kald øl.' },
            { word: 'Vin', translations: { en: 'Wine' }, context: 'Et glass rødvin.' },
            { word: 'Saft', translations: { en: 'Squash/Cordial' }, context: 'Rød saft.' },
            { word: 'Kakao', translations: { en: 'Cocoa/Hot chocolate' }, context: 'Varm kakao med krem.' },
            { word: 'Isbiter', translations: { en: 'Ice cubes' }, context: 'Vil du ha isbiter?' },
            { word: 'Flaske', translations: { en: 'Bottle' }, context: 'En flaske vann.' },
            { word: 'Glass', translations: { en: 'Glass' }, context: 'Et glass melk.' },
            { word: 'Kopp', translations: { en: 'Cup' }, context: 'En kopp kaffe.' },
            { word: 'Sugerør', translations: { en: 'Straw' }, context: 'Drikk med sugerør.' },
            { word: 'Drikke', translations: { en: 'Drink' }, context: 'Hva vil du drikke?' },
            { word: 'Tørst', translations: { en: 'Thirsty' }, context: 'Jeg er tørst.' },
            { word: 'Skål', translations: { en: 'Cheers' }, context: 'Skål!' },
            { word: 'Kullsyre', translations: { en: 'Carbonation' }, context: 'Vann med kullsyre.' },
            { word: 'Varm', translations: { en: 'Hot' }, context: 'Kaffen er varm.' }
        ]
    },
    {
        key: 'drinks_l2',
        title: 'Drinks (Level 2)',
        group: 'Food & Drink',
        words: [
            { word: 'Smoothie', translations: { en: 'Smoothie' }, context: 'En sunn smoothie.' },
            { word: 'Milkshake', translations: { en: 'Milkshake' }, context: 'Jordbærmilkshake.' },
            { word: 'Cider', translations: { en: 'Cider' }, context: 'Eplecider.' },
            { word: 'Champagne', translations: { en: 'Champagne' }, context: 'Vi feirer med champagne.' },
            { word: 'Likør', translations: { en: 'Liqueur' }, context: 'En søt likør.' },
            { word: 'Brennevin', translations: { en: 'Liquor/Spirits' }, context: 'Sterkt brennevin.' },
            { word: 'Springvann', translations: { en: 'Tap water' }, context: 'Norsk springvann er godt.' },
            { word: 'Mineralvann', translations: { en: 'Mineral water' }, context: 'Kjøp en flaske mineralvann.' },
            { word: 'Koffeinfri', translations: { en: 'Decaf' }, context: 'Koffeinfri kaffe.' },
            { word: 'Munkholm', translations: { en: 'Non-alcoholic beer' }, context: 'Munkholm er alkoholfritt øl.' }
        ]
    },
    {
        key: 'cleaning',
        title: 'Cleaning Supplies',
        group: 'Home & Living',
        words: [
            { word: 'Kost', translations: { en: 'Broom' }, context: 'Fei gulvet med kosten.' },
            { word: 'Mopp', translations: { en: 'Mop' }, context: 'Vask gulvet med mopp.' },
            { word: 'Bøtte', translations: { en: 'Bucket' }, context: 'Fyll bøtten med vann.' },
            { word: 'Såpe', translations: { en: 'Soap' }, context: 'Bruk såpe og vann.' },
            { word: 'Kluta', translations: { en: 'Cloth' }, context: 'Tørk av bordet med kluten.' },
            { word: 'Støvsuger', translations: { en: 'Vacuum cleaner' }, context: 'Støvsugeren bråker.' },
            { word: 'Svamp', translations: { en: 'Sponge' }, context: 'Vask bilen med svamp.' },
            { word: 'Oppvaskbørste', translations: { en: 'Dish brush' }, context: 'Bruk oppvaskbørsten.' },
            { word: 'Vaskemiddel', translations: { en: 'Detergent' }, context: 'Vi trenger vaskemiddel.' },
            { word: 'Gummihansker', translations: { en: 'Rubber gloves' }, context: 'Ta på gummihansker.' },
            { word: 'Søppel', translations: { en: 'Trash/Garbage' }, context: 'Kast søppelet.' },
            { word: 'Søppelbøtte', translations: { en: 'Trash can' }, context: 'Søppelbøtten er full.' },
            { word: 'Pose', translations: { en: 'Bag' }, context: 'Søppelpose.' },
            { word: 'Støv', translations: { en: 'Dust' }, context: 'Det er mye støv her.' },
            { word: 'Skittent', translations: { en: 'Dirty' }, context: 'Gulvet er skittent.' },
            { word: 'Rent', translations: { en: 'Clean' }, context: 'Nå er det rent.' },
            { word: 'Vaske', translations: { en: 'Wash' }, context: 'Jeg må vaske klær.' },
            { word: 'Rydde', translations: { en: 'Tidy/Clean up' }, context: 'Vi må rydde rommet.' },
            { word: 'Tørke', translations: { en: 'Dry/Wipe' }, context: 'Tørk støv.' },
            { word: 'Skrubbe', translations: { en: 'Scrub' }, context: 'Du må skrubbe hardt.' }
        ]
    },
    {
        key: 'cleaning_l2',
        title: 'Cleaning (Level 2)',
        group: 'Home & Living',
        words: [
            { word: 'Klorin', translations: { en: 'Bleach' }, context: 'Klorin bleker klær.' },
            { word: 'Salmiakk', translations: { en: 'Ammonia' }, context: 'Salmiakk lukter sterkt.' },
            { word: 'Grønnsåpe', translations: { en: 'Soft soap' }, context: 'Vask tregulvet med grønnsåpe.' },
            { word: 'Skyllemiddel', translations: { en: 'Fabric softener' }, context: 'Skyllemiddel gjør klærne myke.' },
            { word: 'Flekkfjerner', translations: { en: 'Stain remover' }, context: 'Bruk flekkfjerner på flekken.' },
            { word: 'Vindusvask', translations: { en: 'Window cleaning' }, context: 'Tid for vindusvask.' },
            { word: 'Støvbrett', translations: { en: 'Dustpan' }, context: 'Bruk kost og støvbrett.' },
            { word: 'Nal', translations: { en: 'Squeegee' }, context: 'Bruk nal på vinduet.' },
            { word: 'Klesklype', translations: { en: 'Clothespin' }, context: 'Heng opp klærne med klesklyper.' },
            { word: 'Tørkestativ', translations: { en: 'Drying rack' }, context: 'Sett tørkestativet ute.' }
        ]
    },
    {
        key: 'pets',
        title: 'Pets',
        group: 'Nature & Environment',
        words: [
            { word: 'Hund', translations: { en: 'Dog' }, context: 'Hunden bjeffer.' },
            { word: 'Katt', translations: { en: 'Cat' }, context: 'Katten maler.' },
            { word: 'Fisk', translations: { en: 'Fish' }, context: 'Gullfisk i bollen.' },
            { word: 'Kanin', translations: { en: 'Rabbit' }, context: 'Kaninen hopper.' },
            { word: 'Fugl', translations: { en: 'Bird' }, context: 'Fuglen synger.' },
            { word: 'Hamster', translations: { en: 'Hamster' }, context: 'Hamsteren løper i hjulet.' },
            { word: 'Marsvin', translations: { en: 'Guinea pig' }, context: 'Marsvinet piper.' },
            { word: 'Skilpadde', translations: { en: 'Turtle/Tortoise' }, context: 'Skilpadden er treg.' },
            { word: 'Hest', translations: { en: 'Horse' }, context: 'Jeg rir på hest.' },
            { word: 'Dyrlege', translations: { en: 'Vet' }, context: 'Vi må til dyrlegen.' },
            { word: 'Bånd', translations: { en: 'Leash' }, context: 'Hunden må gå i bånd.' },
            { word: 'Halsbånd', translations: { en: 'Collar' }, context: 'Katten har halsbånd.' },
            { word: 'Bur', translations: { en: 'Cage' }, context: 'Fuglen er i buret.' },
            { word: 'Matskål', translations: { en: 'Food bowl' }, context: 'Fyll matskålen.' },
            { word: 'Pels', translations: { en: 'Fur' }, context: 'Katten har myk pels.' },
            { word: 'Hale', translations: { en: 'Tail' }, context: 'Hunden logrer med halen.' },
            { word: 'Klo', translations: { en: 'Claw' }, context: 'Katten har skarpe klør.' },
            { word: 'Pote', translations: { en: 'Paw' }, context: 'Gi labb/pote.' },
            { word: 'Kjæledyr', translations: { en: 'Pet' }, context: 'Har du kjæledyr?' },
            { word: 'Mate', translations: { en: 'Feed' }, context: 'Husk å mate fisken.' }
        ]
    },
    {
        key: 'pets_l2',
        title: 'Pets (Level 2)',
        group: 'Nature & Environment',
        words: [
            { word: 'Papegøye', translations: { en: 'Parrot' }, context: 'Papegøyen kan snakke.' },
            { word: 'Undulat', translations: { en: 'Budgie' }, context: 'Vi har to undulater.' },
            { word: 'Slange', translations: { en: 'Snake' }, context: 'Han har en slange som kjæledyr.' },
            { word: 'Øgle', translations: { en: 'Lizard' }, context: 'Øglen spiser insekter.' },
            { word: 'Rotte', translations: { en: 'Rat' }, context: 'Tamrotter er smarte.' },
            { word: 'Akvarium', translations: { en: 'Aquarium' }, context: 'Vi har et stort akvarium.' },
            { word: 'Hundehus', translations: { en: 'Doghouse' }, context: 'Hunden sover i hundehuset.' },
            { word: 'Kattedo', translations: { en: 'Litter box' }, context: 'Tøm kattedoen.' },
            { word: 'Klo', translations: { en: 'Claw' }, context: 'Klipp klørne.' },
            { word: 'Vaksine', translations: { en: 'Vaccine' }, context: 'Hunden fikk vaksine.' }
        ]
    },
    {
        key: 'communication',
        title: 'Communication',
        group: 'Society & Culture',
        words: [
            { word: 'Melding', translations: { en: 'Message' }, context: 'Send en melding.' },
            { word: 'Ringe', translations: { en: 'Call' }, context: 'Jeg ringer deg senere.' },
            { word: 'E-post', translations: { en: 'Email' }, context: 'Sjekk e-posten din.' },
            { word: 'Brev', translations: { en: 'Letter' }, context: 'Jeg fikk et brev i posten.' },
            { word: 'Snakke', translations: { en: 'Talk/Speak' }, context: 'Vi må snakke sammen.' },
            { word: 'Høre', translations: { en: 'Hear/Listen' }, context: 'Kan du høre meg?' },
            { word: 'Lese', translations: { en: 'Read' }, context: 'Jeg liker å lese.' },
            { word: 'Skrive', translations: { en: 'Write' }, context: 'Skriv navnet ditt.' },
            { word: 'Spørsmål', translations: { en: 'Question' }, context: 'Jeg har et spørsmål.' },
            { word: 'Svar', translations: { en: 'Answer' }, context: 'Hva er svaret?' },
            { word: 'Ord', translations: { en: 'Word' }, context: 'Et vanskelig ord.' },
            { word: 'Setning', translations: { en: 'Sentence' }, context: 'Lag en setning.' },
            { word: 'Språk', translations: { en: 'Language' }, context: 'Lær et nytt språk.' },
            { word: 'Telefon', translations: { en: 'Phone' }, context: 'Telefonen ringer.' },
            { word: 'Mobil', translations: { en: 'Mobile phone' }, context: 'Jeg glemte mobilen.' },
            { word: 'Samtale', translations: { en: 'Conversation' }, context: 'En hyggelig samtale.' },
            { word: 'Nyhet', translations: { en: 'News' }, context: 'Har du hørt nyheten?' },
            { word: 'Avis', translations: { en: 'Newspaper' }, context: 'Leser du avisen?' },
            { word: 'Radio', translations: { en: 'Radio' }, context: 'Hør på radio.' },
            { word: 'TV', translations: { en: 'TV' }, context: 'Se på TV.' }
        ]
    },
    {
        key: 'communication_l2',
        title: 'Communication (Level 2)',
        group: 'Society & Culture',
        words: [
            { word: 'Diskusjon', translations: { en: 'Discussion' }, context: 'Vi hadde en lang diskusjon.' },
            { word: 'Krangel', translations: { en: 'Argument/Quarrel' }, context: 'De hadde en krangel.' },
            { word: 'Intervju', translations: { en: 'Interview' }, context: 'Jeg skal på jobbintervju.' },
            { word: 'Møte', translations: { en: 'Meeting' }, context: 'Møtet begynner nå.' },
            { word: 'Foredrag', translations: { en: 'Lecture/Talk' }, context: 'Et interessant foredrag.' },
            { word: 'Tale', translations: { en: 'Speech' }, context: 'Han holdt en tale.' },
            { word: 'Rykte', translations: { en: 'Rumor' }, context: 'Det er bare et rykte.' },
            { word: 'Hemmelighet', translations: { en: 'Secret' }, context: 'Kan du holde på en hemmelighet?' },
            { word: 'Løgn', translations: { en: 'Lie' }, context: 'Det er en løgn.' },
            { word: 'Sannhet', translations: { en: 'Truth' }, context: 'Fortell sannheten.' }
        ]
    },
    {
        key: 'chores',
        title: 'Household Chores',
        group: 'Home & Living',
        words: [
            { word: 'Vaske', translations: { en: 'Wash' }, context: 'Vaske gulvet.' },
            { word: 'Rydde', translations: { en: 'Tidy' }, context: 'Rydde rommet.' },
            { word: 'Støvsuge', translations: { en: 'Vacuum' }, context: 'Jeg må støvsuge teppet.' },
            { word: 'Oppvask', translations: { en: 'Dishes' }, context: 'Ta oppvasken.' },
            { word: 'Klesvask', translations: { en: 'Laundry' }, context: 'Henge opp klesvasken.' },
            { word: 'Stryke', translations: { en: 'Iron' }, context: 'Stryke skjorter.' },
            { word: 'Lage mat', translations: { en: 'Cook' }, context: 'Hvem skal lage mat?' },
            { word: 'Dekke bord', translations: { en: 'Set the table' }, context: 'Kan du dekke bordet?' },
            { word: 'Gå ut med søpla', translations: { en: 'Take out the trash' }, context: 'Husk å gå ut med søpla.' },
            { word: 'Re sengen', translations: { en: 'Make the bed' }, context: 'Re sengen hver morgen.' },
            { word: 'Vanne planter', translations: { en: 'Water plants' }, context: 'Vanne plantene.' },
            { word: 'Måke snø', translations: { en: 'Shovel snow' }, context: 'Måke snø om vinteren.' },
            { word: 'Klippe gress', translations: { en: 'Mow the lawn' }, context: 'Klippe gresset om sommeren.' },
            { word: 'Pusse vinduer', translations: { en: 'Clean windows' }, context: 'Pusse vinduene til jul.' },
            { word: 'Tørke støv', translations: { en: 'Dust' }, context: 'Tørke støv av hyllene.' },
            { word: 'Skifte på senga', translations: { en: 'Change sheets' }, context: 'Skifte på senga.' },
            { word: 'Handle', translations: { en: 'Shop/Buy groceries' }, context: 'Vi må handle mat.' },
            { word: 'Reparere', translations: { en: 'Repair' }, context: 'Reparere sykkelen.' },
            { word: 'Male', translations: { en: 'Paint' }, context: 'Male huset.' },
            { word: 'Hjelpe', translations: { en: 'Help' }, context: 'Kan du hjelpe meg?' }
        ]
    },
    {
        key: 'chores_l2',
        title: 'Chores (Level 2)',
        group: 'Home & Living',
        words: [
            { word: 'Polere', translations: { en: 'Polish' }, context: 'Polere bilen.' },
            { word: 'Rense', translations: { en: 'Clean/Purify' }, context: 'Rense teppet.' },
            { word: 'Sortere', translations: { en: 'Sort' }, context: 'Sortere søppel.' },
            { word: 'Organisere', translations: { en: 'Organize' }, context: 'Organisere skapet.' },
            { word: 'Vedlikehold', translations: { en: 'Maintenance' }, context: 'Huset trenger vedlikehold.' },
            { word: 'Oppussing', translations: { en: 'Renovation' }, context: 'Vi driver med oppussing.' },
            { word: 'Hagearbeid', translations: { en: 'Gardening' }, context: 'Hagearbeid er tungt.' },
            { word: 'Barnevakt', translations: { en: 'Babysitting' }, context: 'Sitte barnevakt.' },
            { word: 'Dugnad', translations: { en: 'Volunteer work' }, context: 'Være med på dugnad.' },
            { word: 'Husarbeid', translations: { en: 'Housework' }, context: 'De deler på husarbeidet.' }
        ]
    },
    {
        key: 'outdoor',
        title: 'Outdoor Activities',
        group: 'Hobbies & Leisure',
        words: [
            { word: 'Tur', translations: { en: 'Hike/Trip' }, context: 'Gå på tur.' },
            { word: 'Ski', translations: { en: 'Skiing' }, context: 'Gå på ski.' },
            { word: 'Sykkel', translations: { en: 'Bicycle' }, context: 'Sykle en tur.' },
            { word: 'Fiske', translations: { en: 'Fishing' }, context: 'Dra på fisketur.' },
            { word: 'Camping', translations: { en: 'Camping' }, context: 'Dra på camping.' },
            { word: 'Bål', translations: { en: 'Bonfire' }, context: 'Tenne bål.' },
            { word: 'Grille', translations: { en: 'Barbecue/Grill' }, context: 'Grille pølser.' },
            { word: 'Bade', translations: { en: 'Swim/Bathe' }, context: 'Bade i sjøen.' },
            { word: 'Sole seg', translations: { en: 'Sunbathe' }, context: 'Sole seg på stranden.' },
            { word: 'Leke', translations: { en: 'Play' }, context: 'Leke ute.' },
            { word: 'Klatre', translations: { en: 'Climb' }, context: 'Klatre i trær.' },
            { word: 'Løpe', translations: { en: 'Run' }, context: 'Løpe i skogen.' },
            { word: 'Gå', translations: { en: 'Walk' }, context: 'Gå en tur.' },
            { word: 'Skog', translations: { en: 'Forest' }, context: 'Tur i skogen.' },
            { word: 'Fjell', translations: { en: 'Mountain' }, context: 'Tur på fjellet.' },
            { word: 'Sjø', translations: { en: 'Sea' }, context: 'Tur ved sjøen.' },
            { word: 'Park', translations: { en: 'Park' }, context: 'Tur i parken.' },
            { word: 'Natur', translations: { en: 'Nature' }, context: 'Nyt naturen.' },
            { word: 'Friluftsliv', translations: { en: 'Outdoor life' }, context: 'Nordmenn elsker friluftsliv.' },
            { word: 'Utstyr', translations: { en: 'Equipment' }, context: 'Godt utstyr er viktig.' }
        ]
    },
    {
        key: 'outdoor_l2',
        title: 'Outdoor (Level 2)',
        group: 'Hobbies & Leisure',
        words: [
            { word: 'Kano', translations: { en: 'Canoe' }, context: 'Padle kano.' },
            { word: 'Kajakk', translations: { en: 'Kayak' }, context: 'Padle kajakk.' },
            { word: 'Jakt', translations: { en: 'Hunting' }, context: 'Gå på jakt.' },
            { word: 'Bærplukking', translations: { en: 'Berry picking' }, context: 'Dra på bærplukking.' },
            { word: 'Sopptur', translations: { en: 'Mushroom trip' }, context: 'Gå på sopptur.' },
            { word: 'Orientering', translations: { en: 'Orienteering' }, context: 'Løpe orientering.' },
            { word: 'Rafting', translations: { en: 'Rafting' }, context: 'Rafting er spennende.' },
            { word: 'Fjellklatring', translations: { en: 'Mountain climbing' }, context: 'Fjellklatring er farlig.' },
            { word: 'Isfiske', translations: { en: 'Ice fishing' }, context: 'Isfiske på vannet.' },
            { word: 'Snøscooter', translations: { en: 'Snowmobile' }, context: 'Kjøre snøscooter.' }
        ]
    },
    {
        key: 'culture',
        title: 'Cultural Items',
        group: 'Society & Culture',
        words: [
            { word: 'Flagg', translations: { en: 'Flag' }, context: 'Det norske flagget.' },
            { word: 'Bunad', translations: { en: 'Bunad (Folk costume)' }, context: 'Hun har på seg bunad.' },
            { word: '17. mai', translations: { en: '17th of May' }, context: 'Vi feirer 17. mai.' },
            { word: 'Jul', translations: { en: 'Christmas' }, context: 'God jul!' },
            { word: 'Påske', translations: { en: 'Easter' }, context: 'God påske!' },
            { word: 'Troll', translations: { en: 'Troll' }, context: 'Troll i eventyrene.' },
            { word: 'Viking', translations: { en: 'Viking' }, context: 'Vikingene var sjøfarere.' },
            { word: 'Fjord', translations: { en: 'Fjord' }, context: 'Norge har mange fjorder.' },
            { word: 'Midnattssol', translations: { en: 'Midnight sun' }, context: 'Se midnattssolen.' },
            { word: 'Nordlys', translations: { en: 'Northern lights' }, context: 'Nordlyset er vakkert.' },
            { word: 'Hytta', translations: { en: 'Cabin' }, context: 'Vi drar på hytta.' },
            { word: 'Ski', translations: { en: 'Ski' }, context: 'Nordmenn er født med ski på beina.' },
            { word: 'Brunost', translations: { en: 'Brown cheese' }, context: 'Brunost på brødskiva.' },
            { word: 'Vaffel', translations: { en: 'Waffle' }, context: 'Vafler med syltetøy.' },
            { word: 'Laks', translations: { en: 'Salmon' }, context: 'Norsk laks.' },
            { word: 'Olje', translations: { en: 'Oil' }, context: 'Norge har mye olje.' },
            { word: 'Konge', translations: { en: 'King' }, context: 'Kongen bor på slottet.' },
            { word: 'Dronning', translations: { en: 'Queen' }, context: 'Dronningen er snill.' },
            { word: 'Slott', translations: { en: 'Castle/Palace' }, context: 'Slottet ligger i Oslo.' },
            { word: 'Kirke', translations: { en: 'Church' }, context: 'En gammel kirke.' }
        ]
    },
    {
        key: 'culture_l2',
        title: 'Culture (Level 2)',
        group: 'Society & Culture',
        words: [
            { word: 'Stavkirke', translations: { en: 'Stave church' }, context: 'Stavkirker er unike.' },
            { word: 'Lefse', translations: { en: 'Lefse (Flatbread)' }, context: 'Lefse med sukker og kanel.' },
            { word: 'Lutefisk', translations: { en: 'Lutefisk' }, context: 'Lutefisk til jul.' },
            { word: 'Pinnekjøtt', translations: { en: 'Pinnekjøtt (Lamb ribs)' }, context: 'Pinnekjøtt er godt.' },
            { word: 'Ribbe', translations: { en: 'Pork ribs' }, context: 'Ribbe med surkål.' },
            { word: 'Russ', translations: { en: 'Russ (Graduate)' }, context: 'Russen feirer.' },
            { word: 'Dugnad', translations: { en: 'Dugnad (Volunteer work)' }, context: 'Norsk dugnadsånd.' },
            { word: 'Janteloven', translations: { en: 'Law of Jante' }, context: 'Janteloven står sterkt.' },
            { word: 'Sametinget', translations: { en: 'Sami Parliament' }, context: 'Sametinget ligger i Karasjok.' },
            { word: 'Nobelpris', translations: { en: 'Nobel Prize' }, context: 'Nobels fredspris deles ut i Oslo.' }
        ]
    },
    {
        key: 'shapes',
        title: 'Shapes',
        group: 'Abstract Concepts',
        words: [
            { word: 'Sirkel', translations: { en: 'Circle' }, context: 'Tegn en sirkel.' },
            { word: 'Firkant', translations: { en: 'Square' }, context: 'En firkant har fire sider.' },
            { word: 'Trekant', translations: { en: 'Triangle' }, context: 'En trekant har tre sider.' },
            { word: 'Rektangel', translations: { en: 'Rectangle' }, context: 'Et rektangel er avlangt.' },
            { word: 'Stjerne', translations: { en: 'Star' }, context: 'En stjerne på himmelen.' },
            { word: 'Hjerte', translations: { en: 'Heart' }, context: 'Et rødt hjerte.' },
            { word: 'Oval', translations: { en: 'Oval' }, context: 'Et ovalt bord.' },
            { word: 'Linje', translations: { en: 'Line' }, context: 'En rett linje.' },
            { word: 'Punkt', translations: { en: 'Point/Dot' }, context: 'Et punkt på arket.' },
            { word: 'Kors', translations: { en: 'Cross' }, context: 'Et kors i flagget.' },
            { word: 'Bue', translations: { en: 'Arc/Bow' }, context: 'En bue.' },
            { word: 'Vinkel', translations: { en: 'Angle' }, context: 'En rett vinkel.' },
            { word: 'Side', translations: { en: 'Side' }, context: 'Denne siden opp.' },
            { word: 'Form', translations: { en: 'Shape' }, context: 'Hvilken form har den?' },
            { word: 'Rund', translations: { en: 'Round' }, context: 'Ballen er rund.' },
            { word: 'Flat', translations: { en: 'Flat' }, context: 'Pannekaken er flat.' },
            { word: 'Spiss', translations: { en: 'Pointy/Sharp' }, context: 'Kniven er spiss.' },
            { word: 'Kube', translations: { en: 'Cube' }, context: 'En terning er en kube.' },
            { word: 'Kule', translations: { en: 'Sphere/Ball' }, context: 'Jorden er en kule.' },
            { word: 'Pyramide', translations: { en: 'Pyramid' }, context: 'Pyramidene i Egypt.' }
        ]
    },
    {
        key: 'shapes_l2',
        title: 'Shapes (Level 2)',
        group: 'Abstract Concepts',
        words: [
            { word: 'Sylinder', translations: { en: 'Cylinder' }, context: 'En boks er en sylinder.' },
            { word: 'Kjegle', translations: { en: 'Cone' }, context: 'En iskremkjegle.' },
            { word: 'Spiral', translations: { en: 'Spiral' }, context: 'En spiral.' },
            { word: 'Diamant', translations: { en: 'Diamond' }, context: 'Diamantform.' },
            { word: 'Sekskant', translations: { en: 'Hexagon' }, context: 'En sekskant.' },
            { word: 'Åttekant', translations: { en: 'Octagon' }, context: 'Stoppskiltet er en åttekant.' },
            { word: 'Omkrets', translations: { en: 'Circumference' }, context: 'Mål omkretsen.' },
            { word: 'Diameter', translations: { en: 'Diameter' }, context: 'Diameteren er stor.' },
            { word: 'Radius', translations: { en: 'Radius' }, context: 'Radius er halvparten.' },
            { word: 'Diagonal', translations: { en: 'Diagonal' }, context: 'Gå diagonalt.' }
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

        console.log('Done adding batch 4!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

addCategories();
