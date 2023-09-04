# Greenpeace Planet4 Landing Page

![Planet4](./planet4.png)

## Run locally

Update styleguide submodule

    git submodule update --init --recursive

Use [npm](https://www.npmjs.com/) to install the necessary gulp:

    npm -g install gulp-cli

Install all required packages:

    npm install

On first run fetch the countries data:

    gulp countries

Build the landing page:

    gulp build

Run the local webserver:

    gulp

Browse to [localhost:9000](http://localhost:9000).

## Test

To run linters:

    gulp lint

For visual regression tests, start by generating reference screenshots:

    gulp backstop_reference

At any time you can create test screenshots:

    gulp backstop_test

Once this is finished a report will be launched in your browser in order to inspect the visual diff.

To run accessibility test:

    gulp test

Results are available in `pa11y/report.html` (open in your browser) and `pa11y/report.json` (open with `jq`).
Configuration is in `.pa11y`.

## Deployment

The build and deployment is happening automatically whenever:

- There are commits to the master branch.
- There are new [tags](https://github.com/greenpeace/planet4-landing-page/tags) created.

The above changes trigger (via the circleCI API) a rebuild of the develop and master related workflows of the current repository.

These in turn do the following:

- Checkout the relevant code of the landing-page (either the latest code of the master theme, or the latest tag).
- Create a docker image with the above code in the repository called "public".
- Push this docker image to the [docker hub registry](https://hub.docker.com/r/greenpeaceinternational/p4-landing-page) for the current application and tag it either `develop` or `latest`.
- Run a helm deploy/update to create the necessary kubernetes resources so that this can be served by our kubernetes clusters.

### Notes

- This repository does not have its own helm chart. It uses the helm chart [Planet4 static](https://github.com/greenpeace/planet4-helm-static) which has been created to accommodate all static applications.
- New commits to the main branch get deployed at the url: https://www-dev.greenpeace.org
- New tags get deployed at the url: https://www.greenpeace.org/
- If you want to confirm the version deployed you can check `/version.txt` on either of the above urls.

## Contribute

Please read the [Contribution Guidelines](https://planet4.greenpeace.org/handbook/dev-contribute-to-planet4/) for Planet4.
