# WebdriverIO

The TypeScript Node.js WebdriverIO project.

# Preconditions

1. Install Node.js(latest version, or at least 21);
2. Clone the repository where the project is stored:
    - `git clone https://github.com/borderForNoone/WebdriverIOTypeScriptRentzila`
3. Install Dependencies;
    - `npm install`

# Steps to run

Run the command below to run all tests in headlees mode

```
npm run tests:chrome:headless
```

Running All Tests in Chrome Headed Mode

```
npm run tests:chrome:headed
```

Running a Single Test by Filename

```
npm run test:single -- --spec ./test/specs/example.spec.ts
```

Allure Report
For reporting used Allure Report - Automation Test Reporting Tool
Learn more about Allure Report at Allure

To generate allure report:

```
npm run allure:generateReport
```
To open allure report:
```
npm run allure:openReport
```

Report on CI:

https://borderfornoone.github.io/WebdriverIOTypeScriptRentzila/