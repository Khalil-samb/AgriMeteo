export interface RiskResult {
  score: number;
  label: string;
  color: string;
}

export function calculateRisk(temp: number, humidity: number): RiskResult {

  // Risque élevé
  if (temp > 35 && humidity > 50) {

    return {
      score: 85,
      label: 'Risque Canicule Élevé',
      color: '#FF4500',

    };

  }

  // Risque modéré
  if (temp > 30 && humidity > 40) {

    return {
      score: 55,
      label: 'Risque Modéré',
      color: '#F59E0B'
    };

  }

  // Risque faible
  return {
    score: 22,
    label: 'Risque Faible',
    color: '#22C55E'
  };

}