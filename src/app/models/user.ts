export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address: Address;
  company: { name: string; catchPhrase: string; bs: string };
}