class TestDataDTO {
    a?: string;
    b?: string;
    legacyB?: string;
}

class TestData {
    a?: string;
    b?: string;
}
const bar: TestDataDTO = { legacyB: 'pass' };
const barTest = new TestDataDTO();
// this next line simulates what you typically get from an API layer which is receiving a DTO
// with many optional fields via JSON and, after validating the DTO content, spreads it into an
// "empty" object created via new.
const { legacyB,...restDto } = {...barTest, ...bar};
// This next line is what causes the problem.  We successfully spread { b: legacyB } into the result
// but then the spread of what _should be_ an empty restDto overwrites the b property with undefined.
const result3: TestData = {
    ...(legacyB ? { b: legacyB } : {}),
    ...restDto
}
console.log(JSON.stringify(result3, null, 2)); // should be { "b": "pass" }
console.log(`restDto keys`, JSON.stringify(Object.keys(restDto))); // should be [] but is ["a", "b"]
console.log(`barTest keys`, JSON.stringify(Object.keys(barTest))); // should be [] but is ["a", "b", "legacyB"]
console.log(`result3 keys`, JSON.stringify(Object.keys(result3))); // should be ["b"] but is ["b", "a"]
