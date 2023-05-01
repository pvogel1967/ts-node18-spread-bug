import { TestDataDTO } from './test-data-dto';
import { TestData } from 'test-data';

const bar: TestDataDTO = { legacyB: 'pass' };
const barTest = new TestDataDTO();
const { legacyB,...restDto } = {...barTest, ...bar};
const result3: TestData = {
    ...(legacyB ? { b: legacyB } : {}),
    ...restDto
}
console.log(JSON.stringify(result3, null, 2)); // should be { "b": "pass" }
console.log(`bar keys`, JSON.stringify(Object.keys(bar)));
console.log(`restDto keys`, JSON.stringify(Object.keys(restDto)));
console.log(`barTest keys`, JSON.stringify(Object.keys(barTest)));
console.log(`result3 keys`, JSON.stringify(Object.keys(result3)));

