export interface UserDto {
  name: string;
  birthday: string;
  height: number;
  weight: number;
  age?: number;
  horoscope?: string;
  zodiac?: string;
  interests?: string[];
  username?: string;
  image?: string;
}
