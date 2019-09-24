import {
  Person,
  Gender,
  Hobby
} from './json-object.model';
import { serialize } from '../src/json-serializer';

describe('serialize', () => {
  it('should serialized the person object including its children.', () => {
    var personDetails = new Person();
    personDetails.firstName = 'John';
    personDetails.lastName = 'Doe';
    personDetails.gender = Gender.Male;
    personDetails.currentAge = 25;
    personDetails.maritalStatus = null;

    personDetails.friends = [];
    personDetails.friends.push('recca');
    personDetails.friends.push({ name: 'goku', skill: 'sayan' });
    personDetails.friends.push('gohan');

    personDetails.skills = ['playing-guitar', 'playing-piano', 'vocalist'];

    personDetails.hobbies = [];
    let firstHobby = new Hobby();
    firstHobby.hobbyName = 'playing-guitar';
    firstHobby.description = 'It helps me relax';
    personDetails.hobbies.push(firstHobby);

    personDetails.children = [];
    let firstChild = new Person();
    firstChild.firstName = 'JohnKid1';
    firstChild.lastName = 'Doe1';
    firstChild.gender = Gender.Female;
    firstChild.currentAge = 3;
    firstChild.skills = ['one', 'two'];
    personDetails.children.push(firstChild);

    let secondChild = new Person();
    secondChild.firstName = 'JohnKid2';
    secondChild.lastName = 'Doe2';
    secondChild.gender = Gender.Male;
    secondChild.currentAge = 5;
    secondChild.skills = ['third', 'fourth'];
    personDetails.children.push(secondChild);

    var serializedPerson = serialize(personDetails);

    expect(serializedPerson).toBeDefined();
    expect(serializedPerson.firstName).toBe('John');
    expect(serializedPerson.lastName).toBe('Doe');
    expect(serializedPerson.fullName).toBeUndefined();
    expect(serializedPerson.age).toBe(25);
    expect(serializedPerson.maritalStatus).toBeNull();
    expect(serializedPerson.gender).toBe('Male');

    expect(serializedPerson.friends.length).toBe(3);
    expect(serializedPerson.friends[0]).toBe('recca');
    expect(serializedPerson.friends[1].name).toBe('goku');
    expect(serializedPerson.friends[2]).toBe('gohan');

    expect(serializedPerson.skills.length).toBe(3);
    expect(serializedPerson.skills[0]).toBe('playing-guitar');
    expect(serializedPerson.skills[1]).toBe('playing-piano');
    expect(serializedPerson.skills[2]).toBe('vocalist');

    expect(serializedPerson.hobbies.length).toBe(1);
    expect(serializedPerson.hobbies[0].title).toBe('playing-guitar');
    expect(serializedPerson.hobbies[0].description).toBe('It helps me relax');

    expect(serializedPerson.children.length).toBe(2);
    expect(serializedPerson.children[0].fullName).toBeUndefined();
    expect(serializedPerson.children[0].age).toBe(3);
    expect(serializedPerson.children[0].gender).toBe('Female');

    expect(serializedPerson.children[1].fullName).toBeUndefined();
    expect(serializedPerson.children[1].age).toBe(5);
    expect(serializedPerson.children[1].gender).toBe('Male');
  });

  it('should serialized the property fields in the model since they are not part of the payload.', () => {
    var personDetails = new Person();
    personDetails.firstName = 'John';
    personDetails.lastName = 'Doe';
    personDetails.gender = Gender.Male;
    personDetails.currentAge = 25;
    personDetails.skills = ['playing-guitar', 'playing-piano', 'vocalist'];
    personDetails.children = [];

    var serializedPerson = serialize(personDetails);
    expect(serializedPerson).toBeDefined();
    expect(serializedPerson.fullName).toBeUndefined();
    expect(serializedPerson.firstName).toBe('John');
    expect(serializedPerson.lastName).toBe('Doe');
    expect(serializedPerson.age).toBe(25);
    expect(serializedPerson.gender).toBe('Male');

    expect(serializedPerson.skills.length).toBe(3);
    expect(serializedPerson.skills[0]).toBe('playing-guitar');
    expect(serializedPerson.skills[1]).toBe('playing-piano');
    expect(serializedPerson.skills[2]).toBe('vocalist');
  });
});
