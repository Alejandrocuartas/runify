const servicesUrl: string = process.env.API || "http://localhost:3000";

const runnifyTokenName: string = "token_runify";

const distanceUnitsSymbols = {
    kilometers: "KM",
    miles: "MI",
    meters: "M",
    yards: "YD",
    feet: "FT",
}

const eventTypes = {
    short_distance_race: "Carrera de corta distancia",
    medium_distance_race: "Carrera de media distancia",
    long_distance_race: "Carrera de larga distancia",
    trail_race: "Carrera de trail",
    tematic_or_recreational_race: "Carrera tematica o recreativa",
    asphalt_race: "Carrera en Asfalto",
    charity_race_or_race_with_a_cause: "Carrera Benefica o con Causa",
    obstacle_race: "Carrera de Obstaculos",
    individual_race: "Carrera individual",
    team_race: "Carrera en Equpos",
    race_with_a_theme: "Carrera con tema",
    other: "Otro",
}

export { servicesUrl, runnifyTokenName, distanceUnitsSymbols, eventTypes };