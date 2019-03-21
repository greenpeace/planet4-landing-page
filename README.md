# Greenpeace Planet4 Landing Page

![Planet4](./planet4.png)

## Run locally

Use [npm](https://www.npmjs.com/) to install the necessary gulp:

    npm -g install gulp-cli

Install all required packages:

    npm install

Run the local webserver:

    gulp

Browse to [localhost:8080](http://localhost:8080).

## Test

To run linters:

    gulp test

For visual regression tests, start by generating reference screenshots:

    gulp backstop_reference

At any time you can create test screenshots:

    gulp backstop_test

Once this is finished a report will be launched in your browser in order to inspect the visual diff.

## Contribute

Please read the [Contribution Guidelines](https://planet4.greenpeace.org/handbook/dev-contribute-to-planet4/) for Planet4.
