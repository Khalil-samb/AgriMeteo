export function generateTemperatureHistory(currentTemp: number): number[] {

  const history: number[] = [];

  for (let i = 0; i < 6; i++) {
    // Génère une variation aléatoire de température entre -3 et +3 degrés
    const variation = Math.floor(Math.random() * 7) - 3;

    // Ajoute la variation à la température actuelle et arrondit à une décimale
    history.push(Number((currentTemp + variation).toFixed(1)));

  }

  history.push(currentTemp);

  return history;
}