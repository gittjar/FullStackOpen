export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
  Snowy = 'snowy',
  Freezing = 'freezing'
} // arvot voivat olla enumissa esim. kuvaavia sanoja, mutta ne voivat olla myös numeroita, kuten esim. 0, 1, 2, ...

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
  Terrible = 'terrible',
  Cold = 'cold',
}

export type FormattedDate = string;
  
export interface DiaryEntry {
  id: number;
  date: FormattedDate;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;