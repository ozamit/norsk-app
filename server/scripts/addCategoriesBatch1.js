require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

const newCategories = [
    {
        key: 'transportation',
        title: 'Transportation & Vehicles',
        group: 'Travel & Movement',
        words: [
            { word: 'Buss', translations: { en: 'Bus' }, context: 'Jeg tar bussen til jobb.' },
            { word: 'Tog', translations: { en: 'Train' }, context: 'Toget går klokken åtte.' },
            { word: 'Bil', translations: { en: 'Car' }, context: 'Vi kjører bil til hytta.' },
            { word: 'Sykkel', translations: { en: 'Bicycle' }, context: 'Han sykler til skolen.' },
            { word: 'Fly', translations: { en: 'Airplane' }, context: 'Flyet lander snart.' },
            { word: 'Båt', translations: { en: 'Boat' }, context: 'Vi har en liten båt.' },
            { word: 'T-bane', translations: { en: 'Subway/Metro' }, context: 'T-banen er rask.' },
            { word: 'Drosje', translations: { en: 'Taxi' }, context: 'Kan du ringe en drosje?' },
            { word: 'Motorsykkel', translations: { en: 'Motorcycle' }, context: 'Han kjører motorsykkel.' },
            { word: 'Lastebil', translations: { en: 'Truck' }, context: 'Lastebilen er stor.' },
            { word: 'Stasjon', translations: { en: 'Station' }, context: 'Vi møtes på stasjonen.' },
            { word: 'Billett', translations: { en: 'Ticket' }, context: 'Har du billett?' },
            { word: 'Flyplass', translations: { en: 'Airport' }, context: 'Vi må dra til flyplassen.' },
            { word: 'Havn', translations: { en: 'Harbor' }, context: 'Båten ligger i havnen.' },
            { word: 'Holdeplass', translations: { en: 'Stop (Bus/Tram)' }, context: 'Gå av på neste holdeplass.' },
            { word: 'Spor', translations: { en: 'Track' }, context: 'Toget går fra spor 3.' },
            { word: 'Sete', translations: { en: 'Seat' }, context: 'Er dette setet ledig?' },
            { word: 'Passasjer', translations: { en: 'Passenger' }, context: 'Det er mange passasjerer.' },
            { word: 'Rute', translations: { en: 'Route' }, context: 'Hvilken rute kjører bussen?' },
            { word: 'Forsinkelse', translations: { en: 'Delay' }, context: 'Det er en forsinkelse på toget.' }
        ]
    },
    {
        key: 'transportation_l2',
        title: 'Transportation (Level 2)',
        group: 'Travel & Movement',
        words: [
            { word: 'Ferge', translations: { en: 'Ferry' }, context: 'Vi må ta ferge over fjorden.' },
            { word: 'Trikk', translations: { en: 'Tram' }, context: 'Trikken går gjennom byen.' },
            { word: 'Helikopter', translations: { en: 'Helicopter' }, context: 'Helikopteret flyr lavt.' },
            { word: 'Ambulanse', translations: { en: 'Ambulance' }, context: 'Ring etter ambulanse!' },
            { word: 'Brannbil', translations: { en: 'Fire truck' }, context: 'Brannbilen kom raskt.' },
            { word: 'Scooter', translations: { en: 'Scooter' }, context: 'Hun kjører scooter til jobb.' },
            { word: 'Bagasje', translations: { en: 'Luggage' }, context: 'Hvor er bagasjen min?' },
            { word: 'Rutetabell', translations: { en: 'Timetable' }, context: 'Sjekk rutetabellen.' },
            { word: 'Konduktør', translations: { en: 'Conductor' }, context: 'Konduktøren sjekker billetter.' },
            { word: 'Perlong', translations: { en: 'Platform' }, context: 'Toget står ved perrongen.' }
        ]
    },
    {
        key: 'weather',
        title: 'Weather & Seasons',
        group: 'Nature & Environment',
        words: [
            { word: 'Sol', translations: { en: 'Sun' }, context: 'Solen skinner i dag.' },
            { word: 'Regn', translations: { en: 'Rain' }, context: 'Det kommer mye regn.' },
            { word: 'Snø', translations: { en: 'Snow' }, context: 'Barna leker i snøen.' },
            { word: 'Vind', translations: { en: 'Wind' }, context: 'Det er mye vind ute.' },
            { word: 'Sky', translations: { en: 'Cloud' }, context: 'Det er ingen skyer på himmelen.' },
            { word: 'Varm', translations: { en: 'Warm' }, context: 'Det er varmt i dag.' },
            { word: 'Kald', translations: { en: 'Cold' }, context: 'Det er kaldt om vinteren.' },
            { word: 'Sommer', translations: { en: 'Summer' }, context: 'Jeg elsker sommeren.' },
            { word: 'Vinter', translations: { en: 'Winter' }, context: 'Vinteren er lang i Norge.' },
            { word: 'Høst', translations: { en: 'Autumn' }, context: 'Høsten har fine farger.' },
            { word: 'Vår', translations: { en: 'Spring' }, context: 'Blomstene kommer om våren.' },
            { word: 'Storm', translations: { en: 'Storm' }, context: 'Det var en kraftig storm.' },
            { word: 'Tåke', translations: { en: 'Fog' }, context: 'Det er mye tåke i dag.' },
            { word: 'Lyn', translations: { en: 'Lightning' }, context: 'Så du lynet?' },
            { word: 'Torden', translations: { en: 'Thunder' }, context: 'Jeg er redd for torden.' },
            { word: 'Grad', translations: { en: 'Degree' }, context: 'Det er 20 grader ute.' },
            { word: 'Vær', translations: { en: 'Weather' }, context: 'Hvordan er været?' },
            { word: 'Paraply', translations: { en: 'Umbrella' }, context: 'Ta med paraply.' },
            { word: 'Is', translations: { en: 'Ice' }, context: 'Det er is på veien.' },
            { word: 'Klima', translations: { en: 'Climate' }, context: 'Klimaet endrer seg.' }
        ]
    },
    {
        key: 'weather_l2',
        title: 'Weather (Level 2)',
        group: 'Nature & Environment',
        words: [
            { word: 'Hagl', translations: { en: 'Hail' }, context: 'Det begynte å hagle.' },
            { word: 'Sludd', translations: { en: 'Sleet' }, context: 'Det er sludd og kaldt.' },
            { word: 'Oppholdsvær', translations: { en: 'Dry weather' }, context: 'Vi håper på oppholdsvær.' },
            { word: 'Nedbør', translations: { en: 'Precipitation' }, context: 'Det er meldt mye nedbør.' },
            { word: 'Yr', translations: { en: 'Drizzle' }, context: 'Det er bare litt yr.' },
            { word: 'Kuldegrader', translations: { en: 'Degrees below zero' }, context: 'Det er ti kuldegrader.' },
            { word: 'Varmegrader', translations: { en: 'Degrees above zero' }, context: 'Endelig varmegrader!' },
            { word: 'Solskinn', translations: { en: 'Sunshine' }, context: 'Nyt solskinnet.' },
            { word: 'Regnbue', translations: { en: 'Rainbow' }, context: 'Ser du regnbuen?' },
            { word: 'Uvær', translations: { en: 'Bad weather' }, context: 'Hold deg inne i uværet.' }
        ]
    },
    {
        key: 'school',
        title: 'School & Education',
        group: 'Society & Culture',
        words: [
            { word: 'Skole', translations: { en: 'School' }, context: 'Barna går på skolen.' },
            { word: 'Lærer', translations: { en: 'Teacher' }, context: 'Læreren er snill.' },
            { word: 'Elev', translations: { en: 'Pupil/Student' }, context: 'Elevene lærer norsk.' },
            { word: 'Bok', translations: { en: 'Book' }, context: 'Jeg leser en bok.' },
            { word: 'Penn', translations: { en: 'Pen' }, context: 'Har du en penn?' },
            { word: 'Blyant', translations: { en: 'Pencil' }, context: 'Jeg skriver med blyant.' },
            { word: 'Klasse', translations: { en: 'Class' }, context: 'Klassen er stor.' },
            { word: 'Lekse', translations: { en: 'Homework' }, context: 'Jeg må gjøre lekser.' },
            { word: 'Eksamen', translations: { en: 'Exam' }, context: 'Eksamen er i morgen.' },
            { word: 'Fag', translations: { en: 'Subject' }, context: 'Hvilket fag liker du best?' },
            { word: 'Matematikk', translations: { en: 'Mathematics' }, context: 'Matematikk er vanskelig.' },
            { word: 'Norsk', translations: { en: 'Norwegian' }, context: 'Vi lærer norsk.' },
            { word: 'Engelsk', translations: { en: 'English' }, context: 'Snakker du engelsk?' },
            { word: 'Historie', translations: { en: 'History' }, context: 'Historie er interessant.' },
            { word: 'Bibliotek', translations: { en: 'Library' }, context: 'Boken er fra biblioteket.' },
            { word: 'PC', translations: { en: 'PC/Computer' }, context: 'Vi bruker PC på skolen.' },
            { word: 'Tavle', translations: { en: 'Blackboard/Whiteboard' }, context: 'Læreren skriver på tavla.' },
            { word: 'Friminutt', translations: { en: 'Recess/Break' }, context: 'Nå er det friminutt.' },
            { word: 'Sekkk', translations: { en: 'Backpack' }, context: 'Sekken er tung.' },
            { word: 'Pult', translations: { en: 'Desk' }, context: 'Sitt ved pulten din.' }
        ]
    },
    {
        key: 'school_l2',
        title: 'School (Level 2)',
        group: 'Society & Culture',
        words: [
            { word: 'Rektor', translations: { en: 'Principal' }, context: 'Rektor holder en tale.' },
            { word: 'Kantine', translations: { en: 'Canteen' }, context: 'Vi spiser i kantina.' },
            { word: 'Gymsal', translations: { en: 'Gym' }, context: 'Vi har gym i gymsalen.' },
            { word: 'Karakter', translations: { en: 'Grade' }, context: 'Jeg fikk en god karakter.' },
            { word: 'Vitnemål', translations: { en: 'Diploma' }, context: 'Her er vitnemålet mitt.' },
            { word: 'Forelesning', translations: { en: 'Lecture' }, context: 'Forelesningen var kjedelig.' },
            { word: 'Student', translations: { en: 'University Student' }, context: 'Hun er student i Oslo.' },
            { word: 'Universitet', translations: { en: 'University' }, context: 'Han studerer på universitetet.' },
            { word: 'Semester', translations: { en: 'Semester' }, context: 'Semesteret er snart slutt.' },
            { word: 'Stipend', translations: { en: 'Scholarship/Grant' }, context: 'Jeg søkte om stipend.' }
        ]
    },
    {
        key: 'jobs',
        title: 'Jobs & Professions',
        group: 'Society & Culture',
        words: [
            { word: 'Jobb', translations: { en: 'Job' }, context: 'Jeg har ny jobb.' },
            { word: 'Lege', translations: { en: 'Doctor' }, context: 'Legen hjelper syke folk.' },
            { word: 'Sykepleier', translations: { en: 'Nurse' }, context: 'Sykepleieren er omsorgsfull.' },
            { word: 'Politi', translations: { en: 'Police' }, context: 'Ring politiet!' },
            { word: 'Brannmann', translations: { en: 'Firefighter' }, context: 'Brannmannen slukket brannen.' },
            { word: 'Lærer', translations: { en: 'Teacher' }, context: 'Hun jobber som lærer.' },
            { word: 'Kokk', translations: { en: 'Chef' }, context: 'Kokken lager god mat.' },
            { word: 'Sjåfør', translations: { en: 'Driver' }, context: 'Bussjåføren kjører bussen.' },
            { word: 'Butikkmedarbeider', translations: { en: 'Shop assistant' }, context: 'Spør en butikkmedarbeider.' },
            { word: 'Frisør', translations: { en: 'Hairdresser' }, context: 'Jeg må til frisøren.' },
            { word: 'Snekker', translations: { en: 'Carpenter' }, context: 'Snekkeren bygger huset.' },
            { word: 'Rørlegger', translations: { en: 'Plumber' }, context: 'Vi trenger en rørlegger.' },
            { word: 'Elektriker', translations: { en: 'Electrician' }, context: 'Elektrikeren fikset lyset.' },
            { word: 'Tannlege', translations: { en: 'Dentist' }, context: 'Jeg har time hos tannlegen.' },
            { word: 'Bonde', translations: { en: 'Farmer' }, context: 'Bonden har mange dyr.' },
            { word: 'Fisker', translations: { en: 'Fisherman' }, context: 'Fiskeren fanget mye fisk.' },
            { word: 'Ingeniør', translations: { en: 'Engineer' }, context: 'Han er ingeniør.' },
            { word: 'Advokat', translations: { en: 'Lawyer' }, context: 'Advokaten hjalp meg.' },
            { word: 'Journalist', translations: { en: 'Journalist' }, context: 'Journalisten skriver en sak.' },
            { word: 'Sjef', translations: { en: 'Boss' }, context: 'Sjefen er på møte.' }
        ]
    },
    {
        key: 'jobs_l2',
        title: 'Jobs (Level 2)',
        group: 'Society & Culture',
        words: [
            { word: 'Arkitekt', translations: { en: 'Architect' }, context: 'Arkitekten tegnet huset.' },
            { word: 'Veterinær', translations: { en: 'Veterinarian' }, context: 'Hunden må til veterinær.' },
            { word: 'Psykolog', translations: { en: 'Psychologist' }, context: 'Det er godt å snakke med en psykolog.' },
            { word: 'Kunstner', translations: { en: 'Artist' }, context: 'Hun er en kjent kunstner.' },
            { word: 'Forfatter', translations: { en: 'Author' }, context: 'Forfatteren signerte boken.' },
            { word: 'Skuespiller', translations: { en: 'Actor' }, context: 'Han er en god skuespiller.' },
            { word: 'Musiker', translations: { en: 'Musician' }, context: 'Musikeren spiller gitar.' },
            { word: 'Pilot', translations: { en: 'Pilot' }, context: 'Piloten flyr flyet.' },
            { word: 'Flyvertinne', translations: { en: 'Flight attendant' }, context: 'Flyvertinnen serverte kaffe.' },
            { word: 'Vaktmester', translations: { en: 'Janitor' }, context: 'Vaktmesteren fikset døren.' }
        ]
    },
    {
        key: 'emotions',
        title: 'Emotions & Feelings',
        group: 'Abstract Concepts',
        words: [
            { word: 'Glad', translations: { en: 'Happy' }, context: 'Jeg er så glad i dag!' },
            { word: 'Trist', translations: { en: 'Sad' }, context: 'Hvorfor er du trist?' },
            { word: 'Sint', translations: { en: 'Angry' }, context: 'Han ble veldig sint.' },
            { word: 'Redd', translations: { en: 'Scared' }, context: 'Jeg er redd for edderkopper.' },
            { word: 'Trøtt', translations: { en: 'Tired' }, context: 'Jeg er trøtt og vil sove.' },
            { word: 'Sulten', translations: { en: 'Hungry' }, context: 'Er du sulten?' },
            { word: 'Tørst', translations: { en: 'Thirsty' }, context: 'Jeg er tørst, kan jeg få vann?' },
            { word: 'Syk', translations: { en: 'Sick' }, context: 'Jeg føler meg syk.' },
            { word: 'Frisk', translations: { en: 'Healthy/Well' }, context: 'Nå er jeg frisk igjen.' },
            { word: 'Overrasket', translations: { en: 'Surprised' }, context: 'Jeg ble veldig overrasket.' },
            { word: 'Nervøs', translations: { en: 'Nervous' }, context: 'Han var nervøs før eksamen.' },
            { word: 'Rolig', translations: { en: 'Calm' }, context: 'Ta det rolig.' },
            { word: 'Forelsket', translations: { en: 'In love' }, context: 'De er forelsket.' },
            { word: 'Sjalu', translations: { en: 'Jealous' }, context: 'Ikke vær sjalu.' },
            { word: 'Stolt', translations: { en: 'Proud' }, context: 'Jeg er stolt av deg.' },
            { word: 'Skuffet', translations: { en: 'Disappointed' }, context: 'Jeg ble litt skuffet.' },
            { word: 'Ensom', translations: { en: 'Lonely' }, context: 'Han føler seg ensom.' },
            { word: 'Lykkelig', translations: { en: 'Happy/Blissful' }, context: 'De levde lykkelig.' },
            { word: 'Irritert', translations: { en: 'Annoyed' }, context: 'Jeg blir irritert av bråk.' },
            { word: 'Spent', translations: { en: 'Excited/Tense' }, context: 'Jeg er spent på resultatet.' }
        ]
    },
    {
        key: 'emotions_l2',
        title: 'Emotions (Level 2)',
        group: 'Abstract Concepts',
        words: [
            { word: 'Lettet', translations: { en: 'Relieved' }, context: 'Jeg er lettet over at det gikk bra.' },
            { word: 'Nysgjerrig', translations: { en: 'Curious' }, context: 'Barn er ofte nysgjerrige.' },
            { word: 'Utålmodig', translations: { en: 'Impatient' }, context: 'Ikke vær så utålmodig.' },
            { word: 'Forvirret', translations: { en: 'Confused' }, context: 'Jeg er litt forvirret.' },
            { word: 'Flau', translations: { en: 'Embarrassed' }, context: 'Det var en flau situasjon.' },
            { word: 'Håpefull', translations: { en: 'Hopeful' }, context: 'Jeg er håpefull for fremtiden.' },
            { word: 'Takknemlig', translations: { en: 'Grateful' }, context: 'Jeg er takknemlig for hjelpen.' },
            { word: 'Bekymret', translations: { en: 'Worried' }, context: 'Moren var bekymret.' },
            { word: 'Entusiastisk', translations: { en: 'Enthusiastic' }, context: 'Han er veldig entusiastisk.' },
            { word: 'Melankolsk', translations: { en: 'Melancholic' }, context: 'Stemningen var melankolsk.' }
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

        console.log('Done adding batch 1!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

addCategories();
