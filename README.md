# FCC React / Redux Challenge Converter
This project is a simple node utility script which takes the freeCodeCamp alpha React, Redux, and React-Redux challenges (which were originally developed independently from the freeCodeCamp ecosystem in a [different project](https://hysterical-amusement.surge.sh), whose code lived [here](https://github.com/bonham000/fcc-react-tests-module)), and converts them into freeCodeCamp compatible JSON seed code, so that they can be ported over to the freeCodeCamp app.

Typically, formatting challenges into JSON seed code for freeCodeCamp is a horribly tedious process. JSON is very brittle, so every comma must be in exactly the right place, and formatting code across multiple lines and preserving spacing is completely unnatural. With 78 challenges to convert, we were not looking forward to doing this by hand (each one can take about 10 minutes or more to format manually, and since you must seed the database and restart the server every time you want to check how something looks, the feedback loop is painfully slow). So, we thought... what better way to format programming challenges than programmatically?

This tool cut down what might have taken several days (no joke), to only about 30 seconds. It still kind of uses brute force to get around certain formatting issues (like slicing and dicing strings in very particular places and ways to achieve the correct styling), so while some of the code is not that elegant, it was more than worth the effort to automate this process. 

`index.js` contains a more thorough explanation of how this works, but basically, we just:
- Read JSON templates from the file system, and convert them to JavaScript objects so they can be more easily manipulated
- Then import challenge files as modules, iterate over them, parsing, slicing and dicing the right components along the way
- Push the newly constructed challenge objects on to the challenges array, convert the whole thing back into JSON, and write the result back to the file system.

That's it! And just like magic, you have over 4000 lines of otherwise arduously constructed JSON.

This utility saved us an unspeakable amount of time, formatted all 78 challenges nearly perfectly, and allowed us to focus on refactoring our tests to be compatible with the latest version of Enzyme. Yay.

The final result can be seen at https://beta.freeCodeCamp.com > Front End Libraries (soon to be part of the core curriculum on https://freeCodeCamp.org).
