import {
  Person,
  Gender
} from './json-object.model';
import { deserialize } from '../src/json-deserializer';

describe('deserializing object:', () => {
  it('should deserialized the person object including its children.', () => {
    var personJson: any = {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      age: 25,
      maritalStatus: null,
      friends: [
        'recca',
        { name: 'goku', skill: 'sayan' },
        'gohan'
      ],
      skills: [
        'playing-guitar',
        'playing-piano',
        'vocalist'
      ],
      children: [
        {
          firstName: 'JohnKid1',
          lastName: 'Doe1',
          gender: 'Female',
          age: 3
        },
        {
          firstName: 'JohnKid2',
          lastName: 'Doe2',
          gender: 'Male',
          age: 5
        }
      ]
    };

    var deserializedPerson = deserialize(Person, personJson);

    expect(deserializedPerson).toBeDefined();
    expect(deserializedPerson.firstName).toBe('John');
    expect(deserializedPerson.lastName).toBe('Doe');
    expect(deserializedPerson.fullName).toBe('John Doe');
    expect(deserializedPerson.currentAge).toBe(25);
    expect(deserializedPerson.maritalStatus).toBeNull();
    expect(deserializedPerson.gender).toBe(Gender.Male);

    expect(deserializedPerson.friends.length).toBe(3);
    expect(deserializedPerson.friends[0]).toBe('recca');
    expect(deserializedPerson.friends[1].name).toBe('goku');
    expect(deserializedPerson.friends[2]).toBe('gohan');

    expect(deserializedPerson.skills.length).toBe(3);
    expect(deserializedPerson.skills[0]).toBe('playing-guitar');
    expect(deserializedPerson.skills[1]).toBe('playing-piano');
    expect(deserializedPerson.skills[2]).toBe('vocalist');

    expect(deserializedPerson.children.length).toBe(2);
    expect(deserializedPerson.children[0].fullName).toBe('JohnKid1 Doe1');
    expect(deserializedPerson.children[0].currentAge).toBe(3);
    expect(deserializedPerson.children[0].gender).toBe(Gender.Female);

    expect(deserializedPerson.children[1].fullName).toBe('JohnKid2 Doe2');
    expect(deserializedPerson.children[1].currentAge).toBe(5);
    expect(deserializedPerson.children[1].gender).toBe(Gender.Male);
  });

  it('should not deserialized the records that are not in the model.', () => {
    var personJson: any = {
      firstName: 'John',
      lastName: 'Doe',
      genderMale: 'Male',
      ignoredField: 'something',
      skills: [],
      children: [
        {
          firstName: 'JohnKid1',
          lastName: 'Doe1',
          gender: 'Female',
          age: 3
        }
      ]
    };

    var deserializedPerson = deserialize(Person, personJson);
    expect(deserializedPerson).toBeDefined();
    expect(deserializedPerson.firstName).toBe('John');
    expect(deserializedPerson.lastName).toBe('Doe');
    expect(deserializedPerson.fullName).toBe('John Doe');
    expect(deserializedPerson.currentAge).toBeUndefined;
    expect(deserializedPerson.gender).toBeUndefined();
    expect(deserializedPerson.ignoredField).toBeUndefined();
    expect(deserializedPerson.skills.length).toBe(0);

    expect(deserializedPerson.children.length).toBe(1);
    expect(deserializedPerson.children[0].fullName).toBe('JohnKid1 Doe1');
    expect(deserializedPerson.children[0].currentAge).toBe(3);
    expect(deserializedPerson.children[0].gender).toBe(Gender.Female);
  });
});
