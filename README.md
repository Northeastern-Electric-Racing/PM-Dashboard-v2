# NER PM Dashboard v2

Northeastern Electric Racing Project Management Dashboard - version 2

All questions can be directed to the project admins: `@kevinyu328` and `@jamescd18`.

## Quick Links
- [About the Project](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/About.md#about-the-project)
- [Onboarding](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/Onboarding.md)
- [Contributor Guide](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2#contributor-guide)
- [Deployment](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2#deployment)
- [Project Setup Checklist](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2#project-setup-checklist)

---

## About the Project

The NER PM Dashboard v2 is a project management web application built in React.
The app is primarily for the benefit of Northeastern Electric Racing's Project Management Office, club leadership, and club members as a whole.
For details, see [the full about page](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/blob/main/docs/About.md#about-the-project).

## Contributor Guide

### Creating Issues & Suggesting Features

Navigate to the [GitHub repository issues page](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues) and click the "New Issue" button.

#### Issue Title

Give your issue an informative, but concise title that follows the naming syntax: `[Page] - [Description]`.
The page field should name one specific page within the application that the issue pertains to.
Alternatively, use `General` or `Docs` to indicate issues spanning the whole site or issues with the project's documentation.
The description field should briefly describe what the issue is.
Examples: `General - Increase Padding for Tables` or `Projects - Add Filter by Project Lead`.

#### Issue Description

Include the required information in the issue description based on the kind of issue you are submitting.

Bugs -> Observed Behavior, Expected Behavior, Steps to Reproduce, and Screenshots

New Features -> Current Features, Desired Additional Features, and Screenshots (as needed)

Other -> Desired Changes, Screenshots (as needed)

Add labels as is appropriate for the issue, and assign it to `@kevinyu328` or `@jamescd18` for review.
Reviewers will determine whether the issue is valid, whether it will be accepted and worked on, and which milestone it will be a part of.

### Creating a Branch

Use `git checkout -b [branch name]` to create a new branch.
Give the branch a short name that follows the naming syntax: `#[issue number]-[contributor name]`.
Example: `#12-JamesCD` or `#275-KevinYu`.

Use `git status` to check which branch you are on.
Ensure you stash, reset, or commit your changes before changing branches, unless you want to bring your changes to the other branch.
Use `git checkout main` to switch back to the `main` branch.

### Writing Code

Comment your code with JSDoc and inline comments to help others understand your code.

Test your code to the best of your ability and avoid writing overly complex code.

Follow good coding practices taught in Fundies 1 and Fundies 2.

### Creating a Commit

Commit early and often (within reason) to properly save your work and to make your changes more easily separable.

Use `git commit -a -m [message]` to stage all changes and commit them with the message.
Use the following syntax for commit messages: `#[issue number] - [description of changes made]`.
Examples: `#12 - Expanded the creating commmits section` or `#79 - Increased list padding`.

See [common git commands](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2#onboarding) for alternative methods for staging and committing changes.

### Testing Your Code

Run the unit tests and try to ensure they all pass.

You can run a test coverage report too, to see where there may be gaps in test cases.
Test coverage reports only go by lines of code, so make sure to also consider if edge cases have been tested.

### Running the App Locally

Use `npm run start` in order to boot up the React app and the back-end serverless functions on your local computer.
Navigate to `localhost:3000` if your browser does not automatically.
The API endpoint can be found at `localhost:3000/.netlify/functions/`.

### Creating a Pull Request

Pull requests (aka PRs) allow for others to review your code before it gets merged together with the `main` branch.
Don't be afraid to open a PR before you are finished if you want feedback on your code, just make sure to note this in your PR.
Pushing more commits to the GitHub repo will add them to the PR.

Ensure that you have pushed your branch to GitHub using `git push`.
You may need to run `git push --set-upstream origin [branch name]` as instructed by the git CLI if the branch does not already exist in the GitHub repo and only exists on your local computer.

Navigate to the [PRs page on GitHub](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/pulls) and click "New pull request".
You may have to select the branch which you would like to merge into the `main` branch.

Give your PR an informative and concise title.
PR titles often match the title of the issue they are linked to, but they do not have to match.

Use [closing keywords](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) in the description of the PR to link the PR with any associated issue(s).
Example: `closes #27`, `fixed #82`, or `resolve #23, closed #56`.

In the sidebar, request review from any interested team members, which must include `@kevinyu328` or `@jamescd18`.

## Deployment

Deployment of the application is primarily handled by the repository admins.

### Repositories

There are two GitHub repositories for this project, [one is contributions](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2), and the other is for deployment.

The contribution repository is public and housed under the [Northeastern Electric Racing GitHub organization](https://github.com/Northeastern-Electric-Racing).

### Netlify

The web application is deployed via Netlify for both the front-end and the back-end.

## Project Setup Checklist

The below table will help track various components of setting up this project and transitioning from [v1](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v1) to v2.

| Area | Tech / Package | Issue | Researched | Decided | Implemented |
| :--- | :--- | :---: | :---: | :---: | :---: |
| Basic React App | create-react-app | - | - | Y | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/tree/6762c180ade9801712fac20f0bc1cc32d7176326) |
| Deployment | Netlify | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/1) | - | Y | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/tree/8066a8e7ea9e8fe23b73753a4078f50490544b7f) |
| Linting | ESLint | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/6) | Y | Y |  |
| Formatting | Prettier | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/6) | Y | Y |  |
| Testing | Jest | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/7) | Y | Y |  |
| e2e Testing | Cypress | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/5) | Y | Y |  |
| Component Testing | React Testing Library | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/16) | Y | Y |  |
| Database | PostgreSQL | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/4) |  |  |  |
| ORM | Prisma | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/2) |  |  |  |
| User Authentication | react-google-login | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/17) | Y | Y |  |
| State Management | Redux | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/18) |  |  |  |
| Charts | react-google-charts | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/20) |  |  |  |
| Styling | Bootstrap | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/19) |  |  |  |
| URL Routing | React Router | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/21) |  |  |  |
| Continuous Integration | GitHub Actions | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/22) |  |  |  |
| Database Hosting | ? | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/23) |  |  |  |
| Backend Structure | ? | [Y](https://github.com/Northeastern-Electric-Racing/PM-Dashboard-v2/issues/14) |  |  |  |
| _ | _ | _ | _ | _ | _ |
