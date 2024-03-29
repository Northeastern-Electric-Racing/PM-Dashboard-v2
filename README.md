# NER PM Dashboard v2

-----------------------------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------
## NOTE: THIS PROJECT IS NO LONGER BEING WORKED ON GO TO THE LINK BELOW INSTEAD

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

https://github.com/Northeastern-Electric-Racing/FinishLine

-----------------------------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------

Northeastern Electric Racing Project Management Dashboard - version 2

A project management web application built in React.
Read more [here](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/About.md).

All questions can be directed to `#software` in the [NER Slack](https://nu-electric-racing.slack.com) (emergency backup contact: [`@jamescd18`](https://github.com/jamescd18)).

---

## Getting Started

Start by understanding what the project is [all about](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/About.md).
Then go through either the [Mac onboarding](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/Onboarding.md) or [Windows onboarding](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/OnboardingWindows.md) steps.
And finally read through the [contributor guide](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/ContributorGuide.md).

If you're curious, check out the [deployment & production application documentation](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/Deployment.md) and the [product management](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/ProductManagement.md) details too.

## Project Setup Checklist

The below table will help track various components of setting up this project and transitioning from [v1](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v1) to v2.

| Area                   | Tech / Package             |                                    Research                                    | Decided |                                                    Implemented                                                     |
| :--------------------- | :------------------------- | :----------------------------------------------------------------------------: | :-----: | :----------------------------------------------------------------------------------------------------------------: |
| Basic React App        | create-react-app           |                                       -                                        |    Y    | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/tree/6762c180ade9801712fac20f0bc1cc32d7176326) |
| Deployment             | Netlify                    | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/1)  |    Y    | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/tree/8066a8e7ea9e8fe23b73753a4078f50490544b7f) |
| Linting                | ESLint                     | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/6)  |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/45)                    |
| Formatting             | Prettier                   | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/6)  |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/45)                    |
| Testing                | Jest                       | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/7)  |    Y    | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/tree/6762c180ade9801712fac20f0bc1cc32d7176326) |
| e2e Testing            | Cypress                    | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/5)  |    Y    |                                                                                                                    |
| Component Testing      | React Testing Library      | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/16) |    Y    | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/tree/6762c180ade9801712fac20f0bc1cc32d7176326) |
| Database               | PostgreSQL                 | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/4)  |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/41)                    |
| ORM                    | Prisma                     | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/2)  |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/41)                    |
| User Authentication    | react-google-login         | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/17) |    Y    |                                                                                                                    |
| State Management       | Redux                      | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/18) |         |                                                                                                                    |
| Charts                 | react-google-charts        | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/20) |    Y    |                                                                                                                    |
| Styling                | Bootstrap, react-bootstrap | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/19) |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/74)                    |
| Tables                 | react-bootstrap-table-next | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/19) |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/74)                    |
| URL Routing            | React Router               | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/21) |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/84)                    |
| Continuous Integration | GitHub Actions             | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/22) |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/64)                    |
| Database Hosting       | AWS RDS                    | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/23) |    Y    |                                                                                                                    |
| Database Design        | -                          | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/37) |    Y    |                                                                                                                    |
| Backend Structure      | ?                          | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/14) |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/81)                    |
| Front-End Structure    | -                          | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/47) |    Y    |                    [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pull/52)                    |
| REST API Design        | OpenAPI Spec               | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/38) |         |                                                                                                                    |
| Front-End Docs         | ?                          | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/79) |         |                                                                                                                    |
| Component Sandboxing   | Storybook                  |                                                                                |         |                                                                                                                    |
