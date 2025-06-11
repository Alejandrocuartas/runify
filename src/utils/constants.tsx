const servicesUrl: string = process.env.API || "http://localhost:3000";

const runnifyTokenName: string = "token_runify";

const distanceUnitsSymbols = {
    kilometers: "KM",
    miles: "MI",
    meters: "M",
    yards: "YD",
    feet: "FT",
}

export { servicesUrl, runnifyTokenName, distanceUnitsSymbols };