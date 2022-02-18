// IMPORT MODULES under test here:
//import { completeItem } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

const test = QUnit.test;

test('time to test a function', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<li>test</li>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderItem({ description: 'test', complete: false });

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});
