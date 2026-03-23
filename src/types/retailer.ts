import { ImageSourcePropType } from 'react-native';

export interface Retailer {
  id: string;
  name: string;
  category: string;
  logo: ImageSourcePropType;
}

export interface RetailerDetail extends Retailer {
  description: string;
  website: string;
  cashback: number;
}
