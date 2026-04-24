## WebdriverIO Test Automation Learning Project (SauceDemo)

### About the Project  
This project is a structured self-learning journey in QA Automation using WebdriverIO and TypeScript.  
It demonstrates progression from basic UI testing to a more advanced automation framework with clear architecture and separation of concerns.  
The application under test: https://www.saucedemo.com/

### Learning Strategy  
Instead of building a single test suite, the project is divided into levels:  
Trainee → basic UI actions and simple assertions  
Junior → Page Object Model, reusable methods  
Middle → layered architecture, utils, data processing, improved test design  

Each level reflects a step in understanding automation engineering concepts.

### Tech Stack
TypeScript  
WebdriverIO  
Node.js  
Mocha  
WDIO Expect Assertions  
📂 Project Structure  
pages/        → Page Object Model (UI interactions)
tests/  
  ├─ trainee/  
  ├─ junior/  
  └─ middle/  
utils/        → data processing & helper functions  

### How to Run
Install dependencies:  
npm install  
Run tests:  
npm test  

### Test Coverage
Core Scenarios  
Product sorting validation (low → high)  
Full checkout flow  
Cart state persistence after refresh  
Form validation (negative scenario)  
Bulk add-to-cart validation  
### Key Engineering Concepts Demonstrated  
Page Object Model implementation  
Separation of concerns (test / page / utils layers)  
Data extraction and transformation (DOM → numbers)  
Controlled randomness via seeded functions  
TypeScript usage in test automation  
Clean and readable test design  
### Future Improvements
CI integration (GitHub Actions)  
API test layer  
Custom matchers (e.g. toBeSorted)  
Test data management layer  

#### Author

Konstantin Kovalenko  
Aspiring QA Automation Engineer