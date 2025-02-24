import { Activity } from '../types/activity';
import { faker } from '@faker-js/faker';

function generatePassword(): string {
  const specialCharacters = '!@#$%^&*()_-+=`~\\/';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  let password = '';
  password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
  password += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  password += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  const allCharacters = specialCharacters + uppercaseLetters + lowercaseLetters + numbers;
  for (let i = 4; i < 12; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  return password;
}

export const registrationData = {
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  country: 'India+',
  phoneNumber: faker.phone.number(),
  password: generatePassword(),
  streetAddress: faker.location.streetAddress(),
  additionalStreetAddress: faker.location.secondaryAddress(),
  state: 'Alabama',
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),
  countryUSA: 'USA',
  activities: [] as Activity[],
  essays: {
    animals: faker.lorem.sentence(),
    school: faker.lorem.sentence()
  }
};