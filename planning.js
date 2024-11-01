const fs = require('fs');
const csv = require('csv-parser'); //installed csv parser to run this 
//arrays storing csv file data 
const airports = [];
const aeroplanes = [];
const flights = [];

const outputFilePath = 'flight_details.txt';

//Oiginal code for program 
function readCsv(filename, delimiter = ',') {
    try {
        const fileContent = fs.readFileSync(filename, { encoding: 'utf-8' });
        const rows = fileContent.split('\n');
        const data = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].trim();
            if (row) {
                const columns = row.split(delimiter);
                data.push(columns);
            }
        }

        return data;
    } catch (err) {
        console.error("Error reading file:", err.message);
        return null;
    }
}

// Usage example - not used 
// const airportsData = readCsv('airports.csv');
// if (airportsData) {
//     airportsData.forEach(row => {
//         console.log(row);
//     });
// }


//to load data into arrays 
function loadCSV(filepath,array) {
    return new Promise((resolve, reject) => {
        // pipe strea, into the parser 
        fs.createReadStream(filepath)
        .pipe(csv())
        .on('data', (row) => array.push(row))
        .on('end', () => resolve()) //resolve promise when read is finished
        .on('error', reject); 
    });
}

//distance between uk and overseas airport
function getDistance(ukAirport, overseasAirport) {
    const airportData = airports.find(airport => airport.code === overseasAirport);
    return airportData ? parseInt(airportData[`distance${ukAirport}`], 10) : null;
}

//information on the aeroplane
function getAircraftInfo(aircraftType) {
    return aeroplanes.find(aircraft => aircraft.type === aircraftType);
}

function calculateProfit(flight) {
    // retrieve distance and aircraft info 
    const distance = getDistance(flight['UK airport'], flight['Overseas airport']);
    const aircraft = getAircraftInfo(flight['Type of aircraft']);

    // skip calculations if data is missing 
    if (distance === null || !aircraft) {
        console.warn(`Missing data for flight: ${flight['UK airport']} to ${flight['Overseas airport']}`);
        return null;
    }

    const costPerSeatPer100km = aircraft.runningcostperseatper100km
        ? parseFloat(aircraft.runningcostperseatper100km.replace('£', ''))
        : 0;  // Default to 0 if data is missing

    const totalSeats = parseInt(aircraft.economyseats, 10) + parseInt(aircraft.businessseats, 10) + parseInt(aircraft.firstclassseats, 10);

    // calulate revenue 
    const revenueEconomy = parseInt(flight['Number of economy seats booked'], 10) * parseInt(flight['Price of a economy class seat'], 10);
    const revenueBusiness = parseInt(flight['Number of business seats booked'], 10) * parseInt(flight['Price of a business class seat'], 10);
    const revenueFirst = parseInt(flight['Number of first class seats booked'], 10) * parseInt(flight['Price of a first class seat'], 10);
    const totalRevenue = revenueEconomy + revenueBusiness + revenueFirst;

    const totalCost = (distance / 100) * costPerSeatPer100km * totalSeats;

    //calculate for a profit or loss 
    const profitOrLoss = totalRevenue - totalCost;

    return {
        flightDetails: flight,
        distance,
        totalRevenue,
        totalCost,
        profitOrLoss
    };
}

// to return the results 
async function generateReport() {
    //clear old txt file to stop appending to old data 
    if (fs.existsSync(outputFilePath)) {
        fs.unlinkSync(outputFilePath);//delete existing file 
    }
    try {
        await loadCSV('airports.csv', airports);
        await loadCSV('aeroplanes.csv', aeroplanes);
        await loadCSV('valid_flight_data.csv', flights);
        
        const output = flights.map(flight => {
            const result = calculateProfit(flight);
            if (!result) return '';
            //format for the output 
            const details = `Flight Details:\n` +
            `UK Airport: ${result.flightDetails['UK airport']}\n` +
            `Overseas Airport: ${result.flightDetails['Overseas airport']}\n` +
            `Aircraft Type: ${result.flightDetails['Type of aircraft']}\n` +
            `Distance: ${result.distance} km\n` +
            `Total Revenue: £${result.totalRevenue}\n` +
            `Total Cost: £${result.totalCost}\n` +
            `Profit or Loss: £${result.profitOrLoss}\n` +
            `\n${"=".repeat(40)}\n\n`;
            
            return details;
        }).join('');// into a string
        //write to a txt file 
        fs.writeFileSync('flight_details.txt', output);
        console.log("Flight profit report generated: flight_details.txt"); //sucess

    } catch (error) {
        console.error('Error generating report:', error.message);//error + fail to log 
    }
}
generateReport();
